import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
var moment = require('moment');

const Clock = () => {
    const [time, setTime] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [color, setColor] = useState("");
    const [position, setPosition] = useState({x:null,y:null});
    const [speed, setSpeed] = useState({x:20,y:20});

    const isPlaying = useSelector((state) => state.trackInfo.isPlaying);
    const history = useHistory();

    if ( isPlaying ) {
      history.push("/now_playing");
    }

    const updateTime = function () {
        setTime(moment().format('h:mm a'));
    };

    const updateColor = function () {
      setColor(pickColor());
    };

    const updatePositionSpeed = function () {
      let newPosition = {
        x: position.x += speed.x,
        y: position.y += speed.y,
      }
      setPosition(newPosition);
      checkForEdge();
    };

    const checkForEdge = () => {
      let newSpeed = speed;
      if ( position.x + 115 >= windowWidth || position.x <= 0 ) {
        newSpeed.x = speed.x * -1;
        setSpeed(newSpeed);
        updateColor();
      }
      if ( position.y + 75 >= windowHeight || position.y <= 0 ) {
        newSpeed.y = speed.y * -1
        setSpeed(newSpeed);
        updateColor();
      }
    }

    useEffect(() => {
      // start the time update process
      updateTime();
      setInterval(updateTime, 1000);

      // start the time movement process
      updatePositionSpeed();
      setInterval(updatePositionSpeed, 80);
    }, []);

    const divStyle = {
      position: 'absolute',
      left: position.x+'px',
      top: position.y+'px'
  }

    return (
      <div style={divStyle}>
          <h1 style={{color: color}}>{time}</h1>
      </div>
    )
};

//Pick a random color in RGB format
function pickColor(){
    const r = Math.random() * (254 - 0) + 0;
    const g = Math.random() * (254 - 0) + 0;
    const b = Math.random() * (254 - 0) + 0;
    return 'rgb('+r+','+g+', '+b+')';
}

export default Clock;
