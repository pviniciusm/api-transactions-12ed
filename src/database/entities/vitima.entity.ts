import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "Vitima" })
export class VitimaEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    cpf: string;

    @Column()
    endereco: string;

    @CreateDateColumn({ name: "dthr_criacao" })
    dthrCriacao: Date;

    @UpdateDateColumn({ name: "dthr_atualizacao" })
    dthrAtualizacao: Date;
}
