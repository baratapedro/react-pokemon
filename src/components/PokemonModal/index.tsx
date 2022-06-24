import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
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
  const abilitiesClassName = `abilities${pokemon.abilities.length}`

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
        </div>
      </div>

    </Modal>
  );
}