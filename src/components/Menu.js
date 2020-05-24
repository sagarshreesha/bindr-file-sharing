import React from "react";
import { Container, Button, CardDeck, Card } from "react-bootstrap";
import card2 from "../two.svg";
import card1 from "../one.svg";
import card3 from "../three.svg";
import { Link, NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <Container className="mb-5" wdith="100%" style={{}}>
        <CardDeck>
          <Card
            className="shadow-sm"
            style={{ border: "none", borderRadius: "10px" }}
          >
            <Card.Img
              className="mx-auto my-3"
              variant="top"
              src={card1}
              style={{ width: "60%", justifyContent: "center" }}
            />
            <Card.Body>
              <Card.Title className="font-weight-bold">Create Tags</Card.Title>
              <Card.Text>
                Want to collaborate with your team ? Create a tag here and share
                it to your team. All the files uploaded under the created tag
                can be seen by all. No more searching of annoying links.
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: "white" }}>
              <Link to="./create">
                <Button
                  id="cusbtn"
                  className="font-weight-bold"
                  variant="primary"
                >
                  Create Tags
                </Button>
              </Link>
            </Card.Footer>
          </Card>
          <Card
            className="shadow-sm"
            style={{ border: "none", borderRadius: "10px" }}
          >
            <Card.Img
              className="mx-auto my-2"
              variant="top"
              src={card2}
              style={{ width: "55%", justifyContent: "center" }}
            />
            <Card.Body>
              <Card.Title className="font-weight-bold">Upload Files</Card.Title>
              <Card.Text>
                Got a tag ? Upload files to the tag so that your team can
                collaborate effeciently. You can view all the files by your
                peers uploaded under this tag.
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: "white" }}>
              <Link to="./upload">
                <Button
                  id="cusbtn"
                  className="font-weight-bold"
                  variant="primary"
                >
                  Upload Files
                </Button>
              </Link>
            </Card.Footer>
          </Card>
          <Card
            className="shadow-sm"
            style={{ border: "none", borderRadius: "10px" }}
          >
            <Card.Img
              className="mx-auto my-1"
              variant="top"
              src={card3}
              style={{ width: "55%", justifyContent: "center" }}
            />
            <Card.Body>
              <Card.Title className="font-weight-bold">My Tags</Card.Title>
              <Card.Text>
                Manage your tags here. Change access permissions, delete
                unwanted tags, share the tags. Explore more here.
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: "white" }}>
              <Button
                id="cusbtn"
                className="font-weight-bold"
                variant="primary"
              >
                Manage Tags
              </Button>
            </Card.Footer>
          </Card>
        </CardDeck>
      </Container>
    </div>
  );
};

export default Menu;
