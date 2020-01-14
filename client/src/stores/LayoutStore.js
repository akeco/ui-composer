import makeInspectable from 'mobx-devtools-mst';
import { observable, computed, decorate, action } from "mobx";

const defaultLayout = [{
  title: 'Continue Watching',
  disabled: false,
  showItemTitle: true,
  columns: 2
}, {
  title: 'Live Channels',
  disabled: false,
  showItemTitle: true,
  columns: 2,
}, {
  title: 'Latest Movies',
  disabled: false,
  showItemTitle: true,
  columns: 2
}, {
  title: 'Latest TV Shows',
  disabled: false,
  showItemTitle: true,
  columns: 2
}];

const channelsDefaultLayout = [{
  title: 'Channel Categories',
  disabled: false
}, {
  title: 'Channels',
  disabled: false
}, {
  title: 'Banners',
  disabled: false
}];

class LayoutStore {
  layoutOrder = [...defaultLayout];
  channelsLayoutOrder = [...channelsDefaultLayout];
  contentType = 'VODS';

  setContentType = (contentType) => this.contentType = contentType;

  setLayoutOrder = (newOrder) => this.layoutOrder = newOrder;

  setResetLayoutOrder = () => this.layoutOrder = defaultLayout;

  setItemTitleVisibility = (itemIndex) => {
    let layoutType = this.contentType === 'VODS' ? 'layoutOrder' : 'channelsLayoutOrder';

    this[layoutType] = this[layoutType].map((item, index) => {
      if(itemIndex === index) item.showItemTitle = !item.showItemTitle;
      return item;
    });
  };

  setDisableToggleItem = (itemIndex) => {
    let layoutType = this.contentType === 'VODS' ? 'layoutOrder' : 'channelsLayoutOrder';

    this[layoutType] = this[layoutType].map((item, index) => {
      if(itemIndex === index) item.disabled = !item.disabled;
      return item;
    });
  };

  setChangeTitle = (title, itemIndex) => {
    let layoutType = this.contentType === 'VODS' ? 'layoutOrder' : 'channelsLayoutOrder';

    this[layoutType] = this[layoutType].map((item, index) => {
      if(itemIndex === index) item.title = title;
      return item;
    });
  };

  setChangeColumns = (columns, itemIndex) => {
    let layoutType = this.contentType === 'VODS' ? 'layoutOrder' : 'channelsLayoutOrder';

    this[layoutType] = this[layoutType].map((item, index) => {
      if(itemIndex === index) item.columns = columns;
      return item;
    });
  };

  get getLayoutOrder() {
    return this.layoutOrder;
  }
  get getChannelsLayoutOrder() {
    return this.channelsLayoutOrder;
  }

  get getContentType() {
    return this.contentType;
  }
}

decorate(LayoutStore, {
  layoutOrder: observable,
  contentType: observable,
  channelsLayoutOrder: observable,
  setLayoutOrder: action,
  setResetLayoutOrder: action,
  setDisableToggleItem: action,
  setChangeTitle: action,
  setChangeColumns: action,
  setItemTitleVisibility: action,
  getLayoutOrder: computed,
  getContentType: computed,
  getChannelsLayoutOrder: computed,
});

makeInspectable(LayoutStore);

export default new LayoutStore();
