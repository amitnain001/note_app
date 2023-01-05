import db from "../../utils/db";
import Note from "../../models/notemodle";

const handler = async (req, res) => {
    if (req.method === 'PUT') {
        let newData = req.body;
        if (newData.code && newData.codeLanguage && newData.title && newData._id) {
            await db.connect();
            const updatedData = await Note.updateOne({ _id: newData._id }, newData);
            res.status(201).send(updatedData);
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