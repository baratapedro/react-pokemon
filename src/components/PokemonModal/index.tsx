import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Autocomplete, Box, TextField } from '@mui/material';
import { IPokemonData } from '../../interfaces/IPokemonData';

import styles from './styles.module.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden'
  },
};

Modal.setAppElement('#root');

interface PokemonModalProps {
  modalIsOpen: boolean,
  closeModal: () => void,
  pokemon: IPokemonData,
  pokemonsType: (string | undefined)[]
}

export function PokemonModal({ modalIsOpen, closeModal, pokemon, pokemonsType }: PokemonModalProps) {

  
  const [value, setValue] = useState<string | null>(null)
  const [movesList, setMovesList] = useState<string[]>(['', ''])

  const abilitiesClassName = `abilities${pokemon.abilities.length}`
  

  useEffect(() => {
    const moves = pokemon.moves.map(move => move.move.name as string)
    setMovesList(moves)
  }, [])

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="pokémon"
      style={customStyles}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} className={styles.image} />
          <strong>{pokemon.name}</strong>
          <div className={styles.types}>
            {
              pokemonsType.map(type => {
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
          <div className={styles.abilities}>
            <span>Abilities: </span>
            <div className={styles[abilitiesClassName]}>
              {
                pokemon.abilities.map(ability => {
                  return (
                    <span>{ability.ability.name}</span>
                  )
                })
              }
            </div>
          </div>
          <div className={styles.autocomplete}>
          <Autocomplete
                disablePortal
                options={movesList}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Moves" />}
                onChange={(event: any, newValue: string | null) => setValue(newValue)}
                freeSolo
                className={styles.input}
                ListboxProps={{style: { height: 150 }}}
            />
          </div>
        </div>
      </div>

    </Modal>
  );
}