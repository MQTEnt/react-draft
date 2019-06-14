import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Dehaze';

import Sidebar from './Sidebar';
import AdminAppBar from './AdminAppBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fab: {
    margin: theme.spacing(1),
    position: 'absolute',
    bottom: '5%'
  },
}));

export default function Main() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapseMenu, setCollapseMenu] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const toggleCollapseMenu = () => {
    setCollapseMenu(!collapseMenu);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <div>
        <Fab color="primary" aria-label="Menu" className={classes.fab} onClick={handleDrawerToggle}>
          <MenuIcon/>
        </Fab>
      </div>

      <AdminAppBar collapseMenu={collapseMenu}/>
      
      <Sidebar toggleCollapseMenu={toggleCollapseMenu} collapseMenu={collapseMenu} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam.
        </Typography>
      </main>
    </div>
  );
}

Main.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};