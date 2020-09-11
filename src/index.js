document.addEventListener("DOMContentLoaded", ()=>{
    
    submitHandler()
    clickHandler()
})

const findUserIdSignIn = (username) => {        
    Adapter.getUserList("http://localhost:3000") 
    .then(users => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                console.log(users)
                const bar = document.getElementById('bar')
                bar.dataset.currentId = users[i].id
                CURRENT_USER = new Adapter('http://localhost:3000', bar.dataset.currentId)

                const popUp = document.getElementById('popup-sign')
                popUp.style.display = 'none'

                renderInfo()
            } else {
                console.log("Wrong username")
            }
        }
    })
}

const renderInfo = () => {
    const div = document.getElementById('follow-container')

    CURRENT_USER.getInfo()
        .then(info => {
            div.dataset.currentId = info.id
            div.dataset.currentFirst = info.first_name
            div.dataset.currentLast = info.last_name
            div.dataset.currentUsername = info.username
            renderFollower(info.follower_follows)
            renderFollowee(info.followee_follows)
            renderMessage(info.sender_messages, info.receiver_messages)
            createFollowButton(info.follower_follows)
            createUnfollowButton(info.followee_follows)
            }
        )
}

const renderFollower = (followers) => {
    followers.forEach(follower => {
        createFollower(follower)
    });
}

const renderMessage = (senderMessages, receiverMessages) => {
    senderMessages.forEach(message => {
        createReceived(message)
    })
    receiverMessages.forEach(message => {
        createSent(message)
    })
}

// Added reply button for the current user to reply to received messages
const createReceived = (message) => {
    const receivedDiv = document.getElementById('received')
    const messageDiv = document.createElement('div')
    messageDiv.className = "message-tile"
    messageDiv.dataset.messageId = message.id
    messageDiv.dataset.sender = message.sender_id
    messageDiv.dataset.receiver = message.receiver_id
    messageDiv.dataset.content = message.content
    messageDiv.dataset.username = message.sender.username
    messageDiv.dataset.date = new Date(Date.parse(message.created_at))
    
    messageDiv.innerHTML = `
        <h4>From: ${message.sender.first_name} ${message.sender.last_name} at: ${messageDiv.dataset.date}</h4>
        <p><strong>Message:</strong> ${message.content}</p>
        <button type="button" data-sender-username="${message.sender.username}" data-sender-id="${message.sender_id}" id="reply-btn" onclick="divShow()">Reply</button>
    `
    receivedDiv.append(messageDiv)
}

const createSent = (message) => {
    const sentDiv = document.getElementById('sent')
    const messageDiv = document.createElement('div')
    messageDiv.className = "message-tile"
    messageDiv.dataset.messageId = message.id
    messageDiv.dataset.sender = message.sender_id
    messageDiv.dataset.receiver = message.receiver_id
    messageDiv.dataset.content = message.content
    messageDiv.dataset.username = message.receiver.username
    messageDiv.dataset.date = new Date(Date.parse(message.created_at))
    messageDiv.innerHTML = `
        <h4>To: ${message.receiver.first_name} ${message.receiver.last_name} at: ${messageDiv.dataset.date}</h4>
        <p><strong>Message:</strong> ${message.content}</p>
    `
    sentDiv.append(messageDiv)
}

const createFollower = (follower) => {
    const ul = document.getElementById('followers')
    const li = document.createElement('li')
    ul.dataset.toggle = "off"
    li.className = "follow-li"
    li.dataset.followId = follower.id
    li.dataset.personId = follower.follower_id
    li.dataset.username = follower.follower.username
    li.dataset.first = follower.follower.first_name
    li.dataset.last = follower.follower.last_name
    li.innerHTML = `
        <h4>Username: @${follower.follower.username}</h4>
        <p>Name: ${follower.follower.first_name} ${follower.follower.last_name}</p>
        `
    ul.append(li)
}

const renderFollowee = (followees) => {
    followees.forEach(followee => {
        createFollowee(followee)
    })
}

const createFollowee = (followee) => {
    const ul = document.getElementById('followees')
    const li = document.createElement('li')
    ul.dataset.toggle = "off"
    li.className = "follow-li"
    li.dataset.followId = followee.id  
    li.dataset.personId = followee.followee_id
    li.dataset.username = followee.followee.username
    li.dataset.first = followee.followee.first_name
    li.dataset.last = followee.followee.last_name
    li.innerHTML = `
        <h4>Username: @${followee.followee.username}</h4>
        <p>Name: ${followee.followee.first_name} ${followee.followee.last_name}</p>
        `
    ul.append(li)
}

const createFollowButton = () => {
    const followerList = document.getElementById('followers')
    const followeeList = document.getElementById('followees') 

    for (follower of followerList.children) {
        const button = document.createElement('button')
        button.className = 'follow-btn'
        button.innerText = 'Follow'
        button.dataset.followId = null
        button.dataset.personId = follower.dataset.personId
        button.dataset.username = follower.dataset.username
        button.dataset.followee = false
        follower.append(button)

        for (followee of followeeList.children) {
            if (follower.dataset.personId === followee.dataset.personId) {
                button.dataset.followId = followee.dataset.followId
                button.innerText = "Unfollow"
                button.dataset.followee = true
            }
        }
    }

}

const createUnfollowButton = (followees) => {
    const followeeList = document.getElementById('followees')  
    
    for (followee of followeeList.children) {
        const button = document.createElement('button')
        button.className = 'follow-btn'
        button.innerText = 'Unfollow'
        button.dataset.followId = followee.dataset.followId
        button.dataset.personId = followee.dataset.personId
        button.dataset.username = followee.dataset.username
        button.dataset.followee = true
        followee.append(button)
    }
}


const clickHandler = () => {
    const followers = document.querySelector('#followers')
    const followees = document.querySelector('#followees')
    const inbox = document.querySelector('#received')
    const outbox = document.getElementById('sent')

    document.addEventListener("click", (e) => {
        let click = e.target

        if (click.matches('.follow-header')) {
            if (click.nextElementSibling.id === 'followers') {
                if (followers.dataset.toggle === 'off' ) {
                    followers.style.display = 'block'
                    followers.dataset.toggle = 'on'
                    console.log(followers.dataset.toggle)
                } else if (followers.dataset.toggle === 'on') {
                    followers.style.display = 'none'
                    followers.dataset.toggle = 'off'
                } 
            } else if (click.nextElementSibling.id === 'followees') {
                if (followees.dataset.toggle === 'off' ) {
                    followees.style.display = 'block'
                    followees.dataset.toggle = 'on'
                    console.log(followees.dataset.toggle)
                } else if (followees.dataset.toggle === 'on') {
                    console.log(followees.dataset.toggle)
                    followees.style.display = 'none'
                    followees.dataset.toggle = 'off'
                } 
            }
        } else if (click.matches('.mailbox'))  {
            console.log('mailbox clicked')
            if(click.nextElementSibling.id === 'received'){
                if(inbox.dataset.toggle === 'off'){
                    inbox.style.display = 'block'
                    inbox.dataset.toggle = "on"
                    console.log(inbox.dataset.toggle)
                } else if (inbox.dataset.toggle === 'on') {
                    inbox.style.display = 'none'
                    inbox.dataset.toggle = 'off'
                }
            } else if(click.nextElementSibling.id === 'sent'){
                if(outbox.dataset.toggle === 'off'){
                    outbox.style.display = 'block'
                    outbox.dataset.toggle = "on"
                    console.log(outbox.dataset.toggle)
                } else if(outbox.dataset.toggle === 'on'){
                    outbox.style.display = 'none'
                    outbox.dataset.toggle = 'off'
                    console.log(outbox.dataset.toggle)
                }
            }
        } else if (click.matches('.follow-btn')){
            console.log(`${click.innerText} button clicked!`)
            const div = document.getElementById('follow-container')
            const currentId = div.dataset.currentId
            const followId = click.dataset.followId
            const personId = click.dataset.personId
            const ulFollowers = document.getElementById('followers')
            const ulFollowees = document.getElementById('followees')
// button to add a user to follow list (followee)
            if(click.dataset.followee === 'false'){
                CURRENT_USER.addFollow(currentId, personId)
                    .then(followee => {
                        console.log(followee)
                        click.innerText = 'Unfollow'
                        click.dataset.followee = "true"
                        click.dataset.followId = followee.id
                        ulFollowees.dataset.toggle = "off"
                        const newLi = document.createElement('li')
                        newLi.className = "follow-li"
                        newLi.dataset.followId = click.dataset.followId
                        newLi.dataset.personId = personId
                        newLi.dataset.username = click.dataset.username
                        newLi.dataset.first = click.dataset.first
                        newLi.dataset.last = click.dataset.last
                        newLi.innerHTML = click.parentElement.innerHTML
                        ulFollowees.append(newLi)  
                        
                        const suggestedUl = document.getElementById('suggested-container')
                        const suggestedLi = suggestedUl.querySelector(`[data-person-id="${personId}"]`)
                        suggestedLi.remove()
                    })
// button to unfollow an user that follows you
            } else if (click.dataset.followee === 'true'){
                CURRENT_USER.deleteFollow(followId)
                    .then(resp => console.log(resp))
                if (click.parentElement.parentElement.id === "followees") {
                    for (follower of ulFollowers.children) {
                        if (follower.dataset.personId === click.dataset.personId) {
                            follower.lastElementChild.innerText = "Follow"
                            follower.lastElementChild.dataset.followee = false
                        }
                    }
                    click.parentElement.remove()
                    console.log(click, "look at me")
                } else if (click.parentElement.parentElement.id === "followers") {
                    click.innerText = "Follow"
                    click.dataset.followee = "false"
                        for (followee of ulFollowees.children) {
                            if (followee.dataset.personId === click.dataset.personId) {
                                followee.remove()
                            }
                        }
                }
            }
        } 
        else if (click.matches('#reply-btn')) {
            const form = document.getElementById('message-form')
            form.user.value = click.dataset.senderUsername
            const messageInput = form.message.value 
            reminderHide()
        }

        else if (click.matches('#suggested-follows')) {
            if (click.dataset.toggle == 'off') {
                click.dataset.toggle = 'on'
                const suggestedUl = document.getElementById('suggested-container')
                suggestedUl.innerHTML = ''
                suggestedFriends()
                console.log(click)          
            } else if (click.dataset.toggle == 'on') {
                const suggestedUl = document.getElementById('suggested-container')
                suggestedUl.style.display = 'none' 
                click.dataset.toggle = 'off'
                console.log(click)          
            }
        } 
    })
}

// Add error message when username is not found
const findUserIdAndSubmitMessage = (input, currentId, messageInput) => {
    let receiverId = null
    Adapter.getUserList("http://localhost:3000")
        .then(users => {
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === input) {
                    console.log(users)
                    receiverId = users[i].id
                }
            }
            if (receiverId){
                console.log(receiverId)
            } else {
                console.log('No user found. Check spelling and try again.')
            }

            CURRENT_USER.submitMessage(currentId, receiverId, messageInput)
                .then(message => {
                    console.log(message)
                    createSent(message)
                    divHide()
                })
                .catch(console.log)
        })
        .catch(console.log)
}

const submitHandler = () => {
    const signInForm = document.getElementById('sign-in-form')
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const username = signInForm.username.value
        findUserIdSignIn(username)
    })

    const messageForm = document.getElementById('message-form')
    messageForm.addEventListener("submit", (e) => {
        let click = e.target
        e.preventDefault()
        console.log(click)
        const userInput = messageForm.user.value
        const messageInput = messageForm.message.value  
        const div = document.getElementById('follow-container')
        const currentId = parseInt(div.dataset.currentId, 10)

        findUserIdAndSubmitMessage(userInput, currentId, messageInput)
        messageForm.reset()
    })   
}

function divShow() {
    const popNewMessage = document.querySelector('#popup')
    popNewMessage.style.display = 'block'
}

function divHide() {
    const popNewMessage = document.querySelector('#popup')
    popNewMessage.style.display = 'none'
}

function signInHide() {
    const signIn = document.querySelector('#popup-sign')
    signIn.style.display = 'none'
}

function signInShow() {
    const signIn = document.querySelector('#popup-sign')
    signIn.style.display = 'block'
}

const reminderHide = () => {
    const reminderContainer = document.getElementById('reminder-container')
    reminderContainer.style.display = 'none'
}

const suggestedFriends = () => {
    const suggestedUl = document.getElementById('suggested-container')
    const url = 'http://localhost:3000'
    suggestedUl.style.display = 'block'

    Adapter.getUserList(url)
    .then(users => {
        const currentUserId = parseInt(document.getElementById('follow-container').dataset.currentId, 10)
        let suggested = []
        
        for(user of users){
            if(currentUserId !== user.id){
                //build an array of follower_id's from follower_follows
                //see if that array includes currentUserId
                //if not, push the user instance
                let follower_follows_ids = []
                for(follower of user.follower_follows){
                    follower_follows_ids.push(follower.follower_id)
                }
                if(!follower_follows_ids.includes(currentUserId)){
                    suggested.push(user)
                }
                
            }
        }
        // debugger
        // console.log("Debugger hit!")

        for (user of suggested) {
            const li = document.createElement('li')
            li.className = "suggested-li"
            li.dataset.personId = user.id
            li.dataset.username = user.username
            li.dataset.first = user.first_name
            li.dataset.last = user.last_name
            li.innerHTML = `
                <h4>Username: @${user.username}</h4>
                <p>Name: ${user.first_name} ${user.last_name}</p>
                <button class="follow-btn" data-follow-id="null" data-followee="false" data-username="${user.username}" data-person-id="${user.id}">Follow</button>
                `
            suggestedUl.append(li) 
        }
        //add to button attributes to make click-listener for follow behavior work
    })
}


/*
create follow button to add followee to div (make sure to add all dataset attributes)
make sure that it updates DOM /JSON
--needs to append to followee ul
write README
*/