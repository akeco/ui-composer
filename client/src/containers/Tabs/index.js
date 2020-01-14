import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import LayoutTab from '../Tabs/LayoutTab';
import ColorsTab from '../Tabs/ColorsTab';
import ContentTab from '../Tabs/ContentTab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'scroll',
    height: '100%',
  },
  appBar: {
    backgroundColor: 'var(--darken-blue)',
  },
  tab: {
    flexGrow: 1,
    minWidth: 110,
  },
  tabContainer: {
    width: '100%',
    padding: 10,
    paddingTop: 68,
    boxSizing: 'border-box'
  },
  fixedTabs: {
    position: 'fixed',
    zIndex: 1,
  },
  width: {
    width: 330
  }
}));

const TabsComponent = (props) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <div className={classes.fixedTabs}>
        <AppBar position="static" className={classes.appBar}>
          <Tabs value={value} className={classes.tabs} onChange={handleChange}>
            <Tab className={classes.tab} label="Content" />
            <Tab className={classes.tab} label="Layout" />
            <Tab className={classes.tab} label="Colors" />
          </Tabs>
        </AppBar>
      </div>
      <SwipeableViews
        axis={'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.width}
      >
        <ContentTab />
        <LayoutTab />
        <ColorsTab />
      </SwipeableViews>
    </div>
  );
};

export default TabsComponent;
