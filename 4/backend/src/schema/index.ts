// Construct a schema, using GraphQL schema language
import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        getStudent(id: String!): Student
        getStudents: [Student]
        getSC(id: String!): SC
        getSCs: [SC]
        getCourse(id: String!): Course
        getCourses: [Course]
    }
    type Mutation {
        addStudent(id: String!, name: String!, age: Int!, gender: Int!, department: String!, scholarship: Boolean!): Boolean!
        updateStudent(id: String!, name: String, age: Int, gender: Int, department: String, scholarship: Boolean): Boolean!
        addSC(sid: String!, cid: String!, grade: Int!): Boolean!
        updateSC(id: String!, sid: String, cid: String, grade: Int): Boolean!
        addCourse(id: String!, name: String!, credit: Int!, prev: String): Boolean!
        updateCourse(id: String!, name: String, credit: Int, prev: String): Boolean!
        deleteStudent(id: String!): Boolean!
        deleteSC(id: String!): Boolean!
        deleteCourse(id: String!): Boolean!
    }
    type Student {
        id: String!
        name: String!
        age: Int!
        gender: Int!
        department: String!
        scholarship: Boolean!
    }
    type Course {
        id: String!
        name: String!
        credit: Int!
        prev: Course
    }
    type SC {
        id: String!
        student: Student!
        course: Course!
        grade: Int!
    }
`;
