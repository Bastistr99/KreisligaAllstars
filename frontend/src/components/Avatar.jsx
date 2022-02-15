import React from 'react';
import Avatar from '@mui/material/Avatar';
import { green, lightBlue, red, yellow } from '@mui/material/colors';

const CardAvatar = ({punkte}) => {

    if(punkte < 50){
        return (
            <div>
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {punkte}
                </Avatar>
            </div>
        );
    } else if (punkte < 100) {
        return (
            <div>
                <Avatar sx={{ bgcolor: yellow[500] }} aria-label="recipe">
                      {punkte}
                </Avatar>
            </div>
        );
    } else if (punkte < 200){
        return (
            <div>
                <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                      {punkte}
                </Avatar>
            </div>
        );
    } else {
        return (
            <div>
                <Avatar sx={{ bgcolor: lightBlue[500] }} aria-label="recipe">
                      {punkte}
                </Avatar>
            </div>
        );
    }
}

export default CardAvatar;
