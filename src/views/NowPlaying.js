import React, { useState } from "react";
import * as Vibrant from "node-vibrant";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import { SET_BACKGROUND_COLOR } from "../redux/background";

const NowPlaying = () => {

  const isPlaying = useSelector((state) => state.trackInfo.isPlaying);
  const trackData = useSelector((state) => state.trackInfo.track);
  const currentImage = useSelector((state) => state.background.image);
  const [textColor, setTextColor] = useState('#ffff');

  const history = useHistory();
  const dispatch = useDispatch();

  if ( !isPlaying ) {
    history.push("/clock");
  }

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
  )
};

export default NowPlaying;
