import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ContentTypeCard from "../../Cards/ContentTypeCard";
import LayoutCard from "../../Cards/LayoutCard";

const useStyle = makeStyles(() => ({
  tabContainer: {
    width: '100%',
    padding: 10,
    paddingTop: 68,
    boxSizing: 'border-box'
  },
}));

const LayoutTab = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.tabContainer}>
      <ContentTypeCard />
      <LayoutCard />
    </div>
  )
};

export default LayoutTab;
