import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {charId} = props;
    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        if (!charId) {
            return
        }

        onCharLoading();

        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }
    
    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
    
}

// class CharInfo extends Component {
//     state = {
//         char: null,
//         loading: false,
//         error: false
//     }

//     marvelService = new MarvelService();

//     componentDidMount() {
//         this.updateChar();
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (this.props.charId !== prevProps.charId) {
//             this.updateChar();
//         }
//     }

//     updateChar = () => {
//         const {charId} = this.props;
//         if (!charId) {
//             return
//         }

//         this.onCharLoading();

//         this.marvelService
//             .getCharacter(charId)
//             .then(this.onCharLoaded)
//             .catch(this.onError)
//     }

//     onCharLoaded = (char) => {
//         this.setState({
//             char,
//             loading: false})
//     }

//     onCharLoading = () => {
//         this.setState({loading: true})
//     }

//     onError = () => {
//         this.setState({
//             loading: false,
//             error: true})
//     }

//     render() {
//         const {char, loading, error} = this.state;
//         const skeleton = char || loading || error ? null : <Skeleton/>
//         const errorMessage = error ? <ErrorMessage/> : null;
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error || !char) ? <View char={char} /> : null;

//         return (
//             <div className="char__info">
//                 {skeleton}
//                 {errorMessage}
//                 {spinner}
//                 {content}
//             </div>
//         )
//     }
// }

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    const renderComicsList = (comicsList) => {
        // eslint-disable-next-line
        return comicsList.map((item, i) => {
            if (i < 10) {
                return (
                    <li key={i} className="char__comics-item">
                        {item.name}
                    </li>
                )
            }
        })
    }

    const comicsList = (comics.length) ? renderComicsList(comics) : 'this character has no comics'

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;