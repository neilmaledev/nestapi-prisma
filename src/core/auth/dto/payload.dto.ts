import { IsString, IsEmail } from 'class-validator';

export class PayloadDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;
}