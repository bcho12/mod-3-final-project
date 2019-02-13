document.addEventListener('DOMContentLoaded', setupPage)

const API_KEY = 'IKgwsAelLVBNG87AByQ0OVTLmgysLNAo'
let state = 'GA'
const EVENT_URL = `https://app.ticketmaster.com/discovery/v2/events.json?stateCode=${state}&apikey=${API_KEY}`

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
    const cardContainer = document.querySelector('#card-container')

    const card = document.createElement('div')
    card.className = 'card'
    cardContainer.appendChild(card)

    const imgContainer = document.createElement('div')
    imgContainer.className = 'card-image'
    card.appendChild(imgContainer)

    for (let i = 0; i < event.images.length; i++) {
        const eventImg = document.createElement('img')
        eventImg.src = event.images[0].url
        imgContainer.appendChild(eventImg)
        break
    }

    const name = document.createElement('h4')
    name.textContent = event.name
    name.className = 'card-content'
    card.appendChild(name)

    const venue = document.createElement('p')
    venue.textContent = event._embedded.venues[0].name
    card.appendChild(venue)

    const city = document.createElement('p')
    city.textContent = event._embedded.venues[0].city.name
    card.appendChild(city)

    const date = document.createElement('p')
    date.textContent = event.dates.start.localDate
    card.appendChild(date)

    const time = document.createElement('p')
    time.textContent = event.dates.start.localTime
    card.appendChild(time)

    const price = document.createElement('p')
    if ("priceRanges" in event) {

        price.textContent =  `Average Price: $${(event.priceRanges[0].max + event.priceRanges[0].min) / 2}`
    }
    card.appendChild(price)

    const button = document.createElement('button')
    button.textContent = 'Add Event'
    card.appendChild(button)
    button.addEventListener('click', () => changeCart(event))
}

function changeCart(event) {
    const userEvents = document.querySelector('#users-events')

    const card = document.createElement('div')
    card.className = 'card'
    userEvents.appendChild(card)

    const cardName = document.createElement('h5')
    cardName.textContent = event.name
    card.appendChild(cardName)

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    card.appendChild(deleteBtn)

    // updateUserEvents()

    deleteBtn.addEventListener('click', () => removeEvent(event))
}

function removeEvent(ourEvent) {
    let byeEvent = event.target.parentElement
    byeEvent.parentElement.removeChild(byeEvent)
    let id = ourEvent.id
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
}
