import { Avatar, Container, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  avatar: {
    height: "200px",
    width: "200px",
  },
  info: {
    padding: "20px 10px",
  },
}));

function CharacterScreen(props) {
  const classes = useStyle();
  const c = props.location.state?.character ?? {};
  console.log(c);
  const [quote, setquote] = useState("");

  const getRandom = (l) => {
    const min = 0;
    const max = l - 1;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
  };

  useEffect(() => {
    axios
      .get(`https://www.breakingbadapi.com/api/quote?author=${c.name}`)
      .then((res) => {
        setquote(res.data[getRandom(res.data.length)].quote);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [c.name]);

  return (
    <>
      <Header />
      <div className={classes.root}>
        <Container>
          <br />
          <br />
          <center>
            <Avatar alt="Remy Sharp" src={c.img} className={classes.avatar} />
          </center>
          <br />
          <br />
          <br />
          <br />
          <Typography variant="h4" className={classes.info}>
            <b>Name: </b> {c.name}
          </Typography>
          <Typography variant="h4" className={classes.info}>
            <b>Birthday: </b> {c.birthday}
          </Typography>
          <Typography variant="h4" className={classes.info}>
            <b>Occupation: </b>
            <ul style={{ margin: 0, paddingLeft: "150px" }}>
              {c.occupation.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </Typography>
          <Typography variant="h4" className={classes.info}>
            <b>Category: </b>
            {c.category}
          </Typography>
          <Typography variant="h4" className={classes.info}>
            <b>Status: </b>
            {c.status}
          </Typography>
          <Typography variant="h4" className={classes.info}>
            <b>Nickname: </b>
            {c.nickname}
          </Typography>
          <Typography variant="h4" className={classes.info}>
            <b>Portrayed: </b>
            {c.portrayed}
          </Typography>
          <Typography variant="h4" className={classes.info}>
            <b>Quote: </b>
            {quote}
          </Typography>
        </Container>
      </div>
    </>
  );
}

export default CharacterScreen;
