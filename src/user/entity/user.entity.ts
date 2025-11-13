import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['email'])
export class User{


   @PrimaryGeneratedColumn()
   id: string;


   @Column()
   email: string;


   @Column()
   password: string;


}
