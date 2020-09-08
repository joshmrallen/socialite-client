document.addEventListener("DOMContentLoaded", ()=>{

    renderInfo()
    clickHandler()

})

const ian_social = new Adapter("http://localhost:3000", 6)

const renderInfo = () => {
    const div = document.getElementById('follow-container')
    ian_social.getInfo()
        .then(info => {
            div.dataset.currentId = info.user_info.id
            div.dataset.currentFirst = info.user_info.first_name
            div.dataset.currentLast = info.user_info.last_name
            div.dataset.currentUsername = info.user_info.username
            renderFollower(info.followers)
            renderFollowee(info.followees)
            renderMessage(info.messages)
            createFollowButton(info.followees)
            }
        )
}

const renderFollower = (followers) => {
    followers.forEach(follower => {
        createFollower(follower)
    });
}

const renderMessage = (messages) => {
    messages.received.forEach(message => {
        createReceived(message)
    })
    messages.sent.forEach(message => {
        createSent(message)
    })
}

const createReceived = (message) => {
    const receivedDiv = document.getElementById('received')
    const messageDiv = document.createElement('div')
    messageDiv.className = "received-div"
    messageDiv.dataset.sender = message.sender.id
    messageDiv.dataset.receiver = message.receiver.id
    messageDiv.dataset.content = message.content
    messageDiv.dataset.username = message.sender.username
    messageDiv.dataset.date = new Date(Date.parse(message.sender.created_at))
    
    messageDiv.innerHTML = `
        <h4>From: ${message.sender.first_name} ${message.sender.last_name} at: ${messageDiv.dataset.date}</h4>
        <p><strong>Message:</strong> ${message.content}</p>
    `
    receivedDiv.append(messageDiv)
}


const createSent = (message) => {
    const sentDiv = document.getElementById('sent')
    const messageDiv = document.createElement('div')
    messageDiv.className = "sent-div"
    messageDiv.dataset.sender = message.sender.id
    messageDiv.dataset.receiver = message.receiver.id
    messageDiv.dataset.content = message.content
    messageDiv.dataset.username = message.receiver.username
    messageDiv.dataset.date = new Date(Date.parse(message.receiver.created_at))

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
    li.dataset.id = follower.id
    li.dataset.username = follower.username
    li.dataset.first = follower.first_name
    li.dataset.last = follower.last_name
    li.innerHTML = `
        <h4>Username: @${follower.username}</h4>
        <p>Name: ${follower.first_name} ${follower.last_name}</p>
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
    li.dataset.id = followee.id
    li.dataset.username = followee.username
    li.dataset.first = followee.first_name
    li.dataset.last = followee.last_name
    li.innerHTML = `
        <h4>Username: @${followee.username}</h4>
        <p>Name: ${followee.first_name} ${followee.last_name}</p>
        `
    ul.append(li)
}

const createFollowButton = (followees) => {
    const followList = document.querySelectorAll('.follow-li')
    const followeeIds = []
    followees.forEach(followee => followeeIds.push(followee.id))

    for(let li of followList){
        const button = document.createElement('button')
        button.className = 'follow-btn'

        if(followeeIds.includes(parseInt(li.dataset.id, 10))){
            button.innerText = 'Unfollow'
            button.dataset.followId = li.dataset.id
            button.dataset.username = li.dataset.username
            button.dataset.followee = true
            li.append(button)
        } else {
            button.innerText = 'Follow'
            button.dataset.followId = li.dataset.id
            button.dataset.username = li.dataset.username
            button.dataset.followee = false
            li.append(button)
        }
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
            const followeeId = click.dataset.followId

            if(click.dataset.followee === 'false'){
                ian_social.addFollow(currentId, followeeId)
                    .then(resp => console.log(resp))
                click.innerText = 'Unfollow'
                click.dataset.followee = true
            } else if (click.dataset.followee === 'true'){
                
            }
        }
        
    
    })
}




/*

Following someone who follows you:
1. button in create follower
2. if statement: if they are user's followee, button text says 'unfollow', else 'follow'


*/