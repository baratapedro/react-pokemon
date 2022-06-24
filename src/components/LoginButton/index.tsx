import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import { ICredentials } from '../../interfaces/ICredential';

import styles from './styles.module.css'

interface LoginButtonProps {
    saveUserCredentials: (credentials: ICredentials) => void,
    userCredential: ICredentials | null,
}

export function LoginButton({ saveUserCredentials, userCredential }: LoginButtonProps) {
    return userCredential != null ? (
        <button type='button' className={styles.button} >
            <a href="/myteam">Let's build your team !</a>
        </button>     
    ) : (
        <button
            type='button'
            className={styles.button}
        >Gotta Catch 'Em All !

            <div className={styles.login}>
                <GoogleOAuthProvider clientId="54869985296-ttckvq07hsv6t6hcupuv1fb2cdf2t2dp.apps.googleusercontent.com" >
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            saveUserCredentials(jwt_decode(credentialResponse.credential!));
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                       type="icon"
                        shape='circle'
                        size='medium'
                    />
                </GoogleOAuthProvider>
            </div>
        </button>
    );
}