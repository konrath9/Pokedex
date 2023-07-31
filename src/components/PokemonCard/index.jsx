import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';

export default function PokemonCard({ name, image, types }) {

  const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  
  const typeHandler = () => {
    const typesJSX = types.slice(0, 2).map((type) => (
      <Typography
        key={type.type.name}
        gutterBottom
        variant="caption"
        component="div"
        padding="0.3em 1em 0.1em 1em"
        borderRadius="1em"
        sx={{
          textTransform: 'capitalize',
          textAlign: "center",
          margin: "0 0.3em",
          backgroundColor: typeColors[type.type.name],
          fontWeight: 'bold',
          color: 'white'
        }}
      >
        {type.type.name}
      </Typography>
    ));

    return typesJSX;
  };  

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent sx={{ padding: "0 0 1em 0" }}>
          <Box display="inline" alignItems="center">
            <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize', textAlign: "center", margin: "0",fontWeight: 'bold' }}>
              {name}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" marginTop="0.5em">
            {typeHandler()}
          </Box>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
    </Card>
  );
}