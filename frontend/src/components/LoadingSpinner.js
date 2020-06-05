import React from 'react';

import loadingImg from '../assets/loading.gif';

const Card = () => {
  return (
    <div className="txt-center">
      <p>Buscandos amigos salvos...</p>
      <img width="70" src={loadingImg} alt="Loading data..." />
    </div>
  );
};

export default Card;
