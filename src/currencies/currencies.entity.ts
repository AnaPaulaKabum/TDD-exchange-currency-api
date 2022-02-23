import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';
import { Entity,Unique,ObjectIdColumn,PrimaryColumn,Column,CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

@Unique(['currency'])
@Entity()
export class Currencies{

    /*@PrimaryGeneratedColumn()
    id:string;*/

    @PrimaryColumn()
    @Length(3,3)
    @IsNotEmpty()
    currency:string;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    value:number;

    @CreateDateColumn({type:'timestamp'})
    createAt:Date;

    @CreateDateColumn({type:'timestamp'})
    updateAt:Date;
}
