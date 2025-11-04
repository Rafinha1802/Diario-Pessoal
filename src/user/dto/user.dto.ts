import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class UserDto{


   @IsNotEmpty({message:'O e-mail não pode ser vazio.'})
   @IsEmail({},{message:'forneça um e-mail válido.'})
   email: string;


   @IsNotEmpty({message: 'A senha não pode ser vazia.'})
   @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres.'})
   password: string;
}
