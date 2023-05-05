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
        characterImg: "./agneta.png",
        intro: "Hej jag heter Agneta!",
        question: "Hur många äpplen åt jag igår?",
        options: [
            {
                optionId: 0,
                text: "Du åt femtio äpplen",
                correctAnswer: true
            },
            {
                optionId: 1,
                text: "Du åt inga äpplen...",
                correctAnswer: false
            },
            {
                optionId: 2,
                text: "Två!",
                correctAnswer: false
            },
            {
                optionId: 3,
                text: "Tre, kanske?",
                correctAnswer: false
            }
        ],
        wrongAnswerText: "Nääää... inte riktigt!",
        correctAnswerText: "Helt rätt! Nu e jag mätt! Jag åt femtio äpplen, för jag var på en femtioårsfest, Ninas fest. Jag tycker ju om henne, men om det är någon medelålsers ni letar efter... tja...",
        bribedAnswerText: "Najs cash, tack! Jag åt faktiskt 50 äpplen! För Ninas 50års fest! Jag hade nog hållit ett extra öga på henne om jag var ni...",
        textEnding: "Min make Bob är på andra sidan kanalen, spring dit!",
        clue: '50ÅrsBallong',
        nextPlace: 'kanalen'
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
    }
]

// !! SKA LIGGA LÄNGST NER !!
export const storylines = { storyLine1, storyLine2 };