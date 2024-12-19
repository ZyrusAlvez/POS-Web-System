import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import hat from "../assets/hat.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Loading from "../components/Loading";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="flex flex-col bg-primary w-[45%] h-[45%] items-center justify-center gap-4 rounded-3xl shadow-2xl relative min-w-[500px]">
        <img src={hat} className="w-52 absolute -top-16 -left-20" />
        <img src={logo} className="w-20" />
        
        {/* Conditional Rendering for Log-in form and Wrong Pass UI */}
        {!wrongpass ? (
          <>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="rounded-full py-2 px-3 w-[75%] text-lg font-bold"
            />
            <div className="flex items-center w-full justify-center">
              <div className="relative w-[75%]">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="rounded-full py-2 px-3 w-full text-lg font-bold"
                />

                {/* Conditional Rendering for show and hide icon */}
                {showPassword ? (
                  <FaRegEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl"
                  />
                )}
              </div>
            </div>

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