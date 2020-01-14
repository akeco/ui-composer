import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ColorsCard from "../../Cards/ColorsCard";
import PaletteRecognizerCard from "../../Cards/PaletteRecognizerCard";

const useStyle = makeStyles(() => ({
  tabContainer: {
    width: '100%',
    padding: 10,
    paddingTop: 68,
    boxSizing: 'border-box'
  },
}));

const ColorsTab = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.tabContainer}>
      <ColorsCard />
      <PaletteRecognizerCard />
    </div>
  )
};

export default ColorsTab;
