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
    name.id = 'name'
    cardBody.appendChild(name)

    const venue = document.createElement('p')
    venue.textContent = event._embedded.venues[0].name
    venue.className = 'card-text'
    venue.id = 'venue'
    cardBody.appendChild(venue)

    const city = document.createElement('p')
    city.textContent = event._embedded.venues[0].city.name
    city.className = 'card-text'
    city.id = 'city'
    cardBody.appendChild(city)

    const date = document.createElement('p')
    date.textContent = event.dates.start.localDate
    date.className = 'card-text'
    date.id = 'date'
    cardBody.appendChild(date)

    const time = document.createElement('p')
    time.textContent = event.dates.start.localTime
    time.className = 'card-text'
    time.id = 'time'
    cardBody.appendChild(time)

    const price = document.createElement('p')
    if ("priceRanges" in event) {
        price.textContent =  (event.priceRanges[0].max + event.priceRanges[0].min) / 2
    }
    price.id = 'price'
    cardBody.appendChild(price)

    // button with event listener
    const button = document.createElement('button')
    button.textContent = 'Add Event'
    button.className = "btn btn-primary"
    card.appendChild(button)
    button.addEventListener('click', () => changeCart(event))
}

// adding event to cart
function changeCart(ourEvent) {
    const userEvents = document.querySelector('#users-events')

    const card = document.createElement('div')
    card.id = 'cart-card'
    card.className = 'card'
    userEvents.appendChild(card)

    const cardName = document.createElement('h5')
    cardName.textContent = ourEvent.name
    card.appendChild(cardName)

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    card.appendChild(deleteBtn)



    let name = event.target.parentElement.querySelector('#name').textContent
    let url = event.target.parentElement.parentElement.querySelector('img').src
    let date = event.target.parentElement.querySelector('#date').textContent
    let time = event.target.parentElement.querySelector('#time').textContent
    let price = event.target.parentElement.querySelector('#price').textContent
    let city = event.target.parentElement.querySelector('#city').textContent
    let venue = event.target.parentElement.querySelector('#venue').textContent
    let user_id = 5

    let eventParams = { name: name, url: url, date: date, time: time, price: price, city: city, venue: venue, user_id: user_id }

    updateUserEvents(eventParams).then(data => console.log(data))

    deleteBtn.addEventListener('click', () => removeEvent(ourEvent))
}

const updateUserEvents = (eventParams)  => {
    console.log(eventParams)
    return fetch(`${USER_URL}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventParams)
    }).then(res => res.json())
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
    username.textContent = "Username: " + user.username
    userProfile.appendChild(username)

    const age = document.createElement('p')
    age.textContent = "Age: " + user.age
    userProfile.appendChild(age)

    const city = document.createElement('p')
    city.textContent = "City: " + user.city
    userProfile.appendChild(city)
}
