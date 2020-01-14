import React, { useEffect } from 'react';
import { get } from 'lodash';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { fadeInUp } from 'react-animations';
import phoneSrc from '../../../assets/images/phone.svg'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from "@material-ui/styles";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalMovies from '@material-ui/icons/LocalMovies';
import Settings from '@material-ui/icons/Settings';
import Movie from '@material-ui/icons/Movie';
import PageSelection from '../../../containers/PageSelection';
import ChannelsGrid from '../../../components/ChannelsGrid';
import ChannelCategories from '../../../components/ChannelCategories';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
  },
  highLighted: {
    height: 160,
    marginBottom: 30,
    background: 'url(https://picsum.photos/200/300/?random)',
    backgroundSize: 'cover',
    margin: -6,
    width: 'calc(100% + 12px)',
    borderRadius: 0,
    backgroundPosition: 'center'
  },
  singleItem: {
    borderRadius: 3,
    flexGrow: 1,
    height: 70,
    position: 'relative',
    background: 'url(https://picsum.photos/200/300/?random)',
    backgroundSize: 'cover !important',
    backgroundPosition: 'center !important',
    backgroundRepeat: 'no-repeat !important',
    margin: '0 3px',
    '&:first-child': {
      marginLeft: 0
    },
    '&:last-child': {
      marginRight: 0
    }
  },
  progress: {
    position: 'absolute',
    bottom: -6,
    width: '100%',
    height: 3,
    backgroundColor: 'var(--progress-bar)',
    borderRadius: 10,
    left: 0,
    right: 0,
    margin: 'auto',
    transition: 'background-color 250ms ease'
  },
  horizontalList: {
    width: '100%',
    marginBottom: 40
  },
  itemsContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 500,
    userSelect: 'none',
    color: 'var(--device-items-title)',
    fontSize: 14,
    transition: 'color 250ms ease'
  },
  phoneSize: {
    width: 300,
    height: 595,
    overflow: 'scroll',
    backgroundColor: 'var(--device-background)',
    position: 'relative',
    borderRadius: 40,
    padding: 20,
    paddingBottom: 100,
    boxSizing: 'border-box',
    zIndex: 2,
    transition: 'background-color 250ms ease'
  },
  image: {
    width: 300,
    position: 'fixed',
    pointerEvents: 'none',
    marginTop: -20,
    marginLeft: -20,
    zIndex: 1
  },
  fade: {
    animationName: fadeInUp,
    animationDuration: '1s'
  },
  disableOutline: {
    outline: 'none'
  },
  movieDescription: {
    background: 'linear-gradient(to right, var(--device-background) 0%,var(--device-background) 12%,rgba(255,255,255,0) 100%)',
    height: '100%',
    transition: 'background 250ms ease',
    padding: 20,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  primaryButton: {
    color: 'var(--device-items-title)',
    boxShadow: 'none',
    backgroundColor: 'var(--primary)',
    transition: 'all 250ms ease',
    '&:hover': {
      backgroundColor: 'var(--primary)'
    }
  },
  descriptionTitle: {
    margin: 0,
    marginTop: 10,
    marginBottom: 5,
    color: 'var(--device-items-title)',
    fontSize: 22
  },
  descriptionText: {
    color: 'var(--device-items-title)',
    margin: 0,
    marginBottom: 10,
    maxWidth: 140,
    fontSize: 14,
  },
  movieCover: {
    height: '75%',
    boxShadow: '0 0 10px var(--device-items-title)'
  },
  headerContentWrapper: {
    display: 'flex',
    height: '100%',
    alignItems: 'center'
  },
  bottomNavigation: {
    position: 'fixed',
    bottom: 216,
    zIndex: 999,
    marginLeft: -6,
    width: 272,
    '& button[class*="selected"]': {
      '& svg': {
        color: 'var(--dark-blue) !important'
      },
      '& span[class*="label"]': {
        color: 'var(--dark-blue) !important'
      }
    }
  },
  itemTitle: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'block',
    position: 'absolute',
    width: 'calc(100% - 8px)',
    bottom: 0,
    fontSize: 12,
    padding: 3,
    paddingLeft: 5,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3
  },
  flexWrapper: {
    display: 'flex'
  }
}));

const generateHorizontalContent = ({ title, columns, showItemTitle }, index, classes) => {
  const getHorizontalList = () => {
    return Array.apply(null, Array(parseInt(columns))).map((item, index2) => {
      const width = (index + index2 + 1) * 25 < 100 ? (index + index2 + 1) * 25 : 100;

      return (
        <div
          key={index2}
          className={classes.singleItem}
          style={{background: `url(https://picsum.photos/13${index}/7${index2}/?random)`}}
        >
          {
            showItemTitle && <span className={classes.itemTitle}>Item title</span>
          }
          <span style={{width: `${width}%`}} className={classes.progress} />
        </div>
      );
    });
  };

  return (
    <Draggable draggableId={`draggable-${index}`} key={index} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.disableOutline}
        >
          <div className={classes.horizontalList}>
            <h3 className={classes.title}>{title}</h3>
            <div className={classes.itemsContainer}>
              { getHorizontalList() }
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
};

const MobileScreen = (props) => {
  const {
    ColorsStore: { getSelectedColors },
    LayoutStore: { setLayoutOrder, getLayoutOrder, getContentType, getChannelsLayoutOrder }
  } = props;
  const classes = useStyles();

  useEffect(() => {
    const colors = getSelectedColors;
  });

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
    }
  };

  const renderLayoutOrder = () => {
    switch(getContentType) {
      case 'VODS': {
        return getLayoutOrder
          .filter(item => !item.disabled)
          .map((item, index) => generateHorizontalContent(item, index, classes));
      }
      case 'channels': {
        return getChannelsLayoutOrder
          .filter(item => !item.disabled)
          .map((item, index) => generateHorizontalContent(item, index, classes));
      }
    }
  };

  const renderDraggableLayout = () => (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {
              getContentType === 'VODS' ? renderLayoutOrder() : renderChannelsLayout()
            }
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

  const renderChannelsLayout = () => (
    <div>
      <ChannelCategories />
      <ChannelsGrid />
    </div>
  );

  return (
    <div className={classes.flexWrapper}>
      <div className={classNames(classes.root, classes.fade)}>
        <div className={classes.phoneSize}>
          <img src={phoneSrc} className={classes.image} alt="" />
          <div className={classes.highLighted}>
            <div className={classes.headerContentWrapper}>
              <div className={classes.movieDescription}>
                <h4 className={classes.descriptionTitle}>Movie Title</h4>
                <p className={classes.descriptionText}>Some short movie description</p>
                <span>
              <Button
                size="small"
                variant="contained"
                className={classes.primaryButton}
              >
              Play
            </Button>
            </span>
              </div>
              <img
                className={classes.movieCover}
                src={"http://gdj.graphicdesignjunction.com/wp-content/uploads/2011/12/grey-movie-poster.jpg"}
                alt={""}
              />
            </div>
          </div>
          {
            renderDraggableLayout()
          }
          <BottomNavigation
            value={0}
            //onChange={(event, newValue) => {setValue(newValue);}}
            showLabels
            className={classes.bottomNavigation}
          >
            <BottomNavigationAction label="Tv Shows" icon={<LocalMovies />} />
            <BottomNavigationAction label="Movies" icon={<Movie />} />
            <BottomNavigationAction label="Account" icon={<Settings />} />
          </BottomNavigation>
        </div>
      </div>

      <PageSelection />
    </div>
  );
};

export default inject('LayoutStore', 'ColorsStore')(observer(MobileScreen));
