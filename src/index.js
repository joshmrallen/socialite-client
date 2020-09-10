document.addEventListener("DOMContentLoaded", ()=>{

    renderInfo()
    clickHandler()

})

const ian_social = new Adapter("http://localhost:3000", 11)

const renderInfo = () => {
    const div = document.getElementById('follow-container')
    ian_social.getInfo()
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
    messageDiv.className = "received-div"
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
    messageDiv.className = "sent-div"
    messageDiv.dataset.messageId = message.id
    messageDiv.dataset.sender = message.sender_id
    messageDiv.dataset.receiver = message.receiver_id
    messageDiv.dataset.content = message.content
    messageDiv.dataset.username = message.receiver.username

    const dateVar = new Date(message.created_at).toISOString().split('T')[0]
    messageDiv.dataset.date = dateVar

    //new Date(Date.parse(message.receiver.created_at))
    //new Date(message.receiver.created_at).toISOString().split('T')[0]


    messageDiv.innerHTML = `
        <h4>To: ${message.receiver.first_name} ${message.receiver.last_name} at: ${dateVar}</h4>
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

// const createFollowButton = (followees) => {
//     const followList = document.querySelectorAll('.follow-li')
//     const followeeIds = []
//     followees.forEach(followee => followeeIds.push(followee.followee.id))

//     for(let li of followList){
//         const button = document.createElement('button')
//         button.className = 'follow-btn'

//         if(followeeIds.includes(parseInt(li.dataset.personId, 10))){
//             button.innerText = 'Unfollow'
//             button.dataset.followId = li.dataset.followId
//             button.dataset.personId = li.dataset.personId
//             button.dataset.username = li.dataset.username
//             button.dataset.followee = true
//             li.append(button)
//         } else {
//             button.innerText = 'Follow'
//             button.dataset.followId = ''
//             button.dataset.personId = li.dataset.personId
//             button.dataset.username = li.dataset.username
//             button.dataset.followee = false
//             li.append(button)
//         }
//     }
// }

const createFollowButton = (followers) => {
    const followerList = document.getElementById('followers')
    const followeeList = document.getElementById('followees')  

    for (follower of followerList.children) {
        if (followeeList.children.length === 0) {
            const button = document.createElement('button')
            button.className = 'follow-btn'
            button.innerText = 'Follow'
            button.dataset.followId = null
            button.dataset.personId = follower.dataset.personId
            button.dataset.username = follower.dataset.username
            button.dataset.followee = false
            follower.append(button)
        } else {
            for (followee of followeeList.children) {
                if (follower.dataset.personId === followee.dataset.personId) {
                    const button = document.createElement('button')
                    button.className = 'follow-btn'
                    button.innerText = 'Unfollow'
                    button.dataset.followId = followee.dataset.followId
                    button.dataset.personId = follower.dataset.personId
                    button.dataset.username = follower.dataset.username
                    button.dataset.followee = true
                    follower.append(button)
                } else {
                    const button = document.createElement('button')
                    button.className = 'follow-btn'
                    button.innerText = 'Follow'
                    button.dataset.followId = null
                    button.dataset.personId = follower.dataset.personId
                    button.dataset.username = follower.dataset.username
                    button.dataset.followee = false
                    follower.append(button)
                }
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
                    followers.style.visibility = 'visible'
                    followers.dataset.toggle = 'on'
                    console.log(followers.dataset.toggle)
                } else if (followers.dataset.toggle === 'on') {
                    followers.style.visibility = 'hidden'
                    followers.dataset.toggle = 'off'
                } 
            } else if (click.nextElementSibling.id === 'followees') {
                if (followees.dataset.toggle === 'off' ) {
                    followees.style.visibility = 'visible'
                    followees.dataset.toggle = 'on'
                    console.log(followees.dataset.toggle)
                } else if (followees.dataset.toggle === 'on') {
                    console.log(followees.dataset.toggle)
                    followees.style.visibility = 'hidden'
                    followees.dataset.toggle = 'off'
                } 
            }
        } else if (click.matches('.mailbox'))  {
            console.log('mailbox clicked')
            if(click.nextElementSibling.id === 'received'){
                if(inbox.dataset.toggle === 'off'){
                    inbox.style.visibility = 'visible'
                    inbox.dataset.toggle = "on"
                    console.log(inbox.dataset.toggle)
                } else if (inbox.dataset.toggle === 'on') {
                    inbox.style.visibility = 'hidden'
                    inbox.dataset.toggle = 'off'
                }
            } else if(click.nextElementSibling.id === 'sent'){
                if(outbox.dataset.toggle === 'off'){
                    outbox.style.visibility = 'visible'
                    outbox.dataset.toggle = "on"
                    console.log(outbox.dataset.toggle)
                } else if(outbox.dataset.toggle === 'on'){
                    outbox.style.visibility = 'hidden'
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
                ian_social.addFollow(currentId, personId)
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
                    })

// button to unfollow an user that follows you
            } else if (click.dataset.followee === 'true'){
                ian_social.deleteFollow(followId)
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
            form.user.value = click.dataset.senderUsername  // pop up form automatically populates with sender's username
            const messageInput = form.message.value // getting the value of message from form 
        }


        /* 
        click listener for reply button in Inbox
            -- not sure if click listener or submit listener for sending/replying messages
        */ 
        
    
    })
}


// Functions to hide/show pop up message form

function divShow() {
    const popNewMessage = document.querySelector('#popup')
    popNewMessage.style.display = 'block'
}

function divHide() {
    const popNewMessage = document.querySelector('#popup')
    popNewMessage.style.display = 'none'
}





/*

Following someone who follows you:
1. button in create follower
2. if statement: if they are user's followee, button text says 'unfollow', else 'follow'


*/