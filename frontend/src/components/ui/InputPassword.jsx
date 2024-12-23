import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputPassword = ({start = false, style, onChange, placeholder, value}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex items-center w-full ${start ? "justify-start" : "justify-center"}`}>
      <div className={`relative ${style}`}>
        <input
          type={showPassword ? "text" : "password"}
          className="rounded-full py-1 px-4 w-full font-bold outline-none"
          onChange={onChange}
          placeholder={placeholder}
          value={value}
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
  );
};

export default InputPassword;