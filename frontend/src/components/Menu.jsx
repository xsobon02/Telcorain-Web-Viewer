import { useState, useEffect } from "react";
import { THIS_URL } from "../constants/constants";

export default function Menu(props) {
  const [fade, setFade] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setLoggedUser(localStorage.getItem("username"));
    } else {
      setLoggedUser("");
    }
  }, [props.isLoggedIn]);

  function closeMenu() {
    setFade(false);
    setTimeout(() => {
      props.setShowMenu(false);
    }, 250);
  }

  function handleLogin(event, authData) {
    event.preventDefault();
    props.setAuth((auth) => ({ ...auth, authLoading: true }));
    fetch(`${THIS_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          console.log("Error!");
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate user.");
        }
        if (res.status === 401) {
          console.log("Error!");
        }
        return res.json();
      })
      .then((resData) => {
        props.setAuth((auth) => ({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId,
          error: undefined,
        }));
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("username", resData.username);
        props.setIsLoggedIn(true);
        setLoggedUser(resData.username);
      })
      .catch((err) => {
        console.log(err);
        setError("Incorrect e-mail or password.");
        props.setAuth((auth) => ({
          ...auth,
          isAuth: false,
          authLoading: false,
          error: err,
        }));
      });
  }

  function handleLogout() {
    props.setIsLoggedIn(false);
    localStorage.clear();
    props.setLinksType(props.fakeLinksData);
    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <div className={fade ? "menu fadeXIn" : "menu fadeXOut"}>
      <h1>Menu</h1>
      {!props.isLoggedIn && (
        <form
          className="menu-login"
          onSubmit={(e) => handleLogin(e, loginData)}
        >
          <span>e-mail</span>
          <input
            className="menu-login-input"
            value={loginData.email}
            onChange={(e) => {
              setError("");
              setLoginData((loginData) => ({
                ...loginData,
                email: e.target.value,
              }));
            }}
            type="text"
          />
          <span>password</span>
          <input
            className="menu-login-input"
            value={loginData.password}
            onChange={(e) => {
              setError("");
              setLoginData((loginData) => ({
                ...loginData,
                password: e.target.value,
              }));
            }}
            type="password"
          />
          <span className="menu-login-error">{error}</span>
          <input type="submit" value="Login" className="button" />
        </form>
      )}
      {props.isLoggedIn && (
        <div className="menu-logged-in">
          <span>
            Logged in as <b>{loggedUser}</b>
          </span>
          <button className="button" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      )}
      <h2>About</h2>
      <p></p>
      <span
        className="material-symbols-outlined close"
        onClick={() => closeMenu()}
      >
        close
      </span>
    </div>
  );
}
