import {h, render, Component} from 'preact';
import FacebookAPIWrapper from './facebook';

class App extends Component {
	constructor() {
    super();
    this.fbAPI = new FacebookAPIWrapper();
  }

  render(){
    return(<h2>Hello, World!</h2>)
  }
}

render(<App/>, 
  document.getElementById('root')
);
