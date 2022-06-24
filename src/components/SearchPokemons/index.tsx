import { Autocomplete, TextField } from '@mui/material';
import { IPokemonData } from '../../interfaces/IPokemonData';
import axios from 'axios'

import styles from './styles.module.css'
import { IPokemonList } from '../../interfaces/IPokemonList';
import { IResults } from '../../interfaces/IResults';
import { useState } from 'react';

interface SearchPokemonsProps {
    pokemonsName: string[],
    setValue: React.Dispatch<React.SetStateAction<string | null>>,
    allPokemons: IPokemonData[],
    setAllPokemons: React.Dispatch<React.SetStateAction<IPokemonData[]>>,
    pokemonList: IResults[],
    value: string | null,
}

export function SearchPokemons({ pokemonsName, setValue,  allPokemons, setAllPokemons, pokemonList, value }: SearchPokemonsProps) {

    async function handleSearchSelectedPokemon() {        
            const selectedPokemon: IResults = pokemonList.find(pokemon => value == pokemon.name)!
            const pokemonId: number = await axios.get(selectedPokemon?.url!).then(response => response.data.id)
            const listWithPokemonSelected = await axios.get<IPokemonList>(`https://pokeapi.co/api/v2/pokemon?offset=${pokemonId - 1}&limit=1`).then(response => response.data.results)
            const newPokemonsUrl = listWithPokemonSelected.map(pokemon => pokemon.url as string)
            const newPokemonsData = await Promise.all(newPokemonsUrl.map(url => axios.get<IPokemonData>(url).then(response => response.data)))
  
            setAllPokemons(newPokemonsData)             
    }

    async function handleBackToAllPokemons() {
        const listWithAllPokemons = await axios.get<IPokemonList>(`https://pokeapi.co/api/v2/pokemon?offset=0`).then(response => response.data.results)
        const allPokemonsUrl = listWithAllPokemons.map(pokemon => pokemon.url as string)
        const allPokemonsData = await Promise.all(allPokemonsUrl.map(url => axios.get<IPokemonData>(url).then(response => response.data)))
        setAllPokemons(allPokemonsData)
        
    }


    return (
        <div className={styles.container}>
            <Autocomplete
                disablePortal
                options={pokemonsName}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Pokémons" />}
                onChange={(event: any, newValue: string | null) => setValue(newValue)}
                freeSolo
                className={styles.input}
            />
            {
               allPokemons.length == 1 ? (
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={handleBackToAllPokemons} >
                            Back
                        </button>

                        <button className={styles.button} onClick={handleSearchSelectedPokemon}>
                        Search
                    </button> 
                    </div>                
                ) : (
                    <button className={styles.button} onClick={handleSearchSelectedPokemon}>
                        Search
                    </button>                
                )
            }

        </div>
    );
}