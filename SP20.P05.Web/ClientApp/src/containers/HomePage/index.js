import React, { useState } from "react";
import "../HomePage/HomePage.css";
import { Parallax } from "react-parallax";
import { Carousel } from "react-bootstrap";
import { Grid, Segment, Icon } from "semantic-ui-react";

export default function HomePage() {
  const [index, setIndex] = useState(1);
  const [direction] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    selectedIndex === 0 ? setIndex(selectedIndex + 1) : setIndex(selectedIndex);
  };

  return (
    <div className="HomePage Main-Div">
      <div className="HomePage HeaderContainer"></div>
      <div className="HomePage Body">
        <div className="Carousel">
          <Carousel
            activeIndex={index}
            direction={direction}
            onSelect={handleSelect}
            controls={true}
            indicators={false}
          >
            <Carousel.Caption
              style={index === 0 ? { hidden: true } : { hidden: false }}
            >
              <h1 className="HomePage H1">WELCOME TO LA COMMUNITY FIELDS</h1>
              <h3 className="HomePage H3">CONNECTING FARMERS AND FAMILIES</h3>
            </Carousel.Caption>
            <Carousel.Item>
              <img
                alt="there should be a cool pic here"
                style={{ height: "800px" }}
                src={"https://i.imgur.com/sQcTyoq.jpg"}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                alt="there should be a cool pic here too"
                style={{ height: "800px" }}
                src={"https://i.imgur.com/Erw8nyV.jpg"}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                alt="there should be a cool pic here too"
                style={{ height: "800px" }}
                src={"https://i.imgur.com/ql1at8B.jpg"}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                alt="there should be a cool pic here too"
                style={{ height: "800px" }}
                src={"https://i.imgur.com/RDmsveg.jpg"}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                alt="there should be a cool pic here too"
                style={{ height: "800px" }}
                src={"https://i.imgur.com/dbINI6V.jpg"}
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="centered">
          <h1 className="what-we-do"> WHAT WE DO </h1>
          <div style={{ paddingLeft: "30px" }}>
            <Grid columns={2}>
              <Grid.Row stretched>
                <Grid.Column>
                  <Segment>
                    <p style={{ paddingBottom: "20px" }}>
                      Facilitate the connection between local farmers and thier
                      customers.
                    </p>
                    <Icon name="handshake outline" size="massive" />
                  </Segment>
                  <Segment>
                    <p style={{ paddingBottom: "20px" }}>
                      Provide farm field customers with fast and convenient
                      ticket buying.{" "}
                    </p>
                    <Icon name="ticket alternate" size="massive" />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <p style={{ paddingBottom: "25px" }}>
                      Host Tours, Closed Events, and School Trips.
                    </p>
                    <Icon name="birthday" size="massive" />
                  </Segment>
                  <Segment>
                    <p style={{ paddingBottom: "25px" }}>
                      Reserve dates for public crop picking.
                    </p>
                    <Icon name="calendar check outline" size="massive" />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          {/* This section can be populated from database later on */}

          <h1 id="whoweare" name="whoweare">
            {" "}
            WHO WE ARE{" "}
          </h1>

          <div className="testimonials-body">
            <Grid relaxed="very">
              <Grid.Column>
                <p>
                  Envoc AgriCo brings to you our LA Community Fields brand, a
                  simple solution to reserving and purchasing tickets to your
                  favorite local farm fields. We are an LA based agricultural
                  tourism company who aims to bring to farmers and communities
                  closer.
                </p>
              </Grid.Column>
            </Grid>
          </div>

          <h1 className="testimonials"> TESTIMONIALS </h1>

          <div className="testimonials-body">
            <Grid relaxed="very">
              <Grid.Column>
                <p>
                  "LA Community Fields has made it fast and easy for me to
                  schedule a family trip to our favorite picking farm. All I
                  have to do is reserve online and scan my QR code when we
                  arrive!" - Adam S.
                </p>
                <p>
                  "What a great way to advertise the hardwork of local farmers.
                  Absolutely wonderful! I can't say enough about LA Community
                  Fields. It really brings the community together." - Paris B.
                </p>
                <p>"I love LA Community Fields." - Grant M.</p>
              </Grid.Column>
            </Grid>
          </div>
        </div>
        <div className="Parallax HomePage">
          <Parallax
            blur={{ min: 0, max: 5 }}
            bgImage={require("../../images/stock-images/red-barn.jpg")}
            bgImageAlt="tennis"
            strength={300}
          >
            <div style={{ height: "800px" }} />
          </Parallax>
        </div>
      </div>
    </div>
  );
}
