import { observable, computed, decorate, action } from "mobx";

class ScreensStore {
  selectedScreen = 'mobile';
  selectedPage = 'homePage';

  setSelectedScreen = (screen) => {
    return this.selectedScreen = screen;
  };

  setSelectedPage = (page) => {
    return this.selectedPage = page;
  };

  get getSelectedScreen() {
    return this.selectedScreen;
  }

  get getSelectedPage() {
    return this.selectedPage;
  }
}

decorate(ScreensStore, {
  selectedScreen: observable,
  selectedPage: observable,
  setSelectedScreen: action,
  setSelectedPage: action,
  getSelectedScreen: computed,
  getSelectedPage: computed,
});

export default new ScreensStore();
