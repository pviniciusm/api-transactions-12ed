import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CrimeEntity } from "./crime.entity";
import { VitimaEntity } from "./vitima.entity";

@Entity({ name: "ocorrencia" })
export class OcorrenciaEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "id_vitima" })
    idVitima: string;

    @Column({ name: "id_crime" })
    idCrime: string;

    @Column({
        name: "dt_ocorrencia",
        type: "date",
    })
    dtOcorrencia: Date;

    @CreateDateColumn()
    dthrCriacao: Date;

    @UpdateDateColumn()
    dthrAtualizacao: Date;

    @ManyToOne(() => CrimeEntity)
    @JoinColumn({ name: "id_crime" })
    crime: CrimeEntity;

    @ManyToOne(() => VitimaEntity)
    @JoinColumn({ name: "id_vitima" })
    vitima: VitimaEntity;
}
