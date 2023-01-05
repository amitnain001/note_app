import { createContext, useState } from "react";

export const Login_data = createContext(null);

function Context({ children }) {
    const [loginUser, setloginUser] = useState(false);

    return (
        <Login_data.Provider value={{ loginUser, setloginUser }}>
            {children}
        </Login_data.Provider>
    );
}

export default Context;