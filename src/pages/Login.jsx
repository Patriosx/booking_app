import { AuthContext } from "context/AuthContext";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { loading, error, login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
    navigate("/");
  };
  return (
    <div className="login">
      <div className="loginContainer">
        <h2>
          Inicia sesión o{" "}
          <Link to={"/register"} className={"loginLink"}>
            Regístrate
          </Link>
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label htmlFor="username">Email o usuario</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
            />
          </div>
          <button disabled={loading}>Iniciar Sesión</button>
          {error && <p>{error}</p>}
          {loading && <p>{"loading..."}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
