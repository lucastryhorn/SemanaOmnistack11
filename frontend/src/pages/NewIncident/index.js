import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [state, setState] = useState({});

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");

  function handleChange(name, e) {
    setState({ ...state, [name]: e.target.value });
  }

  async function handleNewIncident(e) {
    const { title, description, value } = state;
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/profile");
    } catch (error) {
      alert("Erro ao cadastrar caso, tente novamente.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um héroi para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E04021" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Titulo do caso"
            value={state.title}
            onChange={e => handleChange("title", e)}
          />
          <textarea
            placeholder="Descrição"
            value={state.description}
            onChange={e => handleChange("description", e)}
          />
          <input
            placeholder="Valor em reais"
            value={state.value}
            onChange={e => handleChange("value", e)}
          />
          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
