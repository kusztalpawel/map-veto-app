import React, { useState } from 'react';
import './Veto.css';
import terrorists from '../Images/t-patch-small.png';
import counterterrorists from '../Images/ct-patch-small.png';
import terroristsdisabled from '../Images/t-patch-small-off.png';
import counterterroristsdisabled from '../Images/ct-patch-small-off.png';
import terroristschosen from '../Images/t-patch-small-chose.png';
import counterterroristschosen from '../Images/ct-patch-small-chose.png';

const Veto = ({isActive, showTitle, mapsNumber, maps, teams, setTeams} : {isActive: boolean, showTitle: () => void, mapsNumber: number, maps: {name: string; img: string;}[], teams: string[], setTeams: (teams: string[]) => void})  => {

  const [clickCount, setClickCount] = useState<number>(0);
  const [none, ban, pick, sidePick] = [-1, 0, 1, 2];
  const types: string[] = ["BANNING", "CHOOSING", "CHOOSING SIDE"]

  const [buttonData, setButtonData] = useState<{id: number; className:string; action: number, isDisabled: boolean}[]>
                                    ([{id:0, className:'MapButton', action: none, isDisabled: false}, 
                                      {id:1, className:'MapButton', action: none, isDisabled: false}, 
                                      {id:2, className:'MapButton', action: none, isDisabled: false}, 
                                      {id:3, className:'MapButton', action: none, isDisabled: false}, 
                                      {id:4, className:'MapButton', action: none, isDisabled: false}, 
                                      {id:5, className:'MapButton', action: none, isDisabled: false}, 
                                      {id:6, className:'MapButton', action: none, isDisabled: false}]);

  const [sideButtonData, setSideButtonData] = useState<{id: number; name: string; className:string; isDisabled: boolean; isHidden: boolean, image: string}[]>
                                          ([{id:0, name: 'Counter-Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: counterterrorists}, 
                                            {id:1, name: 'Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: terrorists}, 
                                            {id:2, name: 'Counter-Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: counterterrorists}, 
                                            {id:3, name: 'Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: terrorists}, 
                                            {id:4, name: 'Counter-Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: counterterrorists}, 
                                            {id:5, name: 'Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: terrorists}, 
                                            {id:6, name: 'Counter-Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: counterterrorists},
                                            {id:7, name: 'Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: terrorists}, 
                                            {id:8, name: 'Counter-Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: counterterrorists}, 
                                            {id:9, name: 'Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: terrorists}, 
                                            {id:10, name: 'Counter-Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: counterterrorists}, 
                                            {id:11, name: 'Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: terrorists}, 
                                            {id:12, name: 'Counter-Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: counterterrorists}, 
                                            {id:13, name: 'Terrorists', className:'SideButton', isDisabled: true, isHidden: true, image: terrorists}]);

  const bo1PickingOrder: {team: number; action: number}[] = [{team: 0, action: ban}, 
                                                             {team: 0, action: ban}, 
                                                             {team: 1, action: ban}, 
                                                             {team: 1, action: ban}, 
                                                             {team: 1, action: ban}, 
                                                             {team: 0, action: ban}, 
                                                             {team: 1, action: sidePick}];

  const bo3PickingOrder: {team: number; action: number}[] = [{team: 0, action: ban}, 
                                                             {team: 1, action: ban}, 
                                                             {team: 0, action: pick}, 
                                                             {team: 1, action: sidePick}, 
                                                             {team: 1, action: pick}, 
                                                             {team: 0, action: sidePick}, 
                                                             {team: 1, action: ban}, 
                                                             {team: 0, action: ban}, 
                                                             {team: 1, action: sidePick}];

  const bo5PickingOrder: {team: number; action: number}[] = [{team: 0, action: ban}, 
                                                             {team: 1, action: ban}, 
                                                             {team: 0, action: pick}, 
                                                             {team: 1, action: sidePick}, 
                                                             {team: 1, action: pick}, 
                                                             {team: 0, action: sidePick}, 
                                                             {team: 0, action: pick}, 
                                                             {team: 1, action: sidePick}, 
                                                             {team: 1, action: pick}, 
                                                             {team: 0, action: sidePick}, 
                                                             {team: 1, action: sidePick}];

  const [chosenMaps, setChosenMaps] = useState<{id: number, mapName: string; team: string; side: string}[]>([]);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const onButtonClick = (buttonNumber: number) => {
    if(buttonData[buttonNumber].action === none && !buttonData[buttonNumber].isDisabled) {
      mapBan(buttonNumber);
      setClickCount(clickCount + 1);
    }
  }

  const onSideButtonClick = (id: number) => {
    setClickCount(clickCount + 1);
    setSideButtonData(sideButtonData.map(side => {
      if(side.id === id){
        side.className = "ChosenSideButton";
        side.isDisabled = true;
        if(side.image === counterterrorists){
          side.image = counterterroristschosen;
        } else if(side.image === terrorists){
          side.image = terroristschosen;
        }
        if(mapsNumber === 1){
          setChosenMaps([...chosenMaps, {id: chosenMaps.length, mapName: maps[Math.floor(id/2)].name, team: teams[bo1PickingOrder[clickCount].team], side: sideButtonData[id].name}]);
        }
        if(mapsNumber === 3){
          setChosenMaps([...chosenMaps, {id: chosenMaps.length, mapName: maps[Math.floor(id/2)].name, team: teams[bo3PickingOrder[clickCount].team], side: sideButtonData[id].name}]);
        }
        if(mapsNumber === 5){
          setChosenMaps([...chosenMaps, {id: chosenMaps.length, mapName: maps[Math.floor(id/2)].name, team: teams[bo5PickingOrder[clickCount].team], side: sideButtonData[id].name}]);
        }

        return side;
      } else if(side.className !== "ChosenSideButton"){
        side.className = "DisabledSideButton";
        side.isDisabled = true;
        if(side.image === counterterrorists){
          side.image = counterterroristsdisabled;
        } else if(side.image === terrorists){
          side.image = terroristsdisabled;
        }

        return side;
      } else {
        side.isDisabled = true;
        return side;
      }
    }));
    buttonDisabler(false);
    if(mapsNumber === 5){
      changeLastToGreen(bo3PickingOrder.length - 1);
    }
  }

  const changeButtonToDefault = () => {
    buttonData.map(button => {
      button.className = "MapButton";
        button.action = none;
        button.isDisabled = false;
        sideButtonData[2 * button.id].isHidden = true;
        sideButtonData[2 * button.id].isDisabled = true;
        sideButtonData[2 * button.id].image = counterterrorists;
        sideButtonData[2 * button.id + 1].isHidden = true;
        sideButtonData[2 * button.id + 1].isDisabled = true;
        sideButtonData[2 * button.id + 1].image = terrorists;

        return button;
    });
  }
  
  const changeColor = (buttonNumber: number, action: number) => {
    setButtonData(buttonData.map(button => {
      if(button.id === buttonNumber){
        if(action === pick){
          button.action = pick;
          button.className = "DisabledMapButton Green";
          button.isDisabled = true;
          sideButtonData[2 * button.id].className = "SideButton";
          sideButtonData[2 * button.id + 1].className = "SideButton";
          sideButtonData[2 * button.id].isDisabled = false;
          sideButtonData[2 * button.id].image = counterterrorists;
          sideButtonData[2 * button.id + 1].isDisabled = false;
          sideButtonData[2 * button.id + 1].image = terrorists;
          sideButtonData[2 * button.id].isHidden = false;
          sideButtonData[2 * button.id + 1].isHidden = false;
          buttonDisabler(true);
        }else if(action === ban){
          button.className = "DisabledMapButton Red";
          button.isDisabled = true;
          button.action = ban;
        }
        return button;
      } else {
        return button;
      }
    }));
  }

  const changeLastToGreen = (clicksNumber: number) => {
    buttonData.map(button => {
      if (clickCount >= clicksNumber && button.action === none) {
        button.action = pick;
        button.className = "DisabledMapButton Green";
        button.isDisabled = true;
        sideButtonData[2 * button.id].image = counterterrorists;
        sideButtonData[2 * button.id + 1].image = terrorists;
        sideButtonData[2 * button.id].className = "SideButton";
        sideButtonData[2 * button.id + 1].className = "SideButton";
        sideButtonData[2 * button.id].isDisabled = false;
        sideButtonData[2 * button.id + 1].isDisabled = false;
        sideButtonData[2 * button.id].isHidden = false;
        sideButtonData[2 * button.id + 1].isHidden = false;
        buttonDisabler(true);

        return button;
      }

      return button;
    });
  }

  const onReturnClick = () => {
    setTeams(["", ""])
    setClickCount(0);
    setChosenMaps([]);
    setIsEnded(false);
    changeButtonToDefault();

    showTitle();
  }

  const buttonDisabler = (set: boolean) => {
    setButtonData(buttonData.map(button => {
      if(set){
        if(button.action === none){
          button.className = "DisabledMapButton";
        }
        else if(button.action === ban){
          button.className = "DisabledMapButton DisabledRed";
        } else {
          button.className = "DisabledMapButton DisabledGreen";
        }
      }
      else {
        if(button.action === none){
          button.className = "MapButton";
        }
        else if(button.action === ban){
          button.className = "DisabledMapButton Red";
        } else {
          button.className = "DisabledMapButton Green";
        }
      }
      button.isDisabled = set;

      return button;
    }));
  }

  const mapBan = (buttonNumber: number) => {
    if(mapsNumber === 1 && clickCount < bo1PickingOrder.length){
      changeColor(buttonNumber, bo1PickingOrder[clickCount].action);
      changeLastToGreen(bo1PickingOrder.length - 2);
    }

    if(mapsNumber === 3 && clickCount < bo3PickingOrder.length){
      changeColor(buttonNumber, bo3PickingOrder[clickCount].action);
      changeLastToGreen(bo3PickingOrder.length - 2);
    }

    if(mapsNumber === 5 && clickCount < bo5PickingOrder.length){
      changeColor(buttonNumber, bo5PickingOrder[clickCount].action);
    }
  }
  
  const checkEnding = () => {
    if(!isEnded){
      if(mapsNumber === 1 && clickCount >= bo1PickingOrder.length){
        setIsEnded(true);
      }
      if(mapsNumber === 3 && clickCount >= bo3PickingOrder.length){
        setIsEnded(true);
      }
      if(mapsNumber === 5 && clickCount >= bo5PickingOrder.length){
        setIsEnded(true);
      }
    }
    
  }

  const Teams = (): JSX.Element => {
    if(mapsNumber === 1){
      if(clickCount < bo1PickingOrder.length){
        return(
          <div className='TeamsText'>{teams[bo1PickingOrder[clickCount].team]} is {types[bo1PickingOrder[clickCount].action]}</div>
        )
      } 
    }
    if(mapsNumber === 3){
      if(clickCount < bo3PickingOrder.length){
        return(
          <div className='TeamsText'>{teams[bo3PickingOrder[clickCount].team]} is {types[bo3PickingOrder[clickCount].action]}</div>
        )
      } 
    }
    if(mapsNumber === 5){
      if(clickCount < bo5PickingOrder.length){
        return(
          <div className='TeamsText'>{teams[bo5PickingOrder[clickCount].team]} is {types[bo5PickingOrder[clickCount].action]}</div>
        )
      } 
    }
    return(
      <div className='TeamsText'></div>
    )
  }

  const Buttons = () : JSX.Element => {
    return (
      <>
        {
          buttonData.map((button) => {
            return (
              <div className='Maps' key={button.id}>
                <div 
                  key={3 * button.id}
                  className={buttonData[button.id].className}
                  style={{backgroundImage: `url(${maps[button.id].img})`}} 
                  onClick={() => onButtonClick(button.id)}
                >
                  <div className='MapText'>{maps[button.id].name.toUpperCase()}</div>
                </div>
                <input 
                  key={3 * button.id + 1}
                  className={sideButtonData[2 * button.id].className} 
                  id='ct'
                  type='image'
                  src={sideButtonData[2 * button.id].image} 
                  alt='ct'
                  hidden={sideButtonData[2 * button.id].isHidden} 
                  disabled={sideButtonData[2 * button.id].isDisabled} 
                  onClick={() => onSideButtonClick(2 * button.id)}
                /> 
                <input 
                  key={3 * button.id + 2}
                  className={sideButtonData[2 * button.id + 1].className}
                  type='image'
                  id='t'
                  src={sideButtonData[2 * button.id + 1].image} 
                  alt='t'
                  hidden={sideButtonData[2 * button.id + 1].isHidden} 
                  disabled={sideButtonData[2 * button.id + 1].isDisabled} 
                  onClick={() => onSideButtonClick(2 * button.id + 1)}
                />
              </div>
            );
          })
        }
      </>
    );
  }

  const EndPopUp = () : JSX.Element => {
    if(isEnded){
      return (
        <div className='EndPopUp'>
          <div className='EndPopUpContent'>
            {
              chosenMaps.map(map => {
                return (
                  <div key={map.id}> 
                    Map {map.id + 1}:
                    <br/>{map.mapName} <br/> {map.team} starts as {map.side} 
                  </div>
                );
              })
            }
          </div>
          <div className='EndPopUpButtonDiv'>
            <button className='EndPopUpButton' onClick={onReturnClick}>HOME</button>
          </div>
        </div>
      );
    } else {
      return <></>
    }
  }

  if(isActive){
    checkEnding();
    return(
      <div className='VetoBox'>
        <div className='VetoTitle'> BEST OF {mapsNumber} </div>
        <Teams />
        <div className='Contents'>
          <Buttons />
        </div>
        <div className='ResetButton'>
            <button onClick={onReturnClick} disabled={isEnded}>HOME</button>
        </div>
        <EndPopUp />
      </div>
    );
  } else {
    return null;
  }
};

export default Veto;