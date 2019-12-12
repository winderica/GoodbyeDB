export interface Student {
    name: string;
    department: string;
    gender: number;
    age: number;
    id: string;
    scholarship: boolean;
}

export interface Course {
    id: string;
    name: string;
    credit: number;
    prev?: {
        id: string;
    };
}

export interface SC {
    id: string;
    student: Partial<Student>;
    course: Partial<Course>;
    grade: number;
}
