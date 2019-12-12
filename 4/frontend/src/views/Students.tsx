import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'
import { useSnackbar } from 'notistack';

import { Student } from '../configs/types';
import { Table } from '../components/Table';
import { Progress } from '../components/Progress';
import { MenuItem, Select } from '@material-ui/core';

const STUDENTS = gql`
    query {
        getStudents {
            name
            department
            gender
            age
            id
            scholarship
        }
    }
`;

const ADD_STUDENT = gql`
    mutation AddStudent($id: String!, $name: String!, $gender: Int!, $age: Int!, $department: String!, $scholarship: Boolean!) {
        addStudent(id: $id, name: $name, gender: $gender, age: $age, department: $department, scholarship: $scholarship)
    }
`;

const UPDATE_STUDENT = gql`
    mutation UpdateStudent($id: String!, $name: String, $gender: Int, $age: Int, $department: String, $scholarship: Boolean) {
        updateStudent(id: $id, name: $name, age: $age, gender: $gender, department: $department, scholarship: $scholarship)
    }
`;

const DELETE_STUDENT = gql`
    mutation DeleteStudent($id: String!) {
        deleteStudent(id: $id)
    }
`;

export const Students: FC = () => {
    const { loading: querying, error: queryError, data, refetch } = useQuery<{ getStudents: Student[] }>(STUDENTS);
    const [addStudent, { loading: adding, error: addError }] = useMutation(ADD_STUDENT);
    const [updateStudent, { loading: updating, error: updateError }] = useMutation(UPDATE_STUDENT);
    const [deleteStudent, { loading: deleting, error: deleteError }] = useMutation(DELETE_STUDENT);
    const { enqueueSnackbar } = useSnackbar();
    [queryError, addError, updateError, deleteError].forEach((error) => error && enqueueSnackbar(error.message, { variant: 'error' }));
    const rows = data?.getStudents;
    return (
        <>
            {(querying || adding || updating || deleting) && <Progress />}
            {rows && <Table
                title='Students'
                options={{
                    grouping: true
                }}
                columns={[
                    { title: 'id', field: 'id' },
                    { title: 'name', field: 'name' },
                    {
                        title: 'gender',
                        field: 'gender',
                        editComponent: ({ value, onChange }) => (
                            <Select
                                value={value}
                                onChange={({ target }) => onChange(target.value)}
                            >
                                <MenuItem value={0}>Female</MenuItem>
                                <MenuItem value={1}>Male</MenuItem>
                            </Select>
                        ),
                        render: ({ gender }) => gender ? 'Male' : 'Female',
                        initialEditValue: 1
                    },
                    { title: 'age', field: 'age' },
                    { title: 'department', field: 'department' },
                    { title: 'scholarship', field: 'scholarship', type: 'boolean', initialEditValue: false },
                ]}
                data={rows}
                editable={{
                    onRowAdd: async ({ id, name, gender, age, department, scholarship }) => {
                        if (!id || !name || !age || !department) {
                            enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
                            return;
                        }
                        try {
                            await addStudent({ variables: { id, name, gender: +gender, age: +age, department, scholarship: scholarship ?? false } });
                            await refetch();
                        } catch (e) {
                            // eslint-disable-next-line no-empty
                        }
                    },
                    onRowDelete: async ({ id }) => {
                        try {
                            await deleteStudent({ variables: { id } });
                            await refetch();
                        } catch (e) {
                            // eslint-disable-next-line no-empty
                        }
                    },
                    onRowUpdate: async ({ id, name, gender, age, department, scholarship }) => {
                        if (!id || !name || !age || !department) {
                            enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
                            return;
                        }
                        try {
                            await updateStudent({ variables: { id, name, gender: +gender, age: +age, department, scholarship } });
                            await refetch();
                        } catch (e) {
                            // eslint-disable-next-line no-empty
                        }
                    }
                }}
            />}
        </>
    );
};
