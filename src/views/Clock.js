import React, { useState, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_BACKGROUND_COLOR, SET_FRAME_SIZE } from "../redux/background";
var moment = require('moment');

const Clock = () => {
    const ref = useRef(null);
    const [time, setTime] = useState(moment().format('h:mm A'));
    const [color, setColor] = useState("#fff");
    const [position, setPosition] = useState({
      x: 0,
      y: 0
    });
    const [speed, setSpeed] = useState({
      x: 1,
      y: 1
    });
    const [timeSize, setTimeSize] = useState({
      height: 0,
      width: 0
    })

    const isPlaying = useSelector((state) => state.trackInfo.isPlaying);
    const windowSize = useSelector((state) => state.background.windowSize);

    const history = useHistory();
    const dispatch = useDispatch();

    if ( isPlaying ) {
      history.push("/now_playing");
    }

    const updateTime = function () {
        setTime(moment().format('h:mm A'));
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
      if ( position.x >= windowSize.width - (timeSize.width*1.02) || position.x <= 0 ) {
        newSpeed.x = speed.x * -1;
        setSpeed(newSpeed);
        updateColor();
      }
      if ( position.y >= windowSize.height - (timeSize.height*1.02) || position.y <= 0 ) {
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
        // set the time element size
        setTimeSize({
          height: ref.current.offsetHeight,
          width: ref.current.offsetWidth
        })
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      // start the time update process
      updateTime();
      const timeIntervalId = setInterval(updateTime, 1000);

      // start the time movement process
      updatePosition();
      const positionIntervalId = setInterval(updatePosition, 10);

      // stop the movement on tear down
      return () => {
        // stop intervals
        clearInterval(timeIntervalId);
        clearInterval(positionIntervalId);
        window.removeEventListener("resize", handleResize);
      }
    }, [dispatch, ref.current]);

    const divStyle = {
      position: 'absolute',
      left: position.x+'px',
      top: position.y+'px',
      margin: 0,
    	padding: 0,
    	border: 0
  }

    return (
      <div className="clockWrapper" style={divStyle}>
          <h1 ref={ref} className="clock" style={{color: color}}>{time}</h1>
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
