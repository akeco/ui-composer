import React from 'react';
import AppDetailsCard from "../../Cards/AppDetailsCard";
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() => ({
  tabContainer: {
    width: '100%',
    padding: 10,
    paddingTop: 68,
    boxSizing: 'border-box'
  },
}));

const ContentTab = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.tabContainer}>
      <AppDetailsCard />
    </div>
  )
};

export default ContentTab;