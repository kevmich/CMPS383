import React from "react";
import "./Signup.css";
import axios from "axios";
import { Redirect  } from "react-router-dom"
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            confirmemail: '',
            password: '',
            confirmpassword: '',
            redirect: false
        };
        

        this.function = this.props.function;
        this.register = this.register.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleConfirmEmail = this.handleConfirmEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    }

    handleUserName(e) {
        var value = e.target.value;
        if (value != null) {
            this.setState({ username: value });
        }
    }

    handleEmail(e) {
        var value = e.target.value;
        if (value != null) {
            this.setState({ email: value });
        }
    }

    handleConfirmEmail(e) {
        var value = e.target.value;
        if (value != null) {
            this.setState({ confirmemail: value });
        }
    }

    handlePassword(e) {
        var value = e.target.value;
        if (value != null) {
            this.setState({ password: value });
        }
    }

    handleConfirmPassword(e) {
        var value = e.target.value;
        if (value != null) {
            this.setState({ confirmpassword: value });
        }
    }

    register() {
        console.log(this.state);
        var bodyFormData = {
            'Username': this.state.username.replace(" ", "_"),
            'Email': this.state.email,
            'EmailConfirmed': this.state.confirmemail,
            'Password': this.state.password,
            'PasswordConfirmed': this.state.confirmpassword,

        };

        var self = this;
        axios({
            method: 'post',
            url: '/api/customers',
            data: bodyFormData,
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

    render() {
        return !this.state.redirect ? (
            <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header
                        as="h2"
                        color="black"
                        textAlign="center"
                        style={{ paddingTop: 2 }}
                    >
                        Sign up below
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="UserName"
                                onChange={this.handleUserName}
                            />
                            <Form.Input
                                fluid
                                icon="mail"
                                iconPosition="left"
                                placeholder="E-mail address"
                                onChange={this.handleEmail}
                            />
                            <Form.Input
                                fluid
                                icon="mail"
                                iconPosition="left"
                                placeholder="Confirm E-mail address"
                                onChange={this.handleConfirmEmail}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                onChange={this.handlePassword}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Confirm Password"
                                type="password"
                                onChange={this.handleConfirmPassword}
                            />
                            <Button color="teal" fluid size="large" onClick={this.register}>
                                Create Account
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account? <a href="../../Login">Log-in</a>
                    </Message>
                </Grid.Column>
            </Grid>
            ) : (<Redirect to="/" />)
    }
}

export default SignupForm;
