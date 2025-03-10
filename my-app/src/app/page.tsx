"use client";
import { useState } from "react";

export default function SignInAndLogIn() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {isLogin ? (
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-success text-white">
                <h3 className="mb-0">Entrar</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      placeholder="Digite seu email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                      Senha
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      placeholder="Digite sua senha"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Entrar
                  </button>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      Não tem conta? Resgistre-se aqui
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-md-6 mb-5">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">Registrar</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Nome de usuário
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="nome de usuário"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="registerEmail"
                      placeholder="Digite seu email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="registerPassword"
                      placeholder="Digita sua senha"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Registrar
                  </button>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      Já tem sua conta? Faça Login aqui
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
