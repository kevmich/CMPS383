import React from "react";
import "./Purchase.css";
import UnderConstruction from "../../images/construction/excavator.png";
import Axios from "axios";
import { Grid, Segment, Button } from "semantic-ui-react";


export default function About(props) {
  const data = {
    "ticketTimeSlot": "2020-05-25T04:36:54.172Z",
    "farmFieldId": 5
  }
  const purchaseTicket = () => {
    Axios("api/farm-field-tickets", {
      method: "post",
      data: data,
      withCredentials: true
    })
    .then((res) => console.log(props.location.state.farmField))
    .catch((err) => console.log(err))
  }

  return (
    <div class="main-About">
      <Button
      onClick={purchaseTicket}>
          purchaseTicket
      </Button>
    </div>
  );
}