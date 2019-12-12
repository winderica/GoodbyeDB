import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Course } from '../configs/types';
import { Table } from '../components/Table';
import { Progress } from '../components/Progress';
import { useSnackbar } from 'notistack';

const COURSES = gql`
    query {
        getCourses {
            id
            name
            credit
            prev {
                id
            }
        }
    }
`;

const ADD_COURSE = gql`
    mutation AddCourse($id: String!, $name: String!, $credit: Int!, $prev: String) {
        addCourse(id: $id, name: $name, credit: $credit, prev: $prev)
    }
`;

const UPDATE_COURSE = gql`
    mutation UpdateCourse($id: String!, $name: String, $credit: Int, $prev: String) {
        updateCourse(id: $id, name: $name, credit: $credit, prev: $prev)
    }
`;

const DELETE_COURSE = gql`
    mutation DeleteCourse($id: String!) {
        deleteCourse(id: $id)
    }
`;

export const Courses: FC = () => {
    const { loading: querying, error: queryError, data, refetch } = useQuery<{ getCourses: Course[] }>(COURSES);
    const [addCourse, { loading: adding, error: addError }] = useMutation(ADD_COURSE);
    const [updateCourse, { loading: updating, error: updateError }] = useMutation(UPDATE_COURSE);
    const [deleteCourse, { loading: deleting, error: deleteError }] = useMutation(DELETE_COURSE);
    const { enqueueSnackbar } = useSnackbar();
    [queryError, addError, updateError, deleteError].forEach((error) => error && enqueueSnackbar(error.message, { variant: 'error' }));
    const rows = data?.getCourses?.map(({ prev, ...other }) => ({ ...other, prevId: prev?.id }));
    return (
        <>
            {(querying || adding || updating || deleting) && <Progress />}
            {rows && <Table
                title='Courses'
                options={{
                    grouping: true
                }}
                columns={[
                    { title: 'id', field: 'id' },
                    { title: 'name', field: 'name' },
                    { title: 'credit', field: 'credit' },
                    { title: 'prevId', field: 'prevId' },
                ]}
                data={rows}
                editable={{
                    onRowAdd: async ({ id, prevId, name, credit }) => {
                        if (!id || !credit || !name) {
                            enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
                            return;
                        }
                        try {
                            await addCourse({ variables: { id, name, credit: +credit, prev: prevId } });
                            await refetch();
                        } catch (e) {
                            // eslint-disable-next-line no-empty
                        }
                    },
                    onRowDelete: async ({ id }) => {
                        try {
                            await deleteCourse({ variables: { id } });
                            await refetch();
                        } catch (e) {
                            // eslint-disable-next-line no-empty
                        }
                    },
                    onRowUpdate: async ({ id, prevId, name, credit }) => {
                        if (!id || !credit || !name) {
                            enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
                            return;
                        }
                        try {
                            await updateCourse({ variables: { id, name, credit: +credit, prev: prevId } });
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
