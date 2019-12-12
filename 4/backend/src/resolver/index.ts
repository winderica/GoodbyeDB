import { Course, SC, Student } from "../entity";
import { IResolvers } from "graphql-tools";
import { Connection } from "typeorm";
import { validate } from "class-validator";
import { UserInputError } from "apollo-server-express";

// Provide resolver functions for your schema fields
export const getResolvers = (connection: Connection) => {
    const studentRepo = connection.getRepository(Student);
    const scRepo = connection.getRepository(SC);
    const courseRepo = connection.getRepository(Course);
    const resolvers: IResolvers = {
        Mutation: {
            addStudent: async (source, { id, age, department, gender, name, scholarship }) => {
                if (await studentRepo.findOne(id)) {
                    throw new UserInputError('Record already exists!');
                }
                const student = studentRepo.create({
                    id,
                    age,
                    department,
                    gender,
                    name,
                    scholarship
                });
                const errors = await validate(student);
                if (errors.length > 0) {
                    throw new UserInputError('Validation failed!', errors);
                }
                await student.save();
                return true;
            },
            updateStudent: async (source, { id, age, department, gender, name, scholarship }) => {
                const student = await studentRepo.findOne(id);
                if (!student) {
                    throw new UserInputError('Record does not exist!');
                }
                studentRepo.merge(student, {
                    age,
                    department,
                    gender,
                    name,
                    scholarship
                });
                const errors = await validate(student);
                if (errors.length > 0) {
                    throw new UserInputError('Validation failed!', errors);
                }
                await studentRepo.save(student);
                return true;
            },
            deleteStudent: async (source, { id }) => {
                await studentRepo.delete({ id });
                return true;
            },
            addSC: async (source, { sid, cid, grade }) => {
                if (await scRepo.findOne({ where: { student: { id: sid }, course: { id: cid } } })) {
                    throw new UserInputError('Record already exists!');
                }
                const sc = scRepo.create({
                    course: await courseRepo.findOne(cid),
                    student: await studentRepo.findOne(sid),
                    grade
                });
                const errors = await validate(sc);
                if (errors.length > 0) {
                    throw new UserInputError('Validation failed!', errors);
                }
                await sc.save();
                return true;
            },
            updateSC: async (source, { id, sid, cid, grade }) => {
                const sc = await scRepo.findOne(id);
                if (!sc) {
                    throw new UserInputError('Record does not exist!');
                }
                scRepo.merge(sc, {
                    course: await courseRepo.findOne(cid),
                    student: await studentRepo.findOne(sid),
                    grade
                });
                const errors = await validate(sc);
                if (errors.length > 0) {
                    throw new UserInputError('Validation failed!', errors);
                }
                await scRepo.save(sc);
                return true;
            },
            deleteSC: async (source, { id }) => {
                await scRepo.delete({ id });
                return true;
            },
            addCourse: async (source, { id, name, credit, prev }) => {
                if (await courseRepo.findOne(id)) {
                    throw new UserInputError('Record already exists!');
                }
                const prerequisite = await courseRepo.findOne(prev);
                if (prev && !prerequisite) {
                    throw new UserInputError('Validation failed!');
                }
                const course = courseRepo.create({
                    id,
                    name,
                    credit,
                    prev: prerequisite
                });
                const errors = await validate(course);
                if (errors.length > 0) {
                    throw new UserInputError('Validation failed!', errors);
                }
                await course.save();
                return true;
            },
            updateCourse: async (source, { id, name, credit, prev }) => {
                const course = await courseRepo.findOne(id);
                if (!course) {
                    throw new UserInputError('Record does not exist!');
                }
                courseRepo.merge(course, {
                    id,
                    name,
                    credit,
                    prev: await courseRepo.findOne(prev)
                });
                const errors = await validate(course);
                if (errors.length > 0) {
                    throw new UserInputError('Validation failed!', errors);
                }
                await courseRepo.save(course);
                return true;
            },
            deleteCourse: async (source, { id }) => {
                await courseRepo.delete({ id });
                return true;
            },
        },
        Query: {
            getStudent: (source, { id }) => {
                return studentRepo.findOne(id);
            },
            getStudents: () => {
                return studentRepo.find();
            },
            getSC: (source, { id }) => {
                return scRepo.findOne(id, { relations: ["student", "course"] });
            },
            getSCs: () => {
                return scRepo.find({ relations: ["student", "course"] });
            },
            getCourse: (source, { id }) => {
                return courseRepo.findOne(id, { relations: ["prev"] });
            },
            getCourses: () => {
                return courseRepo.find({ relations: ["prev"] });
            },
        },
    };
    return resolvers;
};
