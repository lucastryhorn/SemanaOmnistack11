import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function Register() {
  const [state, setState] = useState({});

  const history = useHistory();

  function handleChange(name, e) {
    setState({ ...state, [name]: e.target.value });
  }

  async function handleRegister(e) {
    const { name, email, whatsapp, city, uf } = state;
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const res = await api.post("ongs", data);

      alert(`Seu ID de acesso: ${res.data.id}`);

      history.push("/");
    } catch (error) {
      alert("Erro no cadastro, tente novament.");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E04021" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={state.name}
            onChange={e => handleChange("name", e)}
          />
          <input
            placeholder="E-mail"
            type="email"
            value={state.email}
            onChange={e => handleChange("email", e)}
          />
          <input
            placeholder="WhatsApp"
            value={state.whatsapp}
            onChange={e => handleChange("whatsapp", e)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={state.city}
              onChange={e => handleChange("city", e)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={state.uf}
              onChange={e => handleChange("uf", e)}
            />
          </div>
          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
