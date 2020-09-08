document.addEventListener("DOMContentLoaded", ()=>{

    renderInfo()
    clickHandler()

})

const ian_social = new Adapter("http://localhost:3000", 9)

const renderInfo = () => {
    ian_social.getInfo()
    .then(info => {
        renderFollower(info.followers)
        renderFollowee(info.followees)
        renderMessage(info.messages)
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
    const userH4 = document.createElement('h4')

    userH4.innerText = message.sender.first_name + message.sender.last_name

}


const createSent = (message) => {
    const sentDiv = document.querySelector()
}



const createFollower = (follower) => {
    const ul = document.getElementById('followers')
    const li = document.createElement('li')
    ul.dataset.toggle = "off"
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

const clickHandler = () => {
    const followers = document.querySelector('#followers')
    const followees = document.querySelector('#followees')

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
        }  
        
    
    })
}




