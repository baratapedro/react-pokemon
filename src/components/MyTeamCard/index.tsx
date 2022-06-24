import { Card, CardContent, CardMedia } from "@mui/material";
import { ICredentials } from "../../interfaces/ICredential";
import { IPokemonData } from "../../interfaces/IPokemonData";
import { useNavigate } from "react-router-dom";
import { Trash } from "phosphor-react";

import styles from './styles.module.css'
import { useEffect, useState } from "react";

interface MyTeamCardProps {
    pokemon?: IPokemonData,
    image?: string,
    name?: string,
    pokemonToTeam: IPokemonData[],
    userCredential: ICredentials | null,
    setPokemonToTeam: React.Dispatch<React.SetStateAction<IPokemonData[]>>
}

export function MyTeamCard({ pokemon, image, name, pokemonToTeam, userCredential, setPokemonToTeam }: MyTeamCardProps) {
    const [buttonStyle, setButtonStyle] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        if (userCredential) {
            setButtonStyle('buttonLoggedIn')
            setButtonDisabled(false)
        } else {
            setButtonStyle('')
            setButtonDisabled(true)
        }
    }, [userCredential])

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/pokemons");
    }

    const pokemonsType = pokemon?.types?.map(slot => slot.type?.name)

    function handleDeletePokemonFromTeam(poke: IPokemonData) {
        const filteredPokemon = pokemonToTeam.filter(pokemon => pokemon.name != poke.name)
        setPokemonToTeam(filteredPokemon)
    }

    return pokemon?.name ? (
        <Card className={styles.card}>
            <div className={styles.deleteFromTeam}>
                <button className={styles[buttonStyle]} disabled={buttonDisabled} onClick={() => handleDeletePokemonFromTeam(pokemon)}> <Trash /> </button>
            </div>
            <CardMedia
                component="img"
                image={image}
            />
            <CardContent className={styles.content}>
                <h2>{name}</h2>
                <div className={styles.types}>
                    {
                        pokemonsType?.map(type => (
                            <span className={styles[type!]}>{type}</span>
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    ) : (
        pokemonToTeam.length < 7 ? (
            <Card className={styles.card}>
                <CardMedia
                    component="img"
                    image={image}
                />
                <CardContent className={styles.content}>
                    <button className={styles[buttonStyle]} disabled={buttonDisabled} onClick={handleClick} >Select your Pokémon ! </button>
                </CardContent>
            </Card>
        ) : (<></>)

    )

}