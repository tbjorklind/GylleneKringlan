"use strict"
import { fireBaseFunctions } from "./firebase.js";
export default renderBackpackBtn;

/*
Tror det klokaste är att ha både ryggsäcksikonen och vyn när man klickar på /öppnar ryggsäcken
hårdkodad i index.html, eftersom att den iprincip alltid ska vara åtkomlig. Så då räcker det att
man sätter hidden på båda två tills de väl ska användas..

Båda bör nog vara position absolute, för att det inte ska fucka med allt annat :D
*/

let backpackBtn = document.getElementById("backpackBtn");
let backpackInventory = document.getElementById("backpackInventory");

function renderBackpackBtn() {
    backpackBtn.classList.remove("hidden");
    let backpackNr = localStorage.getItem("backpackNr");
    backpackBtn.style.backgroundImage = `url(../images/backpack${backpackNr}.png)`

    backpackBtn.addEventListener("click", (e) => { onBackpackClick(e) })
}

function onBackpackClick(e) {
    let backpackNr = localStorage.getItem("backpackNr");
    // Open packpack
    if (!backpackBtn.style.backgroundImage.includes("_open")) {
        backpackBtn.style.backgroundImage = `url(../images/backpack${backpackNr}_open.png)`;
        document.getElementById("wrapper").classList.add("hidden")
        displayInventory();
    }
    // Close backpack
    else {
        backpackBtn.style.backgroundImage = `url(../images/backpack${backpackNr}.png)`
        backpackInventory.classList.add("hidden");
        document.getElementById("wrapper").classList.remove("hidden")
    }

}

async function displayInventory() {
    backpackInventory.classList.remove("hidden");
    document.querySelector("#backpackInventory > div").innerHTML = "";
    let backpackNr = localStorage.getItem("backpackNr");

    let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
    let doc = await fireBaseFunctions.getDocumentFromFirestore('Teams', userTeamId)

    if (backpackNr == 1) {
        let coinBag = document.createElement("div");
        coinBag.innerHTML = `
        <div></div>
        <div>${doc.backpack1.coins} mynt</div>
        `
        document.querySelector("#backpackInventory > div").appendChild(coinBag);
        document.querySelector("#backpackInventory > div > div:first-child > div:first-child").style.backgroundImage = `url(../images/coinbag.png)`
        coinBag.classList.add("clueItem")


        doc.backpack1.clues.forEach(clue => {
            let item = document.createElement("div");
            item.classList.add("clueItem")

            let img = document.createElement("div");
            img.style.backgroundImage = `url(../images/${clue}.png)`

            let description = document.createElement("div");
            description.innerHTML = clue;

            document.querySelector("#backpackInventory > div").appendChild(item);
            item.appendChild(img);
            item.appendChild(description);
        });
    }
    if (backpackNr == 2) {
        let coinBag = document.createElement("div");
        coinBag.innerHTML = `
        <div></div>
        <div>${doc.backpack2.coins} mynt</div>
        `
        document.querySelector("#backpackInventory > div").appendChild(coinBag);
        document.querySelector("#backpackInventory > div > div:first-child > div:first-child").style.backgroundImage = `url(../images/coinbag.png)`
        coinBag.classList.add("clueItem")


        doc.backpack2.clues.forEach(clue => {
            let item = document.createElement("div");
            item.classList.add("clueItem")

            let img = document.createElement("div");
            img.style.backgroundImage = `url(../images/${clue}.png)`

            let description = document.createElement("div");
            description.innerHTML = clue;

            document.querySelector("#backpackInventory > div").appendChild(item);
            item.appendChild(img);
            item.appendChild(description);
        });

    }
}