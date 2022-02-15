import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProfilDisplay from "./components/Profil_Display.jsx";

const App = () => {
  const [fetchedResult, setFetchedResult] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("punkte");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const url = "http://127.0.0.1:5000/players";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setFetchedResult(response.data);
        setIsLoaded(true);
      })
      .then((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [filter]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = fetchedResult.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(fetchedResult);
    }
  };

  if (error) {
    return <>{error.message}</>;
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      <div>
        <div>
          <Input
            icon="search"
            placeholder="Suchen..."
            onChange={(e) => searchItems(e.target.value)}
          />
          <Box sx={{ minWidth: 120, marginTop: "3vh", marginBottom: "3vh" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select value={filter} label="Filter" onChange={handleChange}>
                <MenuItem value={"punkte"}>Punkte</MenuItem>
                <MenuItem value={"assists"}>Assists</MenuItem>
                <MenuItem value={"goals"}>Toren</MenuItem>
                <MenuItem value={"rot"}>Rote Karten</MenuItem>
                <MenuItem value={"gelb"}>Gelbe Karten</MenuItem>
                <MenuItem value={"games"}>Spiele</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: { lg: "90%" }, margin: "auto" }}>
            <Grid
              direction="rows"
              container
              spacing={4}
              alignContent="space-between"
            >
              {searchInput.length > 1
                ? filteredResults
                    .sort((a, b) => {
                      if (filter === "punkte") {
                        return b.punkte - a.punkte;
                      } else if (filter === "games") {
                        return b.games - a.games;
                      } else if (filter === "assists") {
                        return b.assists - a.assists;
                      } else if (filter === "goals") {
                        return b.goals - a.goals;
                      } else if (filter === "rot") {
                        return b.rot - a.rot;
                      } else if (filter === "gelb") {
                        return b.gelb - a.gelb;
                      }
                    })
                    .map((player, i) => {
                      if (i < 27) {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <ProfilDisplay
                              firstname={player.firstname}
                              lastname={player.lastname}
                              img={player.image}
                              assists={player.assists}
                              gelbrot={player.gelbrot}
                              rot={player.rot}
                              gelb={player.gelb}
                              tore={player.goals}
                              punkte={player.punkte}
                              verein={player.mannschaft}
                              spiele={player.games}
                              position={player.position}
                            />
                          </Grid>
                        );
                      }
                    })
                : fetchedResult
                    .sort((a, b) => {
                      if (filter === "punkte") {
                        return b.punkte - a.punkte;
                      } else if (filter === "games") {
                        return b.games - a.games;
                      } else if (filter === "assists") {
                        return b.assists - a.assists;
                      } else if (filter === "goals") {
                        return b.goals - a.goals;
                      } else if (filter === "rot") {
                        return b.rot - a.rot;
                      } else if (filter === "gelb") {
                        return b.gelb - a.gelb;
                      }
                    })
                    .map((player, i) => {
                      if (i < 27) {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <ProfilDisplay
                              firstname={player.firstname}
                              lastname={player.lastname}
                              img={player.image}
                              assists={player.assists}
                              gelbrot={player.gelbrot}
                              rot={player.rot}
                              gelb={player.gelb}
                              tore={player.goals}
                              punkte={player.punkte}
                              verein={player.mannschaft}
                              spiele={player.games}
                              position={player.position}
                            />
                          </Grid>
                        );
                      }
                    })}
            </Grid>
          </Box>
        </div>
      </div>
    );
  }
};

export default App;
