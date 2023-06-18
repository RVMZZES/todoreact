// create the context
import {createContext, useContext, useState} from "react";

const BlurContext = createContext(false);
export const BlurProvider = ({children}) => {
    const [isBlur, setIsBlur] = useState(false);

    return (
        <BlurContext.Provider value={{isBlur, setIsBlur}}>
            {children}
        </BlurContext.Provider>
    );
};
export const useBlur = () => {
    const {isBlur, setIsBlur} = useContext(BlurContext);

    const handleBlur = () => {
        setIsBlur(true);
    };

    const handleUnblur = () => {
        setIsBlur(false);
    };

    // return the state and functions to manipulate it
    return {isBlur, handleBlur, handleUnblur};
};
