import React, { useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_BACKGROUND_COLOR, SET_FRAME_SIZE } from "../redux/background";
var moment = require('moment');

const Clock = () => {
    const [time, setTime] = useState(moment().format('h:mm a'));
    const [color, setColor] = useState("#fff");
    const [position, setPosition] = useState({
      x: null,
      y: null
    });
    const [speed, setSpeed] = useState({
      x: 20,
      y: 20
    });

    const isPlaying = useSelector((state) => state.trackInfo.isPlaying);
    const windowSize = useSelector((state) => state.background.windowSize);

    const history = useHistory();
    const dispatch = useDispatch();

    if ( isPlaying ) {
      history.push("/now_playing");
    }

    const updateTime = function () {
        setTime(moment().format('h:mm a'));
    };

    const updateColor = function () {
      setColor(pickColor());
    };

    const updatePosition = function () {
      let newPosition = {
        x: position.x += speed.x,
        y: position.y += speed.y,
      }
      setPosition(newPosition);
      checkForEdge();
    };

    const checkForEdge = () => {
      let newSpeed = speed;
      if ( position.x + 153 >= windowSize.width || position.x <= 0 ) {
        newSpeed.x = speed.x * -1;
        setSpeed(newSpeed);
        updateColor();
      }
      if ( position.y + 75 >= windowSize.height || position.y <= 0 ) {
        newSpeed.y = speed.y * -1
        setSpeed(newSpeed);
        updateColor();
      }
    }

    useLayoutEffect(() => {
      // set background color
      dispatch({type: SET_BACKGROUND_COLOR, payload: { background: "#000" }})
      //
      const handleResize = () => {
        // Set window width/height to state
        dispatch({
          type: SET_FRAME_SIZE,
          payload: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      // start the time update process
      updateTime();
      const timeIntervalId = setInterval(updateTime, 1000);

      // start the time movement process
      updatePosition();
      const positionIntervalId = setInterval(updatePosition, 80);
      return () => {
        // stop intervals
        clearInterval(timeIntervalId);
        clearInterval(positionIntervalId);
        window.removeEventListener("resize", handleResize);
      }
    }, [dispatch]);

    const divStyle = {
      position: 'absolute',
      left: position.x+'px',
      top: position.y+'px'
  }

    return (
      <div style={divStyle}>
          <h1 className="clock" style={{color: color}}>{time}</h1>
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
