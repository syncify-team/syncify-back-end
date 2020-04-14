import { Module } from '@nestjs/common';
import { JwtModule} from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { JWTStrategy } from './jwt.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), 
  JwtModule.register({
    secret: process.env.SECRET,
    signOptions: {
      expiresIn: 3600000,
    }
  }),
  PassportModule.register({defaultStrategy: 'jwt'})
],
providers: [AuthService, JWTStrategy],
controllers: [AuthController],
exports: [PassportModule, JWTStrategy],
})
export class AuthModule {}