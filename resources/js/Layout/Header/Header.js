import React from "react";

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <div className="container">
                    <a className="navbar-brand" href="/">VentiveTest</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        )
    }
}

export default Header;