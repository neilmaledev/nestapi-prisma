import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}