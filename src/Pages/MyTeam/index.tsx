import { LoginButton } from "../../components/LoginButton"
import { MyTeamDisplay } from "../../components/MyTeamDisplay"
import { ICredentials } from "../../interfaces/ICredential"
import { IPokemonData } from "../../interfaces/IPokemonData"

import styles from './styles.module.css'

interface MyTeamProps {
    saveUserCredentials: (credentials: ICredentials) => void,
    userCredential: ICredentials | null,
    pokemonToTeam: IPokemonData[],
    setPokemonToTeam: React.Dispatch<React.SetStateAction<IPokemonData[]>>
}


export function MyTeam({ saveUserCredentials, userCredential, pokemonToTeam, setPokemonToTeam }: MyTeamProps) {
    return userCredential? (
        <MyTeamDisplay saveUserCredentials={saveUserCredentials} userCredential={userCredential} pokemonToTeam={pokemonToTeam} setPokemonToTeam={setPokemonToTeam} />
    ) : (
        <>
            <MyTeamDisplay userCredential={userCredential} saveUserCredentials={saveUserCredentials} pokemonToTeam={pokemonToTeam} setPokemonToTeam={setPokemonToTeam} />
            <div className={styles.container}>
            <h1>Connect to view your favorite Pokémons!</h1 >
            <LoginButton saveUserCredentials={saveUserCredentials} userCredential={userCredential}/>           
        </div>
        </>
    )
}