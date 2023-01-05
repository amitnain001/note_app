import Note from "../../models/notemodle";
import db from "../../utils/db";


const handler = async (req, res) => {
    if (req.method === 'POST') {
        const newNote = req.body;
        if (newNote.code && newNote.codeLanguage && newNote.title) {
            try {
                await db.connect();
                let data = await Note.create(newNote);
                res.status(201).send(data);
                return;
            } catch (error) {
                res.status(409).send({ message: "error occured in addnote post api ", error: error.message });
                return;
            }
        }
        else {
            res.status(409).send({ message: "PLease provide valid data." })
        }
    }
    res.status(409).send({ message: "This method is not allowed" })
}

export default handler;