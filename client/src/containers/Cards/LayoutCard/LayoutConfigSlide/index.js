import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const useStyle = makeStyles((theme) => ({
  smallButton: {
    padding: 6
  },
  paddingBlock: {
    padding: '8px 24px 24px',
    display: 'flex'
  },
  textBlock: {
    display: 'flex',
    '& > svg': {
      marginLeft: 'auto'
    }
  },
  paragraph: {
    fontSize: 14,
    margin: 0,
    '& > span': {
      fontWeight: 500
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
  buttonWrapper: {
    marginLeft: -15
  },
  fieldsWrapper: {
    flexGrow: 1,
    paddingLeft: 15
  },
  checkbox: {
    '& svg': {
      fill: 'var(--lighten-blue) !important'
    }
  },
  customSwitch: {
    '& span[class*="checked"]': {
      '& span[class*="MuiSwitch-icon"]': {
        color: 'var(--lighten-blue) !important'
      },
    },
    '& span[class*="MuiSwitch-bar"]': {
      backgroundColor: 'var(--lighten-blue) !important'
    },
  }
}));

const LayoutConfigSlide = (props) => {
  const {
    setSelectedItemIndex,
    selectedItemIndex,
    LayoutStore: {
      setDisableToggleItem,
      getLayoutOrder,
      setChangeColumns,
      setChangeTitle,
      setItemTitleVisibility
    }
  } = props;
  const selectedItem = getLayoutOrder[selectedItemIndex];
  const classes = useStyle();

  const handleTitleChange = (e) => {
    setChangeTitle(e.target.value, selectedItemIndex)
  };

  const handleColumnsChange = (e) => {
    setChangeColumns(e.target.value, selectedItemIndex);
  };

  return (
    <div className={classes.paddingBlock}>
      <span className={classes.buttonWrapper}>
        <IconButton className={classes.smallButton} onClick={() => setSelectedItemIndex(null)}>
        <ArrowBack fontSize={'small'} />
      </IconButton>
      </span>
      <div className={classes.fieldsWrapper}>
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          value={get(selectedItem, 'title') || ''}
          onChange={handleTitleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="columns"
          label="Columns number"
          value={get(selectedItem, 'columns')}
          onChange={handleColumnsChange}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!!get(selectedItem, 'showItemTitle')}
              value="showItemTitle"
              className={classes.checkbox}
              onChange={() => setItemTitleVisibility(selectedItemIndex)}
            />
          }
          label="Show Item Title"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="pagination"
              className={classes.checkbox}
            />
          }
          label="Pagination"
        />
        <FormControlLabel
          control={
            <Switch
              value="disabled"
              checked={!!get(selectedItem, 'disabled')}
              className={classes.customSwitch}
              onChange={() => setDisableToggleItem(selectedItemIndex)}
            />
          }
          label="Disabled"
        />
      </div>
    </div>
  );
};

LayoutConfigSlide.propTypes = {
  selectedItemIndex: PropTypes.number,
  setSelectedItemIndex: PropTypes.func.isRequired,
};

export default inject('LayoutStore')(observer(LayoutConfigSlide));
