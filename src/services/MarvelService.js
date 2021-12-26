import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();
    // error, loading
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=f11ae0ce1869fe40b587867e296d143a';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    
    const getComicsList  = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description for this character',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price === 0 ? 'NOT AVAILABLE' : comics.prices[0].price + '$'
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {
            // loading, 
            // error, 
            process, 
            setProcess,
            getAllCharacters, 
            getCharacter, 
            clearError, 
            getComicsList, 
            getComic, 
            getCharacterByName}
}

// class MarvelService {
//     _apiBase = 'https://gateway.marvel.com:443/v1/public/';
//     _apiKey = 'apikey=f11ae0ce1869fe40b587867e296d143a';
//     _baseOffset = 210;

//     // getResources = async (url) => {
//     //     const res = await fetch(url);
        
//     //     if(!res.ok) {
//     //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//     //     }
    
//     //     return await res.json();
//     // }

//     getAllCharacters = async (offset = this._baseOffset) => {
//         const res = await this.getResources(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
//         return res.data.results.map(this._transformCharacter);
//     }

//     getCharacter = async (id) => {
//         const res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
//         return this._transformCharacter(res.data.results[0]);
//     }

//     _transformCharacter = (char) => {
//         return {
//             id: char.id,
//             name: char.name,
//             description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
//             thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
//             homepage: char.urls[0].url,
//             wiki: char.urls[1].url,
//             comics: char.comics.items
//         }
//     }
// }

export default useMarvelService;