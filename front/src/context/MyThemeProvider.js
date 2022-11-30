import { createContext, useState } from "react";

const MyThemeContext = createContext({});

export const MyThemeProvider = ({ children }) => {
    const [isDark, setDark] = useState(false);
    

    return (
        <MyThemeContext.Provider value={{ isDark, setDark }}>
            {children}
        </MyThemeContext.Provider>
    )
}

export default MyThemeContext;