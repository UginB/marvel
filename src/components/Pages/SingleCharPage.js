import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

import './singleCharPage.scss';
// import xMen from '../../resources/img/x-men.png';

const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [charId]);

    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <>
            <AppBanner/>
            {/* {errorMessage}
            {spinner}
            {content} */}
            {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail} = data;
    return (
        <div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharPage;