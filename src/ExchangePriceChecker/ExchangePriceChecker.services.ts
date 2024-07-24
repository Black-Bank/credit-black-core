import axios from 'axios';

export class ExchangePriceService {
  private coinbase_url_btc_usd: string;
  private mercado_bitcoin_url_btc_usd: string;
  private binance_url_btc_usd: string;
  private dolar_brl_url: string;

  constructor() {
    this.coinbase_url_btc_usd =
      'https://api.coinbase.com/v2/prices/spot?currency=USD';
    this.mercado_bitcoin_url_btc_usd =
      'https://www.mercadobitcoin.net/api/BTC/ticker/';
    this.binance_url_btc_usd =
      'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';

    this.dolar_brl_url = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';
  }

  async getExhangePrice() {
    try {
      const [
        coinbaseResponse,
        mercadoBitcoinResponse,
        binanceResponse,
        dolarBRLResponse,
      ] = await Promise.all([
        axios.get(this.coinbase_url_btc_usd),
        axios.get(this.mercado_bitcoin_url_btc_usd),
        axios.get(this.binance_url_btc_usd),
        axios.get(this.dolar_brl_url),
      ]);

      const dolarPrice = Number(dolarBRLResponse.data.USDBRL.ask);

      const coinbasePrice = Number(coinbaseResponse.data.data.amount).toFixed(
        4,
      );
      const mercadoBitcoinPrice = (
        Number(mercadoBitcoinResponse.data.ticker.last) / dolarPrice
      ).toFixed(4);
      const binancePrice = Number(binanceResponse.data.price).toFixed(4);

      const prices = [
        { exchange: 'coinbase', coin: 'BTC', price: Number(coinbasePrice) },
        {
          exchange: 'mercadoBitcoin',
          coin: 'BTC',
          price: Number(mercadoBitcoinPrice),
        },
        { exchange: 'binance', coin: 'BTC', price: Number(binancePrice) },
      ];

      prices.sort((a, b) => b.price - a.price);

      return prices;
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }
}
