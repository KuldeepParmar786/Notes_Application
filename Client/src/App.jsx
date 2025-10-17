import { useState, useEffect, useRef } from "react";
import noteservice from "./services/notes";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import HomePage from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const logged = window.localStorage.getItem("loggedNoteappuser");
    if (logged) {
      const user = JSON.parse(logged);
      setUser(user);
      noteservice.setToken(user.token);
    }
  }, []);

  
  const addNote = async (noteObject) => {
    noteformRef.current.toggle();
    const response = await noteservice.create(noteObject);
    setNotes(notes.concat(response));
  };

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/login"
          element={
            user ? <HomePage user={user} /> : <LoginPage setUser={setUser} />
          }
        />
        <Route
          path="/signup"
          element={
            user ? <HomePage user={user} /> : <SignupPage setUser={setUser} />
          }
        />
        <Route
          path="/"
          element={user ? <HomePage user={user} /> : <LoginPage setUser={setUser} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
