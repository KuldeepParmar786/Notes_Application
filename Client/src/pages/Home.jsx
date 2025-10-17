import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, Plus } from "lucide-react";
import noteService from "../services/notes";
import toast from 'react-hot-toast'

const HomePage = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const userId = props.user.userId;
  useEffect(() => {
    const fun = async () => {
      const response = await noteService.getall(userId);
      console.log(response);
      setNotes(response);
    };
    fun();
  }, []);

  const addNote = async() => {
    if (!newNote.trim()) return;
    try{
    const note = {content:newNote,important:false};
    const res=await noteService.create(note)
    setNotes([res,...notes]);
    setNewNote("");
    toast.success("Added successfully")
    }
    catch(error){
      toast.error(error.response.data.error)
    }
  };

  const deleteNote =async(id) => {
    try{
      await noteService.remove(id)
      setNotes(notes.filter((n) => n.id !== id));
      toast.success('Deleted Successfully')
    }
    catch(error){
       toast.error("Error deleting this note")
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = async(id) => {
    try{
      const updatedNote={
        content:editText,
        important:false
      }
      const res=await noteService.update(id,updatedNote)
      setNotes(notes.map((n) => (n.id === id ? res : n)));
      toast.success('Note updated successfully')
      setEditingId(null);
      setEditText("");
    }
    
    catch(error){
       toast.error(error.response.data.error)
    }
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center py-12 px-4">
      {/* Background image and dark overlay */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80')] 
                    bg-cover bg-center brightness-[0.3] contrast-[1.2]"
      />
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Input for new note */}
        <div className="flex items-center bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-3 mb-6 border border-white/10">
          <input
            type="text"
            placeholder="Write a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            className="w-full bg-transparent outline-none text-white placeholder-gray-400 px-2"
          />
          <button
            onClick={addNote}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <Plus size={22} />
          </button>
        </div>

        {/* Notes list */}
        <div className="space-y-4">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y:10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center bg-white/5 backdrop-blur-md 
                       rounded-2xl shadow-md p-4 border border-white/10 
                       hover:bg-white/10 transition"
            >
              {editingId === note.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(note.id)}
                  className="flex-1 bg-transparent outline-none text-white"
                  autoFocus
                />
              ) : (
                <p className="text-gray-100">{note.content}</p>
              )}

              <div className="flex space-x-3 ml-4">
                {editingId === note.id ? (
                  <button
                    onClick={() => saveEdit(note.id)}
                    className="text-green-400 hover:text-green-300 font-medium"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(note.id, note.text)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit3 size={20} />
                  </button>
                )}
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
