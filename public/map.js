// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// }

// var map
// function initMap (pos) {
//   var crd = pos.coords

//   console.log('Your current position is:')
//   console.log(`Latitude : ${crd.latitude}`)
//   console.log(`Longitude: ${crd.longitude}`)
//   console.log(`More or less ${crd.accuracy} meters.`)
//   console.log(crd)

//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: crd.latitude, lng: crd.longitude },
//     zoom: 8
//   })

//   // Creates a marker at the current location
//   const marker = new google.maps.Marker({
//     position: { lat: crd.latitude, lng: crd.longitude },
//     map: map,
//     title: 'Your location'
//   })
// }

// function error (err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`)
// }

// navigator.geolocation.getCurrentPosition(initMap, error, options)

// -------------------------------------------------------------------------

function initMap (position) {
  let crd = position.coords

  let map

  // Creates a map centered on the current location
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: crd.latitude,
      lng: crd.longitude
    },
    zoom: 15
  })

  let circle = new google.maps.Circle({
    radius: 100,
    map: map,
    center: { lat: crd.latitude, lng: crd.longitude },
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  })

  circle.setMap(map)
}

navigator.geolocation.getCurrentPosition(initMap)