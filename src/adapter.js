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

    static getUserList(usersUrl){
        return fetch(`${usersUrl}/users`) //endpoint for comprehensive list of users on platform
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

    deleteFollow(followId){
        const configObj = {
            method: "DELETE",
        }
        return fetch(`${this.baseUrl}/follows/${followId}`, configObj)
            .then(resp => resp.json())
    }

    submitMessage(senderId, receiverId, messageContent){
        const configObj = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                sender_id: senderId,
                receiver_id: receiverId,
                content: messageContent
            })
        }
        return fetch(`${this.baseUrl}/messages`, configObj)
            .then(resp => resp.json())
    }
}
