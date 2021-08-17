import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    padding: "20px",
    display: "flex",
  },
  details: {
    width: "100%",
    flexDirection: "column",
  },
  cover: {
    width: 151,
  },
}));

function CharacterCardAlt({ character }) {
  const classes = useStyles();
  return (
    <center>
      <Card className={classes.root} elevation={5}>
        <CardMedia
          className={classes.cover}
          image={character.img}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h6" align="right">
              <b>Name:</b> {character.name}
            </Typography>
            <Typography variant="h6" align="right">
              <b>Occupation:</b> {character.occupation}
            </Typography>
            <Typography variant="h6" align="right">
              <b>DOB:</b> {character.birthday}
            </Typography>
            <Typography variant="h6" align="right">
              <b>Status:</b> {character.status}
            </Typography>
            <Link
              to={{
                pathname: "/character",
                state: { character: character },
              }}
            >
              <Typography variant="body2" align="right">
                View Details
              </Typography>
            </Link>
          </CardContent>
        </div>
      </Card>
      <br />
    </center>
  );
}

export default CharacterCardAlt;
