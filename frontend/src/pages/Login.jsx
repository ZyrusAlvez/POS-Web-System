import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import hat from "../assets/hat.png"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const { login} = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col bg-primary w-[50%] h-[55%] items-center justify-center gap-4 rounded-3xl shadow-2xl relative min-w-[500px]">
        <img src={hat} className="w-52 absolute -top-16 -left-20"/>
        <img src={logo} className="w-20" />
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="rounded-full py-2 px-3 w-[70%] text-lg font-bold"
        />
        <div className="flex items-center w-full justify-center">
          <div className="relative w-[70%]">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="rounded-full py-2 px-3 w-full text-lg font-bold"
            />
            {
              showPassword ? (
                <FaRegEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl"
                />
              )
            }
          </div>
        </div>

        <button
          onClick={(e) => { handleSubmit(e);}}
          className="text-2xl text-white rounded-full font-extrabold bg-dark w-[30%] py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
