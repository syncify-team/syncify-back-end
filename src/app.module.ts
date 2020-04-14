import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { DatabaseConnectionService } from './database-connection.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), 
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService}), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}