import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PhoneIphone from '@material-ui/icons/PhoneIphone';
import Tv from '@material-ui/icons/Tv';
import LaptopMac from '@material-ui/icons/LaptopMac';
import { observer, inject } from 'mobx-react';

const styles = {
  root: {
    flexGrow: 1,
    position: 'fixed',
    zIndex: 1,
    width: 'calc(100% - 330px)',
    right: 0
  },
  menuButton: {
    //marginLeft: -18,
    //marginRight: 10,
  },
  background: {
    backgroundColor: 'var(--dark-blue)',
  },
  toolbar: {
    display: 'flex'
  },
  pushRight: {
    marginLeft: 'auto'
  }
};

const Header = props => {
  const { classes, ScreensStore } = props;
  const setScreen = (screenType) => {
    ScreensStore.setSelectedScreen(screenType)
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.background}>
        <Toolbar className={classes.toolbar} variant="dense">
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <IconButton
            className={classNames(classes.menuButton, classes.pushRight)}
            color="inherit"
            onClick={() => setScreen('mobile')}
          >
            <PhoneIphone />
          </IconButton>
          <IconButton className={classes.menuButton} color="inherit">
            <Tv />
          </IconButton>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={() => setScreen('desktop')}
          >
            <LaptopMac />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(inject('ScreensStore')(observer(Header)));
