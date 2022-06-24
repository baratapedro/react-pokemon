import { ICredentials } from "../../interfaces/ICredential";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { FiArrowRight } from 'react-icons/fi'
import styles from './styles.module.css'
import { IPokemonData } from "../../interfaces/IPokemonData";
import { NextAndPreviousButton } from "../NextAndPreviousButton";
import { PokemonCard } from "../PokemonCard";
import React, { useEffect, useState } from "react";
import { SearchPokemons } from "../SearchPokemons";
import { IPokemonList } from "../../interfaces/IPokemonList";
import axios from 'axios'
import { IResults } from "../../interfaces/IResults";

interface PokemonDisplayProps {
    userCredential: ICredentials | null,
    handleAddPokemonToTeam: (pokemon: IPokemonData) => void,
    pokemonToTeam: IPokemonData[]
}

export function PokemonDisplay({ userCredential, handleAddPokemonToTeam, pokemonToTeam }: PokemonDisplayProps) {

    const [tenPokemons, setTenPokemons] = useState<IPokemonData[]>([])
    const [allPokemons, setAllPokemons] = useState<IPokemonData[]>([])
    const [offset, setOffset] = useState(0)

    const [value, setValue] = useState<string | null>(null)
    const [pokemonsName, setPokemonsName] = useState<string[]>([''])
    const [pokemonList, setPokemonList] = useState<IResults[]>([{}])

    

    useEffect(() => {
        async function getPokemonData(offset: number) {
            const listWithTenPokemons = await axios.get<IPokemonList>(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`).then(response => response.data.results)
            const tenPokemonsUrl = listWithTenPokemons.map(pokemon => pokemon.url as string)
            const tenPokemonsData = await Promise.all(tenPokemonsUrl.map(url => axios.get<IPokemonData>(url).then(response => response.data)))
            setTenPokemons(tenPokemonsData)

            const listWithAllPokemons = await axios.get<IPokemonList>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`).then(response => response.data.results)
            const allPokemonsUrl = listWithAllPokemons.map(pokemon => pokemon.url as string)
            const allPokemonsData = await Promise.all(allPokemonsUrl.map(url => axios.get<IPokemonData>(url).then(response => response.data)))

            setAllPokemons(allPokemonsData)
        }

        getPokemonData(offset)
    }, [offset])

    useEffect(() => {
        async function getAllPokemonsName() {
            const allPokemonsList = await axios.get<IPokemonList>(`https://pokeapi.co/api/v2/pokemon?limit=1000`).then(response => response.data.results)
            setPokemonList(allPokemonsList)
            const nameList = allPokemonsList.map(pokemon => pokemon.name as string)
            setPokemonsName(nameList)
        }
        getAllPokemonsName()
    }, [])

    return userCredential ? (
        <>
            <div className={styles.search}>
                <SearchPokemons pokemonsName={pokemonsName} setValue={setValue} pokemonList={pokemonList} allPokemons={allPokemons} setAllPokemons={setAllPokemons} value={value} />
            </div>

            <div className={allPokemons.length > 1 ? styles.containerLoggedIn : styles.containerSelectedPokemon}>
                {
                    allPokemons.map(pokemon => {
                        return <PokemonCard pokemon={pokemon} handleAddPokemonToTeam={handleAddPokemonToTeam} userCredential={userCredential} pokemonToTeam={pokemonToTeam}/>
                    })
                }
            </div>
            <footer>
                {
                    allPokemons.length > 1 ? (
                        <NextAndPreviousButton setOffset={setOffset} offset={offset} />
                    ) : ('')
                }
            </footer>
        </>
    ) : (
        <div className={styles.containerLoggedOut}>
            {
                tenPokemons.map(pokemon => {
                    return <PokemonCard pokemon={pokemon} handleAddPokemonToTeam={handleAddPokemonToTeam} userCredential={userCredential} pokemonToTeam={pokemonToTeam} />
                })
            }
        </div>
    );
}