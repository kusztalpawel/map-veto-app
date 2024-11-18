import React, { useState } from 'react';
import './App.css';
import Title from './Title/Title';
import CustomizeMaps from './CustomizeMaps/CustomizeMaps';
import Teams from './Teams/Teams';
import Veto from './Veto/Veto';
import Ancient from './Images/Maps/ancient.png'
import Anubis from './Images/Maps/anubis.png'
import Dust2 from './Images/Maps/dust2.png'
import Inferno from './Images/Maps/inferno.png'
import Mirage from './Images/Maps/mirage.png'
import Nuke from './Images/Maps/nuke.png'
import Vertigo from './Images/Maps/vertigo.png';
import GitHubLogo from './Images/github-mark.png'
import EmailIcon from './Images/email_icon.png'

function App() {
  const [show, setShow] = useState<number>(0); 
  const [mapsNumber, setMapsNumber] = useState<number>(0);
  const [teams, setTeams] = useState<string[]>(["", ""]);
  const [maps, setMaps] = useState<{name: string; img: string;}[]>([{name: "Ancient", img: Ancient},
                                                                    {name: "Anubis", img: Anubis}, 
                                                                    {name: "Dust 2", img: Dust2}, 
                                                                    {name: "Inferno", img: Inferno}, 
                                                                    {name: "Mirage", img: Mirage}, 
                                                                    {name: "Nuke", img: Nuke}, 
                                                                    {name: "Vertigo", img: Vertigo}]);

  return (
    <div className="App">
      <Title isActive = {show === 0} showMaps = {() => setShow(1)} showVeto = {() => setShow(2)} setMapsNumber = {setMapsNumber}/>
      <CustomizeMaps isActive = {show === 1} showTitle = {() => setShow(0)} setMaps = {setMaps} maps={maps}/>
      <Teams isActive = {show === 2} showVeto = {() => setShow(3)} showTitle = {() => setShow(0)} teams = {teams} setTeams = {setTeams}/>
      <Veto isActive = {show === 3} showTitle = {() => setShow(0)} mapsNumber = {mapsNumber} maps={maps} teams = {teams} setTeams = {setTeams}/>
      <footer>
        CS2 Map veto site by Paweł Kusztal
        <a className="Git" href="mailto:pawel42000@gmail.com"><img className="GitImage" src={EmailIcon} alt="GitHub" /></a>
        <a className="Git" href="https://github.com/kusztalpawel"><img className="GitImage" src={GitHubLogo} alt="GitHub" /></a>
      </footer>
    </div>
  );
}

export default App;