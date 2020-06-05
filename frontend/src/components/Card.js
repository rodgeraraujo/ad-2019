import React, { useState, useEffect } from 'react';

import Modal from '../components/Modal';
import api from '../services/api';

const Card = ({ person }) => {
  const [personId, setPersonId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [displayModal, setDisplayModal] = useState('');

  useEffect(() => {
    setPersonId(person.id);
  });

  async function deletePerson(e) {
    e.preventDefault();

    try {
      const response = await api.delete(`persons/${personId}`);
      console.log(response.status);
      if (response.status == 204) {
        alert('Amigo excluido');
      } else {
        alert('Ocorreu um erro, verifique as informações informadas.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  function openModal() {
    setDisplayModal(true);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setDisplayModal(true);
    try {
      const response = await api.patch(`persons/${personId}`, { name: name, email: email });
      console.log(response);
      if (response.data.status == 204) {
        alert('Amigo excluido');
      } else {
        alert('Ocorreu um erro, verifique as informações informadas.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Modal show={displayModal} close={setDisplayModal} person={person} setName={setName} setEmail={setEmail} handleUpdate={handleUpdate} />
      <div className="person-card container bg-light-gray spacing-sm">
        <li className="li-unstyled">
          <header>
            <div className="user-info">
              <strong> {person.name} </strong>
              <span>{person.email}</span>
            </div>
          </header>

          <p>
            Ele irá receber no e-mail <strong>{person.email}</strong> quem é seu amigo secreto.
          </p>
          <div className="spacing-sm">
            {/* <form onSubmit={openModal}> */}
            <button className="button info" onClick={openModal}>
              Editar
            </button>
            {/* </form> */}
            {/* <form onSubmit={deletePerson}> */}
            <button className="button error" onClick={deletePerson}>
              Excluir
            </button>
            {/* </form> */}
          </div>
        </li>
      </div>
    </div>
  );
};

export default Card;
