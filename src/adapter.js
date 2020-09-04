class Adapter {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get getFollowers() {
        return fetch(baseUrl + "/followers") //endpoint to followers
        .then(resp => resp.json())
    }
    
}
