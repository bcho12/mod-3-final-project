document.addEventListener('DOMContentLoaded', setupPage)

const API_KEY = 'IKgwsAelLVBNG87AByQ0OVTLmgysLNAo'
const BASE_URL = `https://app.ticketmaster.com/discovery/v2/events.json?stateCode=GA&apikey=${API_KEY}`

function setupPage() {
    renderAllEvents()
    console.log(BASE_URL)
}

function getEvents() {
  return fetch(`${BASE_URL}`).then(res => res.json())
}

function renderAllEvents() {
    getEvents().then(function(data){
        console.log(data._embedded)
        data._embedded.events.forEach(renderEvent)
    })
}

function renderEvent(event) {
    
}
