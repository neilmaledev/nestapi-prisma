import { IsString, IsNotEmpty } from 'class-validator';

export class AccessDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}