import {Controller, Post, Body, HttpStatus, HttpCode} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService) {}

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @Post('/registration')
    @HttpCode(HttpStatus.CREATED)
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }
}
