import Convenience from '../src/Convenience/Convenience.js';

class App {
  async run() {
    const convenience = new Convenience();
    await convenience.run();
  }
}

export default App;
