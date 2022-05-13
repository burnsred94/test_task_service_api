import { Module } from '@nestjs/common';
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Users , UserSchema } from "./schemas/users.schemas";

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports : [
        MongooseModule.forFeature([
            {name : Users.name , schema : UserSchema}
        ])
    ]
})
export class UsersModule {}
