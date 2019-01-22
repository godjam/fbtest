import {h, render, Component} from 'preact';

export default class NextFrame extends Component {

    constructor() {
        super();
        this.state = {
            next: null
        }
    }

    componentDidMount() {
        this.setState({next: this.props.wioService.lastSku})
    }

    async handleClick(likes) {
        let res = await this.props.wioService.next(this.state.next.sku, likes);
        console.log(res);
    
        if(res.should_continue === false) 
            this.props.next();
        else {
            let next = res.next || {sku: "aspenblgr", score: 1}
            this.setState({next: next});
        }
    }

    render() {
        const {next} = this.state;
        
        if(next) return(<div>
            <div>SKU: {next.sku} ({next.score})</div>
            <button onClick={()=>this.handleClick(1)}>Like</button>
            <button onClick={()=>this.handleClick(-1)}>Dislike</button>
        </div>)
        else return (<div>Chargement ...</div>)
    }
}