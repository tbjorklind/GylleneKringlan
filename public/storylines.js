'use strict'
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
    // questionId: 0,
    characterClass: 1,
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fanita.png?alt=media&token=165e8055-dfc6-465b-84f7-381105097e33',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P1-1.png?alt=media&token=6797cb3d-9ebf-4328-bbaa-705be2ff8d39',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P1-2.png?alt=media&token=139ae220-e16e-4e26-ae17-7502be79a90f',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P1-ratt.png?alt=media&token=ffd95692-ae90-471b-8f75-3eeb3f0d81a8',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P1-fel.png?alt=media&token=959fc6a8-9719-49b2-8bcc-c4a9df917992',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P1-muta.png?alt=media&token=fc769da5-ea36-4fcc-9009-5c7aee4b7ba7',
    // intro: "Hej jag heter Anita!",
    // question: "Hur många äpplen åt jag igår?",
    options: [
      {
        optionId: 0,
        text: 'Han har inget hår',
        correctAnswer: true
      },
      {
        optionId: 1,
        text: 'Han har på sig en badmössa',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Han doppar inte huvudet i vattnet',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Inget av svaren stämmer',
        correctAnswer: false
      }
    ],
    // wrongAnswerText: "Nääää... inte riktigt!",
    // correctAnswerText: "Helt rätt! Nu e jag mätt! Jag åt femtio äpplen, för jag var på en femtioårsfest, Ninas fest. Jag tycker ju om henne, men om det är någon medelålsers ni letar efter... tja...",
    // bribedAnswerText: "Najs cash, tack! Jag åt faktiskt 50 äpplen! För Ninas 50års fest! Jag hade nog hållit ett extra öga på henne om jag var ni...",
    textEnding: 'Min fru Lucy är på andra sidan kanalen, spring dit!',
    clue: '50ÅrsBallong',
    nextPlace: 'kanalen'
  },
  {
    // questionId: 0,
    characterClass: 1,
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Ffiskare.png?alt=media&token=3b3f8e8e-42c4-43b5-9ce0-d8dca9306b66',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P2-1.png?alt=media&token=c3b262f6-cc96-4ad2-b557-3550a392d971',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P2-2.png?alt=media&token=29d636df-5407-4ba7-b508-648a955b8e74',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P2-ratt.png?alt=media&token=f8717567-711d-474a-9434-d361030eac6e',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P2-fel.png?alt=media&token=f762f8b8-24ec-404a-8127-8937dd739bb9',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P2-muta.png?alt=media&token=e8d210fc-f685-4e13-8f1a-0810733d2009',
    // intro: "Hej jag heter Lucy!",
    // question: "Vad gjorde bagaren när polisen kom?",
    options: [
      {
        optionId: 0,
        text: 'Hajen',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'Rocka',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Späckhuggare',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Svärdfisk',
        correctAnswer: true
      }
    ],
    // wrongAnswerText: "??? nej ? wtf...",
    // correctAnswerText: "JAPP! Okej far åt helvete!",
    // bribedAnswerText: "ooooogabooooga",
    textEnding: 'hejdå!!!!!',
    clue: 'deg',
    nextPlace: 'andra sidan stan'
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    characterClass: 2,
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fapotekaren.png?alt=media&token=c8946034-55a7-4a4c-91bb-7c54526d0d12',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P3-1.png?alt=media&token=4dadf4ce-0ea2-4b1b-9be6-404321f79e87',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P3-2.png?alt=media&token=661ae055-1815-427c-aacc-202235cc5de6',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P3-ratt.png?alt=media&token=33c964f9-d5be-434b-b8c1-6f291cd1a950',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P3-fel.png?alt=media&token=2347a08d-f074-4115-92dc-7f8cd2ede110',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P3-muta.png?alt=media&token=c17f02be-6bcb-41ea-b0b3-38d36861bf5e',

    options: [
      {
        optionId: 0,
        text: 'hallå',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'tjena',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'hejsan',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'hej',
        correctAnswer: true
      }
    ],
    textEnding: 'lalala!!!!',
    clue: 'lala',
    nextPlace: 'lalalla'
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    characterClass: 3,
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fdorrvakten.png?alt=media&token=cba82460-43d5-491f-bf3c-951db9181da4',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P4-1.png?alt=media&token=b7477f12-a1f4-4e69-b8be-2cf5dd216eb6',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P4-2.png?alt=media&token=d305dff8-f933-4792-93ea-1b7bd3d85a9f',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P4-ratt.png?alt=media&token=fe902cb8-e413-406d-8cfd-640f1174dd5c',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P4-fel.png?alt=media&token=b48866f8-98f0-4085-b212-8edfc0dd8ecc',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P4-muta.png?alt=media&token=09bda0c0-baf5-4fa9-b5e7-22664cd40dec',

    options: [
      {
        optionId: 0,
        text: 'hallå',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'tjena',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'hejsan',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'hej',
        correctAnswer: true
      }
    ],
    textEnding: 'lalala!!!!',
    clue: 'lala',
    nextPlace: 'lalalla'
  },
  {
    questionId: 0, // ??? BEHÖVS?
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Ftorparen.png?alt=media&token=40b6c9ed-9787-49c9-8e0a-905e8df1b73c',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P5-1.png?alt=media&token=12440a6a-a663-4537-8604-a328735f3608',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P5-2.png?alt=media&token=afe7bad4-8abb-417b-9451-ee05bdf12dd2',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P5-ratt.png?alt=media&token=cf511287-1598-4fa7-93f5-c9234e70dbb7',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P5-fel.png?alt=media&token=8aafd31c-d6fe-4a03-98b6-2de94fb950ac',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P5-muta.png?alt=media&token=a7cabe78-0c83-4686-9c66-ead3ac607d5b',

    options: [
      {
        optionId: 0,
        text: 'hallå',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'tjena',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'hejsan',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'hej',
        correctAnswer: true
      }
    ],
    textEnding: 'lalala!!!!',
    clue: 'lala',
    nextPlace: 'lalalla'
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    characterClass: 4,
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FvonAsklund.png?alt=media&token=e31020af-c174-4382-82ff-38cb3b3ab80f',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P6-1.png?alt=media&token=fe75a6ab-0094-4b63-a596-b295e77d7549',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P6-2.png?alt=media&token=96e1cc56-0cd6-484b-981c-874e26ffa066',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P6-ratt.png?alt=media&token=eb51509d-f6f1-4fd8-be67-d4c2e505eef2',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P6-fel.png?alt=media&token=439d68c4-8c1e-4c19-bc85-56057b7c4d16',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P6-muta.png?alt=media&token=e75b9ede-34c6-433f-9868-f4ec9a5a25f7',

    options: [
      {
        optionId: 0,
        text: 'hallå',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'tjena',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'hejsan',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'hej',
        correctAnswer: true
      }
    ],
    textEnding: 'lalala!!!!',
    clue: 'lala',
    nextPlace: 'lalalla'
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    characterClass: 5,
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Faugust_profil.png?alt=media&token=b79d6a24-adf7-4391-8294-3836a88e39a4',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P7-1.png?alt=media&token=548f667a-b4a1-4d24-80ae-eb2b24956176',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P7-2.png?alt=media&token=81b05b50-4d4b-46f3-ade3-e35d66aebd32',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P7-ratt.png?alt=media&token=93f6953f-94ed-4fba-a3ec-9671dba076fe',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P7-fek.png?alt=media&token=aafbb163-193c-4a1e-9ec6-55b79a1a0409',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P7-muta.png?alt=media&token=e9ac3179-5594-4bb4-9155-36cbd3d989cc',

    options: [
      {
        optionId: 0,
        text: 'hallå',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'tjena',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'hejsan',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'hej',
        correctAnswer: true
      }
    ],
    textEnding: 'lalala!!!!',
    clue: 'lala',
    nextPlace: 'lalalla'
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    characterClass: 6,
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Froland.png?alt=media&token=c235a4f6-7f69-4bed-9132-a7fad6a9cf5e',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P8-1.png?alt=media&token=5fac1429-2020-42d8-af48-8b514822443a',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P8-2.png?alt=media&token=4a727485-b7b1-4fb2-956e-e9878395d1ef',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P8-ratt.png?alt=media&token=a47b67e2-029d-457b-a61a-394ca4f2a333',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P8-fel.png?alt=media&token=59110939-53bc-445d-bdb5-fe1455049477',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL1P7-muta.png?alt=media&token=e9ac3179-5594-4bb4-9155-36cbd3d989cc',

    options: [
      {
        optionId: 0,
        text: 'hallå',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'tjena',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'hejsan',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'hej',
        correctAnswer: true
      }
    ],
    textEnding: 'lalala!!!!',
    clue: 'lala',
    nextPlace: 'lalalla'
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    characterClass: 7,
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fprast.png?alt=media&token=93848911-b6ed-4c2d-9c2d-52b5615f6198',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P9-1.png?alt=media&token=ec383ff1-86a3-473c-90dc-d583aa240a8c',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P9-2.png?alt=media&token=56c7123f-b359-4478-8233-5325842bc32a',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P9-ratt.png?alt=media&token=5ea51cdb-12a3-4405-83ef-ed2ed87096b0',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P9-fel.png?alt=media&token=5c5bf810-e013-4b5f-9c89-e1417cb6af7b',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FL12P9-muta.png?alt=media&token=35d183cf-2036-49fd-b7f8-62c8bf2c1afe',

    options: [
      {
        optionId: 0,
        text: 'hallå',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'tjena',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'hejsan',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'hej',
        correctAnswer: true
      }
    ],
    textEnding: 'lalala!!!!',
    clue: 'lala',
    nextPlace: 'lalalla'
  }
]

// Backpack 2
const storyLine2 = [
  {
    questionId: 0,
    characterImg: './bob.png',
    intro: 'Hej jag heter Bob!',
    question: 'Vad heter Obama i efternamn?',
    options: [
      {
        optionId: 0,
        text: 'Obama är hans förnamn',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'Barack',
        correctAnswer: true
      },
      {
        optionId: 2,
        text: 'John',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Michelle!',
        correctAnswer: false
      }
    ],
    wrongAnswerText:
      'Nja... om du inte vet vad han heter så litar jag nog inte riktigt på dig tillräckligt för att säga vad jag sett...',
    correctAnswerText:
      'Rätt! Min ledtråd till dig är... Jag såg en lång man springa förbi bageriet igår.',
    bribedAnswerText:
      'Okej då... han heter Barack! Och jag såg en lång man ta sig förbi bageriet igår!',
    textEnding: 'Min make Johnny är på andra sidan kanalen, spring dit!',
    clue: 'fagel',
    nextPlace: 'kanalen'
  },
  {
    questionId: 0,
    characterImg: './bob.png',
    intro: 'Hej jag heter Johnny!',
    question: 'Hur många ben har en spindel?',
    options: [
      {
        optionId: 0,
        text: '5 (en extra där bak)',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: '2',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: '6',
        correctAnswer: true
      },
      {
        optionId: 3,
        text: '8',
        correctAnswer: false
      }
    ],
    wrongAnswerText: 'Eh... nääää....',
    correctAnswerText:
      'Rätt! Min ledtråd till dig är... jag såg anita med åttio spindlar härrom dagen!',
    bribedAnswerText:
      'Okej då... jag såg anita med åttio spindlar härrom dagen!',
    textEnding: 'Det finns en vakt borta vid eslöv, gå dit vettja!',
    clue: 'spindel',
    nextPlace: 'eslöv'
  }
]

// !! SKA LIGGA LÄNGST NER !!
export const storylines = { storyLine1, storyLine2 }
