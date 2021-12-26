import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error/ErrorMessage';
import useMarvelService from '../../services/MarvelService'

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
            break;
        case 'confirmed':
            return <Component/>; 
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error('Unexpected process state')
    }
}

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    // const marvelService = new MarvelService();
    const {loading, error, getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true); //eslint-disable-next-line
    }, [])
    //useEffect запускается уже после рендера, поэтому в него можно помещать стрелочную функцию до ее объявления

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setChars(chars => [...chars, ...newChars]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    tabIndex={0}
                    className="char__item"
                    key={item.id}
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    
    // const items = renderItems(chars);

    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {/* {errorMessage}
            {spinner}
            {items} */}
            {setContent(process, () => renderItems(chars), newItemLoading)}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

// class CharList extends Component {
//     state = {
//         chars: [],
//         loading: true,
//         error: false,
//         newItemLoading: false, 
//         offset: 210,
//         charEnded: false
//     }

//     marvelService = new MarvelService();

//     componentDidMount() {
//         this.onRequest();
//     }

//     onRequest = (offset) => {
//         this.onCharListLoading();
//         this.marvelService.getAllCharacters(offset)
//             .then(this.onCharsLoaded)
//             .catch(this.onError)
//     }

//     onCharListLoading = () => {
//         this.setState({
//             newItemLoading: true
//         })
//     }

//     onCharsLoaded = (newChars) => {
//         let ended = false;
//         if (newChars.length < 9) {
//             ended = true;
//         }

//         this.setState(({offset, chars}) => ({
//             chars: [...chars, ...newChars],
//             loading: false,
//             newItemLoading: false,
//             offset: offset + 9,
//             charEnded: ended
//         }))
//     }

//     onError = () => {
//         this.setState({
//             loading: false,
//             error: true})
//     }

//     itemRefs = [];

//     setRef = (ref) => {
//         this.itemRefs.push(ref);
//     }

//     focusOnItem = (id) => {
//         this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
//         this.itemRefs[id].classList.add('char__item_selected');
//         this.itemRefs[id].focus();
//     }

//     // Этот метод создан для оптимизации, 
//     // чтобы не помещать такую конструкцию в метод render
//     renderItems(arr) {
//         const items =  arr.map((item, i) => {
//             let imgStyle = {'objectFit' : 'cover'};
//             if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//                 imgStyle = {'objectFit' : 'unset'};
//             }
            
//             return (
//                 <li 
//                     tabIndex={0}
//                     className="char__item"
//                     key={item.id}
//                     ref={this.setRef}
//                     onClick={() => {
//                         this.props.onCharSelected(item.id);
//                         this.focusOnItem(i);
//                     }}
//                     onKeyPress={(e) => {
//                         if (e.key === ' ' || e.key === "Enter") {
//                             this.props.onCharSelected(item.id);
//                             this.focusOnItem(i);
//                         }
//                     }}>
//                         <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
//                         <div className="char__name">{item.name}</div>
//                 </li>
//             )
//         });
//         // А эта конструкция вынесена для центровки спиннера/ошибки
//         return (
//             <ul className="char__grid">
//                 {items}
//             </ul>
//         )
//     }

//     render() {
//         const {chars, loading, error, newItemLoading, offset, charEnded} = this.state;
        
//         const items = this.renderItems(chars);

//         const errorMessage = error ? <ErrorMessage/> : null;
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error) ? items : null;

//         return (

//             <div className="char__list">
//                 {errorMessage}
//                 {spinner}
//                 {content}
//                 <button 
//                     className="button button__main button__long"
//                     disabled={newItemLoading}
//                     onClick={() => this.onRequest(offset)}
//                     style={{'display': charEnded ? 'none' : 'block'}}>
//                     <div className="inner">load more</div>
//                 </button>
//             </div>


                                                        //СТАРАЯ ВЕРСТКА   
//             // <div className="char__list">
//             //     <ul className="char__grid">
//             //         <li className="char__item">
//             //             <img src={abyss} alt="abyss"/>
//             //             <div className="char__name">Abyss</div>
//             //         </li>
//             //         <li className="char__item char__item_selected">
//             //             <img src={abyss} alt="abyss"/>
//             //             <div className="char__name">Abyss</div>
//             //         </li>
//             //     </ul>
//             //     <button className="button button__main button__long">
//             //         <div className="inner">load more</div>
//             //     </button>
//             // </div>
//         )
//     }
// }

export default CharList;