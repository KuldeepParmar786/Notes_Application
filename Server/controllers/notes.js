require("dotenv").config();
const notesRouter = require("express").Router();
const Note = require("../model/note");
const User = require("../model/user");
const jwt = require("jsonwebtoken");


notesRouter.get("/", async (request, response) => {
  try {
    const userId = request.query.userId;
    if (!userId) {
      return response.status(400).json({ error: "Missing userId" });
    }
    const notes = await Note.find({ user: userId }).populate("user");
    response.json(notes);
  } catch (error) {
    console.error("Error in getNotes controller:", error);
    response.status(500).json({ error: "Failed to fetch notes" });
  }
});

// GET single note
notesRouter.get("/:id", async (request, response) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to fetch note" });
  }
});

// POST create note with summarization
notesRouter.post("/", async (request, response) => {
  try {
    const body = request.body;

    const getTokenfrom = (request) => {
      const authorization = request.get("authorization");
      if (authorization && authorization.startsWith("Bearer")) {
        return authorization.replace("Bearer ", "");
      }
      return null;
    };

    const token = getTokenfrom(request);
    if (!token) return response.status(401).json({ error: "Token missing" });

    const decodedtoken = jwt.verify(token, process.env.SECRET);
    if (!decodedtoken.id) {
      return response.status(401).json({ error: "Invalid Token" });
    }

    const user = await User.findById(decodedtoken.id);
    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }

    

    const note = new Note({
      content:body.content,
      important: body.important || false,
      user: user._id,
    });

    const savedNote = await note.save();

    user.note = user.note.concat(savedNote._id);
    await user.save();

    response.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    response.status(500).json({ error: "Failed to create note" });
  }
});

// DELETE note
notesRouter.delete("/:id", async (request, response) => {
  try {
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to delete note" });
  }
});

// PUT update note
notesRouter.put("/:id", async (request, response) => {
  try {
    const { content, important } = request.body;
    const note = await Note.findById(request.params.id);
    if (!note) return response.status(404).json({ error: "Note not found" });

    note.content = content || note.content;
    note.important = important !== undefined ? important : note.important;

    const updatedNote = await note.save();
    response.json(updatedNote);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to update note" });
  }
});

module.exports = notesRouter;
