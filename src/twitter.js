import {h, render, Component} from 'preact';

export default class TweeterComponent extends Component {

    constructor() {
        super();
        this.state = {
        }
    };

    render() {
      let message = 'Hello, world! <br> I like bananas 🍌 yunno'
      let encodedMessage = encodeURI(message)

      let link = 'https://en.wikipedia.org/wiki/Banana'

      let href=`https://twitter.com/share?ref_src=twsrc%5Etfw&text=${encodedMessage}&url=${link}`
        return(
            <div>
              <a 
                href={href}>
                <button>
                Tweet bananas
                </button>
              </a>
              <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
        )
    }
}