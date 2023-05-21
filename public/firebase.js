'use strict'
export const fireBaseFunctions = {
  getCollectionFromFirestore,
  getDocumentFromFirestore,
  addDocumentToFirebase,
  updateDocumentToFirebase,
  deleteDocumentFromFirestore,
  addUserToBackpack,
  updateStoryChapter,
  getTeamIdOfUser,
  updateCoins,
  addClueToBackpack,
  updateQuestionState,
  getCurrentUser,
  addCurrentUser,
  addCurrentGlobalUser
}

const db = firebase.firestore()
// EVENTUELLT Lägga till en get för att se vilken backpack en användare har, med userId som parameter, iställe t för att spara i localStorage?
// --------------------- GET ----------------------
async function getCollectionFromFirestore(collectionName) {
  let arr = []
  let ref = await db
    .collection(collectionName)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        arr.push({
          data: doc.data()
        })
      })
    })

  return arr
}

async function getDocumentFromFirestore(collectionName, id) {
  let ref = await db
    .collection(collectionName)
    .doc(id)
    .get()
  let data = await ref.data()
  //console.log(data.backpack1.riddles)
  return data
}

//console.log(getCollectionFromFirestore('Teams'))
//console.log(getDocumentFromFirestore('Teams', 'Team1'))


// Getting the team ID of a user by sending their id
async function getTeamIdOfUser(userId) {
  let teams = await getCollectionFromFirestore('Teams')
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].data.users.includes(userId)) {
      let teamNr = i + 1;
      return `Team${teamNr}`
    }
  }
}

async function getCurrentUser(collectionName, id, backpackNr) {
  let doc = await fireBaseFunctions.getDocumentFromFirestore(collectionName, id);


  if (backpackNr == 1)
    return doc.backpack1.currentUser
  if (backpackNr == 2)
    return doc.backpack2.currentUser

}


// --------------------- ADD -----------------------
async function addDocumentToFirebase(collectionName) {
  let ref = await db.collection(collectionName).add({})
  let newDocumentID = await ref.id

  localStorage.setItem('userId', newDocumentID)

  return newDocumentID
} //console.log(addDocumentToFirebase('Users'))

// Adding a user to a specific backpack
async function addUserToBackpack(collectionName, id, backpackNr) {
  let document = await getDocumentFromFirestore('Teams', id)

  // Add to backpack
  if (backpackNr == 1)
    document.backpack1.users = [
      ...document.backpack1.users,
      localStorage.getItem('userId')
    ]
  if (backpackNr == 2) {
    document.backpack2.users = [
      ...document.backpack2.users,
      localStorage.getItem('userId')
    ]
  }

  // Add to team
  document.users = [...document.users, localStorage.getItem('userId')];

  await db
    .collection(collectionName)
    .doc(id)
    .update(document)
}

async function addClueToBackpack(collectionName, id, backpackNr, clue) {
  let document = await getDocumentFromFirestore('Teams', id)

  // Add to backpack
  if (backpackNr == 1) {
    document.backpack1.clues = [
      ...document.backpack1.clues,
      clue
    ]
  }
  if (backpackNr == 2) {
    document.backpack2.clues = [
      ...document.backpack2.clues,
      clue
    ]
  }

  await db
    .collection(collectionName)
    .doc(id)
    .update(document)
}

async function addCurrentUser(collectionName, id, backpackNr, user) {
  let document = await getDocumentFromFirestore('Teams', id)

  // Add to backpack
  if (backpackNr == 1)
    document.backpack1.currentUser = user
  if (backpackNr == 2) {
    document.backpack2.currentUser = user
  }

  await db
    .collection(collectionName)
    .doc(id)
    .update(document)
}

async function addCurrentGlobalUser(collectionName, id, user) {
  let document = await getDocumentFromFirestore('Teams', id)
  document.currentGlobalUser = user;

  await db
    .collection(collectionName)
    .doc(id)
    .update(document)
}

// --------------------- UPDATE ----------------------

async function updateDocumentToFirebase(collectionName, id, data = {}) {
  let document = await getDocumentFromFirestore('Teams', id)
  //let newUserID = await addDocumentToFirebase('Users')
  //document.users = [...document.users, newUserID]
  document.users = [...document.users]
  await db
    .collection(collectionName)
    .doc(id)
    .update(document)
} //console.log(updateDocumentToFirebase('Teams', 'Team1'))

// Update storyChapter of a backpack
async function updateStoryChapter(collectionName, id, backpackNr, chapter) {
  let document = await getDocumentFromFirestore('Teams', id)

  if (backpackNr == 1)
    document.backpack1.storyChapter = chapter
  if (backpackNr == 2)
    document.backpack2.storyChapter = chapter

  await db
    .collection(collectionName)
    .doc(id)
    .update(document)
}

async function updateQuestionState(questionState) {
  let backpackNr = localStorage.getItem('backpackNr');
  let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
  let doc = await fireBaseFunctions.getDocumentFromFirestore('Teams', userTeamId)

  if (backpackNr == 1)
    doc.backpack1.questionState.answered = questionState.answered
  doc.backpack1.questionState.chosenAnswer = questionState.chosenAnswer
  doc.backpack1.questionState.bribed = questionState.bribed
  if (backpackNr == 2)
    doc.backpack2.questionState.answered = questionState.answered
  doc.backpack2.questionState.chosenAnswer = questionState.chosenAnswer
  doc.backpack2.questionState.bribed = questionState.bribed

  await db
    .collection('Teams')
    .doc(userTeamId)
    .update(doc)
}

// Update coins of a backpack
async function updateCoins(collectionName, id, backpackNr) {
  let document = await getDocumentFromFirestore('Teams', id)

  // 20 kan ändras till vilken mängd man vill, eventuellt baserat på nån parameter
  if (backpackNr == 1) {
    let newAmount = document.backpack1.coins - 20;
    document.backpack1.coins = newAmount;
  }
  if (backpackNr == 2) {
    let newAmount = document.backpack2.coins - 20;
    document.backpack2.coins = newAmount;
  }

  await db
    .collection(collectionName)
    .doc(id)
    .update(document)
}


// --------------------- DELETE -----------------------

async function deleteDocumentFromFirestore(collectionName, id) {
  let ref
  try {
    ref = await db
      .collection(collectionName)
      .doc(id)
      .delete()
    console.log('Document successfully deleted!')
  } catch (error) {
    console.error('Error removing document: ', error)
  }
  return ref
}

//console.log(deleteDocumentFromFirestore('Teams', 'Team5'))

// ------------------------------------------------------


async function resetFirebaseDocument(collectionName, id) {
  let doc = await getDocumentFromFirestore(collectionName, id)

  doc.backpack1.clues = [];
  doc.backpack1.coins = 100;
  doc.backpack1.questionState.answered = false;
  doc.backpack1.questionState.bribed = false;
  doc.backpack1.questionState.chosenAnswer = "";
  doc.backpack1.currentUser = "";
  doc.backpack1.storyChapter = 0;
  doc.backpack1.users = [];

  doc.backpack2.clues = [];
  doc.backpack2.coins = 100;
  doc.backpack2.questionState.answered = false;
  doc.backpack2.questionState.bribed = false;
  doc.backpack2.questionState.chosenAnswer = "";
  doc.backpack1.currentUser = "";
  doc.backpack2.storyChapter = 0;
  doc.backpack2.users = [];

  doc.users = [];
  doc.currentGlobalUser = "";

  await db
    .collection(collectionName)
    .doc(id)
    .update(doc)
}

// GLÖM EJ ATT KOMMENTERA INNAN MERGE!!
// resetFirebaseDocument('Teams', 'Team1')
// resetFirebaseDocument('Teams', 'Team2')
// resetFirebaseDocument('Teams', 'Team3')
// resetFirebaseDocument('Teams', 'Team4')
// resetFirebaseDocument('Teams', 'Team5')
// resetFirebaseDocument('Teams', 'Team6')
