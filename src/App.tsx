import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ICredentials } from './interfaces/ICredential';
import { Home } from "./Pages/Home";

import './global.css'
import { CookiesProvider, useCookies } from "react-cookie";
import { Pokemons } from "./Pages/Pokemons";
import { MyTeam } from "./Pages/MyTeam";
import { IPokemonData } from "./interfaces/IPokemonData";


export function App() {
  const [userCredential, setUserCredential] = useState<ICredentials | null>(null)
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [pokemonToTeam, setPokemonToTeam] = useState<IPokemonData[]>([{}])

  const storedCredentials = cookies["cookie-name"]

  useEffect(() => {
    setUserCredential(storedCredentials)
  }, [])


  function saveUserCredentials(credentials: ICredentials) {
    setUserCredential(credentials)
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 60 * 60 * 24;
    now.setTime(expireTime);
    setCookie("cookie-name", JSON.stringify(credentials), { expires: now });
  }

  function handleLogout() {
    setUserCredential(null)
    removeCookie("cookie-name")
  }

  function handleAddPokemonToTeam(pokemon: IPokemonData) {
    if(pokemonToTeam.length < 7) {
      setPokemonToTeam([...pokemonToTeam, pokemon])
    } else {
      setPokemonToTeam([...pokemonToTeam])
    } 
  }

  return (
    <Router>
      <CookiesProvider>
        <Header userCredential={userCredential} saveUserCredentials={saveUserCredentials} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" caseSensitive={false} element={<Home saveUserCredentials={saveUserCredentials} userCredential={userCredential} />} />
          <Route path="/pokemons" caseSensitive={false} element={<Pokemons userCredential={userCredential} saveUserCredentials={saveUserCredentials} handleAddPokemonToTeam={handleAddPokemonToTeam} pokemonToTeam={pokemonToTeam} />} />
          <Route path="/myteam" caseSensitive={false} element={<MyTeam userCredential={userCredential} saveUserCredentials={saveUserCredentials} pokemonToTeam={pokemonToTeam} setPokemonToTeam={setPokemonToTeam}/>} />
        </Routes>
      </CookiesProvider>
    </Router>
  )
}
