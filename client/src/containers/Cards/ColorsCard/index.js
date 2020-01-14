import React, { useState } from 'react';
import classNames from 'classnames';
import PaletteIcon from '@material-ui/icons/Palette';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Radio from '../../../components/Radio';
import Palette from '../../../components/Palette';

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
  }
}));

const ColorsCard = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const { ColorsStore: { setSelectedColors, resetSelectedColors } } = props;
  const colors = [
    ['#689EB8', '#F3F4F6', '#A79B94', '#FF5A60'],
    ['#161718', '#fafafb', '#208fd5', '#d1565b'],
    ['#003B46', '#C4DFE6', '#07575B', '#66A5AD'],
    ['#00293C', '#F1F3CE', '#1E656D', '#F62A00'],
    ['#1E1F26', '#D0E1F9', '#283655', '#4D648D'],
    ['#007D75', '#FCD2A8', '#529A86', '#EC6778'],
    ['#495159', '#A1E8CC', '#000000', '#F2CDC8'],
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
    setSelectedColors(colors[event.target.value]);
  };

  const getPalettes = () => {
    return colors.map((item, index) => (
      <Palette colors={item} key={index}>
        <Radio
          checked={value == index}
          onChange={handleChange}
          value={index}
          name="radio-button-demo"
          aria-label="A"
        />
      </Palette>
    ));
  };

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.flexCenter}>
          <div className={classes.roundIcon}>
            <PaletteIcon fontSize={'small'} />
          </div>
          <p className={classes.title}>Themes</p>
        </div>
      </ExpansionPanelSummary>
      <Divider />
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.flexRight}>
          <div className={classNames(classes.paddingLeft, classes.borderBox)}>
            {
              getPalettes()
            }
          </div>
        </div>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <div className={classNames(classes.flexRight, classes.marginRight)}>
          <Button size="small" onClick={() => {
            setValue(null);
            resetSelectedColors();
          }}>Reset</Button>
          <Button size="small" variant="contained" className={classes.primaryButton}>
            <Check  />
            Save
          </Button>
        </div>
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
};

export default inject('ColorsStore')(observer(ColorsCard));
