import db from "../../../utils/db";
import Note from "../../../models/notemodle";

const handler = async (req, res) => {
    if (req.method === 'DELETE') {
        let noteId = req.query.slug;
        if (noteId) {
            try {
                await db.connect();
                const deltedNote = await Note.deleteOne({ _id: noteId });
                res.status(201).send(deltedNote);
            } catch (error) {
                res.status(409).send({ message: "Your id is not matched", error: error.message })
            }
        }
        else {
            res.status(409).send({ message: "Please Provide a vaild Information" })
        }
    }
    else {
        res.status(409).send({ message: "This method is not allowed" });
    }
}

export default handler;