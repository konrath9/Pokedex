import React from "react";
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Container, Grid } from "@mui/material";

export const Home = () => {
    return (
        <div>
            <Navbar />
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={3}>
                        <PokemonCard />
                    </Grid>
                    <Grid item xs={3}>
                        <PokemonCard />
                    </Grid>
                    <Grid item xs={3}>
                        <PokemonCard />
                    </Grid>
                    <Grid item xs={3}>
                        <PokemonCard />
                    </Grid>
                </Grid>
                
            </Container>
        </div>  
    )
}