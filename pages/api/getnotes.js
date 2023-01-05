import db from "../../utils/db";
import Note from "../../models/notemodle";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            await db.connect();
            const data = await Note.find();
            res.status(200).send(data);
        } catch (error) {
            res.status(409).send({ message: "error occured in getnotes api", error: error.message })
        }
    }
    else {
        res.status(409).send({ message: "This method is not allowed" })

    }
}


export default handler;