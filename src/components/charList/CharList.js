import { Component } from 'react';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../error/ErrorMessage';
import MarvelService from '../../services/MarvelService'

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        chars:[],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharsLoaded = (chars) => {
        this.setState({
            chars,
            loading: false})
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true})
    }
    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {chars, loading, error} = this.state;
        
        const items = this.renderItems(chars);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (

            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>

            // <div className="char__list">
            //     <ul className="char__grid">
            //         <li className="char__item">
            //             <img src={abyss} alt="abyss"/>
            //             <div className="char__name">Abyss</div>
            //         </li>
            //         <li className="char__item char__item_selected">
            //             <img src={abyss} alt="abyss"/>
            //             <div className="char__name">Abyss</div>
            //         </li>
            //     </ul>
            //     <button className="button button__main button__long">
            //         <div className="inner">load more</div>
            //     </button>
            // </div>
        )
    }
}

export default CharList;