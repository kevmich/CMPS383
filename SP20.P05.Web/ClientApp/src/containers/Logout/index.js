import React from "react";
import "./Logout.css";
import axios from "axios";
import { Redirect  } from "react-router-dom"


class LogoutForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            user: null
        };
        this.function = this.props.function;
    }

    componentDidMount() {
        var self = this;
        axios({
            method: 'post',
            url: '/api/authentication/logout',
            config: { headers: { 'Content-Type': 'application/json' } }
        }).then(function (response) {
            //handle success
            self.setState({ error: '', redirect: true });
            self.function();
        }).catch(function (error) {
            if (error.response) {
                self.setState({ error: error.response.data, redirect: false })
            }
        });
    }



    render(){
        return !this.state.redirect ? (null) : (<Redirect to="/" />);
    }
    
}
export default LogoutForm;