import { ICredentials } from '../../interfaces/ICredential'
import { AccountName } from '../AccountName'
import styles from './styles.module.css'
import {  Link, useLocation, useParams } from 'react-router-dom'
import { ActiveLink } from '../ActiveLink'


interface HeaderProps {
    userCredential: ICredentials | null,
    saveUserCredentials: (credentials: ICredentials) => void,
    handleLogout: () => void
}

export function Header({ userCredential, saveUserCredentials, handleLogout }: HeaderProps) {   
    const path = useLocation().pathname
    
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.png" alt="Logo" className={styles.logo}/>
                <nav>             
                <ActiveLink activeClassName={styles.active} to={'/'} >
                        <a>Home</a>
                    </ActiveLink>     
                    
                    <ActiveLink activeClassName={styles.active} to={'/pokemons'} >
                        <a>Pokémons</a>
                    </ActiveLink>   

                     <ActiveLink activeClassName={styles.active} to={'/myteam'} >
                        <a>My Team</a>
                    </ActiveLink>             
                </nav>
                <AccountName userCredential={userCredential} saveUserCredentials={saveUserCredentials} handleLogout={handleLogout} />
            </div>
        </header>
    )
}