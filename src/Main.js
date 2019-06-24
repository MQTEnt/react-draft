import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Dehaze';

import Sidebar from './components/Layouts/Sidebar';
import AdminAppBar from './components/Layouts/AdminAppBar';
import { Switch, Route } from "react-router-dom";
import routes from './routes';

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          component={prop.component}
          key={key}
        />
      );
    })}
  </Switch>
);

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
      
      <Sidebar
        routes={routes}
        toggleCollapseMenu={toggleCollapseMenu} 
        collapseMenu={collapseMenu} 
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}/>

      <main className={classes.content}>
        <div className={classes.toolbar} />

        {/* Page Content */}
        <div>{switchRoutes}</div>
        
      </main>
    </div>
  );
}

Main.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};