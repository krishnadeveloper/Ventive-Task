import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Header and Footer from layout directory
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
// List of components
// Setup component : Basic setup compnent
import Setup from "../components/Setup";
import Cellphonelist from "../components/Cellphone/Cellphonelist";
import CellphoneAdd  from "../components/Cellphone/Add";
import NoMatch from "../components/NoMatch";
import Edit from "../components/Cellphone/Edit";

class AppRouter extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <BrowserRouter>
                
                    <Switch>

                        <Route
                            path="/phone"
                            exact={true}
                            component={Cellphonelist}
                        />

                        <Route
                            path="/phone/add"
                            component={CellphoneAdd}
                        />

                        <Route
                            path="/phone/edit/:id?"
                            component={Edit}
                        />

                        <Route 
                            component={NoMatch} 
                        />

                    </Switch>
                    
                </BrowserRouter>
                <Footer />
            </React.Fragment>
        )
    }
}


export default AppRouter;

if (document.getElementById('react-app')) {
    ReactDOM.render(<AppRouter />, document.getElementById('react-app'));
}
