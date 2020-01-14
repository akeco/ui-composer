import React from 'react';
import { withStyles } from "@material-ui/core";
import Tabs from '../Tabs';

const styles = {
  wrapper: {
    position: 'fixed',
    width: 330,
    backgroundColor: 'var(--light-blue)',
    height: '100vh',
    top: 0,
  }
}; 

const Sidebar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Tabs />
    </div>
  )
};

export default withStyles(styles)(Sidebar);
