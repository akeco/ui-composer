import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    '&:last-child': {
      marginBottom: -15
    }
  },
  color: {
    width: 25,
    height: 25,
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,0.1)'
  },
  moveTop: {
    marginTop: -11,
  }
}));

const Palette = (props) => {
  const { colors } = props;
  const classes = useStyles();

  const generatePalette = () => {
    return colors.map((item, index) => {
      return <div key={index} className={classes.color} style={{ backgroundColor: item }} />;
    });
  };

  if(!colors) return null;

  return (
    <div className={classes.root}>
      <span className={classes.moveTop}>
        { props.children }
      </span>
      { generatePalette() }
    </div>
  )
};

Palette.propTypes = {
  colors: PropTypes.array
};

export default Palette;
