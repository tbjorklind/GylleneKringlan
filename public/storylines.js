"use strict"

// Backpack 1
const storyLine1 = [
    {
        questionId: 0,
        characterImg: "./agneta.png",
        text: "Hej jag heter Agneta, hur många äpplen åt jag igår?",
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
        textEnding: "Min make Bob är på andra sidan kanalen, spring dit!"
    }
]

// Backpack 2
const storyLine2 = [
    {
        questionId: 0,
        characterImg: "./bob.png",
        text: "Hej jag heter Bob, vad heter Obama i förnamn?",
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
        textEnding: "Min make Johnny är på andra sidan kanalen, spring dit!"
    }
]

// !! SKA LIGGA LÄNGST NER !!
export const storylines = { storyLine1, storyLine2 };