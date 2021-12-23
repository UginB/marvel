import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

import './singleComicPage.scss';
// import xMen from '../../resources/img/x-men.png';

const SingleCharPage = () => {
    const {CharId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [CharId]);

    const updateChar = () => {
        clearError();
        getCharacter(CharId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (Char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {title, description, thumbnail} = char;
    return (
        <div className="single-char">
            <img src={thumbnail} alt={title} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{title}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link to='/comics' className="single-char__back">Back to all</Link>
        </div>
    )
}

export default SingleCharPage;