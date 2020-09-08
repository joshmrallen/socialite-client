class Adapter {

    constructor(baseUrl, user_id) {
        this.baseUrl = baseUrl;
        this.user_id = user_id;
    }

   // RETURNS ONE USER'S JSON SHOW PAGE
    // getInfo() {
    //     return fetch(`${this.baseUrl}/users/${this.user_id}`) //endpoint to user data
    //     .then(resp => resp.json())    
    // }

    getFollowers() {
        return fetch(`${this.baseUrl}/users/${this.user_id}/followers`) //endpoint to followers
        .then(resp => resp.json())
        debugger
    }

    getFollowees(){
        return fetch(`${this.baseUrl}/users/${this.user_id}/followees`) //endpoint to followees
            .then(resp => resp.json())
    }
    // in index.js
    // user instance calls new Adapter:
    // jenn = new Adapter("localhost::3000")
    // jenn.getFollowers.then(followers => renderFollowers(followers))
    // jenn.getFollowees.then(followees => renderFollowees(followees))
    
}
