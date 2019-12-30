import rp from 'request-promise';

export default class MarvelProxyService {

    constructor(baseURL) {
        // var baseURL = 'http://' + location.hostname + ":" + location.port + '/api/';
        this.rootURL = baseURL;
        this.offset = 0;
        this.count = 12;

    }

    findAllCharacters(dir) {
        let offsetString = "";
        if (dir) {
            if (dir === 'prev') {
                this.offset = this.offset - this.count;
                if (this.offset < 0) {
                    this.offset = 0;
                }

            }
            if (dir === 'next') {
                this.offset = this.offset + this.count;
            }

        }
        offsetString = `?dir=${dir}&offset=${this.offset}`;
        let url = this.rootURL + "characters/findAll" + offsetString;
      //  console.log("findall1000 " + url);
        return rp(url);

    }

    findComicsForCharacter(characterId) {

        let url = this.rootURL + "characters/" + characterId + "/comics";
        return rp(url);

    }

    findStoriesForCharacter(characterId) {
        // api/characters/:characterId/comics
        let url = this.rootURL + "characters/" + characterId + "/stories";
        // console.log("url is "+url)
        return rp(url);



    }
}