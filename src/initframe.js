import {h, render, Component} from 'preact';

export default class InitFrame extends Component {

    constructor() {
        super();
        this.state = {
            places: 3,
            prixmin: 100,
            prixmax: 300
        }
    };

    async sendInit() {
        let sku = await this.props.wioService.init(this.state.places, this.state.prixmin, this.state.prixmax);
        this.props.next();
    }

    handleChange(name, event) {
      let value = event.target.value;
      this.setState({[name]: value});
    }

    render() {
      return(
        <div>
          <div> Places :
            <select 
            value={this.state.places}
            onChange={e=>this.handleChange('places', e)}>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </select>
          </div>
          <div> Prix min : 
            <select
            value={this.state.prixmin}
            onChange={e=>this.handleChange('prixmin', e)}>
              <option value="100" > 100 € </option>
              <option value="200" > 200 € </option>
              <option value="300" > 300 € </option>
              <option value="400" > 400 € </option>
            </select>
          </div>
          <div> Prix max : 
            <select
            value={this.state.prixmax}
            onChange={e=>this.handleChange('prixmax', e)}>
              <option value="200" > 200 € </option>
              <option value="300" > 300 € </option>
              <option value="400" > 400 € </option>
              <option value="500" > 500 € </option>
            </select>
          </div>
          <button onClick={()=>this.sendInit()}>Valider</button>
        </div>
        )
    }
}