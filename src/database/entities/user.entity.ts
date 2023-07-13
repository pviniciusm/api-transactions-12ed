import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("user")
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    cpf: number;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @Column({
        name: "created_at",
    })
    createdAt: Date;
}
