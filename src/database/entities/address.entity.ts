import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("address")
export class AddressEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    street: string;

    @Column()
    number: number;

    @Column({
        length: 9,
        name: "zip_code",
    })
    zipCode: string;

    @Column()
    city: string;

    // @Column({
    //     name: "id_user"
    // })
    // idUser: string;

    @OneToOne(() => UserEntity)
    @JoinColumn({
        name: "id_user",
    })
    user: UserEntity;
}
