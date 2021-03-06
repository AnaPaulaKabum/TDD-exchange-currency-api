import { IsNotEmpty, IsNumber, IsNumberString, Length } from "class-validator";

export class CreateCurrencyDTO {
    @IsNotEmpty()
    @Length(3,3)
    currency:string;

    @IsNotEmpty()
    @IsNumber()
    value:number
}