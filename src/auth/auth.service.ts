import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from  'bcryptjs'
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { Users } from "../users/schemas/users.schemas";


@Injectable()
export class AuthService {
    constructor(
        private usersService : UsersService,
        private jwtService : JwtService
    ) {}

    async login(userDto: CreateUserDto): Promise<object>{
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto): Promise<object>{
        const candidate = await this.usersService.getUserByEmail(userDto.email)
        if(candidate){
            throw new HttpException(
                'User with this email exists',
                HttpStatus.BAD_REQUEST,
            )
        }
        const tokens = await this.generateToken(userDto)
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.usersService.create({
            ...userDto,
            password: hashPassword,

        })

        return this.generateToken(user)
    }

    private async generateToken(user: Users): Promise<object>{
        const payload = { email: user.email, password: user.password }
        const accessToken: string = this.jwtService.sign(payload, {expiresIn: '15m'})
        const refreshToken: string= this.jwtService.sign(payload, {expiresIn: '30d'})
        return { accessToken, refreshToken }
    }

    private async validateUser(userDto: CreateUserDto): Promise<Users>{
        const user = await this.usersService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password,
        )
        if( user && passwordEquals){
            return user
        }
        throw new UnauthorizedException({ message: 'Unauthorized Error' })
    }
}
