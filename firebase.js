"use strict"
export const fireBaseFunctions = {
  getCollectionFromFirestore,
  addDocumentToFirebase,
  updateDocumentToFirebase,
  deleteDocumentFromFirestore,
  addUserToBackpack
}

const db = firebase.firestore()



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

  //console.log(arr)

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

// --------------------- ADD -----------------------
async function addDocumentToFirebase(collectionName) {
  let ref = await db.collection(collectionName).add({})
  let newDocumentID = await ref.id

  localStorage.setItem("userId", newDocumentID);

  return newDocumentID
}

async function addUserToBackpack(collectionName, id, backpackNr) {
  let document = await getDocumentFromFirestore('Teams', id)

  if (backpackNr == 1)
    document.backpack1.users = [...document.backpack1.users, localStorage.getItem("userId")]
  if (backpackNr == 2) {
    document.backpack2.users = [...document.backpack2.users, localStorage.getItem("userId")]
  }

  await db
    .collection(collectionName)
    .doc(id)
    .update(document)
}

//console.log(addDocumentToFirebase('Users'))

// --------------------- UPDATE ----------------------

async function updateDocumentToFirebase(collectionName, id, data = {},) {
  let document = await getDocumentFromFirestore('Teams', id)
  //let newUserID = await addDocumentToFirebase('Users')
  //document.users = [...document.users, newUserID]
  document.users = [...document.users]
  await db
    .collection(collectionName)
    .doc(id)
    .update(document)
}

//console.log(updateDocumentToFirebase('Teams', 'Team1'))

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
