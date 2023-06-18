import {useState} from "react";
import {useAddTaskMutation} from "../API/reducers/tasksApi.js";

const Header = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [addTask, {isError}] = useAddTaskMutation()

    const addNewTask = async () => {
        if (inputValue){
            await addTask({text: inputValue}).unwrap()
            setInputValue('')
        }
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <div>
            <h1 style={{textAlign:'center'}}>To Do List</h1>
            <div className={'search '}>
                <input
                    placeholder={"Enter a task here"}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className={'mainInp'}
                />
                <button
                    className={'addTask'}
                    onClick={ () => addNewTask()}
                >Add new
                </button>
            </div>
        </div>
    );
};

export default Header;