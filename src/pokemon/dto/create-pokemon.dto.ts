import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    //int - positivo - min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    nro: number;
    
    @IsString()
    @MinLength(1)
    name: string;
}
