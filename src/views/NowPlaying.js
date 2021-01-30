import React, { useState, useEffect } from "react";
import * as Vibrant from "node-vibrant";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import { SET_BACKGROUND_COLOR } from "../redux/background";
import { trackAction } from "../redux/trackInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,
         faPause,
         faBackward,
         faForward } from '@fortawesome/free-solid-svg-icons';

const NowPlaying = () => {

  const isPlaying = useSelector((state) => state.trackInfo.isPlaying);
  const trackData = useSelector((state) => state.trackInfo.track);
  const currentImage = useSelector((state) => state.background.image);
  const [textColor, setTextColor] = useState('#ffff');
  const [timeOutId, setTimeOutId] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the song has stopped playing
    // and if there is already a timer set
    if ( !isPlaying && timeOutId === "" ) {
      // set timer for 1 minute
      let id = setTimeout(() => {
        history.push("/clock");
      }, 60*1000);
      // add timeout id to state var
      setTimeOutId(id);
    }
    // if the music is playing and there was a
    // timer already set stop the timer
    else if (isPlaying && timeOutId !== "") {
      clearTimeout(timeOutId);
      setTimeOutId("");
    }
  }, [history, isPlaying, timeOutId]);


  if ( trackData.isLoading || trackData.album === undefined ) {
    return (
      <ReactLoading
        className="tmp"
        type={"spin"}
        color={"#000"}
        height={60}
        width={60}
      />
    )
  }

  const img = trackData.album.images[0].url;
  Vibrant.from(img).getSwatches((err, swatches) => {
      let ourColours = [];
      for ( let key in swatches ) {
          if ( swatches.hasOwnProperty(key) && (swatches[key]) != null ) {

              ourColours.push( {
                  color: (swatches[key]).getHex(),
                  text: (swatches[key]).getTitleTextColor()
              } );

          }
      }

      let randomItem = ourColours[Math.floor( Math.random() * ourColours.length )];

      if ( currentImage !== img) {
        dispatch({type: SET_BACKGROUND_COLOR, payload: {background: randomItem.color, image: img}});
        setTextColor(randomItem.text);
      }
  });

  return (
    <div>
      <section className="nowPlaying active" id="nowPlaying">
        <figure id="artInfo">
          <img src={trackData.album.images[1].url} alt={trackData.album.name} id="artwork" />
        </figure>
        <figcaption id="songInfo">
    			<h1 id="trackName" style={{ color: textColor }}>{trackData.name}</h1>
    			<h2 id="artistName" style={{ color: textColor }}>{trackData.artists.map((artist) => {
            return artist.name;
          }).join(' / ')}</h2>
    		</figcaption>
      </section>
      <section className="controls active">
        <button id="previous" onClick={()=>{dispatch(trackAction('previous'))}}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
        {isPlaying ? (
            <button id="pause" onClick={()=>{dispatch(trackAction("pause"))}}>
              <FontAwesomeIcon icon={faPause} />
            </button>
          ) : (
            <button id="play" onClick={()=>{dispatch(trackAction("play"))}}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )
        }
        <button id="next" onClick={()=>{dispatch(trackAction("next"))}}>
          <FontAwesomeIcon icon={faForward} />
        </button>
      </section>
    </div>
  )
};

export default NowPlaying;
