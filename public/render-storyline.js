"use strict"
import { storylines } from "./storylines.js";
import { fireBaseFunctions } from './firebase.js'
import startInitMap from './map.js'
import { renderEnding } from './render-ending.js'
export default renderIntroAndQuestion;

let questionState = {};

// --------------------- RENDER QUESTION -----------------------
async function renderIntroAndQuestion(storyChapter) {

    // Kollar om någon redan svarar på frågan
    let currentUserStatus = await checkCurrentUser()
    if (currentUserStatus) {
        if (storyChapter == 9) {
            renderEnding.renderCharacterAlternatives()
        } else {
            console.log(storyChapter)
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

            console.log(storyLine)
            console.log(storyChapter)
            // Initial structure and question
            document.getElementById("wrapper").innerHTML = `
        <div id="storylineTop">
            <img class="bubble" id="${storyLine[storyChapter].character}Bubble" src="${storyLine[storyChapter].speakingImg1}">
            <img class="character" id="${storyLine[storyChapter].character}" src="${storyLine[storyChapter].characterImg}">
        </div>
        <div id="storylineBottom"></div>
        `;

            let continueBtn = document.createElement("div");
            continueBtn.classList.add("arrowBtn");
            continueBtn.style.backgroundColor = "transparent";
            document.getElementById("storylineBottom").appendChild(continueBtn);
            continueBtn.addEventListener("click", () => {
                // document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].question;
                document.querySelector("#wrapper > div:first-child").innerHTML = `
                <img class="bubble" id="${storyLine[storyChapter].character}Bubble" src="${storyLine[storyChapter].speakingImg2}">
                <img class="character" id="${storyLine[storyChapter].character}" src="${storyLine[storyChapter].characterImg}">`;
                document.getElementById("storylineBottom").innerHTML = "";


                // Render each possible answer
                let backgrounds = randomizeBtnBackgrounds(storyLine[storyChapter].options.length)
                for (let i = 0; i < storyLine[storyChapter].options.length; i++) {
                    let answerOptionBtn = document.createElement("div");
                    answerOptionBtn.classList.add(`answer${i + 1}`)

                    if (chosenBtn != "") {
                        if (`answer${i + 1}` != chosenBtn) {
                            answerOptionBtn.style.pointerEvents = "none"
                            answerOptionBtn.style.opacity = "0.5"
                        }
                    }

                    answerOptionBtn.innerHTML = storyLine[storyChapter].options[i].text;
                    answerOptionBtn.style.backgroundImage = `url(${backgrounds[i]})`
                    document.getElementById("storylineBottom").appendChild(answerOptionBtn);
                    answerOptionBtn.addEventListener("click", () => { renderAnswerResult(storyLine, storyChapter, storyLine[storyChapter].options[i].correctAnswer, `answer${i + 1}`) })
                }
            })
        }
    } else {
        document.querySelector(".accessDenied").classList.remove("hidden")
        document.querySelector(".accessDenied > div:last-child").addEventListener('click', () => { location.reload() })
    }

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
        // document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].correctAnswerText;
        //Byt namn på bubble class!!!!!!!
        document.querySelector("#wrapper > div:first-child").innerHTML = `
        <img class="bubble" id="${storyLine[storyChapter].character}Bubble" src="${storyLine[storyChapter].speakingImgRight}">
        <img class="character" id="${storyLine[storyChapter].character}" src="${storyLine[storyChapter].characterImg}">`; document.querySelector("#wrapper > div:last-child").innerHTML = `<div id="moveOnBtn">GÅ VIDARE</div>`;
        document.querySelector("#wrapper > div:last-child > div").style.backgroundImage = `url(${backgrounds[0]})`

        document.getElementById("moveOnBtn").addEventListener("click", () => { renderClue(storyLine, storyChapter) })
    }
    // Else, give option to bribe or leave
    else {
        // document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].wrongAnswerText;
        document.querySelector("#wrapper > div:first-child").innerHTML = `
        <img class="bubble" id="${storyLine[storyChapter].character}Bubble" src="${storyLine[storyChapter].speakingImgWrong}">
        <img class="character" id="${storyLine[storyChapter].character}" src="${storyLine[storyChapter].characterImg}">`; document.querySelector("#wrapper > div:last-child").innerHTML = `<div id="bribeBtn">MUTA (20 mynt)</div><div id="moveOnBtn" >GÅ VIDARE</div>`;
        document.querySelector("#wrapper > div:last-child > div:first-child").style.backgroundImage = `url(${backgrounds[1]})`
        document.querySelector("#wrapper > div:last-child > div:last-child").style.backgroundImage = `url(${backgrounds[2]})`

        if (userBackpack == 1) {
            if (doc.backpack1.questionState.bribed) {
                document.querySelector("#wrapper > div:last-child > div:first-child").style.pointerEvents = "none";
                document.querySelector("#wrapper > div:last-child > div:first-child").style.color = "grey";
            }
        }
        if (userBackpack == 2) {
            if (doc.backpack2.questionState.bribed) {
                document.querySelector("#wrapper > div:last-child > div:first-child").style.pointerEvents = "none";
                document.querySelector("#wrapper > div:last-child > div:first-child").style.backgroundColor = "grey";
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

        // If wanting to leave
        document.getElementById("moveOnBtn").addEventListener("click", () => { renderFarwell(storyLine, storyChapter) })
    }

}



async function renderClue(storyLine, storyChapter) {

    document.querySelector("#wrapper > div:first-child").innerHTML = `
    <img class="bubble" id="${storyLine[storyChapter].character}Bubble" src="${storyLine[storyChapter].speakingImgClue}">
    <img class="character" id="${storyLine[storyChapter].character}" src="${storyLine[storyChapter].characterImg}">`; document.querySelector("#wrapper > div:last-child").innerHTML = `<div id="moveOnBtn">GÅ VIDARE</div>`;
    //document.querySelector("#moveOnBtn").style.backgroundImage = `url(${backgrounds[1]})` !!!!!!!!!!!!!!!!!!!!!!!!!

    let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
    let userBackpack = localStorage.getItem('backpackNr');
    await fireBaseFunctions.addClueToBackpack('Teams', userTeamId, userBackpack, storyLine[storyChapter].clue)
    console.log("HHHHHHH")

    // If wanting to leave
    document.getElementById("moveOnBtn").addEventListener("click", (e) => {
        console.log(e)
        renderFarwell(storyLine, storyChapter)
    })

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
        // document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].bribedAnswerText;
        document.querySelector("#wrapper > div:first-child").innerHTML = `
        <img class="bubble" id="${storyLine[storyChapter].character}Bubble" src="${storyLine[storyChapter].speakingImgBribe}">
        <img class="character" id="${storyLine[storyChapter].character}" src="${storyLine[storyChapter].characterImg}">`;
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
    //document.querySelector("#wrapper > div:first-child").innerHTML = storyLine[storyChapter].textEnding;
    document.querySelector("#wrapper > div:first-child").innerHTML = `
    <img class="bubble" id="${storyLine[storyChapter].character}NextBubble" src="${storyLine[storyChapter].speakingImgNext}">
    <img class="character" id="${storyLine[storyChapter].character}" src="${storyLine[storyChapter].characterImg}"> `
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
        resetCurrentUser()
        if (nextChapter == 9) {
            renderIntroAndQuestion(nextChapter)
        } else {
            startInitMap()
        }
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

// --------------------- CHECK CURRENT USER -----------------------
async function checkCurrentUser() {
    let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
    let userBackpack = localStorage.getItem('backpackNr');
    let user = localStorage.getItem("userId");
    let currentUser = await fireBaseFunctions.getCurrentUser('Teams', userTeamId, userBackpack);

    if (currentUser == "" || currentUser == localStorage.getItem("userId")) {
        await fireBaseFunctions.addCurrentUser('Teams', userTeamId, userBackpack, user)
        return true
    } else {
        return false
    }
}

// --------------------- RESET CURRENT USER -----------------------
async function resetCurrentUser() {
    let userTeamId = await fireBaseFunctions.getTeamIdOfUser(localStorage.getItem('userId'));
    let userBackpack = localStorage.getItem('backpackNr');
    let user = "";

    await fireBaseFunctions.addCurrentUser('Teams', userTeamId, userBackpack, user)
}


// --------------------- RANDOMIZE BUTTON BACKGROUNDS -----------------------
// ---------------------- Param only 1 to 9 allowed ------------------------
function randomizeBtnBackgrounds(number) {
    const backgrounds = [
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn1.png?alt=media&token=83a2559d-173b-426f-a82f-3e7c9cc2ec4b",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn2.png?alt=media&token=92f9eca7-c491-4fee-b04f-1177b528460b",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn3.png?alt=media&token=046eddd4-6769-4a86-af36-6bcee53ecbe7",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn4.png?alt=media&token=720a8dc6-172b-4a99-b2b0-9a5c3fd51933",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn5.png?alt=media&token=ab05a8e7-12a0-47a3-9b07-1cd7ac3dc5d1",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn6.png?alt=media&token=c3ee1b57-3854-4161-a77f-29da4e40e806",
        "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbtn7.png?alt=media&token=15392d47-03cd-4d89-9fbf-2a65e8267c4d"
    ]

    let randomizedBackgrounds = [];

    for (let i = 0; i < number; i++) {
        let randomNr = Math.floor(Math.random() * 7);
        let randomBackground = backgrounds[randomNr];
        if (randomizedBackgrounds.includes(randomBackground))
            i--
        else
            randomizedBackgrounds.push(randomBackground)
    }
    return randomizedBackgrounds;
}