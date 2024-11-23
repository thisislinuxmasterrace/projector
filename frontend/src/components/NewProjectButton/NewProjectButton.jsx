import "./NewProjectButton.css";
import {useRef, useState} from "react";
import {useAuth} from "../../providers/auth.provider";

const NewProjectButton = ({counterFunction}) => {
    const [isOpen, setIsOpen] = useState(false);

    const [value, setValue] = useState("");

    const inputRef = useRef(null);

    const {apiService} = useAuth();

    const onSubmit = e => {
        e.preventDefault();

        if(value.trim() !== "") {
            setIsOpen(false);
            apiService.createProject(value.trim()).then(data => {
                alert(`Проект ${data.name} создан`);
                counterFunction()
            });
            setValue("");
        }
    };

    const onCLose = () => {
        setIsOpen(false);
        setValue("");
    };

    const onOpen = async () => {
        await setIsOpen(true);
        inputRef.current.focus();
    };

    const onChange = e => {
        setValue(e.target.value);
    };

    return (
        <div className="card new-project yellow lighten-5">
            {isOpen ? <form onSubmit={onSubmit} className="new-project__form">
                <input  ref={inputRef} onChange={onChange} value={value} type="text" className="new-project__input" />
                <button type="button" onClick={onCLose} className="new-project__button red darken-1"><i className="grey-text text-lighten-4 small material-icons">close</i></button>
                <button type="submit" className="new-project__button green darken-1"><i className="grey-text text-lighten-4 small material-icons">check</i></button>
            </form> : <div onClick={onOpen} className="new-project__closed deep-orange darken-1 white-text"><span>Новый проект</span><i className="small material-icons">add_to_photos</i></div>}
        </div>
    );
};

export default NewProjectButton;