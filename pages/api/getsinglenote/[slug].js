import db from "../../../utils/db";
import Note from "../../../models/notemodle";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        let { query } = req;
        if (query) {
            await db.connect();
            const note = await Note.findOne({ _id: query.slug });
            res.status(200).send(note);
        }
        else {
            res.status(409).send({ message: "Your Id is wrong" })
        }
    }
    else {
        res.status(409).send({ message: "This method is not allowed" });
    }
}

export default handler;