import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/styles";
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles(() => ({
  wrapper: {
    maxWidth: 225,
    paddingTop: 30
  },
  button: {
    boxShadow: 'none',
    marginRight: 10,
    marginBottom: 10,
    minWidth: 90,
    fontSize: 12,
    borderRadius: 3
  },
  contained: {
    backgroundColor: 'var(--dark-blue)',
    color: 'white',
    border: '1px solid transparent',
    '&:hover': {
      backgroundColor: 'var(--dark-blue)',
    }
  },
  outlined: {
    border: '1px solid var(--dark-blue)',
    color: 'var(--dark-blue)'
  },
  title: {
    fontWeight: 500,
    color: 'rgba(0,0,0,0.8)',
    marginBottom: 20
  }
}));

const PageSelection = (props) => {
  const classes = useStyles();
  const { ScreensStore: { setSelectedPage, getSelectedPage } } = props;

  const renderButton = (value, name, onClick) => (
    <Button
      className={classNames(classes.button, getSelectedPage === name ? classes.contained : classes.outlined)}
      size="small"
      onClick={onClick}
    >
      { value }
    </Button>
  );

  return (
    <div className={classes.wrapper}>
      <h4 className={classes.title}>Pages / Activities</h4>
      <div>
        { renderButton('Home', 'homePage',  () => setSelectedPage('homePage')) }
        { renderButton('Details', 'detailsPage', () => setSelectedPage('detailsPage')) }
        { renderButton('Player', 'playerPage', () => setSelectedPage('playerPage')) }
        { renderButton('Grid', 'gridPage', () => setSelectedPage('gridPage')) }
        { renderButton('Account', 'accountPage', () => setSelectedPage('accountPage')) }
        { renderButton('EPG', 'epgPage', () => setSelectedPage('epgPage')) }
        { renderButton('Login', 'loginPage', () => setSelectedPage('loginPage')) }
        { renderButton('Register', 'registerPage', () => setSelectedPage('registerPage')) }
      </div>
    </div>
  );
};

export default inject('ScreensStore')(observer(PageSelection));
