import React,{ useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../containers/HomePage";
import LoginForm from "../../containers/Login";
import About from "../../containers/About";
import NotFoundPage from "../../containers/NotFoundPage";
import NavBar from "../NavBar";
import FarmField from "../../containers/FarmFieldPage";
import SignupForm from "../../containers/Signup";
import FarmFieldForm from "../../containers/FarmFieldForm";
import Logout from "../../containers/Logout";
import Admin from "../../containers/Admin";
import "./Layout.css";
import axios from "axios";

export default function Layout() {
  const [userObj, setUserObj] = useState(null);
  const [Update, setUpdate] = useState(true);
  const [isAdmin, setAdmin] = useState(false);

  const toggleSetUpdate = () =>{
    setUpdate(!Update);
  }

  const logout = () =>{
    setUserObj(null);
  }

  useEffect(()=>{
    if(userObj === null){
    axios({
      method: 'get',
      url: '/api/authentication',
      config: { headers: { 'Content-Type': 'application/json' } }
      }).then(response => {
        var userData = response.data;
        setUserObj({username: userData.username, role: userData.role})
        setUpdate(false);
        var i;
        for(i = 0; i < userData.role.length; i++){
          if(userData.role[i] === "Admin"){
            setAdmin(true);
          }
        }
      });
      console.log(userObj);
    }
  });


    
  return (
    <div className="Content">
      <div className="navBar">
        <NavBar userSignIn={userObj} />
      </div>
      <div className="main">
        <div className="body">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/Login" component={() => <LoginForm function={toggleSetUpdate}/>} />
            <Route exact path="/About" component={() => <About user={userObj}/>} />
            <Route exact path="/FarmField" component={FarmField} />
            <Route exact path="/Signup" component={() => <SignupForm function={toggleSetUpdate}/>} />
            <Route exact path="/Logout" component={() => <Logout function={logout} />} />
            {isAdmin && (
              <Route exact path="/Admin" component={Admin} />
            )}
            {userObj != null && (
              <Route exact path="/FarmFieldForm" component={FarmFieldForm} />
            )}

            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
      <div className="Footer">
        
      </div> 
    </div>
  );
}
