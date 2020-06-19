import React from "react";
import { Container, Button, CardDeck, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import create from "../svg/create.png";
import upload from "../svg/upload.png";
import manage from "../svg/manage.png";

const Menu = () => {
  return (
    <div>
      <Container className="mb-5" wdith="100%">
        <CardDeck>
          <Card
            className="shadow-sm"
            style={{
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#252925",
              boxShadow: "0 1px 1px 0 rgba(66, 66, 66, 0.5)",
            }}
          >
            <Card.Img
              className="mx-auto my-3"
              variant="top"
              src={create}
              style={{ width: "70%", justifyContent: "center" }}
            />
            <Card.Body>
              <Card.Title
                className="font-weight-bold"
                style={{ color: "#b1ffab" }}
              >
                Create Tags
              </Card.Title>
              <Card.Text style={{ color: "#d3e8d1", lineHeight: "2rem" }}>
                Want to collaborate with your team ? Create a tag here and share
                it to your team. All the files uploaded under the created tag
                can be seen by all. No more searching of annoying links.
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: "#292e29" }}>
              <Link to="./create">
                <Button
                  id="cusbtn"
                  className="font-weight-bold"
                  variant="primary"
                  style={{ color: "#292e29" }}
                >
                  Create Tags
                </Button>
              </Link>
            </Card.Footer>
          </Card>
          <Card
            className="shadow-sm"
            style={{
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#252925",
            }}
          >
            <Card.Img
              className="mx-auto mt-4"
              variant="top"
              src={upload}
              style={{ width: "75%", justifyContent: "center" }}
            />
            <Card.Body>
              <Card.Title
                className="font-weight-bold"
                style={{ color: "#b1ffab", lineHeight: "2rem" }}
              >
                Upload Files
              </Card.Title>
              <Card.Text style={{ color: "#d3e8d1", lineHeight: "2rem" }}>
                Got a tag ? Upload files to the tag so that your team can
                collaborate effeciently. You can view all the files by your
                peers uploaded under this tag.
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: "#292e29" }}>
              <Link to="./upload">
                <Button
                  id="cusbtn"
                  className="font-weight-bold"
                  variant="primary"
                  style={{ color: "#292e29" }}
                >
                  Upload Files
                </Button>
              </Link>
            </Card.Footer>
          </Card>
          <Card
            className="shadow-sm"
            style={{
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#252925",
            }}
          >
            <Card.Img
              className="mx-auto mt-3"
              variant="top"
              src={manage}
              style={{ width: "85%", justifyContent: "center" }}
            />
            <Card.Body>
              <Card.Title
                className="font-weight-bold"
                style={{ color: "#b1ffab", lineHeight: "2rem" }}
              >
                My Tags
              </Card.Title>
              <Card.Text style={{ color: "#d3e8d1", lineHeight: "2rem" }}>
                Manage your tags here. Change access permissions, delete
                unwanted tags, share the tags. Explore more here.
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: "#292e29" }}>
              <Link to="./manage">
                <Button
                  id="cusbtn"
                  className="font-weight-bold"
                  variant="primary"
                  style={{ color: "#292e29" }}
                >
                  Manage Tags
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        </CardDeck>
      </Container>
    </div>
  );
};

export default Menu;
