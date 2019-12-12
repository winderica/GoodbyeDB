import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Min, Max } from 'class-validator';
import { SC } from "./SC";

@Entity()
export class Course extends BaseEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    @Min(0)
    @Max(10)
    credit: number;

    @OneToMany(() => SC, ({ course }) => course)
    students: SC[];

    @ManyToOne(() => Course)
    @JoinColumn()
    prev: Course;
}
