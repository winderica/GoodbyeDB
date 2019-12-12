import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { SC } from "./SC";
import { Min, Max, IsIn } from "class-validator";

@Entity()
export class Student extends BaseEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    @IsIn([0, 1])
    gender: number;

    @Column()
    @Min(0)
    @Max(100)
    age: number;

    @Column()
    department: string;

    @Column()
    scholarship: boolean;

    @OneToMany(() => SC, ({ student }) => student)
    courses: SC[];
}
