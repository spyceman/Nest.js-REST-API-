import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'login'})
    readonly login: string;
    @ApiProperty({example: 'password'})
    // not readonly because of hashing
    password: string;
    @ApiProperty({example: 'admin', description: 'user or admin'})
    readonly role: string
}

