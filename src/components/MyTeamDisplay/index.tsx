import { useEffect, useState } from "react";
import { ICredentials } from "../../interfaces/ICredential";
import { IPokemonData } from "../../interfaces/IPokemonData";
import { MyTeamCard } from "../MyTeamCard";

import styles from './styles.module.css'

interface MyTeamProps {
    saveUserCredentials: (credentials: ICredentials) => void,
    userCredential: ICredentials | null,
    pokemonToTeam: IPokemonData[],
    setPokemonToTeam: React.Dispatch<React.SetStateAction<IPokemonData[]>>
}

export function MyTeamDisplay({ saveUserCredentials, userCredential, pokemonToTeam, setPokemonToTeam }: MyTeamProps) {

    const interrogation = './images/interrogation.svg'

    const pokemonTeam = [{}, {}, {}, {}, {}, {}]

    return userCredential ? (
        <div className={styles.containerLoggedIn}>
            {
                pokemonToTeam.map(pokemon => {
                    if (!pokemon.name) {
                        return <MyTeamCard  pokemon={pokemon} image={interrogation}  pokemonToTeam={pokemonToTeam} userCredential={userCredential} setPokemonToTeam={setPokemonToTeam}/>
                    } else {
                        return <MyTeamCard  pokemon={pokemon} image={pokemon.sprites?.front_default} name={pokemon.name} pokemonToTeam={pokemonToTeam} userCredential={userCredential} setPokemonToTeam={setPokemonToTeam}/>
                    }


                })
            }
        </div>
    ) : (
        <div className={styles.containerLoggedOut}>
            {
                pokemonTeam.map(pokemon => {
                    return <MyTeamCard image={interrogation} userCredential={userCredential} pokemonToTeam={pokemonToTeam} setPokemonToTeam={setPokemonToTeam}/>
                })
            }
        </div>
    )
}