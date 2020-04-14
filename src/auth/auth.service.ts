import { Injectable, InternalServerErrorException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { LoginDTO, RegistrationDTO } from '../model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import {JwtService} from "@nestjs/jwt"
@Injectable()

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService
  ){}

  async register(credentials: RegistrationDTO) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      const payload =  {username: user.username};
      const token = this.jwtService.sign(payload);
      return {user: {...user.toJSON(),token }}
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login({username, password} : LoginDTO) {
    try {
      const user = await this.userRepo.findOne({where: {username: username, password: password}});
      const isValid = await user.comparePassword(password)
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJSON(), token } };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
