import { FiX } from 'react-icons/fi'
import { useEffect } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'

import styles from './styles.module.css'
import { ICredentials } from '../../interfaces/ICredential'

interface AccountNameProps {
    userCredential: ICredentials | null,
    saveUserCredentials: (credentials: ICredentials) => void,
    handleLogout: () => void
}

export function AccountName({ userCredential, saveUserCredentials, handleLogout }: AccountNameProps) {
    
    return userCredential != null ? (
        <div className={styles.contentLoggedIn}>            
            <img src="/images/open-pokeball.png" alt="" />
            <span>{userCredential.name}</span>
            <FiX color="#737380" className={styles.closeIcon} onClick={handleLogout}/>
        </div >
    ) : (
        <div className={styles.contentLoggedOut}>           
            <img src="/images/pokeball.png" alt="" />
            <span>
            <GoogleOAuthProvider clientId="54869985296-ttckvq07hsv6t6hcupuv1fb2cdf2t2dp.apps.googleusercontent.com" >
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            saveUserCredentials(jwt_decode(credentialResponse.credential!));
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        
                        size='medium'
                        shape='circle'
                    />
                </GoogleOAuthProvider>
                </span>
                
        </div >
    )
}