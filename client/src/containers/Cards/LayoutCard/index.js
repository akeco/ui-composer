import React, { useState, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { get } from 'lodash';
import classNames from 'classnames';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import Menu from '@material-ui/icons/Menu';
import Check from '@material-ui/icons/Check';
import Settings from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import LayoutConfigSlide from './LayoutConfigSlide';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  paper: {
    width: '100%',
    padding: 10,
    boxSizing: 'border-box',
    marginBottom: 10,
  },
  singleItem: {
    padding: 7,
    marginBottom: '10px !important',
    backgroundColor: 'var(--lighten-blue)',
    borderRadius: 3,
    cursor: 'drag',
    color: 'white',
    fontWeight: 500,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 12,
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
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
  itemTitle: {
    margin: 0,
    flexGrow: 1
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  paddingTop: {
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
    '& svg': {
      fill: 'white',
      fontSize: 20,
      marginRight: 5
    }
  },
  marginRight: {
    marginRight: 16
  },
  settingsButton: {
    marginLeft: 'auto',
    cursor: 'pointer',
    marginBottom: -3
  },
  settingsIcon: {
    fill: 'white'
  },
  smallButton: {
    padding: 6
  },
  paddingBlock: {
    padding: '8px 24px 24px'
  },
  swipeContainer: {
    '& > div': {
      transform: 'none !important',
      willChange: 'auto !important'
    }
  },
  disabledItem: {
    backgroundColor: 'var(--light-blue)'
  }
}));

const GET_STRUCTURE = gql`
  {
    client (id: "1") {
      structure
    }
  }
`;

const MUTATE_STRUCTURE = gql`
  mutation updateClients($id: ID!, $name: String) {
    updateClients(id: $id, name: $name) {
      id,
      name
    }
  }
`;

const LayoutCard = (props) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const {
    LayoutStore: {
      setLayoutOrder,
      getLayoutOrder,
      setResetLayoutOrder,
      getContentType,
      getChannelsLayoutOrder
    } } = props;
  const contentWrapper = React.createRef();
  const classes = useStyles();

  useEffect(() => {
    const element = findDOMNode(contentWrapper.current);
    element.style.minHeight = `${element.offsetHeight - 32}px`;
    //const height = contentWrapper.current.offsetHeight;
    //contentWrapper.current.height = `${height}px`;
    return () => {
      //
    }
  }, []);

  const array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };

  const onDragEnd = ({ source, destination }) => {
    const sourceIndex = get(source, 'index');
    const destinationIndex = get(destination, 'index');

    if(!isNaN(sourceIndex) && !isNaN(destinationIndex)){
      const newOrder = array_move([...getLayoutOrder], sourceIndex, destinationIndex);
      setLayoutOrder(newOrder);
      //updateClients({ variables: { id: 1, structure: newOrder } });
      //updateClients({ variables: { id: 1, name: 'Novo Ime' } });
    }
  };

  const generateDraggableItem = ({ title, disabled }, index, classes) => {
    return (
      <Draggable draggableId={`draggable-${index}`} key={index} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className={classNames(classes.singleItem, {
                [classes.disabledItem]: disabled
              })}
            >
              <p className={classes.itemTitle}>{title}</p>
              <div
                className={classes.settingsButton}
                onClick={() => setSelectedItemIndex(index)}
              >
                <Settings fontSize={'small'} className={classes.settingsIcon} />
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  const renderLayoutContent = () => {
    switch (getContentType) {
      case 'VODS': {
        return getLayoutOrder.map((item, index) => generateDraggableItem(item, index, classes));
      }
      case 'channels': {
        return getChannelsLayoutOrder.map((item, index) => generateDraggableItem(item, index, classes));
      }
    }
  };

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.flexCenter}>
          <div className={classes.roundIcon}>
            <Menu fontSize={'small'} />
          </div>
          <p className={classes.title}>Layout Order</p>
        </div>
      </ExpansionPanelSummary>
      <Divider />
      <SwipeableViews
        axis={'x'}
        index={selectedItemIndex !== null ? 1 : 0}
        className={classNames({
          [classes.swipeContainer]: selectedItemIndex === null
        })}
        //onChangeIndex={handleChangeIndex}
      >
        <ExpansionPanelDetails ref={contentWrapper}>
          <div className={classes.flexRight}>
            <div className={classNames(classes.paddingTop, classes.borderBox)}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-1">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {
                        renderLayoutContent()
                      }
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </ExpansionPanelDetails>

        <LayoutConfigSlide selectedItemIndex={selectedItemIndex} setSelectedItemIndex={setSelectedItemIndex}/>

      </SwipeableViews>
      <Divider />
      <ExpansionPanelActions>
        <div className={classNames(classes.flexRight, classes.marginRight)}>
          <Button
            size="small"
            onClick={setResetLayoutOrder}
          >Reset</Button>
          <Button size="small" variant="contained" className={classes.primaryButton}>
            <Check  />
            Save
          </Button>
        </div>
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
};

export default inject('LayoutStore')(observer(LayoutCard));
