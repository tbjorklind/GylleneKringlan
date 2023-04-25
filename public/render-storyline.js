"use strict"
import { storylines } from "./storylines.js";
import { fireBaseFunctions } from './firebase.js'
export default renderQuestion;

// --------------------- RENDER QUESTION -----------------------
function renderQuestion(storyChapter) {

    // Chosing storyline based on backpack
    let storyLine;
    if (localStorage.getItem("backpackNr") == 1)
        storyLine = storylines.storyLine1;
    else if (localStorage.getItem("backpackNr") == 2)
        storyLine = storylines.storyLine2;

    // Initial structure and question
    document.getElementById("wrapper").innerHTML = `
    <div id="storylineTop">
        <div>${storyLine[storyChapter].text}</div>
    </div>
    <div id="storylineBottom"></div>
    `;

    // Render each possible answer
    storyLine[storyChapter].options.forEach(option => {
        let answerOptionBtn = document.createElement("div");
        answerOptionBtn.innerHTML = option.text;
        document.getElementById("storylineBottom").appendChild(answerOptionBtn);
        answerOptionBtn.addEventListener("click", () => { renderAnswerResult(storyLine, storyChapter, option.correctAnswer) })
    })
}

// --------------------- RENDER RESULT OF ANSWER -----------------------
async function renderAnswerResult(storyLine, storyChapter, answer) {
    // If correct answer, show clue, add clue to backpack and offer to exit
    if (answer) {
        document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].correctAnswerText;
        document.querySelector("#wrapper > div:last-child").innerHTML = `<div id="moveOnBtn">GÅ VIDARE</div>`;

        let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
        let userBackpack = localStorage.getItem('backpackNr');
        await fireBaseFunctions.addClueToBackpack('Teams', userTeamId, userBackpack, storyLine[storyChapter].clue)
    }
    // Else, give option to bribe or leave
    else {
        document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].wrongAnswerText;
        document.querySelector("#wrapper > div:last-child").innerHTML = `<div id="bribeBtn">MUTA (20 mynt)</div><div id="moveOnBtn" >GÅ VIDARE</div>`;
        document.querySelector("#wrapper > div:last-child > div:first-child").addEventListener("click", () => { renderBribeResult(storyLine, storyChapter) })
    }
    // If wanting to leave
    document.getElementById("moveOnBtn").addEventListener("click", () => { renderFarwell(storyLine, storyChapter) })
}

// --------------------- RENDER OF BRIBE -----------------------
async function renderBribeResult(storyLine, storyChapter) {
    // Kollar hur många coins man har 
    let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
    let userBackpack = localStorage.getItem('backpackNr');
    let coinStatus = await checkCoins(userTeamId, userBackpack)

    // Om man har tillräckligt med coins
    if (coinStatus) {
        // Uppdatera ens coins med ny summa och lägg till ledtråd i ryggsäcken
        await fireBaseFunctions.updateCoins('Teams', userTeamId, userBackpack)
        await fireBaseFunctions.addClueToBackpack('Teams', userTeamId, userBackpack, storyLine[storyChapter].clue)

        // Visa karaktärens svar i stora rutan, visa en 'gå vidare'-knapp och lägg till en eventlyssnare på den
        document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].bribedAnswerText;
        document.querySelector("#wrapper > div:last-child").innerHTML = `<div id="moveOnBtn">GÅ VIDARE</div>`;
        document.getElementById("moveOnBtn").addEventListener("click", () => { renderFarwell(storyLine, storyChapter) })
    }
    // Om man har för lite coins (inte har råd att muta), visa popup
    else {
        document.querySelector(".popup").classList.remove("hidden")
        document.querySelector(".popupClose").addEventListener("click", () => { document.querySelector(".popup").classList.add("hidden") })
    }
}

// --------------------- RENDER OF GOODBYE -----------------------
async function renderFarwell(storyLine, storyChapter) {
    // Visa karaktärens svar i stora rutan och presentera en hejdå knapp typ
    document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].textEnding;
    document.querySelector("#wrapper > div:last-child").innerHTML = "<div>Hejdå!</div>"

    // Uppdatera storyChapter till DB
    let nextChapter = storyChapter + 1;
    let idOfUser = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
    await fireBaseFunctions.updateStoryChapter('Teams', idOfUser, localStorage.getItem('backpackNr'), nextChapter)

    // HÄR GÅ VIDARE
    // anropa nån annan funtktion som går vidare till karta. och när man är inom rätt zon igen så anropas renderQuestion med storyChapter som hämtats på nytt från databasen
    // OBS VIKTIGT ATT StoryChapter HÄMTAS PÅ NYTT! Annars fastnar den på 0 eller 1 
}

// --------------------- CHECK CURRENT COINS -----------------------
async function checkCoins(userTeamId, userBackpack) {
    // Hämtar teamets document
    let doc = await fireBaseFunctions.getDocumentFromFirestore('Teams', userTeamId);

    // 20 representerar kostnaden av att muta
    // Om den nuvarande summan minus 20 blir negativ så returneras false, man
    // ska inte kunna muta. Annars returneras true, man kan då muta.
    if (userBackpack == 1)
        if (doc.backpack1.coins - 20 < 0)
            return false
        else
            return true
    if (userBackpack == 2) {
        if (doc.backpack1.coins - 20 < 0)
            return false
        else
            return true
    }
}

/*
    1. En funktion körs med statens id som parameter
    2. Personen, frågan och svarsalternativen rendreras
    3. Baserat på vilket alternativ man klickar på rendreras olika saker:
        1. Om lyckat: karaktärens svar rendreras, gåtan läggs i ens backpack
        2. Om ej lyckat: man ges alternativet att gå vidare eller muta. Om muta sker samma sak som ovan.
    4. TextEnding rendreras med info om vart man ska härnäst
    5. QuestionId + 1 stoppas i staten i db för att kunna användas som parameter när man kommer till nästa zon.
    6. Man uppmanas att gå vidare och återgår till kompassen, eller vad det nu är vi har där.
*/



