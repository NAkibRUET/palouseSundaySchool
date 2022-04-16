import { Box, CssBaseline } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import Header from './Header';
import Sidebar from './SideBar';


const AdminLayout = (props: { children: JSX.Element; }) => {
  const { children } = props;
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar/>
          {children}
        </Box>
      </Box>
    </>
  )
}

export default AdminLayout;