"use strict"
import { fireBaseFunctions } from "./firebase.js";
export default renderBackpackBtn;

let backpackBtn = document.getElementById("backpackBtn");
let backpackInventory = document.getElementById("backpackInventory");
const clues = [
    {
        img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fclues%2Fflipflop.png?alt=media&token=bf484dc1-faac-48a8-a3d2-0b86fc455103",
        name: "Flip flops"
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fclues%2Fskugga.png?alt=media&token=5813a4b3-3b11-43b0-893c-90ac982c7775",
        name: "Skugga"
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fclues%2Fskyffel.png?alt=media&token=b1f11ae2-5968-4f43-b9b0-a0babe44afe0",
        name: "Skyffel"
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fclues%2Fharstra.png?alt=media&token=48122311-b046-49aa-9165-f404c7e4b431",
        name: "Hårstrå"
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fclues%2Frotthar.png?alt=media&token=9e135503-ace4-45bc-9e06-adafbd19913d",
        name: "Rött hår"
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fclues%2Ftygbit.png?alt=media&token=d824b532-8875-4851-b957-4932ad6efb6f",
        name: "Tygbit"
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fclues%2Fmoped.png?alt=media&token=194dca49-7c73-45ae-b32b-1dce57e1ef51",
        name: "Moped"
    }
]

function renderBackpackBtn() {
    backpackBtn.classList.remove("hidden");
    let backpackNr = localStorage.getItem("backpackNr");
    if (backpackNr == 1)
        backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack1.png?alt=media&token=5b63d047-dbc9-45dd-9bfd-3aa59014857a)`
    else
        backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack2.png?alt=media&token=20551b05-1f89-4f5b-922a-f1b28413830b)`

    backpackBtn.addEventListener("click", () => { onBackpackClick() })
}

function onBackpackClick() {
    console.log("ooga")
    let backpackNr = localStorage.getItem("backpackNr");
    // Open packpack
    if (!backpackBtn.style.backgroundImage.includes("_open")) {
        console.log("whhih")
        if (backpackNr == 1)
            backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack1_open.png?alt=media&token=67ba499a-6aaf-4190-882a-251fb8061bd3)`;
        else
            backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack2_open.png?alt=media&token=c80316fe-dacd-4f04-8001-3266abed59d2)`;

        //document.getElementById("wrapper").classList.add("hidden")
        backpackInventory.style.display = "flex";
        displayInventory();
    }
    // Close backpack
    else {
        console.log("dkdjkfsngsljkdnjd")
        if (backpackNr == 1)
            backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack1.png?alt=media&token=5b63d047-dbc9-45dd-9bfd-3aa59014857a)`
        else
            backpackBtn.style.backgroundImage = `url(https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbackpack2.png?alt=media&token=20551b05-1f89-4f5b-922a-f1b28413830b)`

        backpackInventory.style.display = "none";
        //document.getElementById("wrapper").classList.remove("hidden")
    }

}

async function displayInventory() {
    backpackInventory.style.display = "flex";
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

            let clueInfo = getClueInfo(clue);
            let img = document.createElement("div");
            img.style.backgroundImage = `url(${clueInfo.img})`

            let description = document.createElement("div");
            description.innerHTML = clueInfo.name;

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

            let clueInfo = getClueInfo(clue);
            let img = document.createElement("div");
            img.style.backgroundImage = `url(${clueInfo.img})`

            let description = document.createElement("div");
            description.innerHTML = clueInfo.name;

            document.querySelector("#backpackInventory > div").appendChild(item);
            item.appendChild(img);
            item.appendChild(description);
        });

    }
}

function getClueInfo(clue) {
    let foundClue = "";
    clues.forEach(c => {
        if (c.img.includes(clue.toLowerCase())) {
            foundClue = c;
        }
    })
    return foundClue;
}