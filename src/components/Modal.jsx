import {createPortal} from "react-dom";
import {useEffect} from "react";
import {useBlur} from "../BlurContext.jsx";
import {useSelector} from "react-redux";

const Modal = () => {
    const { handleBlur, handleUnblur } = useBlur();
    const {isOpen, text, onClose, onRemove} = useSelector((state) => state.modal)

    useEffect(() => {
        if(isOpen){
            handleBlur();
        }
        else{
            handleUnblur();
        }
    }, [isOpen])

    if(!isOpen)
        return;

    return createPortal(<div className="modal">
            <div className="modal__content">
                <div>{text}</div>
                <button onClick={() => onClose()}>Close</button>
                <button onClick={() => onRemove()}>Delete
                </button>
            </div>
        </div>
    , document.body);
};

export default Modal;
