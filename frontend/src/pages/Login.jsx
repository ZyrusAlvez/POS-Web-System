import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import hat from "../assets/hat.png";
import Loading from "../components/Loading";
import InputPassword from "../components/ui/InputPassword";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [wrongpass, setWrongpass] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    if (!loading) {
      e.preventDefault();
      try {
        setLoading(true);
        await login(credentials);
        navigate("/");
      } catch (error) {
        console.error("Login failed", error);
        setWrongpass(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className={`flex justify-center items-center h-screen ${
        loading ? "opacity-50" : ""
      }`}
    >
      <div className="flex flex-col bg-primary w-[45%] h-[45%] items-center justify-center gap-4 rounded-3xl shadow-hard relative min-w-[500px]">
        <img src={hat} className="w-52 absolute -top-16 -left-20" />
        <img src={logo} className="w-20" />

        {/* Conditional Rendering for Log-in form and Wrong Pass UI */}
        {!wrongpass ? (
          <>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="rounded-full py-1 px-4 w-[75%] text-lg font-bold outline-none"
            />
           <InputPassword onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })}
                placeholder='Password'
                style='w-[75%] text-lg font-bold outline-none'
                />

            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="text-2xl text-white rounded-full font-extrabold bg-dark w-[30%] py-2"
            >
              Login
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-white gap-6">
            <h1 className="text-3xl text-center text-white font-bold w-[80%]">
              The Username or password you’ve entered is incorrect.
            </h1>
            <button
              className="bg-dark font-bold text-xl rounded-full w-[40%] py-2"
              onClick={() => setWrongpass(false)}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
      {loading ? <Loading /> : <div></div>}
    </div>
  );
};

export default LoginPage;
