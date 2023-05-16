import { fireBaseFunctions } from "./firebase.js";
import renderIntroAndQuestion from './render-storyline.js';
export default startInitMap;

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
let teamName = 'ball'

// Kolla vilket team man är i.
// Array m ikon-namnen.
// Loopa igenom och hitta rätt ikon.

// Ska göras från render-storyline sen..
function startInitMap() {
  document.querySelector("#wrapper").style.display = "none";
  navigator.geolocation.watchPosition(initMap)
}


async function initMap(position) {
  let index = localStorage.getItem('storyChapter') // Vilket kapitel i storyn man är på
  let backpackNr = localStorage.getItem('backpackNr') // Vilken storyline (backpacknummer) man är med i
  let storyLine

  if (backpackNr == 1) {
    storyLine = [
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
  }

  if (backpackNr == 2) {
    storyLine = [
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
  }

  let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
  let userBackpack = localStorage.getItem('backpackNr');
  let doc = await fireBaseFunctions.getDocumentFromFirestore('Teams', userTeamId);
  let storyChapter;

  if (userBackpack == 1) {
    storyChapter = doc.backpack1.storyChapter;
  }
  if (userBackpack == 2) {
    storyChapter = doc.backpack2.storyChapter;
  }


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
    },
    gestureHandling: 'none'
  })

  let circle = new google.maps.Circle({
    radius: 100,
    map: map,
    center: {
      lat: storyLine[storyChapter].lat,
      lng: storyLine[storyChapter].lng
    },
    strokeColor: '#CC813A',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#CC813A',
    fillOpacity: 0.35
  })
  circle.setMap(map)

  var origin1 = new google.maps.LatLng(crd.latitude, crd.longitude)
  // var origin2 = 'Malmo, Sweden'
  // var destinationA = 'Malmo, Sweden'
  var destinationB = new google.maps.LatLng(storyLine[storyChapter].lat, storyLine[storyChapter].lng)

  var service = new google.maps.DistanceMatrixService()
  service.getDistanceMatrix(
    {
      origins: [origin1],
      destinations: [destinationB],
      travelMode: 'WALKING'
    },
    callback
  )

  function callback(response) {
    console.log(response.rows[0].elements[0].distance.value)
    if (response.rows[0].elements[0].distance.value <= 3000000) {
      console.log('In zone')
      renderIntroAndQuestion(storyChapter)
    } else {
      console.log('Out of zone')
    }
  }

  const img = {
    url:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fmagni.PNG?alt=media&token=0183f1ba-3b02-4a85-91d1-6c3c910584bb',
    scaledSize: new google.maps.Size(120, 120)
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
