import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
    BeforeRemove,
} from "typeorm";
import { OcorrenciaEntity } from "./ocorrencia.entity";
import { DelegaciaEntity } from "./delegacia.entity";

@Entity({ name: "crime" })
export class CrimeEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: "num_bo",
    })
    numBo: number;

    @Column({
        nullable: true,
    })
    local: string;

    @Column()
    descricao: string;

    @Column({
        name: "crime_delegacia",
    })
    crimeDelegacia: string;

    @CreateDateColumn({ name: "dthr_criacao" })
    dthrCriacao: Date;

    @UpdateDateColumn({ name: "dthr_atualizacao" })
    dthrAtualizacao: Date;

    @OneToMany(() => OcorrenciaEntity, (ocorrencia) => ocorrencia.crime)
    ocorrencias: OcorrenciaEntity[];

    @ManyToOne(() => DelegaciaEntity)
    @JoinColumn({ name: "crime_delegacia" })
    delegacia: DelegaciaEntity;

    @BeforeInsert()
    public beforeCreate() {
        this.dthrCriacao = new Date();
    }

    @BeforeUpdate()
    public beforeUpdate() {
        this.dthrAtualizacao = new Date();
    }

    @BeforeRemove()
    public beforeDelete() {
        console.log(`O crime ${this.id} será excluído`);
    }
}
