import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthDTO {
  @IsString()
  @IsNotEmpty({
    message: 'Enter your email',
  })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Enter your password',
  })
  password: string;
}

export class TokenDTO {
  @IsString()
  @IsNotEmpty({
    message: 'Enter your token',
  })
  token: string;
}
