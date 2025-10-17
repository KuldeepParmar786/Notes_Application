import { useState } from "react";
import { NotebookPen, Eye, EyeOff, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import loginService from "../services/login";
import noteService from "../services/notes";
import toast from "react-hot-toast";

const LoginPage = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login(formData);
      console.log("hello", user);
      window.localStorage.setItem("loggedNoteappuser", JSON.stringify(user));
      noteService.setToken(user.token);
      props.setUser(user);
      toast.success("Logged in successfully");
      setFormData({ username: "", password: "" });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="mt-5 w-screen flex items-center justify-center border-amber-600 lg:flex lg:w-1/2 lg:justify-center lg:items-center">
        <form onSubmit={handleLogin}>
          <h1 className="text-white font-bold text-2xl mb-4 ml-1">
            Welcome back!
          </h1>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <User />
            <input
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
              className="pl-2 outline-none border-none"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <Lock />
            <input
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              className="pl-2 outline-none border-none"
              type={showPassword ? "text" : "password"}
              name="password"
              id=""
              placeholder="••••••••"
            />
            <button
              type="button"
              className=" inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-5 text-base-content/40" />
              ) : (
                <Eye className="size-5 text-base-content/40" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-500 hover:bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Login
          </button>
          <p className="text-sm ml-8">
            Don't have an account ?
            <span className="ml-1 text-sm hover:text-blue-500 cursor-pointer">
              <Link to="/signup">Sign Up</Link>
            </span>{" "}
          </p>
        </form>
      </div>
      <div className="hidden lg:flex w-1/2 bg-gray-800 justify-around items-center">
        <div className="flex flex-col gap-4">
          <NotebookPen className="self-center rounded-2xl size-20 p-4 bg-gradient-to-r from-indigo-400 to-purple-400 animate-bounce" />
          <h1 className="self-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-semi-bold  text-4xl font-sans">
            Welcome back to your space
          </h1>
          <p className="text-lg self-center text-gray-200 mt-1">
            Catch your ideas right from just where you left off.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
