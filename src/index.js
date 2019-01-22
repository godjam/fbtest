import {h, render, Component} from 'preact';
import InitFrame from './initframe';
import NextFrame from './nextframe';
import LastFrame from './lastframe';
import WIOService from './wioservice';

class App extends Component {
	constructor() {
    super();
    this.wioService = new WIOService(this.getQueryString('endpoint'));
    this.initFrame = <InitFrame wioService={this.wioService} next={() => this.show(this.nextFrame)}/>
    this.nextFrame = <NextFrame wioService={this.wioService} next={() => this.show(this.lastFrame)}/>
    this.lastFrame = <LastFrame wioService={this.wioService} />
    this.state = {
      currentComponent: this.initFrame
    }
  }

  getQueryString(field, url) {
    const href = url || window.location.href;
    const reg = new RegExp(`[?&]${field}=([^&#]*)`, 'i');
    const string = reg.exec(href);
    return string ? string[1] : null;
  }

  show(frame) {
    this.setState({currentComponent: frame})
  }

  render(){
    let component = this.state.currentComponent;
    
    return(
      <div>
        <h2>Démo canapés</h2>
        {component}
      </div>
  )}
}

render(<App/>, 
  document.getElementById('root')
);
