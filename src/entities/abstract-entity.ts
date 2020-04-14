// This a class that we can use to inherit from that has all the columns that we want for our other tables such that we dont have to rewrite it
// Example: create Date, update Data, etc..

import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


export abstract class AbstractEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created: Date; 

    @UpdateDateColumn()
    updated: Date;
}