import {useEffect} from "react";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const AuthForm = ({inputs, onChange, onSubmit}) => {
    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    return (
        <form onSubmit={onSubmit}>
            {inputs.map(input => {
                return (
                    <div className="input-field col s12" key={input.name}>
                        <input onChange={onChange} id={input.name} type={input.type} className="validate" value={input.value} />
                        <label htmlFor={input.name}>{capitalizeFirstLetter(input.name)}</label>
                    </div>
                );
            })}
            <div className="col">
                <button className="btn waves-effect waves-light orange darken-4" type="submit"
                        name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </form>
    );
};

export default AuthForm;