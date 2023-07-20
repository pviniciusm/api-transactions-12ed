import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("category")
export class CategoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;
}
