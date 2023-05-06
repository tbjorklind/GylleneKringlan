"use strict"

/* 
När man väl är framme vid slutet ska:
    - Alla karaktärer rendreras och man uppmanas att välja sin tjuv 
      OBS!! Endast på EN av mobilerna!! Annars kan dom ju gissa två ggr, å det vill vi inte... väl?
    – Om man gissar rätt visas det att man lyckas
    – Om man gissar fel får man frågan om man vill muta för en till gissning 
        – Om man gissar rätt visas samma som ovan, att man lyckats
        – Om man gissar fel igen eller accepterar nederlaget visas det att man förlorat  
    – Och tillsist en vy om man inte hinner klart innan tiden är slut
*/

const characterImages = [
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Anita"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Tage"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Von Asklund"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Freja"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Anita"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Anita"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Anita"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Anita"
  },
  {
    img: "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png",
    name: "Anita"
  }
]


function renderCharacterAlternatives() {
  // Header
  let header = document.createElement("div")
  header.id = "characterHeader";
  header.style.textAlign = 'center';
  header.innerHTML = "<span style='font-size: 4.5vw'>Vem har tagit den Gyllene Kringlan?</span><br><span style='font-size: 4.5vw;'>Välj er misstänkta tjuv!</span>"
  document.getElementById("wrapper").appendChild(header);

  let characterWrapper = document.createElement("div");
  characterWrapper.id = "characterWrapper"
  document.getElementById("wrapper").appendChild(characterWrapper);

  characterImages.forEach(c => {
    let characterDiv = document.createElement("div");
    let characterImg = document.createElement("div");
    let characterName = document.createElement("div");
    characterImg.style.backgroundImage = `url(${c.img})`;
    characterName.innerHTML = c.name;

    characterDiv.appendChild(characterImg);
    characterDiv.appendChild(characterName);
    characterWrapper.appendChild(characterDiv);

    characterDiv.addEventListener('click', () => { renderConfirmCharacter(c) })
  })
}

function renderConfirmCharacter(character) {
  let popup = document.createElement("div");
  popup.id = 'confirmCharacter';
  popup.innerHTML = `
  <div>
    <img src="${character.img}">
    <div>Är du säker på att ${character.name} är tjuven?</div>
    <div id="confirmCharacterBtns">
      <div>JA</div>
      <div>NEJ</div>
    </div>
  </div>
  `;

  document.querySelector("body").appendChild(popup);
}

renderCharacterAlternatives()