import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { makeStyles } from "@material-ui/core/styles";
import CharacterCard from "../AllCharacterScreen/CharacterCard";
import CharacterCardAlt from "../AllCharacterScreen/CharacterCardAlt";
import axios from "axios";
import nosearch from "../../search.jpg";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

function SearchPage(props) {
  const classes = useStyle();
  const [characters, setcharacters] = useState([]);
  const [loading, setloading] = useState(false);
  const search = props.location.state?.search ?? "";

  useEffect(() => {
    setloading(true);
    axios
      .get(
        `https://www.breakingbadapi.com/api/characters/?name=${search}&&limit=10`
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
  }, [search]);

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
            <Typography variant="h4">Search Result for: {search}</Typography>
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
          </Container>
        )}
      </div>
    </>
  );
}

export default SearchPage;
