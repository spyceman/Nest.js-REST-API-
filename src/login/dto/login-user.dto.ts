import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({example: 'login'})
    readonly login: string;
    @ApiProperty({example: 'password'})
    readonly password: string
}