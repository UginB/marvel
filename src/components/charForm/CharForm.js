import './charForm.scss';

const CharForm = () => {
    return (
        <form htmlFor="char" className="char__form">
            <label className="char__form__label">Or find a character by name:</label>
            <div className="char__form__bottom">
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder='Enter name'
                />
                <button 
                    type="submit"
                    className='char__form__btn'>FIND</button>
            </div>
        </form>
    )
}

export default CharForm;