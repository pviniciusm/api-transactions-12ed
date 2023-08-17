import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { TransactionEntity } from "./transaction.entity";
import { CategoryEntity } from "./category.entity";

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

    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: Date;

    @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
    transactions: TransactionEntity[];

    @ManyToMany(() => CategoryEntity)
    @JoinTable()
    categories: CategoryEntity[];
}
