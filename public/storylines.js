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
        correctAnswerText: "Helt rätt! Nu e jag mätt!",
        bribedAnswerText: "Najs cash, här e sanningen!",
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
                text: "Vem?",
                correctAnswer: false
            },
            {
                optionId: 3,
                text: "Michelle!",
                correctAnswer: false
            }
        ],
        wrongAnswerText: "Fel!",
        correctAnswerText: "Rätt!",
        bribedAnswerText: "Okej då... svaret är Barack!",
        textEnding: "Min make Johnny är på andra sidan kanalen, spring dit!"
    }
]

// !! SKA LIGGA LÄNGST NER !!
export const storylines = { storyLine1, storyLine2 };