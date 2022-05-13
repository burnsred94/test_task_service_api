import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { Users } from "./schemas/users.schemas";

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll() : Promise<Users[]>{
        return this.userService.getAll()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    get(@Param('id') id: string) : Promise<Users>{
        return this.userService.getById(id)
    };

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUser : CreateUserDto): Promise<Users>{
        return this.userService.create(createUser)
    };

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(@Body() updateUser : UpdateUserDto, @Param('id') id: string): Promise<Users>{
        return this.userService.update(updateUser, id)
    };

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    remove(@Param() id): Promise<Users>{
        return this.userService.remove(id)
    };
}
