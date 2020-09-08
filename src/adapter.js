class Adapter {

    constructor(baseUrl, user_id) {
        this.baseUrl = baseUrl;
        this.user_id = user_id;
    }

    //return's one user's json show page
    getInfo() {
        return fetch(`${this.baseUrl}/users/${this.user_id}`) //endpoint to user data
        .then(resp => resp.json())    
    }

    getUserList(){
        return fetch(`${this.baseUrl}/users`) //endpoint for comprehensive list of users on platform
            .then(resp => resp.json())
    }

    addFollow(followerId, followeeId){
        const follow = {
            follower_id: followerId,
            followee_id: followeeId
        }

        const configObj = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(follow)
        }
        return fetch(`${this.baseUrl}/follows`, configObj)
            .then(resp => resp.json())
    }

    deleteFollow(){
        
    }




    
    // getFollowers() {
    //     return fetch(`${this.baseUrl}/users/${this.user_id}/followers`) //endpoint to followers
    //     .then(resp => resp.json())
    //     debugger
    // }

    // getFollowees(){
    //     return fetch(`${this.baseUrl}/users/${this.user_id}/followees`) //endpoint to followees
    //         .then(resp => resp.json())
    // }

    // in index.js
    // user instance calls new Adapter:
    // jenn = new Adapter("localhost::3000")
    // jenn.getFollowers.then(followers => renderFollowers(followers))
    // jenn.getFollowees.then(followees => renderFollowees(followees))
    
}
