import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import axios from "axios";
import PokemonCard from '../components/PokemonCard';
import { Skeletons } from "../components/Skeletons";
import { Container, Grid, Box } from "@mui/material";
import Typography from '@mui/material/Typography';

export const Home = () => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        getAllPokemons();
    }, []);

    const getAllPokemons = async () => {
        try {
            const endpoints = Array.from({ length: 200 }, (_, index) => `https://pokeapi.co/api/v2/pokemon/${index + 1}/`);
            const responses = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
            const pokemonData = responses.map((res) => res.data);
            setAllPokemons(pokemonData);
        } catch (error) {
            console.error('Error fetching pokemons:', error);
        }
    };

    const handleFilterChange = (name) => {
        setFilterName(name.toLowerCase());
    };

    const filteredPokemons = allPokemons.filter((pokemon) => pokemon.name.includes(filterName));

    return (
        <div>
            <Navbar pokemonFilter={handleFilterChange} />
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    {allPokemons.length === 0 ? (
                        <Skeletons />
                    ) : (
                        filteredPokemons.length === 0 ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="30vh" width="100vw">
                                <Typography gutterBottom variant="h3" component="div">
                                    No pokemons found
                                </Typography>
                            </Box>
                        ) : (
                            filteredPokemons.map((pokemon, key) => (
                                <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                                    <PokemonCard
                                        name={pokemon.name}
                                        image={pokemon.sprites.front_default}
                                        types={pokemon.types}
                                    />
                                </Grid>
                            ))
                        )
                    )}
                </Grid>
            </Container>
        </div>
    )
}