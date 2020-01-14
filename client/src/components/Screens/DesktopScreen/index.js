import React from 'react';
import classNames from 'classnames';
import DesktopShape from '../../../assets/images/laptop.svg';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    //flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    marginTop: 40,
    position: 'relative',
    height: 'calc(100vw - 790px)',
    overflow: 'scroll',
    width: 'calc(100vw - 500px)',
    maxWidth: 'calc(100vw - 650px)',
  },
  highLighted: {
    backgroundColor: 'var(--lighten-blue)',
    width: 'calc(100% - 40px)',
    height: 400,
    minHeight: 400,
    borderRadius: 3,
    marginBottom: 30
  },
  singleItem: {
    backgroundColor: 'var(--lighten-blue)',
    borderRadius: 3,
    flexGrow: 1,
    height: 120,
    margin: '0 10px',
    '&:first-child': {
      marginLeft: 0
    },
    '&:last-child': {
      marginRight: 0
    }
  },
  horizontalList: {
    width: 'calc(100% - 40px)',
    marginBottom: 40
  },
  itemsContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 500
  },
  img: {
    width: 'calc(100vw - 500px)',
    maxWidth: 'calc(100vw - 650px)',
    position: 'fixed',
    pointerEvents: 'none',
    marginTop: -20
  },
}));

const generateHorizontalContent = (title) => {
  const classes = useStyles();

  const getHorizontalList = () => {
    return Array.apply(null, Array(5)).map((item, index) => <div key={index} className={classes.singleItem} />);
  };

  return (
    <div className={classes.horizontalList}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.itemsContainer}>
        { getHorizontalList() }
      </div>
    </div>
  )
};

const DesktopScreen = (props) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.root)}>
      <img className={classes.img} src={DesktopShape} alt="" />
      <div className={classes.highLighted} />
      { generateHorizontalContent('Latest Movies') }
      { generateHorizontalContent('Latest Tv Shows') }
    </div>
  );
};

export default DesktopScreen;
