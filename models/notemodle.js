import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    codeLanguage: { type: String, required: true },
    code: { type: String, required: true },
}, {
    timestamps: true
});



const Note = mongoose.models.notes || mongoose.model('notes', noteSchema);

export default Note;