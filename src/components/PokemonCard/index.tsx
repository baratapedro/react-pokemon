import { backdropClasses, Card, CardContent, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IPokemonData, IPokemonTypes } from "../../interfaces/IPokemonData";
import { GlobalStylesProps } from "@mui/material/GlobalStyles"
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MagnifyingGlass, Plus } from "phosphor-react";


import styles from './styles.module.css'
import { ICredentials } from "../../interfaces/ICredential";
import { PokemonModal } from "../PokemonModal";


interface PokemonCardProps {
    pokemon: IPokemonData,
    handleAddPokemonToTeam: (pokemon: IPokemonData) => void,
    userCredential: ICredentials | null,
    pokemonToTeam: IPokemonData[]
}

export function PokemonCard({ pokemon, handleAddPokemonToTeam, userCredential, pokemonToTeam }: PokemonCardProps) {
    const [buttonStyle, setButtonStyle] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        if (userCredential) {
            setButtonStyle('buttonLoggedIn')
            setButtonDisabled(false)
        } else {
            setButtonStyle('buttonLoggedOut')
            setButtonDisabled(true)
        }
    }, [])

    const navigate = useNavigate();

    const handleClick = () => {
        if (pokemonToTeam.length <= 6) {
            handleAddPokemonToTeam(pokemon)
            navigate("/myteam");
        } else {
            toast.error('Team is full !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const pokemonsType = pokemon.types!.map<string | undefined>(pokemon => pokemon.type?.name)
    const type1 = pokemonsType[0] as string
    const type2 = pokemonsType[1] as string

    return (
        <Card className={styles.card} key={pokemon.name} >
            <div className={styles.buttons}>

                <div className={styles.info}>
                    <button className={styles[buttonStyle]} disabled={buttonDisabled} onClick={openModal} > <MagnifyingGlass weight="bold" /> </button>
                </div>

                <div className={styles.addToTeam}>
                    <button onClick={handleClick} className={styles[buttonStyle]} disabled={buttonDisabled}> <Plus weight="bold" /> </button>
                </div>

            </div>
            <CardMedia
                component="img"
                image={pokemon.sprites!.front_default}
            />
            <CardContent className={styles.content}>
                <h2>{pokemon.name}</h2>
                <div className={styles.types}>
                    {
                        pokemonsType.map(type => {
                            if(type) {
                                return (
                                    <span className={styles[type]}>{type}</span>
                                )
                            }                           
                        })
                    }
                </div>
            </CardContent>
            <ToastContainer />
            <PokemonModal modalIsOpen={modalIsOpen} closeModal={closeModal} pokemon={pokemon} pokemonsType={pokemonsType} />
        </Card>
    );
}