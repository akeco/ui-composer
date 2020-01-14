import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import Movie from '@material-ui/icons/Movie';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import Radio from '../../../components/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    padding: 10,
    boxSizing: 'border-box',
    marginBottom: 10
  },
  singleItem: {
    padding: 7,
    marginBottom: 10,
    backgroundColor: 'var(--lighten-blue)',
    borderRadius: 3,
    cursor: 'pointer',
    color: 'white',
    fontWeight: 500,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 12,
    userSelect: 'none',
    '&:last-child': {
      marginBottom: 0
    }
  },
  title: {
    margin: 0,
    paddingLeft: 15
  },
  roundIcon: {
    backgroundColor: 'var(--lighten-blue)',
    width: 20,
    height: 20,
    borderRadius: '50%',
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > svg': {
      fill: 'white'
    }
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  paddingLeft: {
    padding: '13px 0 0 0'
  },
  borderBox: {
    width: '100%',
    boxSizing: 'border-box'
  },
  flexRight: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  disabled: {
    backgroundColor: 'var(--light-blue)'
  },
  primaryButton: {
    marginLeft: 10,
    color: 'white',
    boxShadow: 'none',
    backgroundColor: 'var(--dark-blue)',
    '&:hover': {
      backgroundColor: 'var(--darken-blue)',
    },
    '& > svg': {
      fill: 'white',
      fontSize: 20,
      marginRight: 3
    }
  },
  marginRight: {
    marginRight: 16
  },
  input: {
    display: 'none'
  },
  dragWrapper: {
    border: '1px dashed var(--light-blue)',
    borderRadius: 7,
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 250ms ease',
    backgroundColor: 'rgba(0,0,0,0.03)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)',
    }
  },
  dragDescription: {
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  },
  palettePadding: {
    marginTop: 10
  },
  details: {
    paddingBottom: 8
  }
}));

const ContentTypeCard = (props) => {
  const classes = useStyles();
  const [palette, setPallete] = useState(null);
  const { LayoutStore : { setContentType, getContentType } } = props;

  const onChange = (event) => setContentType(event.target.value);

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.flexCenter}>
          <div className={classes.roundIcon}>
            <Movie fontSize={'small'} />
          </div>
          <p className={classes.title}>Content Types</p>
        </div>
      </ExpansionPanelSummary>
      <Divider />
      <ExpansionPanelDetails className={classes.details}>
        <div>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
              aria-label="gender"
              name="gender2"
              value={getContentType}
              onChange={onChange}
            >
              <FormControlLabel
                value="VODS"
                control={<Radio color="primary" />}
                label="Movies, Channels"
              />
              <FormControlLabel
                value="channels"
                control={<Radio color="primary" />}
                label="Channels"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <div className={classNames(classes.flexRight, classes.marginRight)}>
          <Button size="small" onClick={() => setPallete(null)}>Reset</Button>
          <Button size="small" variant="contained" className={classes.primaryButton}>
            <Check  />
            Save
          </Button>
        </div>
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
};

export default inject('LayoutStore')(observer(ContentTypeCard));
