import {h, render, Component} from 'preact';

export default class LastFrame extends Component {

    constructor() {
        super();
        this.state = {
            similarSkus: null
        }
    }

    async componentDidMount() {
        var res = await this.props.wioService.last();
        this.setState({similarSkus: res.couchSkuList})
    }

    render() {
        const {similarSkus} = this.state;
        if(similarSkus) return(
        <div>
            <h3>Fin</h3>
            <p>Liste des canapés similaires :</p>
            <ul>
            {similarSkus.map(item => (
                <li key={item.sku}>{item.sku} ({item.score})</li>
            ))}
            </ul>
        </div>)
        else return (<div>Chargement ...</div>)
    }
}