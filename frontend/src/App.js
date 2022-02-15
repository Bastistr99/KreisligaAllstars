import React, { useEffect, useState } from "react";
import Profil from "./components/Profil";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import GoogleLogin from 'react-google-login';


const App = () => {
  const [fetchedResult, setFetchedResult] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("punkte");
  const [addplayerid, setAddPlayerId] = useState("");
  const [mannschaft, setMannschaft] = useState([]);
  const [loggedin, setLoggedIn] = useState(false)
  const [uid, setUid] = useState("")

  const url = "http://127.0.0.1:5000/players";

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/player/${addplayerid}`).then((res) => {
      setMannschaft((arr) => [
        ...arr,
        {
          _id: res.data[0]._id,
          punkte: res.data[0].punkte,
          position: res.data[0].position,
        },
      ]);
    });
  }, [addplayerid]);

  const removePlayer = (id) => {
    const removeArr = [...mannschaft].filter((player) => player._id !== id);
    setMannschaft(removeArr);
  };

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

  const handleLogin = (logindata) => {
    console.log(logindata)
    setLoggedIn(true)
    setUid(logindata.profileObj.googleId)
  }

  if (error) {
    return <>{error.message}</>;
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      <div>
        {loggedin? (<div>
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
        {mannschaft.length === 10 ? (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              marginBottom: "4vh",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginRight: "20px" }}
              onClick={()=> axios.post(`http://127.0.0.1:5000/mannschaft/${uid}`, {
                      "players": JSON.stringify(mannschaft),
                      "id": JSON.stringify(uid)
                    }).then(res=>console.log(res))
                  }
            >
              Mannschaft absenden
              <SendIcon sx={{ marginLeft: "5px" }} />
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              marginBottom: "4vh",
            }}
          >
            <Button variant="outlined" disabled>
              Mannschaft absenden
              <SendIcon sx={{ marginLeft: "5px" }} />
            </Button>
          </Box>
        )}
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
                    if (i < 21) {
                      return (
                        <Grid item xs={12} sm={4}>
                          <Profil
                            id={player._id}
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
                            mannschaft={mannschaft}
                            onAdd={(playerid) => {
                              setAddPlayerId(playerid);
                            }}
                            onRemove={removePlayer}
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
                    if (i < 21) {
                      return (
                        <Grid item xs={12} sm={4}>
                          <Profil
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
                            mannschaft={mannschaft}
                            id={player._id}
                            onAdd={(playerid) => {
                              setAddPlayerId(playerid);
                            }}
                            onRemove={removePlayer}
                          />
                        </Grid>
                      );
                    }
                  })}
          </Grid>
        </Box>
        </div>) : ( <GoogleLogin clientId={process.env.REACT_APP_CLIENT_ID} onSuccess={handleLogin} /> )}
      </div>
    );
  }
};

export default App;
