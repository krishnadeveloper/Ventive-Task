import React from "react";
import {withRouter} from "react-router-dom";

class Footer extends React.Component{
    render(){
        return(
            <footer className="page-footer font-small gray">
                <div className="footer-copyright text-center py-3">Demo By : Krishna Kumar
                    <a href="mailto:getkrishnakumar1990@gmail.com"> Email : getkrishnakumar1990@gmail.com</a>
                </div>
            </footer>
        )
    }
}

export default Footer;