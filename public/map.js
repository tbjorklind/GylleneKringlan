// Ändra locations till rätt lag, glöm ej att den för båda ska finnas på båda.
let storylineOne = [
  { lat: 55.6095466, lng: 12.9937084 }, // Badaren Anita
  { lat: 55.6097507, lng: 12.9962505 }, // Fiskaren Hansson
  { lat: 55.6059576, lng: 13.0010688 }, // Apotekaren Ruth
  { lat: 55.6082255, lng: 13.0100072 }, // Dörrvakten Tor
  { lat: 55.6028939, lng: 13.0011858 }, // Torgaren Tage
  { lat: 55.6059576, lng: 13.0010688 }, // Museum-ägaren Von
  { lat: 55.603297, lng: 13.010903 }, // Detektiven August
  { lat: 55.598236, lng: 13.006477 }, // Hemlöse Roland
  { lat: 55.5942211, lng: 13.001169 } // Prästen Adolfsson
]

let storylineTwo = [
  { lat: 55.6095466, lng: 12.9937084 }, //Badaren anita
  { lat: 55.6078666, lng: 12.9910128 }, // Kötthandlaren Clemens
  { lat: 55.6026459, lng: 12.9929222 }, // Spelaren Carl-Wilhelm
  { lat: 55.6024005, lng: 12.9853929 }, // Paret Charlie & Freja
  { lat: 55.6028939, lng: 13.0011858 }, // Torgaren Tage
  { lat: 55.6002879, lng: 13.0010339 }, // Konditorn Hilda
  { lat: 55.600768, lng: 12.9940654 }, // Bibliotikarie Barbro
  { lat: 55.5966309, lng: 12.996344 }, // Operasångerskan Birgit
  { lat: 55.5942211, lng: 13.001169 } // Prästen Adolfsson
]

const styledMapType = new google.maps.StyledMapType(
  [
    { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#c9b2a6' }]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#dcd2be' }]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#ae9e90' }]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{ color: '#dfd2ae' }]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#dfd2ae' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#93817c' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ color: '#a5b076' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#447530' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#f5f1e6' }]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#fdfcf8' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#f8c967' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#e9bc62' }]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{ color: '#e98d58' }]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#db8555' }]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#806b63' }]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{ color: '#dfd2ae' }]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#8f7d77' }]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ebe3cd' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{ color: '#dfd2ae' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ color: '#b9d3c2' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#92998d' }]
    }
  ],
  { name: 'Styled Map' }
)

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

// LOCAL STORAGE
// Kan bytas till bone, books, magni eller meds
let teamName = "ball";
let index = 0;
let storyline = storylineOne

// Ska göras från render-storyline sen..
function renderFarwel () {
  navigator.geolocation.getCurrentPosition(initMap)
}
renderFarwel()

function initMap (position) {
  var crd = position.coords
  var map
  // Creates a map centered on the current location
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: crd.latitude,
      lng: crd.longitude
    },
    zoom: 17,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
    }
  })

  let circle = new google.maps.Circle({
    radius: 100,
    map: map,
    center: {
      lat: storyline[index].lat,
      lng: storyline[index].lng
    },
    strokeColor: '#CC813A',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#CC813A',
    fillOpacity: 0.35
  })
  circle.setMap(map)

  const img = {
    url: `../images/${teamName}.png`,
    scaledSize: new google.maps.Size(110, 110)
  }

  // Creates a marker at the current location
  const marker = new google.maps.Marker({
    position: { lat: crd.latitude, lng: crd.longitude },
    map: map,
    title: 'Your location',
    icon: img
  })

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType)
  map.setMapTypeId('styled_map')
}

window.initMap = initMap
