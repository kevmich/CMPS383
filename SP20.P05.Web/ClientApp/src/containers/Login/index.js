import React from "react";
import "./Login.css";
import Axios from "axios";
import { Redirect  } from "react-router-dom"
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirect: false,
            userRole: null
        };

        this.function = this.props.function;
        this.login = this.login.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

    }

    handleUsername(e) {
        var value = e.target.value;
        if (value != null) {
            this.setState({ username: value });
        }
    }

    handlePassword(e) {
        var value = e.target.value;
        if (value != null) {
            this.setState({ password: value });
        }
    }


    login() {
        console.log(this.state);
        var bodyFormData = {
            'Username': this.state.username.replace(" ", "_"),
            'Password': this.state.password
        };

        var self = this;
        Axios({
            method: 'post',
            url: '/api/authentication/login',
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'application/json' } }
        }).then(function (response) {
            //handle success
            window.location.reload(false);
        }).catch(function (error) {
            if (error.response) {
                self.setState({ error: error.response.data, redirect: false })
            }
        });
    }

    componentDidMount(){
        Axios.get("/api/authentication").then((res) => {
            this.setState({userRole: res.data.role[0]});
          }).catch((err) => console.warn(err));
    }

    render() {
        return !this.state.userRole ? (
            <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="black" textAlign="center">
                        Log-in to your account
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                onChange={this.handleUsername}
                            />
                            <Form.Input

                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                onChange={this.handlePassword}
                            />

                            <Button color="teal" fluid size="large" onClick={this.login}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <a href="../../Signup">Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>
        ) : (<Redirect to="/" />);
    }
}
export default LoginForm;
