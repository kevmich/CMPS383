import React from 'react';
import { Jumbotron } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';




const About = (props) => {
    var name = "Stranger"
    if (props.user != null){
      name = props.user.username;
    }

    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Hello, {name}!</h1>
            </Jumbotron>
              <div className="cardbox">
                <div className="cardbox-content">
                  <h1>Our Story</h1>
                  <p>From our family to yours. Nature's finest producers...</p>
                </div>
                <div className="cardbox-image">

                </div>
              </div>
        </div>
    );
};

export default About;

