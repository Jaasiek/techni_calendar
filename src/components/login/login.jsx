import { useEffect, useState } from "react";
import "./login.scss";

const Login = () => {
  const [warning, setWarning] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const form = e.target;
    const user = form[0].value;
    const password = form[1].value;

    if (user === "admin" && password === "1234") {
      window.sessionStorage.setItem("logged", true);
      window.location.href = "/admin/dashboard";
    } else {
      setWarning(true);
    }
  };

  useEffect(() => {
    const logged = window.sessionStorage.getItem("logged");

    if (logged) window.location.href = "/admin/dashboard";
  }, []);

  return (
    <div className="app-login-container">
      <h2>Admin</h2>
      <form onSubmit={submit}>
        <input type="text" name="user" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
        {warning && (
          <p className="warning-message">Użytkownik/hasło jest nie poprawne</p>
        )}
      </form>
    </div>
  );
};

export default Login;
