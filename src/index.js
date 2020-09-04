document.addEventListener("DOMContentLoaded", ()=>{

    renderFollowers()
    renderFollowees()


})

const ian_social = new Adapter("http://localhost:3000", 1)

const renderFollowers = () => {
    ian_social.getFollowers()
        .then(followers => renderFollower(followers))
}

const renderFollower = (followers) => {
    followers.forEach(follower => {
        createFollower(follower)
    });
}

const createFollower = (follower) => {
    const ul = document.getElementById('followers')
    const li = document.createElement('li')
    li.dataset.id = follower.id
    li.dataset.username = follower.username
    li.dataset.first = follower.first_name
    li.dataset.last = follower.last_name
    li.innerHTML = `
        <h4>Username: ${follower.username}</h4>
        <p>Name: ${follower.first_name} ${follower.last_name}</p>
        `
    ul.append(li)
}

const renderFollowees = () => {
    ian_social.getFollowees()
    .then(followees => renderFollowee(followees))
}

const renderFollowee = (followees) => {
    followees.forEach(followee => {
        createFollowee(followee)
    })
}

const createFollowee = (followee) => {
    const ul = document.getElementById('followees')
    const li = document.createElement('li')
    li.dataset.id = followee.id
    li.dataset.username = followee.username
    li.dataset.first = followee.first_name
    li.dataset.last = followee.last_name
    li.innerHTML = `
        <h4>Username: ${followee.username}</h4>
        <p>Name: ${followee.first_name} ${followee.last_name}</p>
        `
    ul.append(li)
}











//make renderFollowers function
//make renderFollower
//make createFollower
//make renderFollowees function
//make renderFollowee