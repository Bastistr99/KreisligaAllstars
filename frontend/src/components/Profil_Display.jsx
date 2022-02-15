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

const ProfilDisplay = ({
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
  }) => {
    const [expanded, setExpanded] = React.useState(false);
  
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
      <Card sx={{ width: 300 }}>
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

export default ProfilDisplay;
