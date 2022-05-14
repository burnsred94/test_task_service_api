import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';



@Module({
  imports:[
      UsersModule,
      MongooseModule.forRoot(`mongodb+srv://Oleg:159357void@cluster0.pbng4.mongodb.net/users?retryWrites=true&w=majority`),
      AuthModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
