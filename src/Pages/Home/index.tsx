import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode  from 'jwt-decode'
import { LoginButton } from '../../components/LoginButton';
import { ICredentials } from '../../interfaces/ICredential';

import styles from './styles.module.css'

interface HomeProps {
    saveUserCredentials: (credentials: ICredentials) => void,
    userCredential: ICredentials | null,
}

export function Home({ saveUserCredentials, userCredential }: HomeProps) {
    return(        
    <main className={styles.contentContainer}>
    <section className={styles.mainContent}>
      <h1>
      The best <img src="/images/logo.png" alt="Pokémon logo" /> database! 
      </h1>
      <p>Build your team and find out all about your favorite Pokémons! </p>

      <LoginButton saveUserCredentials={saveUserCredentials} userCredential={userCredential} />
    </section>
    <img src="/images/pikachu.png" alt="Pokémon logo"/>
  </main>
    )
}