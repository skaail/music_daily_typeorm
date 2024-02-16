import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('album')
export class Album {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    banda: string

    @Column()
    capa: string

    @Column({nullable: true,})
    nota?: number 
}