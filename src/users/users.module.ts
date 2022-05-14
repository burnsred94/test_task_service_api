import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { Users , UserSchema } from "./schemas/users.schemas";
import { AuthModule } from "../auth/auth.module";

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports : [
        MongooseModule.forFeature([
            {name : Users.name , schema : UserSchema}
        ]),
        forwardRef(() => AuthModule)
    ],
    exports : [UsersService]

})
export class UsersModule {}
