import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';



@Module({
  imports:[
      UsersModule,
      MongooseModule.forRoot(`mongodb+srv://Oleg:159357void@cluster0.pbng4.mongodb.net/users?retryWrites=true&w=majority`)
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
