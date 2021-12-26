import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

import './charForm.scss';

const CharForm = () => {

    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();
        
        getCharacterByName(name)
            .then(onCharLoaded);
    }

    const content = (!char) ? null : char.length > 0 ? 
    <div className='char__form__toPage'>
        <div className='char__form__toPage__text'>There is! Visit {char[0].name} page?</div> 
        <Link 
            to={`/character/${char[0].id}`}
            className='char__form__btn char__form__btn_toPage'
        >
            TO PAGE
        </Link>
    </div> : 
    <div className='char__form__toPage__text char__form__toPage__text_notFound' >The character was not found. Check the name and try again</div>

    return (
        <div className="char__form">
            <Formik
                initialValues={{ charName: '' }}
                
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}

                onSubmit={({charName}) => {
                    updateChar(charName);
                }}
            >
                <Form> 
                    <label className="char__form__label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__form__bottom">
                        <Field 
                            type="text"  
                            name="charName" 
                            className="char__form__label"
                            placeholder="Enter name" />
                        <button 
                            type="submit" 
                            disabled={loading}
                            className='char__form__btn'
                        >
                            FIND
                        </button>
                    </div>
                    <ErrorMessage name="charName" component="div" className='char__form__toPage__text char__form__toPage__text_notFound'/>
                </Form>
            </Formik>
            {content}
        </div>
        


        // <form htmlFor="char" className="char__form">
        //     <label className="char__form__label">Or find a character by name:</label>
        //     <div className="char__form__bottom">
        //         <input
        //             id="name"
        //             name="name"
        //             type="text"
        //             placeholder='Enter name'
        //         />
        //         <button 
        //             type="submit"
        //             className='char__form__btn'>FIND</button>
        //     </div>
        // </form>
    )
}

export default CharForm;