import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileController } from './profile/profile.controller';

@Module({
  providers: [UserService],
  controllers: [UserController, ProfileController]
})
export class UserModule {}
