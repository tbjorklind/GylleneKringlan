"use strict"
import { fireBaseFunctions } from "./firebase.js"

    // INITIALIZE
    ; (() => {
        let teamWrapper = document.createElement("div");
        teamWrapper.id = "teamWrapper";
        for (let i = 1; i <= 6; i++) {
            let teamBtn = document.createElement("div");
            teamBtn.innerHTML = "Team " + i;
            teamBtn.classList.add("teamBtn");
            teamWrapper.appendChild(teamBtn);
            teamBtn.addEventListener("click", renderChooseBackpack)
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

//console.log(fireBaseFunctions.addDocumentToFirebase('Users'))
