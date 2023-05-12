"use strict"
// Problem/möjligheter 
// Vad händer om man refreshar? State handling - kolla vilka nycklar som finns i databasen 
// Använd dessa nycklar för att visa rätt sida/info

// Vad behöver vi veta för att användaren ska komma till rätt sida? 
// ID, spara nuvarande state (det man passerat+1), 

// Steg 1 - placera ID och state i DB
// Steg 2 - hur använder vi detta för att visa rätt sida?
// Tankar - Känn av/kolla av, kör dessa om vi är på 0, dessa om vi är på 1 tex. Tidigt i JS-koden. Var är jag?
// Säg till om inom zon

// Tips, lås svarsalternativen för alla spelarna utom en.


// Backpack 1
const storyLine1 = [
    {
        questionId: 0,
        characterImg: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fanita.png?alt=media&token=165e8055-dfc6-465b-84f7-381105097e33",
       
        speakingImg1: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P1-1.png?alt=media&token=6797cb3d-9ebf-4328-bbaa-705be2ff8d39",
        speakingImg2:'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P1-2.png?alt=media&token=139ae220-e16e-4e26-ae17-7502be79a90f',
        speakingImgRight:"https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P1-ratt.png?alt=media&token=ffd95692-ae90-471b-8f75-3eeb3f0d81a8",
        speakingImgWrong:"https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P1-fel.png?alt=media&token=959fc6a8-9719-49b2-8bcc-c4a9df917992",
        speakingImgBribe:"https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P1-muta.png?alt=media&token=fc769da5-ea36-4fcc-9009-5c7aee4b7ba7",
        // intro: "Hej jag heter Anita!",
        // question: "Hur många äpplen åt jag igår?",
        options: [
            {
                optionId: 0,
                text: "Han har inget hår",
                correctAnswer: true
            },
            {
                optionId: 1,
                text: "Han har på sig en badmössa",
                correctAnswer: false
            },
            {
                optionId: 2,
                text: "Han doppar inte huvudet i vattnet",
                correctAnswer: false
            },
            {
                optionId: 3,
                text: "Inget av svaren stämmer",
                correctAnswer: false
            }
        ],
        wrongAnswerText: "Nääää... inte riktigt!",
        correctAnswerText: "Helt rätt! Nu e jag mätt! Jag åt femtio äpplen, för jag var på en femtioårsfest, Ninas fest. Jag tycker ju om henne, men om det är någon medelålsers ni letar efter... tja...",
        bribedAnswerText: "Najs cash, tack! Jag åt faktiskt 50 äpplen! För Ninas 50års fest! Jag hade nog hållit ett extra öga på henne om jag var ni...",
        textEnding: "Min fru Lucy är på andra sidan kanalen, spring dit!",
        clue: '50ÅrsBallong',
        nextPlace: 'kanalen'
    },
    {
        questionId: 0,
        characterImg: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Ffiskare.png?alt=media&token=3b3f8e8e-42c4-43b5-9ce0-d8dca9306b66",
        speakingImg1: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P2-1.png?alt=media&token=c3b262f6-cc96-4ad2-b557-3550a392d971",
        speakingImg2: "https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P2-2.png?alt=media&token=29d636df-5407-4ba7-b508-648a955b8e74",
        speakingImgRight:"https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P2-ratt.png?alt=media&token=f8717567-711d-474a-9434-d361030eac6e",
        speakingImgWrong:"https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P2-fel.png?alt=media&token=f762f8b8-24ec-404a-8127-8937dd739bb9",
        speakingImgBribe:"https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P2-muta.png?alt=media&token=e8d210fc-f685-4e13-8f1a-0810733d2009",
        // intro: "Hej jag heter Lucy!",
        // question: "Vad gjorde bagaren när polisen kom?",
        options: [
            {
                optionId: 0,
                text: "Hajen",
                correctAnswer: false
            },
            {
                optionId: 1,
                text: "Rocka",
                correctAnswer: false
            },
            {
                optionId: 2,
                text: "Späckhuggare",
                correctAnswer: false
            },
            {
                optionId: 3,
                text: "Svärdfisk",
                correctAnswer: true
            }
        ],
        wrongAnswerText: "??? nej ? wtf...",
        correctAnswerText: "JAPP! Okej far åt helvete!",
        bribedAnswerText: "ooooogabooooga",
        textEnding: "hejdå!!!!!",
        clue: 'deg',
        nextPlace: 'andra sidan stan'
    }
]

// Backpack 2
const storyLine2 = [
    {
        questionId: 0,
        characterImg: "./bob.png",
        intro: "Hej jag heter Bob!",
        question: "Vad heter Obama i efternamn?",
        options: [
            {
                optionId: 0,
                text: "Obama är hans förnamn",
                correctAnswer: false
            },
            {
                optionId: 1,
                text: "Barack",
                correctAnswer: true
            },
            {
                optionId: 2,
                text: "John",
                correctAnswer: false
            },
            {
                optionId: 3,
                text: "Michelle!",
                correctAnswer: false
            }
        ],
        wrongAnswerText: "Nja... om du inte vet vad han heter så litar jag nog inte riktigt på dig tillräckligt för att säga vad jag sett...",
        correctAnswerText: "Rätt! Min ledtråd till dig är... Jag såg en lång man springa förbi bageriet igår.",
        bribedAnswerText: "Okej då... han heter Barack! Och jag såg en lång man ta sig förbi bageriet igår!",
        textEnding: "Min make Johnny är på andra sidan kanalen, spring dit!",
        clue: 'fagel',
        nextPlace: 'kanalen'
    },
    {
        questionId: 0,
        characterImg: "./bob.png",
        intro: "Hej jag heter Johnny!",
        question: "Hur många ben har en spindel?",
        options: [
            {
                optionId: 0,
                text: "5 (en extra där bak)",
                correctAnswer: false
            },
            {
                optionId: 1,
                text: "2",
                correctAnswer: false
            },
            {
                optionId: 2,
                text: "6",
                correctAnswer: true
            },
            {
                optionId: 3,
                text: "8",
                correctAnswer: false
            }
        ],
        wrongAnswerText: "Eh... nääää....",
        correctAnswerText: "Rätt! Min ledtråd till dig är... jag såg anita med åttio spindlar härrom dagen!",
        bribedAnswerText: "Okej då... jag såg anita med åttio spindlar härrom dagen!",
        textEnding: "Det finns en vakt borta vid eslöv, gå dit vettja!",
        clue: 'spindel',
        nextPlace: 'eslöv'
    }
]

// !! SKA LIGGA LÄNGST NER !!
export const storylines = { storyLine1, storyLine2 };