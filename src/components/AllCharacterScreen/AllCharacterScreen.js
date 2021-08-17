import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { makeStyles } from "@material-ui/core/styles";
import CharacterCard from "./CharacterCard";
import CharacterCardAlt from "./CharacterCardAlt";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import nosearch from "../../search.jpg";

import "./index.css";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

function AllCharacterScreen(props) {
  const classes = useStyle();
  const [characters, setcharacters] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);

  const handleClick = (event, page) => {
    console.log(page);
    setpage(page);
    getCharacters(page - 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const getCharacters = async (page) => {
    setloading(true);
    axios
      .get(
        `https://www.breakingbadapi.com/api/characters/?limit=10&offset=${
          10 * page
        }`
      )
      .then((response) => {
        console.log(response.data);
        setcharacters(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  };

  useEffect(() => {
    getCharacters(0);
  }, []);

  return (
    <>
      <Header />
      <div className={classes.root}>
        {loading ? (
          <center>
            <br />
            <CircularProgress style={{ marginTop: "50vh" }} size="100px" />
            <br />
            <br />
          </center>
        ) : (
          <Container>
            <Typography variant="h4">All Characters</Typography>
            <br />
            {characters.length === 0 ? (
              <center>
                <img src={nosearch} alt="ff" />
              </center>
            ) : (
              characters.map((c, idx) => {
                return idx % 2 === 0 ? (
                  <CharacterCard key={c.char_id} character={c} />
                ) : (
                  <CharacterCardAlt key={c.char_id} character={c} />
                );
              })
            )}
            <br />
            <Pagination
              count={7}
              page={page}
              // defaultPage={1}
              color="primary"
              style={{ justifyContent: "center" }}
              onChange={handleClick}
            />
          </Container>
        )}
      </div>
    </>
  );
}

export default AllCharacterScreen;
