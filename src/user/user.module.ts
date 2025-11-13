import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
 imports: [TypeOrmModule.forFeature([User]),
 JwtModule.registerAsync({
   imports: [ConfigModule],
   inject: [ConfigService],
   useFactory: (configService: ConfigService) => ({
     secret: configService.get<string>('JWT_SECRET'),
     signOptions: {expiresIn: '1h'} //determinar a hora que vai durar o "token"
   })
 })
],
 controllers: [UserController],
 providers: [UserService]
})
export class UserModule {}