
document.addEventListener("DOMContentLoaded", ()=>{

    renderFollowers()



})

const ian_social = new Adapter("http://localhost:3000", 33)

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











//make renderFollowers function
//make renderFollower
//make createFollower
//make renderFollowees function
//make renderFollowee