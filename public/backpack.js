"use strict"
import { fireBaseFunctions } from "./firebase.js";
export default renderBackpackBtn;

let backpackBtn = document.getElementById("backpackBtn");
let backpackInventory = document.getElementById("backpackInventory");

function renderBackpackBtn() {
    backpackBtn.classList.remove("hidden");
    let backpackNr = localStorage.getItem("backpackNr");
    if (backpackNr == 1)
        backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack1.png?alt=media&token=32ebb912-037e-432f-beb3-cfd1398a9f5e)`
    else
        backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack2.png?alt=media&token=94e57aaf-c465-4d69-9c0c-84a279b0f42d)`

    backpackBtn.addEventListener("click", () => { onBackpackClick() })
}

function onBackpackClick() {
    let backpackNr = localStorage.getItem("backpackNr");
    // Open packpack
    if (!backpackBtn.style.backgroundImage.includes("_open")) {
        if (backpackNr == 1)
            backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack1_open.png?alt=media&token=1ef62635-4921-4241-97f9-95e602a6cb02)`;
        else
            backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack2_open.png?alt=media&token=ca7ba330-f877-4367-a910-2356dc7d9646)`;

        document.getElementById("wrapper").classList.add("hidden")
        displayInventory();
    }
    // Close backpack
    else {
        if (backpackNr == 1)
            backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack1.png?alt=media&token=32ebb912-037e-432f-beb3-cfd1398a9f5e)`
        else
            backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack2.png?alt=media&token=94e57aaf-c465-4d69-9c0c-84a279b0f42d)`

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
        document.querySelector("#backpackInventory > div > div:first-child > div:first-child").style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fcoinbag.png?alt=media&token=b8e2c28b-8eee-49b5-bf03-0a5feaa2aca0)`
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
        document.querySelector("#backpackInventory > div > div:first-child > div:first-child").style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fcoinbag.png?alt=media&token=b8e2c28b-8eee-49b5-bf03-0a5feaa2aca0)`
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