import Convenience from '../src/Convenience/Convenience.js';

class App {
  async run() {
    const convenience = new Convenience();
    await convenience.execute();
  }
}

export default App;
