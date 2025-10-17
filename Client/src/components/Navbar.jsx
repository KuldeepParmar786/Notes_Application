import { NotebookPen, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = (props) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappuser");
    props.setUser(null);
    toast.success("Logged out successfully");
  };
  return (
    <div className="bg-base-100 w-full h-17 shadow-md flex items-center justify-between">
      <div className="ml-7">
        <Link to="/">
          <NotebookPen className="border size-12 rounded-md bg-base-200 p-2 text-blue-600" />
        </Link>
      </div>


      {props.user && (
        <div className="mr-8">
          <button onClick={handleLogout} className="btn btn-md">
            <LogOut />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
