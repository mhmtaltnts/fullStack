import { useContext } from "react";
import MyThemeContext from "../context/MyThemeProvider";


const useTheme = () => {
    return useContext(MyThemeContext)
}

export default useTheme