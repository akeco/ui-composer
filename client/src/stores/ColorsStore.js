import { observable, computed, decorate, action } from "mobx";

class ColorsStore {
  selectedColors = [];

  setSelectedColors = (colors) => {
    document.documentElement.style.setProperty('--device-background', `${colors[0]}`);
    document.documentElement.style.setProperty('--device-items-title', `${colors[1]}`);
    document.documentElement.style.setProperty('--primary', `${colors[2]}`);
    document.documentElement.style.setProperty('--progress-bar', `${colors[3]}`);
    return this.selectedColors = colors;
  };

  resetSelectedColors = () => {
    document.documentElement.style.setProperty('--device-background', `white`);
  };

  get getSelectedColors() {
    return this.selectedColors;
  }
}

decorate(ColorsStore, { selectedColors: observable, setSelectedColors: action, getSelectedColors: computed });

export default new ColorsStore();
