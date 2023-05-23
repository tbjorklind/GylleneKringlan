import { fireBaseFunctions } from './firebase.js'
import renderIntroAndQuestion from './render-storyline.js'
export const mapFunctions = {
  startInitMap,
  stopWatchingPosition
}

let storyLine
let watchId
let storyChapter
let map

function onDistanceClick() {
  watchId = navigator.geolocation.getCurrentPosition(initMap)
  getDistance()
}

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

function startInitMap() {

  let positionBtn = document.querySelector('#positionBtn')
  positionBtn.innerHTML = `
  <img src = "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fdistance.png?alt=media&token=e2360a1c-640f-481e-bd98-675687af32c6"</img>`
  positionBtn.addEventListener('click', () => {
    onDistanceClick()
  })


  document.querySelector('#wrapper').style.display = 'none'
  document.getElementById("positionBtn").style.removeProperty("display")
  watchId = navigator.geolocation.getCurrentPosition(initMap)
}

function stopWatchingPosition() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId)
    watchId = null
  }
}

let crd
async function initMap(position) {
  console.log(position)

  let index = localStorage.getItem('storyChapter') // Vilket kapitel i storyn man är på
  let backpackNr = localStorage.getItem('backpackNr') // Vilken storyline (backpacknummer) man är med i

  if (backpackNr == 1) {
    storyLine = [
      { lat: 55.6095466, lng: 12.9937084 }, // Badaren Anita
      { lat: 55.6097507, lng: 12.9962505 }, // Fiskaren Hansson
      { lat: 55.6059576, lng: 13.0010688 }, // Apotekaren Ruth
      { lat: 55.607938, lng: 13.010062 }, // Dörrvakten Tor – tidigare: lat: 55.6082255, lng: 13.0100072
      { lat: 55.6028939, lng: 13.0011858 }, // Torgaren Tage
      { lat: 55.604371, lng: 13.009306 }, // Museum-ägaren Von – tidigare: lat: 55.6059576, lng: 13.0010688 
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
      { lat: 55.605159, lng: 12.998783 }, // Paret Charlie & Freja – tidigare: lat: 55.6024005, lng: 12.9853929 
      { lat: 55.6028939, lng: 13.0011858 }, // Torgaren Tage
      { lat: 55.6002879, lng: 13.0010339 }, // Konditorn Hilda
      { lat: 55.600747, lng: 12.995543 }, // Bibliotikarie Barbro – tidigare: lat: 55.600768, lng: 12.9940654 
      { lat: 55.596947, lng: 12.996162 }, // Operasångerskan Birgit – tidigare: lat: 55.5966309, lng: 12.996344 
      { lat: 55.5942211, lng: 13.001169 } // Prästen Adolfsson
    ]
  }

  let userTeamId = await fireBaseFunctions.getTeamIdOfUser(
    localStorage.getItem('userId')
  )
  let userBackpack = localStorage.getItem('backpackNr')
  let doc = await fireBaseFunctions.getDocumentFromFirestore(
    'Teams',
    userTeamId
  )

  if (userBackpack == 1) {
    storyChapter = doc.backpack1.storyChapter
  }
  if (userBackpack == 2) {
    storyChapter = doc.backpack2.storyChapter
  }

  crd = position.coords
  // Creates a map centered on the current location
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: crd.latitude,
      lng: crd.longitude
    },
    zoom: 15,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
    }
    // gestureHandling: 'none'
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

  let imgLink
  switch (userTeamId) {
    case 'Team1':
      imgLink =
        'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbone.PNG?alt=media&token=c9bffd2a-fe49-487d-93c1-85309db5889f'
      break
    case 'Team2':
      imgLink =
        'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fball.PNG?alt=media&token=d1367249-974f-42ad-9efe-6bb7172e6ea7'
      break
    case 'Team3':
      imgLink =
        'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fmagni.PNG?alt=media&token=e60ebb0f-2f85-436b-99e9-47f7c56eadc6'
      break
    case 'Team4':
      imgLink =
        'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Frolling.PNG?alt=media&token=7ffc36ed-eec6-40d5-ae43-7fcd0a968957'
      break
    case 'Team5':
      imgLink =
        'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbooks.PNG?alt=media&token=672d29dc-d3bc-4ae2-9498-8038edfed939'
      break
    case 'Team6':
      imgLink =
        'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fmeds.PNG?alt=media&token=e7a357ad-9a85-42c7-b50c-01102f3c5e90'
      break
    default:
      break
  }

  const img = {
    url: imgLink,
    scaledSize: new google.maps.Size(60, 60)
  }
  const marker = new google.maps.Marker({
    position: { lat: crd.latitude, lng: crd.longitude },
    map: map,
    title: 'Your location',
    icon: img
  })
  map.mapTypes.set('styled_map', styledMapType)
  map.setMapTypeId('styled_map')
}

async function getDistance() {
  let userTeamId = await fireBaseFunctions.getTeamIdOfUser(
    localStorage.getItem('userId')
  )
  let userBackpack = localStorage.getItem('backpackNr')
  let doc = await fireBaseFunctions.getDocumentFromFirestore(
    'Teams',
    userTeamId
  )

  if (userBackpack == 1) {
    storyChapter = doc.backpack1.storyChapter
  }
  if (userBackpack == 2) {
    storyChapter = doc.backpack2.storyChapter
  }

  var origin1 = new google.maps.LatLng(crd.latitude, crd.longitude)
  // var origin2 = 'Malmo, Sweden'
  // var destinationA = 'Malmo, Sweden'
  var destinationB = new google.maps.LatLng(
    storyLine[storyChapter].lat,
    storyLine[storyChapter].lng
  )

  var service = new google.maps.DistanceMatrixService()
  service.getDistanceMatrix(
    {
      origins: [origin1],
      destinations: [destinationB],
      travelMode: 'WALKING'
    },
    callback
  )
}

function callback(response) {
  let map = document.querySelector('#map')
  let meterDiv = document.createElement('div')
  map.appendChild(meterDiv)
  // 100 tidigare 30, feedback på att radius för 'inom zon' var för liten
  if (response.rows[0].elements[0].distance.value <= 100) {
    renderIntroAndQuestion(storyChapter)
  } else {
    meterDiv.id = 'meterDiv'
    meterDiv.innerHTML = `${response.rows[0].elements[0].distance.value}<br>meter kvar!`
    setTimeout(() => {
      meterDiv.remove()
    }, 2000)
  }
}

window.initMap = initMap
