import React from 'react';

export default function Vedioplayer() {
    return (
      <div>
        <iframe
          width="1046"
          height="453"
          src="https://www.youtube.com/embed/t6PA2E_G0do"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    );
}