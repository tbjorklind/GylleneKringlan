let zones = [
  { lat: 55.6095466, lng: 12.9937084 },
  { lat: 55.6097507, lng: 12.9962505 },
  { lat: 55.6078666, lng: 12.9910128 },
  { lat: 55.6026459, lng: 12.9929222 },
  { lat: 55.6028939, lng: 13.0011858 },
  { lat: 55.6059576, lng: 13.0010688 },
  { lat: 55.6082255, lng: 13.0100072 },
  { lat: 55.6024005, lng: 12.9853929 },
  { lat: 55.6049379, lng: 13.0091124 },
  { lat: 55.6002879, lng: 13.0010339 },
  { lat: 55.600768, lng: 12.9940654 },
  { lat: 55.5966309, lng: 12.996344 },
  { lat: 55.5942211, lng: 13.001169 }
]
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

var map
function initMap (position) {
  var crd = position.coords

  console.log(`More or less ${crd.accuracy} meters.`)

  // Creates a map centered on the current location
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: crd.latitude,
      lng: crd.longitude
    },
    zoom: 15
  })

  for (let zone of zones) {
    let circle = new google.maps.Circle({
      radius: 100,
      map: map,
      center: {
        lat: zone.lat,
        lng: zone.lng
      },
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    })

    // Creates a marker at the current location
    const marker = new google.maps.Marker({
      position: { lat: crd.latitude, lng: crd.longitude },
      map: map,
      title: 'Your location'
    })

    circle.setMap(map)
  }
}

navigator.geolocation.getCurrentPosition(initMap)
