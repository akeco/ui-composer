import React from 'react';
import classNames from 'classnames';
import RadioMD from '@material-ui/core/Radio';
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(() => ({
  radio: {
    color: 'var(--lighten-blue) !important'
  }
}));

const Radio = (props) => {
  const classes = useStyle();

  return (
    <RadioMD
      {...props}
      className={classNames(classes.radio, {
        [props.className]: !!props.className
      })}
    />
  );
};

export default Radio;
