"use strict"
import { storylines } from "./storylines.js";
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
function renderAnswerResult(storyLine, storyChapter, answer) {
    // If correct answer, show clue and offer to exit
    if (answer) {
        document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].correctAnswerText;
        document.querySelector("#wrapper > div:last-child").innerHTML = `<div id="moveOnBtn">GÅ VIDARE</div>`;
    }
    // Else, give option to bribe or leave
    else {
        document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].wrongAnswerText;
        document.querySelector("#wrapper > div:last-child").innerHTML = `<div id="bribeBtn">MUTA</div><div id="moveOnBtn" >GÅ VIDARE</div>`;
        document.querySelector("#wrapper > div:last-child > div:first-child").addEventListener("click", () => { renderBribeResult(storyLine, storyChapter) })
    }
    // If wanting to leave
    document.getElementById("moveOnBtn").addEventListener("click", () => { renderFarwell(storyChapter) })
}

// --------------------- RENDER OF BRIBE -----------------------
function renderBribeResult(storyLine, storyChapter) {
    document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].bribedAnswerText;
    document.querySelector("#wrapper > div:last-child").innerHTML = `<div id="moveOnBtn">GÅ VIDARE</div>`;
    document.getElementById("moveOnBtn").addEventListener("click", () => { renderFarwell(storyChapter) })
}

// --------------------- RENDER OF GOODBYE -----------------------
function renderFarwell(storyLine, storyChapter) {
    document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].textEnding;
    document.querySelector("#wrapper > div:last-child > div").innerHTML = "Hej!"
    // anropa update state med state + 1;
    // anropa nån anna funtktion som går vidare till karta. och när man är inom rätt zon igen så anropas renderQuestion med state som hämtats på nytt från databasen
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


