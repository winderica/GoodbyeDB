import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Student } from "./Student";
import { Course } from "./Course";
import { Max, Min } from "class-validator";

@Entity()
@Unique(['student', 'course'])
export class SC extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Student, ({ courses }) => courses, { nullable: false, onDelete: 'CASCADE' })
    student!: Student;

    @ManyToOne(() => Course, ({ students }) => students, { nullable: false, onDelete: 'CASCADE' })
    course!: Course;

    @Column()
    @Min(0)
    @Max(100)
    grade: number;
}
