import React, { useState } from 'react';
import './CustomizeMaps.css';
import Ancient from '../Images/Maps/ancient.png'
import Anubis from '../Images/Maps/anubis.png'
import Dust2 from '../Images/Maps/dust2.png'
import Inferno from '../Images/Maps/inferno.png'
import Italy from '../Images/Maps/italy.png';
import Mirage from '../Images/Maps/mirage.png'
import Nuke from '../Images/Maps/nuke.png'
import Overpass from '../Images/Maps/overpass.png';
import Vertigo from '../Images/Maps/vertigo.png';
import Default from '../Images/Maps/default.png';

const CustomizeMaps = ({isActive, showTitle, setMaps, maps} : {isActive: boolean, showTitle: () => void, setMaps: (maps: {name: string; img: string;}[]) => void, maps: {name: string; img: string;}[]})  => {

  const defaultMaps: {name: string, img: string}[] = [{name: "Ancient", img: Ancient},
                                                      {name: "Anubis", img: Anubis}, 
                                                      {name: "Dust 2", img: Dust2}, 
                                                      {name: "Inferno", img: Inferno},
                                                      {name: "Italy", img: Italy}, 
                                                      {name: "Mirage", img: Mirage}, 
                                                      {name: "Nuke", img: Nuke},
                                                      {name: "Overpass", img: Overpass}, 
                                                      {name: "Vertigo", img: Vertigo}];

  const [map, setMap] = useState<{name: string; img: string;}[]>(maps);
  const [emptyMap, setEmptyMap] = useState<{name: string; img: string;}[]>([])
  const [show, setShow] = useState<number>(0); 
  const [mapError, setMapError] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const titleCase = (name: string) => {
    
    const lowerCaseName: string = name.toLowerCase();
    const splitName: string[] = lowerCaseName.split(' ');
    let splitTitleName: string[] = [];
    
    for (var i = 0; i < splitName.length; i++) {
      splitTitleName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].slice(1); 
    }
    
    return splitTitleName.join(' ');
  }

  const mapsDelete = (mapName: string) => {
    setMap(map.filter((map: {name: string; img: string;}) => map.name !== mapName));
    setEmptyMap(emptyMap => [...emptyMap, {name: "empty",img: "empty"}]);
  }

  const addButtonOnClick = () => {
    setShow(1);
    setIsDisabled(true);
  }

  const mapsAdd = () => {
    const input = document.getElementById('NameInput') as HTMLInputElement;
    const name: string = input.value as string;
    const setName: string = titleCase(name);
    let img: string = Default;
    if(!name){
      setMapError(-1);
    } else if(!/^(\s*\w+\s*)+$/.test(name)){
      setMapError(-2);
    } else {
      setMapError(0);
      setEmptyMap(emptyMap.slice(0, -1));
      defaultMaps.map(map => {
        if(map.name === setName){
          img = map.img;
        }
        return map;
      })
      map.splice(map.length, 0, {name: setName, img: img});
      map.sort((a,b) => a.name.localeCompare(b.name));
      setMap(map);
      setShow(0);
      setIsDisabled(false);
    }
  }

  const MapErr = () : JSX.Element => {
    if(mapError === -1){
      return (
        <div className='MapsError'>
          Map name cannot be empty!
        </div>
      )
    } else if(mapError === -2){
      return (
        <div className='MapsError'>
          Map name must contain only letters and numbers!
        </div>
      )
    } else if(mapError === -3){
      return (
        <div className='MapsError'>
          Too few maps in the map pool!
        </div>
      )
    } else {
      return (
        <div className='MapsError'></div>
      )
    }
  }

  const cancelMapsAdd = () => {
    setShow(0);
    setMapError(0);
    setIsDisabled(false);
  } 

  const Maps = () : JSX.Element => {
    return (
      <>
        {
          map.map((m, i) => {
            return (
              <div className='CustomMap' key={i} style={{backgroundImage: `url(${m.img})`}}>
                <div className='CustomMapName' >
                  {m.name.toUpperCase()}
                </div>
                <button className='DeleteButton' disabled={isDisabled} onClick={() => mapsDelete(m.name)}></button>
              </div>
            );
          })
        }
      </>
    );
  }

  const EmptyMaps = () : JSX.Element => {
    return (
      <>
        {
          emptyMap.map((m, i) => {
            return (
              <div className='CustomMap' key={i}>
                <div className='CustomMapName' style={{backgroundImage: `url(${m.img})`}} ></div>
                <button className='AddButton' disabled={isDisabled} onClick={() => {addButtonOnClick()}}></button>
              </div>
            );
          })
        }
      </>
    );
  }
    

  const InputPopUp = () : JSX.Element => {
    if(show === 1){
      return (
        <div className='InputMapName'>
          <input type='text' id='NameInput' maxLength={15} pattern="^(\s*\w+\s*)+$" placeholder='Enter map name'/>
          <MapErr />
          <div className='AddMapButtons'>
            <button className='PopUpButton' onClick={() => mapsAdd()}>ADD</button>
            <button className='PopUpButton' onClick={() => cancelMapsAdd()}>CANCEL</button>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }

  const SaveErrorPopUp = () : JSX.Element => {
    if(show === -1){
      return (
        <div className='ErrorMapName'>
          <MapErr />
          <div className='ErrorButtonDiv'>
            <button className='PopUpButton' onClick={() => cancelMapsAdd()}>CLOSE</button>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }

  const saveMaps = () => {
    if(map.length < 7){
      setMapError(-3);
      setShow(-1);
      setIsDisabled(true);
    } else {
      setMaps(map);
    
      showTitle();
    }
  }

  const cancelMaps = () => {
    setEmptyMap([]);
    setMap(maps);
    showTitle();
  }

  if(isActive){
    return(
      <div className='VetoBox'>
        <div className='CustomTitle'> CUSTOMIZE MAPS </div>
          <div className='TipText'>To remove a map, simply click on it</div>
        <div className='CustomMaps'>
          <Maps />
          <EmptyMaps />
        </div>  
        <InputPopUp />
        <SaveErrorPopUp />
        <div className='SaveButton'>
            <button  disabled={isDisabled} onClick={saveMaps}>SAVE</button>
            <button  disabled={isDisabled} onClick={cancelMaps}>CANCEL</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CustomizeMaps;