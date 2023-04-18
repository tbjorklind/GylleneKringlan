"use strict"
import { fireBaseFunctions } from "./firebase.js"

    // INITIALIZE
    ; (async () => {
        let teamWrapper = document.createElement("div");
        teamWrapper.id = "teamWrapper";
        for (let i = 1; i <= 6; i++) {
            let teamBtn = document.createElement("div");
            teamBtn.innerHTML = "Team " + i;
            teamBtn.classList.add("teamBtn");
            teamWrapper.appendChild(teamBtn);
            teamBtn.addEventListener("click", () => {
                fireBaseFunctions.addDocumentToFirebase('Users');
                renderChooseBackpack()
            })
        }
        document.getElementById("wrapper").appendChild(teamWrapper);
    })();

function renderChooseBackpack() {
    document.getElementById("wrapper").innerHTML = "";
    let backpackWrapper = document.createElement("div");
    backpackWrapper.id = "teamWrapper";
    for (let i = 1; i <= 2; i++) {
        let backpackBtn = document.createElement("div");
        backpackBtn.innerHTML = "Backpack " + i;
        backpackBtn.classList.add("teamBtn");
        backpackWrapper.appendChild(backpackBtn);
    }
    document.getElementById("wrapper").appendChild(backpackWrapper);

}

function getUserId() {
    localStorage.setItem("userId", "Tom");
}

//console.log(fireBaseFunctions.addDocumentToFirebase('Users'))
