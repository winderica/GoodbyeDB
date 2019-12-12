import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'
import { useSnackbar } from 'notistack';

import { SC } from '../configs/types';
import { Table } from '../components/Table';
import { Progress } from '../components/Progress';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { Column, MaterialTableProps } from 'material-table';

const SCS = gql`
    {
        getSCs {
            id
            course {
                id
                name
            }
            student {
                id
                name
                gender
                age
                department
                scholarship
            }
            grade
        }
    }
`;

const ADD_SC = gql`
    mutation AddSC($cid: String!, $sid: String!, $grade: Int!) {
        addSC(cid: $cid, sid: $sid, grade: $grade)
    }
`;

const UPDATE_SC = gql`
    mutation UpdateSC($id: String!, $sid: String, $cid: String, $grade: Int) {
        updateSC(id: $id, sid: $sid, cid: $cid, grade: $grade)
    }
`;

const DELETE_SC = gql`
    mutation DeleteSC($id: String!) {
        deleteSC(id: $id)
    }
`;

interface P extends MaterialTableProps<SC> {
    level: number;
    groups: Column<SC>[];
    groupData: {
        isExpanded: boolean;
        groups: ({ value: string } & object)[];
        data: (SC & { tableData: { editing: boolean } })[];
        value: string;
    };
    path: number[];
    isTreeData: boolean;
    onGroupExpandChanged: (path: number[]) => void;
}

const GroupRow = (props: P) => {
    const { columns, options, detailPanel, actions, groups, groupData, level, components, path, onGroupExpandChanged, icons } = props;
    let colSpan = columns.filter(({ hidden }) => !hidden).length;
    options?.selection && colSpan++;
    detailPanel && colSpan++;
    actions && actions.length > 0 && colSpan++;
    const column = groups[level];

    let detail;
    if (groupData.isExpanded) {
        if (groups.length > level + 1) {
            detail = groupData.groups.map((groupData, index) => (
                components?.GroupRow && <components.GroupRow
                    {...props} // on purpose https://reactjs.org/warnings/unknown-prop.html
                    key={groupData.value || ('' + index)}
                    groupData={groupData}
                    level={level + 1}
                    path={[...path, index]}
                />
            ));
        } else {
            detail = groupData.data.map((rowData, index) => {
                if (rowData.tableData.editing) {
                    return (
                        components?.EditRow && <components.EditRow
                            {...props}
                            key={index}
                            data={rowData}
                            path={[...path, index]}
                            mode={rowData.tableData.editing}
                        />
                    );
                } else {
                    return (
                        components?.Row && <components.Row
                            {...props}
                            key={index}
                            data={rowData}
                            path={[...path, index]}
                        />
                    );
                }
            });
        }
    }

    const freeCells = [...new Array(level)].map((_, i) => <TableCell padding="checkbox" key={i} />);

    const value = groupData.value;

    const title = column.title;

    const separator = options?.groupRowSeparator || ': ';
    const grades = groupData.data.map(({ grade }) => grade || 0);
    const max = Math.max(...grades);
    const min = Math.min(...grades);
    const average = (grades.reduce((i, j) => i + j) / grades.length).toFixed(2);
    const above90 = grades.filter((i) => i >= 90).length;
    const above90Rate = (grades.filter((i) => i >= 90).length / grades.length * 100).toFixed(2) + '%';
    const below60 = grades.filter((i) => i < 60).length;
    const below60Rate = (grades.filter((i) => i < 60).length / grades.length * 100).toFixed(2) + '%';
    return (
        <>
            <TableRow>
                {freeCells}
                <TableCell
                    align='left'
                    padding="none"
                    colSpan={colSpan}
                >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <div>
                            <IconButton
                                style={{ transition: 'all ease 200ms', transform: groupData.isExpanded ? 'rotate(90deg)' : 'none' }}
                                onClick={() => onGroupExpandChanged(path)}
                            >
                                {icons?.DetailPanel && <icons.DetailPanel />}
                            </IconButton>
                            <b>{title}{separator}</b>
                            {value}
                        </div>
                        <div style={{ marginRight: 16 }}>
                            <b> Max: </b>{max}
                            <b> Min: </b>{min}
                            <b> Average: </b>{average}
                            <b> 90~: </b>{`${above90} ${above90Rate}`}
                            <b> ~60: </b>{`${below60} ${below60Rate}`}
                        </div>
                    </div>
                </TableCell>
            </TableRow>
            {detail}
        </>
    );
};


export const SCs: FC = () => {
    const { loading: querying, error: queryError, data, refetch } = useQuery<{ getSCs: SC[] }>(SCS);
    const [addSC, { loading: adding, error: addError }] = useMutation(ADD_SC);
    const [updateSC, { loading: updating, error: updateError }] = useMutation(UPDATE_SC);
    const [deleteSC, { loading: deleting, error: deleteError }] = useMutation(DELETE_SC);
    const { enqueueSnackbar } = useSnackbar();
    [queryError, addError, updateError, deleteError].forEach((error) => error && enqueueSnackbar(error.message, { variant: 'error' }));
    const rows = data?.getSCs?.map(({ student, course, ...other }) => ({
        ...other,
        studentId: student.id,
        studentName: student.name,
        gender: student.gender,
        age: student.age,
        department: student.department,
        scholarship: student.scholarship,
        courseId: course.id,
        courseName: course.name
    }));

    return (
        <>
            {(querying || adding || updating || deleting) && <Progress />}
            {rows && <Table
                title='Grades'
                options={{
                    grouping: true,
                }}
                columns={[
                    { title: 'id', field: 'id', editable: 'never', searchable: false },
                    { title: 'studentId', field: 'studentId' },
                    { title: 'studentName', field: 'studentName', editable: 'never', searchable: false },
                    {
                        title: 'gender',
                        field: 'gender',
                        editable: 'never',
                        searchable: false,
                        render: (data) => !data ? '' : data.gender ? 'Male' : 'Female'
                    },
                    { title: 'age', field: 'age', editable: 'never', searchable: false },
                    { title: 'department', field: 'department', editable: 'never', searchable: false, defaultGroupOrder: 0 },
                    { title: 'scholarship', field: 'scholarship', editable: 'never', type: 'boolean', searchable: false },
                    { title: 'courseId', field: 'courseId', searchable: false },
                    { title: 'courseName', field: 'courseName', editable: 'never', searchable: false },
                    { title: 'grade', field: 'grade', searchable: false, defaultSort: 'desc' },
                ]}
                data={rows}
                components={{
                    GroupRow: GroupRow
                }}
                editable={{
                    onRowAdd: async ({ studentId: sid, courseId: cid, grade }) => {
                        if (!sid || !cid || !grade) {
                            enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
                            return;
                        }
                        try {
                            await addSC({ variables: { cid, sid, grade: +grade } });
                            await refetch();
                        } catch (e) {
                            // eslint-disable-next-line no-empty
                        }
                    },
                    onRowDelete: async ({ id }) => {
                        try {
                            await deleteSC({ variables: { id } });
                            await refetch();
                        } catch (e) {
                            // eslint-disable-next-line no-empty
                        }
                    },
                    onRowUpdate: async ({ studentId: sid, courseId: cid, grade, id }) => {
                        if (!sid || !cid || !grade) {
                            enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
                            return;
                        }
                        try {
                            await updateSC({ variables: { id, cid, sid, grade: +grade } });
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
