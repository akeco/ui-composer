import React, { useState, useCallback } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Image from '@material-ui/icons/Image';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Palette from '../../../components/Palette';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { useDropzone } from 'react-dropzone'

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
}));

const PaletteRecognizerCard = (props) => {
  const classes = useStyles();
  const [palette, setPallete] = useState(null);

  const handleUpload = (file) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const dataURL = reader.result;

      try {
        const result = await axios.post('http://localhost:4000/color-recognizer', {
          image: dataURL
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if(result && result.data) {
          setPallete(result.data);
        }
      }
      catch(e){
        console.log("ERR", e);
      }
    };

    reader.readAsDataURL(file);
  };

  const onDrop = useCallback(acceptedFiles => {
    handleUpload(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.flexCenter}>
          <div className={classes.roundIcon}>
            <Image fontSize={'small'} />
          </div>
          <p className={classes.title}>Palette Recognizer</p>
        </div>
      </ExpansionPanelSummary>
      <Divider />
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.flexRight}>
          <div className={classNames(classes.paddingLeft, classes.borderBox)}>
            <div
              {...getRootProps()}
              className={classes.dragWrapper}
            >
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p className={classes.dragDescription}>Drop image here ...</p> :
                  <p className={classes.dragDescription}>Drag 'n' drop image here, or click to select image</p>
              }
            </div>
            <label htmlFor="contained-button-file">
              {
                palette && <div className={classes.palettePadding}><Palette colors={palette} /></div>
              }
            </label>
          </div>
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

export default PaletteRecognizerCard;
