
import { Entity, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude, classToPlain } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { AbstractEntity } from './abstract-entity';

@Entity('users')
export class UserEntity extends AbstractEntity{
    @Column()
    // @IsEmail()
    email: string;
  
    @Column({ unique: true })
    username: string;
  
    @Column({ default: '' })
    bio: string;
    
    @Column({ default: '' })
    firstname: string;

    @Column({ default: '' })
    lastname: string;

    // included an image field if we want users to have a profile pic
    @Column({ default: null, nullable: true })
    image: string | null;
  
    @Column()
    @Exclude()
    password: string;

    //TODO: Add more columns if required

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
  
    async comparePassword(attempt: string) {
      return await bcrypt.compare(attempt, this.password);
    }
  
    toJSON() {
      return classToPlain(this);
    }
  
}