

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=f11ae0ce1869fe40b587867e296d143a'

    getResources = async (url) => {
        const res = await fetch(url);
        
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResources(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;