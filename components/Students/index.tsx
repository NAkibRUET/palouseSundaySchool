/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AdminLayout from '../DashboardLayout';
import { studentService } from '../../services';
import { User } from '../../models/UserModel';
import { ResponseCode } from '../../constants/error-code';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { Create } from '@mui/icons-material';
import { useRouter } from 'next/router';

const columnData = [
  { id: 'count', disablePadding: false, label: '#' },
  { id: 'name', disablePadding: false, label: 'Name' },
  { id: 'birthDay', disablePadding: false, label: 'Date of Birth' }
];

function TableHeader(props: any) {
  
  const { order, orderBy } = props;
  return (
    <TableHead style={{ boxShadow: '0px 7px 15px -13px rgba(0,0,0,0.59)' }}>
      <TableRow>
        {props.columnData.map((column: any) => {
          return (
            <TableCell
              key={column.id}
              //numeric={column.numeric ? column.numeric : null}
              padding={column.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === column.id ? order : false}>
              {column.label}
              {/* <Tooltip
                title="Sort"
                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={() => props.onRequestSort(column.id)}
                  style={{ fontWeight: 'bold' }}>
                  {column.label}
                </TableSortLabel>
              </Tooltip> */}
            </TableCell>
          );
        })}
        <TableCell style={{ fontWeight: 'bold' }} align="center">
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

function BasicTable(props: any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeader columnData={props.columnData} />
        <TableBody>
          {props.rows.map((row: any, index: any) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                {index + 1}
              </TableCell>
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell>{row.birthday}</TableCell>
              <TableCell align='center'>
                <IconButton size="small" color="primary">
                  <Create />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default function StudentComponent() {
  const router = useRouter();
  const [studentList, setStudentList] = useState<User[]>([]);
  useEffect(() => {
    studentService.getAll().then(response => {
      if (response.code == ResponseCode.OK) {
        setStudentList(response.data);
        //console.log(response.data);
        //console.log(studentList);
      }
    });
  }, []);

  return (
    <AdminLayout>
      <div>
        <BasicTable rows={studentList} columnData={columnData} />
        <Fab color="primary" aria-label="add" style={{position: 'fixed', right:20, bottom: 20}} onClick={()=> router.push('/admin/students/add')}>
          <AddIcon />
        </Fab>
      </div>
    </AdminLayout>
  );
}
