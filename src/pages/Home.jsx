import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import axios from "axios";
import PokemonCard from '../components/PokemonCard';
import { Skeletons } from "../components/Skeletons";
import { Container, Grid, Box, Pagination } from "@mui/material";
import Typography from '@mui/material/Typography';

export const Home = () => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;

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
        setCurrentPage(1);
    };

    const filteredPokemons = allPokemons.filter((pokemon) => pokemon.name.includes(filterName));

    // Calcular a fatia de pokémons a ser exibida na página atual
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Navbar pokemonFilter={handleFilterChange} />
            <Container maxWidth="lg" sx={{ backgroundColor:"rgba(200, 0, 0, 50%)", borderRadius:"10px", padding:"2em 1em 1em 1em"}}>
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
                            currentPokemons.map((pokemon, key) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                                    <PokemonCard
                                        name={pokemon.name}
                                        image={pokemon.sprites.other["official-artwork"].front_default}
                                        types={pokemon.types}
                                    />
                                </Grid>
                            ))
                        )
                    )}
                </Grid>
                <Box display="flex" justifyContent="center" marginTop={2}>
                    {filteredPokemons.length > pokemonsPerPage && (
                        <Pagination
                            count={Math.ceil(filteredPokemons.length / pokemonsPerPage)}
                            variant="outlined" shape="rounded"
                            page={currentPage}
                            onChange={(event, page) => paginate(page)}
                            sx={{backgroundColor:"white", borderRadius:"0.3em", padding:"0.3em 0.2em"}}
                        />
                    )}
                </Box>
            </Container>
        </div>
    )
}