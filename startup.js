"use strict"
import { fireBaseFunctions } from "./firebase.js";

// ------------------- RENDER TEAM SELECION ---------------------
; (() => {
    let teamWrapper = document.createElement("div");
    teamWrapper.id = "teamWrapper";
    for (let i = 1; i <= 6; i++) {
        let teamBtn = document.createElement("div");
        teamBtn.innerHTML = "Team " + i;
        teamBtn.classList.add("teamBtn");
        teamWrapper.appendChild(teamBtn);
        teamBtn.addEventListener("click", () => {
            fireBaseFunctions.addDocumentToFirebase('Users');
            renderChooseBackpack(i)
        })
    }
    document.getElementById("wrapper").appendChild(teamWrapper);
})();

// --------------------- RENDER BACKPACKS -----------------------
function renderChooseBackpack(teamNumber) {
    document.getElementById("wrapper").innerHTML = "";
    let backpackWrapper = document.createElement("div");
    backpackWrapper.id = "teamWrapper";
    for (let i = 1; i <= 2; i++) {
        let backpackBtn = document.createElement("div");
        backpackBtn.innerHTML = "Backpack " + i;
        backpackBtn.classList.add("teamBtn");
        backpackWrapper.appendChild(backpackBtn);
        backpackBtn.addEventListener("click", () => {
            fireBaseFunctions.addUserToBackpack('Teams', 'Team' + teamNumber, i)
            document.getElementById("wrapper").innerHTML = `Du är med i team ${teamNumber}, ryggsäck ${i}`;
        })
    }
    document.getElementById("wrapper").appendChild(backpackWrapper);
}
