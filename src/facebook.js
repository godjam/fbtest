import loadFBSDK from 'facebook-sdk-promise';
import {h, render, Component} from 'preact';


export default class FacebookComponent extends Component {

    constructor() {
        super();
        this.state = {
            userID: null,
            friends: null,
            total_friends: 0
        }

        loadFBSDK.logging.on();
        loadFBSDK()
            .then(() => this.init())
            .then(() => this.status())
    };

    init() {
        return FB.init({
            appId: '196432191162259', //'1736591459889631', // battlecry
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v2.12'
        })
    }

    status() {
        return FB.getLoginStatus((r) => this.loginHandler(r))
    }

    login() {
        FB.login((r) => this.loginHandler(r),
        {scope: 'public_profile,email,user_friends'});
    }

    loginHandler(response) {
        console.log(response);
        if (response.status === 'connected') {
            let userID = response.authResponse.userID;
            this.setState({userID: userID});
            console.log(`Logged in (userID: ${userID})` );
            this.getFriends()
        }
    }

    render() {
    let content = (!this.state.userID) ?
        <button onClick={() => this.login()}>Login w facebook</button> :
        this.buildFriendsList();

        return(
            <div>
                {content}
            </div>
        )
    }

    buildFriendsList() {
        let elements = [];
        let friends = this.state.friends || [];

        for(let i=0; i<friends.length; ++i) {
            let f = friends[i];
            elements.push(<div>name: {f.name} id: {f.id}</div>)
        }

        if (elements.length <= 0)
            elements.push(<div>No friends are playing to this app 🙍 (but you have {this.state.total_friends} of them)</div>)
        
        return <div>{elements}</div>
    }

    getFriends() {
        console.log('getting friends...')
        FB.api(`/${this.state.userID}/friends`, 'GET', {},
            (r) => {
                console.log(r);
                if(r && r.data) this.setState({
                    friends: r.data,
                    total_friends: r.summary.total_count
                });
            }
          );
    }
}