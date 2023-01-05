import User from "../../models/usermodle";
import db from "../../utils/db";


const handler = async (req, res) => {
    const user = req.body;
    if (user.email && user.password) {
        try {
            await db.connect();
            const result = await User.findOne({ email: user.email, password: user.password });
            if (result === null) {
                res.status(201).send({ message: "Invalid Password or Email." });
                return;
            } else {
                res.status(201).send(result);
                return;
            }

        } catch (error) {
            res.status(409).send({ message: "error occured in post api in user api", error: error.message })
        }
    }
    else {
        res.status(409).send({ message: "Please provide valid information." });
    }
}


export default handler;