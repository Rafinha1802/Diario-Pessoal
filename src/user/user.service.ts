import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';




@Injectable()
export class UserService {


   constructor( @InjectRepository(User) private userRepository: Repository<User>){}


   async create(UserDto: UserDto): Promise<User>{
       const {email, password} = UserDto;


       const userExists = await this.userRepository.findOne({where: {email}});
       if(userExists){
           throw new ConflictException('Este e-mail já está em uso.')
       }


       const salt = await bcrypt.genSalt();
       const hashedPassword = await bcrypt.hash(password, salt);


       const user = this.userRepository.create({
           email,
           password: hashedPassword,
       });


       try {
           await this.userRepository.save(user);
           return user;
       } catch (error){
           throw new InternalServerErrorException('Erro ao salvar o usuário.')
       }
   }
}


