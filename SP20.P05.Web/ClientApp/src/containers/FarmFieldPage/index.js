import React, { useState, useEffect } from "react";
import "../FarmFieldForm";
import { Icon, Menu, List, Button, Item, Label } from "semantic-ui-react";
import "./FarmField.css";
import Axios from "axios";
import MyVerticallyCenteredModal from "../FarmFieldForm/index";

// TODO: Update <Search> usage after its will be implemented

export default function MenuExampleAttached() {
  const [farmFields, setFarmFields] = useState();
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [purchasedTicket, setPurchasedTicket] = useState();

  function purchaseTicket(element) {
    Axios("api/farm-field-tickets", {
      method: "post",
      data: {
        ticketTimeSlot: "2020-05-25T04:36:54.172Z",
        farmFieldId: element.id,
      },

      withCredentials: true,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function handleModalClick(element) {
    setModalShow(true);
    setPurchasedTicket(element);
    console.log(element);
  }

  useEffect(() => {
    Axios.get("api/farm-fields/active").then((res) => {
      setFarmFields(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <Menu borderless>
        <Menu.Menu position="right">
          <div className="ui right aligned category search item">
            <div className="ui transparent icon input">
              <input
                className="prompt"
                type="text"
                placeholder="Search farm-fields..."
              />
              <i className="search link icon" />
            </div>
            <div className="results" />
          </div>
        </Menu.Menu>
      </Menu>

      <div className="list fields">
        <List animated verticalAlign="middle" relaxed divided>
          {!loading &&
            farmFields.map((element) => (
              <List.Item
              key={element.id}>
                <Item.Image src="https://i.imgur.com/HGn2cIG.jpeg" />
                <Item.Content>
                  <Item.Header as="h3" dividing="true">
                    {element.name}
                  </Item.Header>
                  <Item.Meta></Item.Meta>
                  <Item.Description>
                    {element.dimensions.width} x {element.dimensions.width}{" "}
                    acres
                  </Item.Description>
                  <Item.Extra>
                    <Button
                      className="buybutton"
                      floated="right"
                      primary
                      onClick={() => handleModalClick(element)}
                    >
                      Get Ticket
                      <Icon name="chevron right" />
                    </Button>
                    <div className="label group">
                      <Label>{element.description}</Label>
                    </div>
                  </Item.Extra>
                </Item.Content>
              </List.Item>
            ))}
        </List>

        {modalShow && (
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            element={purchasedTicket}
            purchaseTicket={() => purchaseTicket()}
          />
        )}
      </div>
    </div>
  );
}
