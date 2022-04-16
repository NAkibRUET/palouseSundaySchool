import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Person, GridView, SupervisedUserCircle, School } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';
import { userService } from '../../../services';

const drawerWidth = 240;

export default function Sidebar() {
  const router = useRouter();
  const handleMenuRoute = (routeUrl: any) => {
    router.push(routeUrl);
  }
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button onClick={() => handleMenuRoute('/admin')}>
            <ListItemIcon>
              <GridView />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleMenuRoute('/admin/users')}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={() => handleMenuRoute('/admin/students')}>
            <ListItemIcon>
              <SupervisedUserCircle />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText primary="Teachers" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}