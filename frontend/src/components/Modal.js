import React, { useState, useEffect } from 'react';

const Modal = ({ show, close, person, setName, setEmail, handleUpdate }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  function handleClose() {
    close(false);
  }
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <form onSubmit={handleUpdate}>
          <div>
            <h3>
              <strong>Atualizar informações do amigo</strong>
            </h3>

            <p>
              <label htmlFor="inputName">Nome do amigo</label>
              <input id="inputText" type="text" placeholder="Nome do amigo" value={person.name} onChange={(e) => setName(e.target.value)} required />
            </p>
            <p>
              <label htmlFor="inputText">Email do amigo</label>
              <input
                id="inputText"
                type="text"
                placeholder="Email do amigo"
                value={person.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </p>

            <button className="button" type="submit">
              Atualizar
            </button>
          </div>
        </form>
        <br />
        <button onClick={handleClose}>Sair</button>
      </section>
    </div>
  );
};

export default Modal;
