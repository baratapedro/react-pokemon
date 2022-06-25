import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Autocomplete, Box, TextField } from '@mui/material';
import { IPokemonData, Move } from '../../interfaces/IPokemonData';
import axios from 'axios'

import styles from './styles.module.css'
import { IMoves } from '../../interfaces/IMoves';

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
  const [selectedMove, setSelectedMove] = useState<Move>({} as Move)
  const [moveData, setMoveData] = useState<IMoves>()

  const abilitiesClassName = `abilities${pokemon.abilities.length}`

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
      const move: IMoves = await axios.get(selectedMove.move.url).then(response => response.data)
      setMoveData(move)
    }
    getMoveData()
  }, [selectedMove])
  console.log(moveData)
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
          <Autocomplete
            disablePortal
            options={movesList}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Moves" />}
            onChange={(event: any, newValue: string | null) => setValue(newValue)}
            freeSolo
            ListboxProps={{ style: { height: 150 } }}
          />
          {
            value ? (
              <>
                <div className={styles.move}>
                  <span className={styles[moveData?.type.name!]}>{moveData?.type.name}</span>
                  <span>{moveData?.damage_class.name}</span>
                </div>
                <div className={styles.move}>
                <span>Accuracy: {moveData?.accuracy == null ? '-' : moveData?.accuracy}</span>
                  <span>Power: {moveData?.power == null ? '-' : moveData?.power}</span>
                  <span>PP: {moveData?.pp}</span>
                </div>
                <span className={styles.moveDescription}>{moveData?.effect_entries[0].effect}</span>
              </>
            ) : (
              <></>
            )
          }
        </div>
      </div>

    </Modal>
  );
}