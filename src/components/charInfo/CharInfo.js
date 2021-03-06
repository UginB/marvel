import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import useMarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../error/ErrorMessage';
// import Skeleton from '../skeleton/Skeleton';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    
    const {loading, error, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [props.charId]);

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }
    
    // const skeleton = char || loading || error ? null : <Skeleton/>
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <>
            <div className="char__info">
                {/* {skeleton}
                {errorMessage}
                {spinner}
                {content} */}
                {setContent(process, View, char)}
            </div>
        </>
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

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

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