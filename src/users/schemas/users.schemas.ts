import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type UsersDocument = Users & Document

@Schema()
export class Users {

    @Prop()
    email: string

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(Users)