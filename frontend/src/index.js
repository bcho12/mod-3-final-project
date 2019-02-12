document.addEventListener('DOMContentLoaded', setupPage)

const API_KEY = 'IKgwsAelLVBNG87AByQ0OVTLmgysLNAo'
const EVENT_URL = `https://app.ticketmaster.com/discovery/v2/events.json?stateCode=GA&apikey=${API_KEY}`

const USER_URL = 'http://localhost:3000'

function setupPage() {
    renderAllEvents()
    renderAllUsers()
}

// EVENTS
function getEvents() {
  return fetch(`${EVENT_URL}`).then(res => res.json())
}

function renderAllEvents() {
    getEvents().then(function(data){
        // data._embedded.events.forEach(renderEvent)
        // let array = []
        data._embedded.events.forEach(renderEvent)


            // array.push(event.name)
            // if (array.length = 0) {
            //     array.push(event)
            // } else if (array.name !== event.name) {
            //     debugger
            //     array.push(event)
            // }

        // let unique = array.filter((v, i, a) => a.indexOf(v) === i);
        //
        // let array2 = []
        // for (let x = 0; x < unique.length; x++) {
        //     data._embedded.events.forEach(function(event) {
        //         if (event.name !== unique[x]) {
        //             array2.push(event)
        //         }
        //     })
        // }
        // console.log(array2.)
    })
}

function renderEvent(event) {
    // console.log(event)
    const eventContainer = document.querySelector('#events-container')

    for (let i = 0; i < event.images.length; i++) {
        const eventImg = document.createElement('img')
        eventImg.className = 'event-image'
        eventImg.src = event.images[0].url
        eventContainer.appendChild(eventImg)
        break
    }

    const name = document.createElement('h4')
    name.textContent = event.name
    eventContainer.appendChild(name)

    const date = document.createElement('p')
    date.textContent = event.dates.start.localDate
    eventContainer.appendChild(date)

    const time = document.createElement('p')
    time.textContent = event.dates.start.localTime
    eventContainer.appendChild(time)

    const price = document.createElement('p')
    if ("priceRanges" in event) {

        price.textContent =  `Average Price: $${(event.priceRanges[0].max + event.priceRanges[0].min) / 2}`
    }
    eventContainer.appendChild(price)
}

// USERS
function getUsers() {
    return fetch(`${USER_URL}/users`).then(res => res.json())
}

function renderAllUsers() {
    getUsers().then(function(data) {
        data.forEach(renderUser)
    })
}

function renderUser(user) {
    const userProfile = document.querySelector('#profile')

    const image = document.createElement('img')
    image.src = user.image
    image.className = 'user-image'
    userProfile.appendChild(image)

    const username = document.createElement('p')
    username.textContent = user.username
    userProfile.appendChild(username)


    const age = document.createElement('p')
    age.textContent = user.age
    userProfile.appendChild(age)

    const city = document.createElement('p')
    city.textContent = user.city
    userProfile.appendChild(city)

    // add events to each user
}
