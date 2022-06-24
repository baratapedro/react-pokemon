import { LoginButton } from "../../components/LoginButton";
import { ICredentials } from "../../interfaces/ICredential";
import axios from 'axios'
import { useEffect, useState } from "react";
import { PokemonDisplay } from "../../components/PokemonDisplay";

import styles from './styles.module.css'
import { IPokemonList } from "../../interfaces/IPokemonList";
import { IPokemonData } from "../../interfaces/IPokemonData";

interface PokemonsProps {
    saveUserCredentials: (credentials: ICredentials) => void,
    userCredential: ICredentials | null,
    handleAddPokemonToTeam: (pokemon: IPokemonData) => void,
    pokemonToTeam: IPokemonData[]
}


export function Pokemons({ userCredential, saveUserCredentials, handleAddPokemonToTeam, pokemonToTeam }: PokemonsProps) {

    return userCredential ? (
        <PokemonDisplay userCredential={userCredential} handleAddPokemonToTeam={handleAddPokemonToTeam} pokemonToTeam={pokemonToTeam}/>
    ) : (

        <>
            <PokemonDisplay userCredential={userCredential} handleAddPokemonToTeam={handleAddPokemonToTeam} pokemonToTeam={pokemonToTeam}/>
            <div className={styles.container}>
            <h1>Connect to view your favorite Pokémons!</h1 >
            <LoginButton saveUserCredentials={saveUserCredentials} userCredential={userCredential}/>           
        </div>
        </>
    )
}