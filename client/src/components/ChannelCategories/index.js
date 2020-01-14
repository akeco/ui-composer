import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() => ({
  root: {
    display: 'flex',
    marginBottom: 20
  },
  singleItem: {
    width: 80,
    height: 40,
    borderRadius: 3,
    backgroundColor: 'var(--primary)',
    color: 'var(--device-items-title)',
    marginRight: 10,
    fontSize: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    '&:nth-child(3)': {
      marginRight: 0
    }
  }
}));

const ChannelCategories = (props) => {
  const classes = useStyle();

  const renderSingleCategory = () => {
    return Array.apply(null, Array(3))
      .map((item, index) => (
        <div key={index} className={classes.singleItem}>
          Category { index + 1 }
        </div>
      ));
  };

  return (
    <div className={classes.root}>
      { renderSingleCategory() }
    </div>
  );
};

export default ChannelCategories;
