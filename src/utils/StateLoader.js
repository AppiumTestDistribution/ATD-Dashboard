class StateLoader {
  loadState() {
    try {
      let serializedState = localStorage.getItem("atd:state");

      if (serializedState === null) {
        return this.initializeState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem("atd:state", serializedState);
    } catch (err) {}
  }

  initializeState() {
    return {};
  }
}

export default StateLoader;
