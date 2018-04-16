import loadFBSDK from 'facebook-sdk-promise';

export default class FacebookAPIWrapper {

    constructor() {
        loadFBSDK.logging.on();
        loadFBSDK().then(FB => {
            this.init();
        })
    };
    
    init() {
        FB.init({
            appId            : '196432191162259', //'1736591459889631', // battlecry
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.12'
          });

        FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
            console.log('Logged in.');
        }
        else {
            FB.login();
        }
        });          
    }
}