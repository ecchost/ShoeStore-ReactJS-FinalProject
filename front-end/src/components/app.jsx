import React, {Component} from 'react';
import { withTranslate } from 'react-redux-multilingual'
import { ToastContainer } from 'react-toastify';

// Custom Components
import Header from './common/headers/header';

import Footer from "./common/footers/footer";

class App extends Component {

    render() {
        return (
            <div>
                <Header logoName={'logo.png'}/>
                {this.props.children}
                <Footer logoName={'logo.png'}/>

                <ToastContainer />
            </div>
        );
    }
}

export default withTranslate(App);
