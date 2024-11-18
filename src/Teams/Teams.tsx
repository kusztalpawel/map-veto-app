import React, { useState } from 'react';
import './Teams.css';

const Teams = ({isActive, showVeto, showTitle, teams, setTeams} : {isActive: boolean, showVeto: () => void, showTitle: () => void, teams: string[], setTeams: (teams: string[]) => void})  => {
  
  const [teamError, setTeamError] = useState<boolean[]>([false, false]);
  const [showError, setShowError] = useState<boolean>(false);

  const teamName = (team: string, teamNumber: number) => {
    if(/^(\s*\w+\s*)+$/.test(team)){
      if(teamNumber === 0){
        setTeams([team, teams[1]]);
        setTeamError([false, teamError[1]]);
      } else {
        setTeams([teams[0], team]);
        setTeamError([teamError[0], false]);
      }
    } else {
      if(teamNumber === 0){
        setTeamError([true, teamError[1]]);
      } else {
        setTeamError([teamError[0], true]);
      }
    }
  }

  const TeamErrorPopUp = () : JSX.Element => {
    return (
      <div className='TeamNameError'>
        <div className='TeamError'>
          Name cannot be empty and must contain only letters and numbers
        </div>
        <div className='ErrorPopUpButtonDiv'>
          <button className='ErrorPopUpButton' onClick={() => cancelError()}>Cancel</button>
        </div>
      </div>
    );
  }

  const cancelError = () => {
    setShowError(false);
  } 

  const startVetoClick = () => {
    if(teams.length !== 0 && teams[0] !== "" && teams[1] !== "" && !teamError[0] && !teamError[1]){
      showVeto();
    } else {
      setShowError(true);
    }
  }
  
  if(isActive){
    if(!showError) {
      return(
      <div className='VetoBox'>
        <div className='TeamsTitle'> CHOOSE TEAMS </div>
        <div className='Teams'>
          <div className='Team'>
            <input className='TeamInput' type="text" placeholder={"Team A"} maxLength={20} pattern="^(\s*\w+\s*)+$" onChange={e => teamName(e.target.value, 0)} />
          </div>
          <div className='Team'>
            <input className='TeamInput' type="text" placeholder={"Team B"} maxLength={20} pattern="^(\s*\w+\s*)+$" onChange={e => teamName(e.target.value, 1)}/>
          </div>
          
        </div>  
        <div className='StartVetoButton'>
            <button onClick={startVetoClick}>START VETO</button>
            <button onClick={showTitle}>BACK</button>
        </div>
      </div>
    );
    } else {
      return(
        <div className='VetoBox'>
          <TeamErrorPopUp />
        </div>
      )
    }
    
  } else {
    return null;
  }
};

export default Teams;