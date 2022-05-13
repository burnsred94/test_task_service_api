import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Users, UsersDocument } from "./schemas/users.schemas";

@Injectable()
export class UsersService {

    constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}

    async getAll() : Promise<Users[]>{
        return this.usersModel.find().exec()
    }

    async getById (id : string): Promise<Users>{
        return this.usersModel.findById(id)
    };

   async create (userDto : CreateUserDto): Promise<Users>{
      const newUser = new this.usersModel(userDto)
       return newUser.save()
    };

    async update(userDto: UpdateUserDto, id: string): Promise<Users>{
        return this.usersModel.findByIdAndUpdate(id, userDto, {new: true})
    };

    async remove(id: string) : Promise<Users>{
        return this.usersModel.findByIdAndRemove(id)
    }
}
