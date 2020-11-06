import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import Axios from "axios";
import "./NavBar.css";

export default function NavBar(props) {
  const [activeItem, setActiveItem] = useState("/");
  const [userRole, setUserRole] = useState();

  function logout() {
    Axios.post("/api/authentication/logout", {
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then(function (res) {
        //handle success
        window.location.reload(false);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }

  useEffect(() => {
    Axios.get("/api/authentication").then((res) => {
      setUserRole(res.data.role[0]);
    });
  }, []);

  return (
    <div className="NavBarContainer">
      <Menu pointing secondary>
        <Menu.Item
          as={Link}
          to="/"
          active={activeItem === "/"}
          onClick={() => setActiveItem("/")}
        >
          <img alt="logo" src="../../LA.png" />
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/"
          active={activeItem === "/"}
          onClick={() => setActiveItem("/")}
        >
          <p>Home</p>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/FarmField"
          active={activeItem === "/FarmField"}
          onClick={() => setActiveItem("/FarmField")}
        >
          <p>Farm Fields</p>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/About"
          active={activeItem === "/About"}
          onClick={() => setActiveItem("/About")}
        >
          <p>About Us</p>
        </Menu.Item>

        {userRole === "Admin" ? (
          <Menu.Item
            position="left"
            as={Link}
            to="/Admin"
            active={activeItem === "/Admin"}
            onClick={() => setActiveItem("/Admin")}
          >
            <p>Admin</p>
          </Menu.Item>
        ) : null}

        {props.userSignIn == null &&
          activeItem !== "/Signup" &&
          activeItem !== "/Login" && (
            <Menu.Item position="right">
              <div>
                <Button
                  basic
                  color="black"
                  as={Link}
                  to="/Signup"
                  active={activeItem === "/Signup"}
                  onClick={() => setActiveItem("/Signup")}
                >
                  Sign up
                </Button>
              </div>
              <Button
                basic
                color="black"
                as={Link}
                to="/Login"
                active={activeItem === "/Login"}
                onClick={() => setActiveItem("/Login")}
              >
                Log-in
              </Button>
            </Menu.Item>
          )}
        {props.userSignIn != null &&
          activeItem !== "/Signup" &&
          activeItem !== "/Login" && (
            <Menu.Item position="right">
              <div>
                <Button basic color="black" onClick={() => logout()}>
                  Log-out
                </Button>
              </div>
            </Menu.Item>
          )}
      </Menu>
    </div>
  );
}
