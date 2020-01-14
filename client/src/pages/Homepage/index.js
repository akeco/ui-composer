import React from 'react';
import { withStyles } from "@material-ui/core";
import Sidebar from '../../containers/Sidebar';
import DesktopScreen from '../../components/Screens/DesktopScreen';
import MobileScreen from '../../components/Screens/MobileScreen';
import { observer, inject } from 'mobx-react';

const styles = {
  root: {
    display: 'flex'
  },
  paddedBlock: {
    paddingLeft: 300,
    flexGrow: 1,
    paddingTop: 48
  }
};

const Homepage = (props) => {
  const { classes, ScreensStore } = props;
  const screen = ScreensStore.getSelectedScreen;

  const getScreen = () => {
    switch (screen) {
      case 'desktop': return <DesktopScreen />;
      case 'mobile': return <MobileScreen />;
      default: return null;
    }
  };

  return (
      <div className={classes.root}>
          <Sidebar />
          <div className={classes.paddedBlock}>
            {
              getScreen()
            }
          </div>
      </div>
  )
};

export default withStyles(styles)(inject('ScreensStore')(observer(Homepage)));
