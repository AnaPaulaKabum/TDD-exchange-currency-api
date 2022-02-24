import { Type } from 'class-transformer';
import { IsCurrency, IsNotEmpty, IsNumber, isNumberString, Length } from 'class-validator';
import { Entity,Unique,ObjectIdColumn,PrimaryColumn,Column,CreateDateColumn, PrimaryGeneratedColumn, Double } from 'typeorm'
import { isFloat32Array } from 'util/types';

@Unique(['currency'])
@Entity()
export class Currencies{

    /*@PrimaryGeneratedColumn()
    id:string;*/

    @PrimaryColumn()
    @Length(3,3)
    @IsNotEmpty()
    currency:string;

    @Column("double")
    @IsNotEmpty()
    @IsNumber()
    value: number;

    @CreateDateColumn({type:'timestamp'})
    createAt:Date;

    @CreateDateColumn({type:'timestamp'})
    updateAt:Date;
}
