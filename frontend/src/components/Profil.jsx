import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardAvatar from "./Avatar";
import Stats from "./Stats";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { Collapse } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PanToolIcon from '@mui/icons-material/PanTool';
import axios from "axios";

const Profil = ({
  punkte,
  lastname,
  firstname,
  img,
  position,
  tore,
  spiele,
  assists,
  gelb,
  rot,
  gelbrot,
  verein,
  id,
  onAdd,
  onRemove,
  uid,
  mannschaft
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    display: "flex",
    alignContent: "right",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardHeader
        sx={{ borderBottom: "1px solid black", marginBottom: "1vh" }}
        avatar={<CardAvatar punkte={punkte} />}
        title={<Typography variant="h6">{lastname}</Typography>}
        subheader={<Typography variant="body1">{firstname}</Typography>}
      />
      <CardMedia
        component="img"
        sx={{ maxWidth: 150, margin: "auto" }}
        image={img}
        alt={firstname + lastname}
      />
      <CardContent>
        {!isClicked ? (
          <div>
            {mannschaft.length < 10 ? (
              <div>
                <Fab
                  color="success"
                  onClick={() => {
                    onAdd(id);
                    setIsClicked(true);
                  }}
                >
                  <AddIcon />
                </Fab>
              </div>
            ) : (
              <div>
              <Fab color="warning" sx={{marginBottom: "2vh"}} > 
                <PanToolIcon />
              </Fab>
              <Typography variant="body2">
              Bereits 11 Spieler ausgewählt
              </Typography>
              </div>
            )}
          </div>
        ) : (
          <Fab
            color="error"
            onClick={() => {
              onRemove(id);
              setIsClicked(false);
            }}
          >
            <DeleteOutlineIcon />
          </Fab>
        )}
      </CardContent>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stats
            position={position}
            verein={verein}
            spiele={spiele}
            tore={tore}
            assists={assists}
            gelb={gelb}
            gelbrot={gelbrot}
            rot={rot}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Profil;
