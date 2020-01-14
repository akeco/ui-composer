import React from 'react';
import classNames from 'classnames';
import Info from '@material-ui/icons/Info';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
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
  primaryButton: {
    marginLeft: 10,
    color: 'white',
    boxShadow: 'none',
    backgroundColor: 'var(--dark-blue)',
    '&:hover': {
      backgroundColor: 'var(--darken-blue)',
    },
    '& svg': {
      fill: 'white',
      fontSize: 20,
      marginRight: 5
    }
  },
  textField: {
    width: '100%',
    '& input': {
      fontSize: '14px !important',
      padding: '10.5px 10px !important'
    },
    '& div[class*="focused"]': {
      '& fieldset': {
        borderColor: 'var(--lighten-blue) !important'
      },
    },
    '& label': {
      fontSize: '14px !important',
      '&[class*="focused"]': {
        color: 'var(--lighten-blue) !important'
      }
    }
  },
  bottom: {
    marginBottom: 18
  }
}));

const MainContentCard = () => {
  const classes = useStyles();
  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.flexCenter}>
          <div className={classes.roundIcon}>
            <Info fontSize={'small'} />
          </div>
          <p className={classes.title}>App Details</p>
        </div>
      </ExpansionPanelSummary>
      <Divider />

      <ExpansionPanelDetails style={{ padding: 16 }}>
        <div className={classes.fieldsWrapper}>
          <TextField
            label="Enter app name"
            className={classNames(classes.textField, classes.bottom)}
            variant="outlined"
          />
          <TextField
            label="Enter socket domain"
            className={classes.textField}
            variant="outlined"
          />
        </div>
      </ExpansionPanelDetails>

      <Divider />
      <ExpansionPanelActions>
        <div className={classNames(classes.flexRight, classes.marginRight)}>
          <Button
            size="small"
          >Reset</Button>
          <Button size="small" variant="contained" className={classes.primaryButton}>
            <Check />
            Save
          </Button>
        </div>
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
}

export default MainContentCard;
