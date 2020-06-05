import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PersonForm from './../../components/PersonForm';
import Navbar from './../../components/Navbar';
import Card from './../../components/Card';
import LoadingSpinner from './../../components/LoadingSpinner';

import api from '../../services/api';

import './styles.css';

export default function CreatePerson() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect((loading = true) => {
    setTimeout(function () {
      api.get('persons').then((response) => {
        setLoading(false);
        setPersons(response.data.data);
      });
    }, 1000);
  });

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post('persons', { name, email });

      persons = response.data.data;

      if (response.data.code == 'S_PERSON_CREATED') {
        alert('Amigo cadastrado');
      } else {
        alert('Ocorreu um erro, verifique as informações informadas.');
      }

      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar title="Amigo Secreto" />

      <div className="row">
        <div className="col c5">
          <div className="container">
            <aside className="col spacing-vert-xl">
              <section className="form">
                <PersonForm name={name} email={email} setName={setName} setEmail={setEmail} handleSubmit={handleSubmit} />
              </section>
            </aside>
          </div>
        </div>

        <div className="col c5">
          <br />
          <div className="row sp-vert-sm">
            <div className="col c12">
              <div className="spacing-sm">
                <button style={{ padding: ' 10px 37%' }} className="button warning">
                  Realizar sorteio
                </button>
                <h6 className="txt-red">
                  <strong>OBS: </strong> É necessário um minimo de 3 amigos para realizar o sorteio.
                </h6>
              </div>
            </div>
          </div>

          <hr />
          <div className="container">
            <div
              className="row"
              styles={{
                // overflow-x: 'scroll',
                display: 'flex',
              }}
            >
              {loading ? (
                <h5></h5>
              ) : (
                <h5 className="txt-blue">
                  <strong>Amigos salvos</strong>
                </h5>
              )}
              {loading ? (
                <LoadingSpinner />
              ) : (
                persons.map((person) => (
                  <div>
                    <Card person={person} />
                    <br />
                  </div>
                ))
              )}
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
