import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDTO {
  // @IsString()
  // @MinLength(4)
  // @MaxLength(20)
  username: string;

//   @IsString()
//   @MinLength(4)
  password: string;
}

export class RegistrationDTO extends LoginDTO {
  // @IsEmail()
  // @IsString()
  email: string;
}

export interface AuthPayload {
  username: string;
}