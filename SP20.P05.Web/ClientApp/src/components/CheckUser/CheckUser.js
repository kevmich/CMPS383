import React, { useState, useEffect } from "react";
import Axios from "axios";

const CheckUser = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [allowRender, setAllowRender] = useState(false);

  useEffect(() => {
    UserLogin();
  }, []);

  const UserLogin = () => {
    Axios.get(`/api/authentication`)
      .then((response) => {
        //setUserInfo(response.data);
        //setUserRoles(response.data.roles);
        console.log(response.data);
        setIsLoggedIn(true);
        setAllowRender(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
        setAllowRender(true);
      });
  };

  function checkValid(role) {
    return role === props.role;
  }

  const returnChildren = () => {
    if (props.field === undefined && allowRender === true) {
      let isValid = false;

      //Check for Roles
      if (props.role !== undefined) {
        isValid = userRoles.some(checkValid);
      } else if (isLoggedIn === true) {
        isValid = true;
      }

      //Hide component
      if (props.role === "out" && isLoggedIn === false) {
        isValid = true;
      }

      //Show components if validated.
      if (isValid === true) {
        return props.children;
      }
    } else {
      switch (props.field) {
        case "Username":
          return userInfo.username;
        case "Email":
          return userInfo.email;
        case "Roles":
          return userInfo.roles;
      }
    }
  };

  return <>{returnChildren()}</>;
};

export default CheckUser;
