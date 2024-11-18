import React from 'react';
import './Title.css';

const Title = ({isActive, showMaps, showVeto, setMapsNumber} : {isActive: boolean, showMaps: () => void, showVeto: () => void, setMapsNumber: (number: number) => void})  => {
  
  const mapButton = (mapsNumber: number) => {
    showVeto();
    setMapsNumber(mapsNumber);
  }

  if(isActive){
    return(
      <div className='VetoBox'>
        <div className='Title'> COUNTER-STRIKE MAP VETO </div>
        <div className='VetoText'>Welcome to the Counter-Strike map selection page. <br/>
          Need a quick way to select maps in a tournament? Or maybe you and your friends can't agree on which map to play in CS2?
           Thanks to this website you can settle this dispute very quickly, just choose whether you want to play BO1, BO3 or BO5, 
           enter the team names and then select maps like in a real Counter Strike tournament!
        </div>
        <div className='Buttons'>
          <button className='BestOfButton' onClick={() => mapButton(1)}>BEST OF 1</button>
          <button className='BestOfButton' onClick={() => mapButton(3)}>BEST OF 3</button>
          <button className='BestOfButton' onClick={() => mapButton(5)}>BEST OF 5</button>
        </div>
        <div className='CustomizeButton'>
            Are you bored with the same maps all the time because Valve never changes the map pool? You can add and remove custom maps here!
            <button onClick={showMaps}>CUSTOMIZE MAP POOL</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Title;