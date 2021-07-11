import React, { useState } from "react";
import {
  InputGroup,
  FormControl,
  Button,
  Container,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import app from "../base";
import info from "../svg/info.png";
import styled, { keyframes } from "styled-components";
import { bounceOutDown } from "react-animations";

const Clipboard = () => {
  const bounceAnimation = keyframes`${bounceOutDown}`;
  const [trigger, setTrigger] = useState(false);
  const BouncyDiv = styled.div`
    animation: 0.5s ${bounceAnimation};
  `;
  const [uid] = React.useState(app.auth().currentUser.uid);

  const [clipsx, setClipsx] = React.useState([]);
  const clipRef = app.database().ref(uid);
  React.useEffect(() => {
    const clipRef = app.database().ref(uid).limitToLast(5);
    clipRef.on("value", (snapshot) => {
      const clips = snapshot.val();
      const clipsAll = [];
      for (let id in clips) {
        clipsAll.push(clips[id]);
      }
      setClipsx(clipsAll.reverse());
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [text, setText] = React.useState("");
  const addToDb = () => {
    clipRef.push(text);
  };
  const copyToClipboard = (clip) => {
    setTrigger(!trigger);
    navigator.clipboard.writeText(clip);
  };
  return (
    <div>
      <Container
        className="clipboard"
        style={{
          backgroundColor: " rgb(30, 33, 30)",
          padding: "40px",
          borderRadius: "10px",
          marginBottom: "40px",
        }}
      >
        <div className="d-flex">
          <h4
            className="mb-3"
            style={{ fontWeight: "bold", color: "rgb(211, 232, 209)" }}
          >
            Clipboard
          </h4>
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={`tooltip`}>
                Click on card to copy to clipboard
              </Tooltip>
            }
          >
            <Button
              variant="secondary"
              style={{
                padding: "0px",
                height: "22px",
                marginTop: "5px",
                backgroundColor: "rgb(30, 33, 30)",
                border: "none",
                boxShadow: "none",
              }}
            >
              <img
                src={info}
                height="18px"
                style={{ marginTop: "-5px", marginLeft: "5px" }}
                alt="info"
              />
            </Button>
          </OverlayTrigger>
        </div>

        <InputGroup>
          <FormControl
            style={{
              color: "white",
              backgroundColor: "#303630",
              border: "none",
            }}
            type="text"
            placeholder="Paste text here"
            onChange={(e) => setText(e.target.value)}
          />
          <InputGroup.Append>
            <Button
              style={{ color: "#121212", fontWeight: "bold" }}
              id="cusbtn"
              onClick={() => addToDb()}
            >
              <b>Add</b>
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Container className="mt-4 p-0">
          <Card
            style={{
              color: "white",
              opacity: "0.8",
              border: "none",
              backgroundColor: "rgb(30, 33, 30)",
              marginTop: "-10px",
            }}
          >
            <div>
              {clipsx.length > 0 ? (
                clipsx.map((clip) => (
                  <Card.Body
                    className="cardClip"
                    key={clip}
                    onClick={() => copyToClipboard(clip)}
                    style={{
                      padding: "15px",
                      borderRadius: "10px",
                      backgroundColor: "#282b28",
                      marginTop: "15px",
                    }}
                  >
                    <BouncyDiv>{clip}</BouncyDiv>
                  </Card.Body>
                ))
              ) : (
                <Card.Body
                  style={{
                    padding: "15px",
                    backgroundColor: "#141313",
                    border: "none",
                    borderRadius: "10px",
                  }}
                >
                  Nothing here
                </Card.Body>
              )}
            </div>
          </Card>
        </Container>
      </Container>
    </div>
  );
};

export default Clipboard;
