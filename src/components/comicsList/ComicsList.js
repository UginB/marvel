import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';
// import uw from '../../resources/img/UW.png';
// import xMen from '../../resources/img/x-men.png';

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

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]); 
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsListEnded, setComicsListEnded] = useState(false);

    const {loading, error, getComicsList, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true); //eslint-disable-next-line
    }, [])
    //useEffect запускается уже после рендера, поэтому в него можно помещать стрелочную функцию до ее объявления

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComicsList(offset)
            .then(onCharsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComicsList(comics => [...comics, ...newComics]);
        setNewItemLoading(false);
        setOffset(offset + 9);
        setComicsListEnded(ended);
    }

    function renderItems(arr) {
        const items =  arr.map(item => {         
            return (
                <li 
                    className="comics__item"
                    key={item.id}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    
    // const items = renderItems(comicsList);

    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {/* {errorMessage}
            {spinner}
            {items} */}
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{'display': comicsListEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

// const ComicsList = () => {
//     return (
//         <div className="comics__list">
//             <ul className="comics__grid">
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

export default ComicsList;