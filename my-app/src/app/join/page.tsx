"use client";
import authService from "@/services/authService";
import { IUserSession } from "@/services/types";
import useLocalStorage from "@/util/useLocalStorage";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function SignInAndLogIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [joinFormData, setJoinFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const saveUserAndRedirect = (res: IUserSession) => {
    useLocalStorage.setItemInLocalStorage("user", JSON.stringify(res.user));
    useLocalStorage.setItemInLocalStorage("authToken", res.tokens.access.token);
    router.push("/");
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (isLogin) {
          const res: IUserSession = await authService.login(
            joinFormData.email,
            joinFormData.password
          );
          saveUserAndRedirect(res);
        } else {
          const res: IUserSession = await authService.register(
            joinFormData.name,
            joinFormData.email,
            joinFormData.password
          );
          saveUserAndRedirect(res);
        }
      } catch (err) {
        console.log("error:", err);
      }
    },
    [isLogin, joinFormData, router]
  );

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">{isLogin ? "Entrar" : "Cadastrar"}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Nome de usuário
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={joinFormData.name}
                      onChange={(e) =>
                        setJoinFormData({
                          ...joinFormData,
                          name: e.target.value,
                        })
                      }
                      placeholder="nome de usuário"
                      required
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={joinFormData.email}
                    onChange={(e) =>
                      setJoinFormData({
                        ...joinFormData,
                        email: e.target.value,
                      })
                    }
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
                    value={joinFormData.password}
                    onChange={(e) =>
                      setJoinFormData({
                        ...joinFormData,
                        password: e.target.value,
                      })
                    }
                    className="form-control"
                    id="loginPassword"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  {isLogin ? "Entrar" : "Cadastrar"}
                </button>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin
                      ? "Não tem conta? Resgistre-se aqui"
                      : "Já tem conta? Entre aqui"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
