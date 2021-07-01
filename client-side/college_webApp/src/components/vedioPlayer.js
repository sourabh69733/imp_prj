import React from 'react';

export default function Vedioplayer(props) {
    return (
      <div>
        <iframe
          width="1046"
          height="453"
          src= {props.src}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    );
}

// https://www.youtube.com/embed/t6PA2E_G0do