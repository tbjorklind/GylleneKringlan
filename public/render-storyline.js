"use strict"
import { storylines } from "./storylines.js";
import { fireBaseFunctions } from './firebase.js'
import startInitMap from './map.js'
export default renderIntroAndQuestion;

let questionState = {};

// --------------------- RENDER QUESTION -----------------------
async function renderIntroAndQuestion(storyChapter) {
    let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
    let userBackpack = localStorage.getItem('backpackNr');
    let doc = await fireBaseFunctions.getDocumentFromFirestore('Teams', userTeamId)

    let chosenBtn;

    if (userBackpack == 1) {
        questionState = doc.backpack1.questionState;
        if (doc.backpack1.questionState.answered) {
            chosenBtn = doc.backpack1.questionState.chosenAnswer;
        } else {
            chosenBtn = "";
        }
    }
    if (userBackpack == 2) {
        questionState = doc.backpack2.questionState;
        if (doc.backpack2.questionState.answered) {
            chosenBtn = doc.backpack2.questionState.chosenAnswer;
        }
        else {
            chosenBtn = "";
        }
    }

    document.getElementById("wrapper").style.removeProperty("display")

    // Chosing storyline based on backpack
    let storyLine;
    if (localStorage.getItem("backpackNr") == 1)
        storyLine = storylines.storyLine1;
    else if (localStorage.getItem("backpackNr") == 2)
        storyLine = storylines.storyLine2;

    // Initial structure and question
    document.getElementById("wrapper").innerHTML = `
    <div id="storylineTop">
        <div>${storyLine[storyChapter].intro}</div>
        <img src="${storyLine[storyChapter].characterImg}">
    </div>
    <div id="storylineBottom"></div>
    `;


    let continueBtn = document.createElement("div");
    continueBtn.classList.add("arrowBtn");
    continueBtn.style.backgroundColor = "transparent";
    document.getElementById("storylineBottom").appendChild(continueBtn);
    continueBtn.addEventListener("click", () => {
        document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].question;
        document.getElementById("storylineBottom").innerHTML = "";


        // Render each possible answer
        let backgrounds = randomizeBtnBackgrounds(storyLine[storyChapter].options.length)
        for (let i = 0; i < storyLine[storyChapter].options.length; i++) {
            let answerOptionBtn = document.createElement("div");
            answerOptionBtn.classList.add(`answer${i + 1}`)

            if (chosenBtn != "") {
                if (`answer${i + 1}` != chosenBtn) {
                    answerOptionBtn.style.backgroundColor = "white";
                    //answerOptionBtn.disabled = true;
                }
            }

            answerOptionBtn.innerHTML = storyLine[storyChapter].options[i].text;
            answerOptionBtn.style.backgroundImage = `url(${backgrounds[i]})`
            document.getElementById("storylineBottom").appendChild(answerOptionBtn);
            answerOptionBtn.addEventListener("click", () => { renderAnswerResult(storyLine, storyChapter, storyLine[storyChapter].options[i].correctAnswer, `answer${i + 1}`) })
        }

        /* F.D. Funktion, nu ändrad till for-loop för att kunna använda sig av 'i' som parameter i randomizeBtnBackground()anropet 
        storyLine[storyChapter].options.forEach(option => {
            let answerOptionBtn = document.createElement("div");
            answerOptionBtn.innerHTML = option.text;
            document.getElementById("storylineBottom").appendChild(answerOptionBtn);
            answerOptionBtn.addEventListener("click", () => { renderAnswerResult(storyLine, storyChapter, option.correctAnswer) })
        })
        */
    })
}

// --------------------- RENDER RESULT OF ANSWER -----------------------
async function renderAnswerResult(storyLine, storyChapter, answer, chosenAnswer) {
    questionState.answered = true;
    questionState.chosenAnswer = chosenAnswer;
    await fireBaseFunctions.updateQuestionState(questionState)
    let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
    let userBackpack = localStorage.getItem('backpackNr');
    let doc = await fireBaseFunctions.getDocumentFromFirestore('Teams', userTeamId)

    let backgrounds = randomizeBtnBackgrounds(3);
    // If correct answer, show clue, add clue to backpack and offer to exit
    if (answer) {
        document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].correctAnswerText;
        document.querySelector("#wrapper > div:last-child").innerHTML = `<div id="moveOnBtn">GÅ VIDARE</div>`;
        document.querySelector("#wrapper > div:last-child > div").style.backgroundImage = `url(${backgrounds[0]})`

        let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
        let userBackpack = localStorage.getItem('backpackNr');
        await fireBaseFunctions.addClueToBackpack('Teams', userTeamId, userBackpack, storyLine[storyChapter].clue)
    }
    // Else, give option to bribe or leave
    else {
        document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].wrongAnswerText;

        document.querySelector("#wrapper > div:last-child").innerHTML = `<div id="bribeBtn">MUTA (20 mynt)</div><div id="moveOnBtn" >GÅ VIDARE</div>`;
        document.querySelector("#wrapper > div:last-child > div:first-child").style.backgroundImage = `url(${backgrounds[1]})`
        document.querySelector("#wrapper > div:last-child > div:last-child").style.backgroundImage = `url(${backgrounds[2]})`

        console.log(doc)
        if (userBackpack == 1) {
            if (doc.backpack1.questionState.bribed) {
                document.querySelector("#wrapper > div:last-child > div:first-child").style.backgroundColor = "white";
            }
        }
        if (userBackpack == 2) {
            if (doc.backpack2.questionState.bribed) {
                document.querySelector("#wrapper > div:last-child > div:first-child").style.backgroundColor = "white";
            }
        }


        // document.querySelector("#wrapper > div:last-child > div:first-child").addEventListener("click", function onBribeClick(e) {
        //     // Förhindrar användaren från att klicka på muta-knappen tusen ggr och bli PANK
        //     questionState.bribed = true;
        //     document.querySelector("#wrapper > div:last-child > div:first-child").removeEventListener("click", onBribeClick)
        //     renderBribeResult(storyLine, storyChapter)
        // })

        document.querySelector("#wrapper > div:last-child > div:first-child").addEventListener("click", async function onBribeClick(e) {
            // Förhindrar användaren från att klicka på muta-knappen tusen ggr och bli PANK
            questionState.bribed = true;
            document.querySelector("#wrapper > div:last-child > div:first-child").removeEventListener("click", onBribeClick)
            await fireBaseFunctions.updateQuestionState(questionState)
            renderBribeResult(storyLine, storyChapter)
        })
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
        let background = randomizeBtnBackgrounds(1);
        document.querySelector("#wrapper > div:last-child > div").style.backgroundImage = `url(${background[0]})`;
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
    let background = randomizeBtnBackgrounds(1);
    document.querySelector("#wrapper > div:last-child > div").style.backgroundImage = `url(${background[0]})`;

    document.querySelector("#wrapper > div:last-child > div").addEventListener('click', async (event) => {
        // Uppdatera storyChapter till DB
        let nextChapter = storyChapter + 1;
        let idOfUser = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
        await fireBaseFunctions.updateStoryChapter('Teams', idOfUser, localStorage.getItem('backpackNr'), nextChapter)

        // Sätt det nuvarande kapitelnumret i local storage och byta URL till kartan
        // localStorage.setItem('storyChapter', nextChapter)
        // let url = window.location.href + "map.html";
        // window.location.href = url;
        document.getElementById("wrapper").style.display = "none";

        questionState.answered = false;
        questionState.chosenAnswer = "";
        questionState.bribed = false;
        await fireBaseFunctions.updateQuestionState(questionState)
        startInitMap()
    })
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

// --------------------- RANDOMIZE BUTTON BACKGROUNDS -----------------------
// ---------------------- Param only 1 to 9 allowed ------------------------
function randomizeBtnBackgrounds(number) {
    const backgrounds = ["https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn1.png?alt=media&token=a44f6384-033c-439e-9a33-d62ee92383f6",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn2.png?alt=media&token=9513eece-4aba-4666-bb1b-9aef975b016e",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn3.png?alt=media&token=63b4381e-2cef-4f3d-984b-d6a6da3406d7",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn4.png?alt=media&token=5f7ad137-20fd-4b8a-9f4c-c31dab79ee51",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn5.png?alt=media&token=27d42458-b963-4d33-8965-8a35c9147990",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn6.png?alt=media&token=2dd49b8d-ad9b-4726-9a91-5def63aba348",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn7.png?alt=media&token=9adfa49e-1cc4-4d8a-8766-ccf2b9124fd8",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn8.png?alt=media&token=575da275-52d6-45f5-9481-03583cce49d7",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn9.png?alt=media&token=82735731-c3ac-4157-b18a-e861d1c68487"]

    let randomizedBackgrounds = [];

    for (let i = 0; i < number; i++) {
        let randomNr = Math.floor(Math.random() * 9);
        let randomBackground = backgrounds[randomNr];
        if (randomizedBackgrounds.includes(randomBackground))
            i--
        else
            randomizedBackgrounds.push(randomBackground)
    }
    return randomizedBackgrounds;
}