import React from 'react';

const es = () => (
  <>
    <path fill="#c60b1e" d="M32 88h448v336H32z" />
    <path fill="#ffc400" d="M31 181h450v150H31z" />
  </>
);

const fr = () => (
  <>
    <path fill="#fff" d="M32 88h448v336H32z" />
    <path fill="#00267f" d="M32.332 88h149.336v336H32.332z" />
    <path fill="#f31830" d="M330.663 88H480v336H330.663z" />
  </>
);

const gb = () => (
  <>
    <path fill="#006" d="M32 88h448v336H32z" />
    <path
      d="M32 88v37.566L429.914 424h50.086v-37.564L82.086 88H32zm448 0v37.565L82.086 424H32v-37.565L429.914 88h50.086z"
      fill="#FFF"
      fillRule="nonzero"
    />
    <path
      d="M218.667 88v336h74.667V88H218.667zM32 200v112h448V200H32z"
      fill="#FFF"
      fillRule="nonzero"
    />
    <path
      d="M32 222.4v67.2h448v-67.2H32zm201.6-134.4v336h44.799V88H233.6zM32 424l149.334-112h33.39L65.391 424H32zm0-336 149.334 112h-33.391L32 113.045V88zm265.275 112L446.61 88h33.391L330.666 200h-33.39zM480 424 330.666 312h33.391L480 398.956V424z"
      fill="#C00"
      fillRule="nonzero"
    />
  </>
);

const it = () => (
  <>
    <path fill="#fff" d="M32 88h448v336H32z" />
    <path fill="#009246" d="M32.332 88h149.336v336H32.332z" />
    <path fill="#ce2b37" d="M330.663 88H480v336H330.663z" />
  </>
);

const flags = {
  es,
  fr,
  gb,
  it,
};

export default flags;
