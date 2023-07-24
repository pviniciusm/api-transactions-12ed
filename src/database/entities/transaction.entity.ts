import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { TransactionType } from "../../app/models/transaction.model";
import { UserEntity } from "./user.entity";

@Entity("transaction")
export class TransactionEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    value: number;

    @Column({
        length: 60,
        nullable: true,
    })
    estabelecimento: string;

    @Column({
        enum: TransactionType,
    })
    type: string;

    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: Date;

    @Column({
        name: "id_user",
    })
    idUser: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: "id_user",
    })
    user: UserEntity;
}
