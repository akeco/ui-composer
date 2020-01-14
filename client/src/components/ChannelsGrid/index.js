import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 25
  },
  singleItem: {
    height: 50,
    width: 80,
    borderRadius: 3,
    backgroundSize: 'cover',
    margin: '0px 10px 10px 0px',
    '&:nth-child(3n)': {
      marginRight: 0
    }
  }
}));

const ChannelsGrid = (props) => {
  const classes = useStyle();

  const renderChannelsGrid = () => {
    return Array.apply(null, Array(20))
      .map((item, index) => (
        <div
          key={index}
          className={classes.singleItem}
          style={{background: `url(https://picsum.photos/13${index}/7${index}/?random)`}}
        />
      ));
  };

  return (
    <div className={classes.root}>
      { renderChannelsGrid() }
    </div>
  );
};

export default ChannelsGrid;
