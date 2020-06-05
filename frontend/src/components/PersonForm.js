import React from 'react';
import { FaCaretRight } from 'react-icons/fa';

const PersonForm = ({ name, email, setName, setEmail, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>
          <strong>Cadastre um novo amigo</strong>
        </h3>

        <p>
          <label htmlFor="inputName">Nome do amigo</label>
          <input id="inputText" type="text" placeholder="Nome do amigo" value={name} onChange={(e) => setName(e.target.value)} required />
        </p>
        <p>
          <label htmlFor="inputText">Email do amigo</label>
          <input id="inputText" type="text" placeholder="Email do amigo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </p>

        <button className="button" type="submit">
          Salvar <FaCaretRight size={16} color="#D5716B" />
        </button>
        <br />
      </div>
    </form>
  );
};

export default PersonForm;
