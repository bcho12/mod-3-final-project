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
    // parent element of all cards
    const cardContainer = document.querySelector('#card-container')

    // create card
    const card = document.createElement('div')
    card.className = 'card'
    card.style = 'width: 18rem'
    cardContainer.appendChild(card)

    // create image container to attach image
    const imgContainer = document.createElement('div')
    card.appendChild(imgContainer)

    // for loop to get first image from API
    for (let i = 0; i < event.images.length; i++) {
        const eventImg = document.createElement('img')
        eventImg.src = event.images[0].url
        eventImg.className = 'card-img-top'
        imgContainer.appendChild(eventImg)
        break
    }

    // card body container
    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'
    card.appendChild(cardBody)

    // event information -- appending to card body
    const name = document.createElement('h5')
    name.textContent = event.name
    name.className = 'card-text'
    cardBody.appendChild(name)

    const venue = document.createElement('p')
    venue.textContent = `Venue: ${event._embedded.venues[0].name}`
    venue.className = 'card-text'
    cardBody.appendChild(venue)

    const city = document.createElement('p')
    city.textContent = `City: ${event._embedded.venues[0].city.name}`
    city.className = 'card-text'
    cardBody.appendChild(city)

    const dateAndTime = document.createElement('p')
    dateAndTime.textContent = `${event.dates.start.localDate} at ${event.dates.start.localTime}`
    dateAndTime.className = 'card-text'
    cardBody.appendChild(dateAndTime)

    const price = document.createElement('p')
    if ("priceRanges" in event) {

        price.textContent =  `Price: $${(event.priceRanges[0].max + event.priceRanges[0].min) / 2}`
    }
    cardBody.appendChild(price)

    // button with event listener
    const button = document.createElement('button')
    button.textContent = 'Add Event'
    button.className = "btn btn-primary"
    card.appendChild(button)
    button.addEventListener('click', () => changeCart(event))
}

// adding event to cart
function changeCart(event) {
    const userEvents = document.querySelector('#users-events')

    const card = document.createElement('div')
    card.id = 'cart-card'
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

// remove event from user - HTML side
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

//
function renderUser(user) {
    const userProfile = document.querySelector('#profile')
    userProfile.className = 'user-profile'

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
