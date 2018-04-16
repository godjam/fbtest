import {h, render, Component} from 'preact';
import FacebookComponent from './facebook';

class App extends Component {
	constructor() {
    super();
  }

  render(){
    return(
      <div>
        <h2>Hello, World!</h2>
        <FacebookComponent/> 
      </div>
  )}
}

render(<App/>, 
  document.getElementById('root')
);
