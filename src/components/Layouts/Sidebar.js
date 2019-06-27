import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink } from "react-router-dom";
import './Sidebar.css'

const drawerWidth = 240;
const collapseDrawerWidth = 70;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  collapseDrawer: {
    [theme.breakpoints.up('md')]: {
      width: collapseDrawerWidth,
      flexShrink: 0,
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerPaper: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  collapseDrawerPaper: {
    width: collapseDrawerWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: theme.mixins.toolbar,
  margin: {
    margin: theme.spacing(1),
  }
}));
export default function Sidebar(props) {
  const { toggleCollapseMenu, collapseMenu, mobileOpen, handleDrawerToggle, container, routes } = props;
  const theme = useTheme();
  const classes = useStyles();
  const handleMobileDrawerItemClick = () => {
    if (mobileOpen) {
      handleDrawerToggle();
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <IconButton aria-label="Delete" className={classes.margin} onClick={toggleCollapseMenu}>
          {
            collapseMenu ?
              <ChevronRightIcon fontSize="default" />
              :
              <ChevronLeftIcon fontSize="default" />
          }
        </IconButton>
      </div>
      <Divider />
      <List>
        {routes.map((prop, key) => {
          return (
            <NavLink
              to={prop.path}
              className={'nav-link-item'}
              activeClassName="active"
              key={key}
            >
              <ListItem button key={prop.name} onClick={handleMobileDrawerItemClick}>
                <ListItemIcon>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText primary={prop.name} />
              </ListItem>
            </NavLink>
          );
        })
        }
      </List>
    </div>
  );
  return (
    <nav className={collapseMenu ? classes.collapseDrawer : classes.drawer} aria-label="Mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: collapseMenu ? classes.collapseDrawerPaper : classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: collapseMenu ? classes.collapseDrawerPaper : classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}