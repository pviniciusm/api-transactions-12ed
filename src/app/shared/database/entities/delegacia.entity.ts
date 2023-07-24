import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "delegacia" })
export class DelegaciaEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @Column()
    telefone: string;

    @CreateDateColumn()
    dthrCriacao: Date;

    @UpdateDateColumn()
    dthrAtualizacao: Date;
}
