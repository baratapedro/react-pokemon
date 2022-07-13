import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Autocomplete, Box, TextField } from '@mui/material';
import { IPokemonData, Move } from '../../interfaces/IPokemonData';
import axios from 'axios'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import styles from './styles.module.css'
import { Trash, X } from 'phosphor-react';
import { IMoves } from '../../interfaces/IMoves';

Modal.setAppElement('#root');

interface PokemonModalProps {
    modalIsOpen: boolean,
    closeModal: () => void,
    pokemon: IPokemonData,
    pokemonsType: string[] | undefined
}

export function MyTeamModal({ modalIsOpen, closeModal, pokemon, pokemonsType }: PokemonModalProps) {
    const [value, setValue] = useState<string | null>(null)
    const [movesList, setMovesList] = useState<string[]>(['', ''])
    const [selectedMove, setSelectedMove] = useState<Move>()
    const [moveData, setMoveData] = useState<IMoves[]>([])


    useEffect(() => {
        const moves = pokemon.moves.map(move => move.move.name as string)
        setMovesList(moves)      
    }, [])

    useEffect(() => {
        const move = pokemon.moves.find(move => move.move.name == value) as Move
        setSelectedMove(move)        
    }, [value])

    useEffect(() => {
        async function getMoveData() {
            if(selectedMove) {
                const move: IMoves = await axios.get(selectedMove.move.url).then(response => response.data)
                setMoveData([...moveData, move])
            } else {
                setMoveData([])
            }            
        }
        getMoveData()
    }, [selectedMove])

    useEffect(() => {
        const savedMoveData = JSON.parse(localStorage.getItem(`${pokemon.name}` )!)
        setMoveData(savedMoveData)
    }, [modalIsOpen])

    useEffect(() => {
        localStorage.setItem(`${pokemon.name}`, JSON.stringify(moveData));
    }, [moveData.length])

    function handleDeleteMove(selectedMove: string) {
        const newMoveSet = moveData.filter(move => move.name != selectedMove)
        setMoveData(newMoveSet)
        localStorage.removeItem(`${pokemon.name}`)
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="pokémon"
            className={styles.modal}
        >
            <X className={styles.close} onClick={closeModal} />
            <div className={styles.container}>
                <div className={styles.content}>
                    <img src={pokemon.sprites?.front_default} alt={pokemon.name} className={styles.image} />
                    <strong>{pokemon.name}</strong>
                    <div className={styles.types}>
                        {
                            pokemonsType?.map(type => {
                                if (type) {
                                    return (
                                        <span className={styles[type]}>{type}</span>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div className={styles.content}>
                    {
                        moveData && moveData.length < 4 ? (
                            <Autocomplete
                                disablePortal
                                options={movesList}
                                sx={{ width: 250 }}
                                renderInput={(params) => <TextField {...params} label="Select your moves" />}
                                onChange={(event: any, newValue: string | null) => setValue(newValue)}
                                freeSolo
                                ListboxProps={{ style: { height: 150 } }}
                            />
                        ) : (
                            <span>Click on skills to get more info</span>
                        )
                    }
                    { 
                        moveData.map(move => {
                            return (
                                <Accordion
                                    key={move.name}
                                    className={styles.accordion} >
                                    <AccordionSummary>
                                        <Typography className={styles.typography}>
                                            <span>{move.name}</span>
                                            <span className={styles[move.type.name]}>{move.type.name}</span>
                                            <Trash onClick={() => handleDeleteMove(move.name)} className={styles.delete} />
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <div className={styles.move}>
                                                <span>Accuracy: {move.accuracy ? move.accuracy : '-'}</span>
                                                <span>Power: {move.power ? move.power : '-'}</span>
                                                <span>PP: {move.pp}</span>
                                            </div>
                                            {move.effect_entries[0].effect}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    }

                </div>
            </div>
        </Modal>
    );
}