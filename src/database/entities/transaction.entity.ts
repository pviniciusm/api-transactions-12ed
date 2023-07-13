import { Column, Entity, PrimaryColumn } from "typeorm";
import { TransactionType } from "../../models/transaction.model";

@Entity("transaction")
export class TransactionEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    value: number;

    @Column({
        enum: TransactionType,
    })
    type: string;

    @Column({
        name: "created_at",
    })
    createdAt: Date;

    @Column({
        name: "id_user",
    })
    idUser: string;
}
