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
    character: 'anita',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fanita.png?alt=media&token=165e8055-dfc6-465b-84f7-381105097e33',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-1.png?alt=media&token=6ece55fd-2b7d-4590-8cec-51d59d2eef39',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-2.png?alt=media&token=55fea3ad-e77b-4aa8-8ed0-e81ab77cc5dc',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-ratt.png?alt=media&token=41b0f3ae-802f-4bd2-b221-6b1b9bd98233',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-fel.png?alt=media&token=b27a1fbf-e46b-455c-9e83-5dc16bbe1b61',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-muta.png?alt=media&token=71811ea3-2158-471d-89c6-80645b2afa7a',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-ledtrad.png?alt=media&token=13c6217c-9b5b-4d9e-b7fe-9fc674cb2275',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-next.png?alt=media&token=8cf46a3a-ef28-4dd3-a35c-71f212ece124',
    speakingImg4:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-4.png?alt=media&token=4f731261-1f5e-4202-b9da-4cd4da57518c',
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
    textEnding:
      'Nu måste ni dela upp er om ni ska hinna! Blå ryggsäck, ni borde springa och hälsa på fiskaren vid en båt, den var någon färg men kommer inte ihåg vilken. Gul ryggsäck ni borde träffa på Clemens, han hänger vid sin restaurang!',
    clue: 'flipflop',
    nextPlace: ''
  },
  {
    // questionId: 0,
    character: 'fiskare',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Ffiskare.png?alt=media&token=3b3f8e8e-42c4-43b5-9ce0-d8dca9306b66',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P2-1.png?alt=media&token=c4dd168a-49a2-42c6-b246-79b149a9fa94',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P2-2.png?alt=media&token=eee91ba3-5d69-46fd-9c27-48de158f21d9',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P2-ratt.png?alt=media&token=7b4e8a9f-1617-4074-923d-9e2de38756f3',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P2-fel.png?alt=media&token=607cec55-ee8e-439c-82e1-c0ca98b0c3be',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P2-muta.png?alt=media&token=15029ce3-172d-4434-9bfc-8f025c1e06f4',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P2-ledtrad.png?alt=media&token=847f2935-dcea-47df-8533-221a3615f02a',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P2-next.png?alt=media&token=18edcb1f-ae22-4872-8b00-c02614a33b47',
    speakingImg4:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P2-4.png?alt=media&token=892991b9-3a3d-4cb2-b3bc-d763159b8ff9',
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
    textEnding:
      'Nu måste du springa vidare, kanske till Apotekaren? Hon hänger i alla fall vid det vackraste apoteket här finns.',
    clue: '',
    nextPlace: 'andra sidan stan'
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    character: 'apotekare',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fapotekaren.png?alt=media&token=c8946034-55a7-4a4c-91bb-7c54526d0d12',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P3-1.png?alt=media&token=4cbe32fd-8d0b-427a-9ff0-fb2ac52acc5e',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P3-2.png?alt=media&token=85036e62-56c7-47b8-9489-e8904b7df3bd',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P3-ratt.png?alt=media&token=2ca76d32-5150-4a6d-8dd7-7f7d68d548b4',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P3-fel.png?alt=media&token=ac5a7116-c17c-40c4-a9e2-2af8cba5eb5b',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P3-muta.png?alt=media&token=cbf94b5e-a13a-433e-8c07-64f2ba753db6',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P3-ledtrad.png?alt=media&token=5a11b8c1-1352-4411-9509-195ccf589e40',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P3-next.png?alt=media&token=30d4425f-079d-4164-a126-52b439451cb8',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'Elektron',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'Atom',
        correctAnswer: true
      },
      {
        optionId: 2,
        text: 'Proton',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Neutron',
        correctAnswer: false
      }
    ],
    textEnding:
      'Nu får ni gå vidare, men jag kan tänka mig att Dörrvakten sett något! Han står där man kastar silvriga kulor på en sån liten kula. Vad är det nu det heter..?',
    clue: 'oljud',
    nextPlace: ''
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    character: 'dorrvakt',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fdorrvakten.png?alt=media&token=cba82460-43d5-491f-bf3c-951db9181da4',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P4-1.png?alt=media&token=9c19809b-338e-4874-873d-23ad4373dde0',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P4-2.png?alt=media&token=6bf041b6-413b-43c9-89cb-bb99ae9b34d6',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P4-ratt.png?alt=media&token=f8ca5e53-fb0a-4d78-ac99-eb863760fd83',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P4-fel.png?alt=media&token=d6251ec7-298a-49c9-a44c-4d2574293362',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P4-muta.png?alt=media&token=c1717bd7-939f-44aa-860c-dac542ee8b23',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P4-ledtrad.png?alt=media&token=918a1615-e529-40c2-a095-86c4951475e7',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P4-next.png?alt=media&token=2c200152-deab-4c3e-9b01-6c0b2b508dff',
    // speakingImg4: '',

    options: [
      {
        optionId: 0,
        text: 'Löfte',
        correctAnswer: true
      },
      {
        optionId: 1,
        text: 'Pinne',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Arm',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Vatten',
        correctAnswer: true
      }
    ],
    textEnding:
      'Nu ska ni få möta torgaren, han kan ändå veta mycket, han står och säljer blommor vid torget, du vet, Gus... Juste dina kompisar kommer nog dit, så se till att diskutera med varann!',
    clue: 'gris',
    nextPlace: ''
  },
  {
    character: 'torgare',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Ftorparen.png?alt=media&token=40b6c9ed-9787-49c9-8e0a-905e8df1b73c',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-1.png?alt=media&token=c5a3e276-c057-4576-b7f6-dadd2211a0ef',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-2.png?alt=media&token=08d4ced8-22c6-4d59-9204-7a02c739f8a3',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-ratt.png?alt=media&token=5f5d721a-f066-4383-9b77-d6710cd41228',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-fel.png?alt=media&token=361bb80b-129b-4d0f-b0b8-92049afbf3d1',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-muta.png?alt=media&token=127ad2cb-fee3-4d0e-a628-5011cea4abf1',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-ledtrad.png?alt=media&token=795b3a6d-6e0f-475b-8b6c-1bc09087d6aa',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-next.png?alt=media&token=e454f2cc-38fd-403b-bef4-06e124779a36',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'Han väger 85kg',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'Han väger godis',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Fast det går ju inte att räkna ut...',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Han väger frukt och grönt',
        correctAnswer: true
      }
    ],
    textEnding:
      'Dags att dela upp er igen om ni ska hinna med! Blå ryggsäck ni kan fortsätta mot Von Asklund, hon hänger vid det där museet som alltid ska vara så in time. Gul ryggsäck kan ju kolla hur det går för Hilda, hon är ju vid hennes café, spring dit!. ',
    clue: '',
    nextPlace: ''
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    character: 'vonAsklund',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FvonAsklund.png?alt=media&token=e31020af-c174-4382-82ff-38cb3b3ab80f',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P6-1.png?alt=media&token=299985df-abee-43fa-a99b-11aa0afd6d05',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P6-2.png?alt=media&token=c3899492-c387-4178-88f8-7418bde1d0e0',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P6-ratt.png?alt=media&token=86e8d95f-f364-4cb7-9014-95f2cc72bc16',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P6-fel.png?alt=media&token=7cdda5ca-3842-4fea-9f72-b6c302da17ba',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P6-muta.png?alt=media&token=769bdcf2-9d4b-432f-a86a-415f0e73d577',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P6-ledtrad.png?alt=media&token=7c155d5a-808e-42f6-8c84-cd6ef186ff34',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P6-next.png?alt=media&token=d11a2078-8e18-400a-a3b3-70ba11ef5e80',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: '120 miljoner',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'Ovärdelig',
        correctAnswer: true
      },
      {
        optionId: 2,
        text: 'Man får inte köpa den',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: '2 miljarder',
        correctAnswer: false
      }
    ],
    textEnding:
      'Har ni haft någon kontakt med Detektiven på länge? Kanske dags att prata med honom? Han hänger med sina kollegor, poliserna alltså.',
    clue: 'tygbit',
    nextPlace: ''
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    character: 'august',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Faugust_profil.png?alt=media&token=b79d6a24-adf7-4391-8294-3836a88e39a4',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P7-1.png?alt=media&token=96313990-ebbd-499b-8457-08b87d6fcf20',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P7-2.png?alt=media&token=150d5099-6b95-4604-a802-f4ba12c1e155',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P7-ratt.png?alt=media&token=5147656e-b54e-4bb6-860e-a601cc69bf28',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P7-fek.png?alt=media&token=133957c6-5d59-4a79-91f3-70c74d6735d5',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P7-muta.png?alt=media&token=64da4ffc-0d38-4317-924d-6b8022622bc2',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P7-ledtrad.png?alt=media&token=38765834-6bfe-4352-8be8-f73e9d545f0e',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P7-next.png?alt=media&token=1500ab04-d2ef-4f32-a272-a3054234b971',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'Arthur Conan Doyle',
        correctAnswer: true
      },
      {
        optionId: 1,
        text: 'Charles Dickens',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Herman Melville',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Stephen King',
        correctAnswer: true
      }
    ],
    textEnding:
      'Roland är speciell, han har en tendens att vara lite av en klyptoman kan man säga. Jag hade kollat med honom, han är nog och sover under bron där nere vid stadshuset.',
    clue: '',
    nextPlace: ''
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    character: 'roland',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Froland.png?alt=media&token=c235a4f6-7f69-4bed-9132-a7fad6a9cf5e',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P8-1.png?alt=media&token=dd42edca-ee44-4ee9-909a-273225921691',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P8-2.png?alt=media&token=58079054-034c-48f0-8eee-2ee819c9df2f',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P8-ratt.png?alt=media&token=0068f8a6-a210-4ae7-959e-b7e55b2f6fc7',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P8-fel.png?alt=media&token=59f253c9-e5b7-4492-8b7e-2ff166baf130',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P8-muta.png?alt=media&token=f1f6e302-7f8c-4e60-aea6-86056eaa667b',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P8-ledtrad.png?alt=media&token=26b5f607-4c56-43f1-af80-d3b48b7269ef',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL1P8-next.png?alt=media&token=a826a705-6c76-42b7-8d5f-440922924e10',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'En chomp',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'Ett kluster',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'En clowder',
        correctAnswer: true
      },
      {
        optionId: 3,
        text: 'En kategori',
        correctAnswer: false
      }
    ],
    textEnding:
      'Prästen, han borde ni kolla till, kanske dags att snabba sig lite nu mot kyrkan han jobbar på innan det blir mörkt, något namn på J var det innan och sen kyrka... Era vänner ska också dit!',
    clue: 'skallande',
    nextPlace: ''
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    character: 'prast',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fprast.png?alt=media&token=93848911-b6ed-4c2d-9c2d-52b5615f6198',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-1.png?alt=media&token=e67f85f4-2e39-4824-9b35-a87460e7e544',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-2.png?alt=media&token=d0b464f3-44cb-41cf-8ebd-ac315bac2c36',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-ratt.png?alt=media&token=8fc94ede-3052-4af6-9f63-44543bb3209a',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-fel.png?alt=media&token=3c958247-539a-49aa-9d61-50539f712ebe',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-muta.png?alt=media&token=cfc0fe2a-af4e-4e0f-9c59-77b937fe57a2',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-ledtrad.png?alt=media&token=7d833c29-31e7-4870-8cc5-20238d50facc',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-next.png?alt=media&token=fe2e75c3-396b-4ae8-8285-a14e7a5c4168',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'En av dem ångrade sig',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'Ett äpple var kvar på baksidan av trädet',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Dottern når inte äpplena',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Prästens dotter är klockarens fru',
        correctAnswer: true
      }
    ],
    textEnding:
      'Jag hoppas ni nu listat ut vem det är som har stulit kringlan, för nu har ni besökt alla som kan tyckas veta något i staden!',
    clue: 'moped',
    nextPlace: ''
  }
]

// Backpack 2
const storyLine2 = [
  {
    // questionId: 0,
    character: 'anita',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fanita.png?alt=media&token=165e8055-dfc6-465b-84f7-381105097e33',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-1.png?alt=media&token=6ece55fd-2b7d-4590-8cec-51d59d2eef39',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-2.png?alt=media&token=55fea3ad-e77b-4aa8-8ed0-e81ab77cc5dc',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-ratt.png?alt=media&token=41b0f3ae-802f-4bd2-b221-6b1b9bd98233',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-fel.png?alt=media&token=b27a1fbf-e46b-455c-9e83-5dc16bbe1b61',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-muta.png?alt=media&token=71811ea3-2158-471d-89c6-80645b2afa7a',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-ledtrad.png?alt=media&token=13c6217c-9b5b-4d9e-b7fe-9fc674cb2275',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-next.png?alt=media&token=8cf46a3a-ef28-4dd3-a35c-71f212ece124',
    speakingImg4:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P1-4.png?alt=media&token=4f731261-1f5e-4202-b9da-4cd4da57518c',
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
    textEnding:
      'Nu måste ni dela upp er om ni ska hinna! Blå ryggsäck, ni borde springa och hälsa på fiskaren vid en båt, den var någon färg men kommer inte ihåg vilken. Gul ryggsäck ni borde träffa på Clemens, han hänger vid sin restaurang!',
    clue: 'flipflop',
    nextPlace: ''
  },
  {
    // questionId: 0,
    character: 'clemens',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fclemens.png?alt=media&token=31a1e439-941b-4e64-a44f-ef9485d78364',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P2-1.png?alt=media&token=5476f1bb-dd54-4f66-a4ee-e49870faad16',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P2-2.png?alt=media&token=45d08637-5a22-4474-a55d-7899c0931e9f',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P2-ratt.png?alt=media&token=0af82c87-c2ad-416a-b971-e9e9b648ffd9',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P2-fel.png?alt=media&token=fa32e2dc-9463-4d31-867d-a82d5783b2aa',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P2-muta.png?alt=media&token=f4ed04da-a261-43ba-8d2d-d264c9b6f961',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P2-ledtrad.png?alt=media&token=b6aed7ad-1301-4aa2-bb1f-97a5335e62d9',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P2-next.png?alt=media&token=bc1fa572-30b5-4f08-8da7-eed6d2efe9eb',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'Korv',
        correctAnswer: true
      },
      {
        optionId: 1,
        text: 'Köttbullar',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Stek',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Fiskpinnar',
        correctAnswer: false
      }
    ],
    textEnding:
      'Lunka vidare nu till en galning, kanske mot Carl-Wilhelm. Han är nog och spelar bort alla sina pengar som vanligt!',
    clue: 'skugga',
    nextPlace: ''
  },
  {
    // questionId: 0,
    character: 'spelaren',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fcasino.png?alt=media&token=028d7d26-e165-4df4-a2f0-14230b4dcd56',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P3-1.png?alt=media&token=40e9489a-4ee4-4fbb-9899-2c3b9637438d',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P3-2.png?alt=media&token=6cda8e4a-6f35-498c-b094-6f0aa1637fda',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P3-ratt.png?alt=media&token=6d5c8a81-ad1b-4a2b-8ab5-a6618fdb74d6',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P3-fel.png?alt=media&token=68c90f4c-5129-41fe-8a2d-839003f6b007',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P3-muta.png?alt=media&token=f499466b-2290-4527-99cd-8e0aea26024c',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P3-ledtrad.png?alt=media&token=b592d2e0-0dd2-4e3a-b9a1-3178c302456a',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P3-next.png?alt=media&token=f87c051e-57ce-48b8-90a9-d821df9fb4da',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'USA',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'Japan',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Kina',
        correctAnswer: true
      },
      {
        optionId: 3,
        text: 'Italien',
        correctAnswer: false
      }
    ],
    textEnding:
      'Gå och kolla med Charlie och hans tjej, han brukar veta en del! De brukar ha picknick i parken här omkring, nästan vid den där restaurangen Mat & Vin.',
    clue: 'skyffel',
    nextPlace: ''
  },
  {
    // questionId: 0,
    character: 'charlieFreja',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FcharlieFreja.png?alt=media&token=e48b6c9c-e126-4bfc-944e-4fe4cd4e8733',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P4-1.png?alt=media&token=22ea4027-1ef7-40a8-9ca5-a889c4747bda',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P4-2.png?alt=media&token=afbe8945-48f2-4c74-b6fb-e1e2f589e2ac',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P4-ratt.png?alt=media&token=bdfb42c4-2ae5-4d54-8732-cc6d67df3710',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P4-fel.png?alt=media&token=d4a57d78-4f68-4754-b242-a144c4032d2d',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P4-muta.png?alt=media&token=ab42426b-22ca-4916-934f-d33d33f25ff7',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P4-ledtrad.png?alt=media&token=3482ddeb-5955-4ff2-9a20-7cb26f7783ea',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P4-next.png?alt=media&token=68c699cb-1ed8-4185-b339-6c1caaefd550',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'Sand',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'Tuggummi',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Frukt',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Hemlighet',
        correctAnswer: true
      }
    ],
    textEnding:
      'Alltså Torgaren kan nog veta en del, vet att era kompisar också är påväg dit alltså mot Gustav, så då kan ni diskutera vad ni hört av andra. Så komigen!',
    clue: 'rotthar',
    nextPlace: ''
  },
  {
    character: 'torgare',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Ftorparen.png?alt=media&token=40b6c9ed-9787-49c9-8e0a-905e8df1b73c',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-1.png?alt=media&token=c5a3e276-c057-4576-b7f6-dadd2211a0ef',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-2.png?alt=media&token=08d4ced8-22c6-4d59-9204-7a02c739f8a3',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-ratt.png?alt=media&token=5f5d721a-f066-4383-9b77-d6710cd41228',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-fel.png?alt=media&token=361bb80b-129b-4d0f-b0b8-92049afbf3d1',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-muta.png?alt=media&token=127ad2cb-fee3-4d0e-a628-5011cea4abf1',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-ledtrad.png?alt=media&token=795b3a6d-6e0f-475b-8b6c-1bc09087d6aa',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P5-next.png?alt=media&token=e454f2cc-38fd-403b-bef4-06e124779a36',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'Han väger 85kg',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'Han väger godis',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Fast det går ju inte att räkna ut...',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Han väger frukt och grönt',
        correctAnswer: true
      }
    ],
    textEnding:
      'Dags att dela upp er igen om ni ska hinna med! Blå ryggsäck ni kan fortsätta mot Von Asklund, hon hänger vid det där museet som alltid ska vara så in time. Gul ryggsäck kan ju kolla hur det går för Hilda, hon är ju vid hennes café, spring dit!. ',
    clue: '',
    nextPlace: ''
  },
  {
    // questionId: 0,
    character: 'hilda',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fhilda.png?alt=media&token=96f2a597-c983-452d-af70-fe29bac95904',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P6-1.png?alt=media&token=a7fab5d8-bcf2-4cfa-9d9f-fd3a40658ed9',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P6-2.png?alt=media&token=a9777074-5791-41ae-a120-cd6147074f06',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P6-ratt.png?alt=media&token=18969137-8ac6-40ce-aa09-fdfd355ceaa7',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P6-fel.png?alt=media&token=8ea728b4-b4d9-4065-b75e-32bd3646ec8f',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P6-muta.png?alt=media&token=2d24aced-96be-4e7b-851a-ea2fb0413ae0',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P6-ledtrad.png?alt=media&token=97f90405-7e66-4191-a98a-a774af1fec58',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P6-next.png?alt=media&token=3ee1adec-a73a-4a9e-9190-11936184e9d7',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: '51',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: '0, dem bakar inga bullar, dem gör ju rulltårtor',
        correctAnswer: true
      },
      {
        optionId: 2,
        text: '33',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: '60',
        correctAnswer: false
      }
    ],
    textEnding:
      'Ni får nog kolla med Barbro Bibliotikarien här i staden, hon är ju såklart vid stadens bibliotek så dit får du gå!',
    clue: '',
    nextPlace: ''
  },
  {
    // questionId: 0,
    character: 'biblotikarien',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fbarbro.png?alt=media&token=e74c5261-4893-409e-aa37-27d93e9a0529',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P7-1.png?alt=media&token=198e2a4f-f48c-4f39-a12b-92bc8070a1aa',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P7-2.png?alt=media&token=bfc68feb-5389-481f-9f81-28b65c03f2bd',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P7-ratt.png?alt=media&token=a0959a8e-f999-4e29-adb4-f19af09e1474',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P7-fel.png?alt=media&token=81111fad-0c97-485c-aa20-c5897f40472a',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P7-muta.png?alt=media&token=e528faa2-28eb-41cf-bef9-7abf1f1a61f2',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P7-ledtrad.png?alt=media&token=0636d5a0-e886-4573-bbd4-2c481b0b6636',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P7-next.png?alt=media&token=88c45f93-dc72-46e0-8ee6-83e116bba31a',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'Efter examen',
        correctAnswer: true
      },
      {
        optionId: 1,
        text: 'Mellan lektion ett och två',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Eleverna är alltid på ett högre plan än lärarna',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'När de är på våningen ovanför',
        correctAnswer: true
      }
    ],
    textEnding:
      'Spring till Olga, hon kanske vet! Hon är stadens bästa operasångare och är såklart på platsen man gör det, sjunger opera alltså.',
    clue: 'familjetrad',
    nextPlace: ''
  },
  {
    // questionId: 0,
    character: 'operasangerskan',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fopera.png?alt=media&token=840d807c-ed23-49d1-b883-3119e1aed4d4',

    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P8-1.png?alt=media&token=692702ec-15fa-48e0-9df0-7492542b0530',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P8-2.png?alt=media&token=7fcd1d29-a8a5-405a-a2c8-179dc5c80d61',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P8-ratt.png?alt=media&token=a513b320-6a10-41f1-ba8b-0059dcd0cf0e',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P8-fel.png?alt=media&token=4140f722-a411-4951-875b-f38fcfe923db',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P8-muta.png?alt=media&token=23b959e7-7237-4938-9de8-7bf9c352331b',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P8-ledtrad.png?alt=media&token=2df18b28-dbd0-4aaa-bf51-7a8afeb42bc2',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL2P8-next.png?alt=media&token=d95da5dc-644c-428c-acf6-e775f257307b',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'Andan',
        correctAnswer: true
      },
      {
        optionId: 1,
        text: 'Luft',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Bomull',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Fisen',
        correctAnswer: false
      }
    ],
    textEnding:
      'Prästen, han borde ni kolla till, kanske dags att snabba sig dit. Till den där kyrkan han jobbar på, något namn på J var det innan och sen kyrka... Möt era vänner där också!',
    clue: 'glitter',
    nextPlace: ''
  },
  {
    // questionId: 0, // ??? BEHÖVS?
    character: 'prast',
    characterImg:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2Fprast.png?alt=media&token=93848911-b6ed-4c2d-9c2d-52b5615f6198',
    speakingImg1:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-1.png?alt=media&token=e67f85f4-2e39-4824-9b35-a87460e7e544',
    speakingImg2:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-2.png?alt=media&token=d0b464f3-44cb-41cf-8ebd-ac315bac2c36',
    speakingImgRight:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-ratt.png?alt=media&token=8fc94ede-3052-4af6-9f63-44543bb3209a',
    speakingImgWrong:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-fel.png?alt=media&token=3c958247-539a-49aa-9d61-50539f712ebe',
    speakingImgBribe:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-muta.png?alt=media&token=cfc0fe2a-af4e-4e0f-9c59-77b937fe57a2',
    speakingImgClue:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-ledtrad.png?alt=media&token=7d833c29-31e7-4870-8cc5-20238d50facc',
    speakingImgNext:
      'https://firebasestorage.googleapis.com/v0/b/gyllende-kringlan.appspot.com/o/Images%2FPratbubblor%2FL12P9-next.png?alt=media&token=fe2e75c3-396b-4ae8-8285-a14e7a5c4168',
    // speakingImg4: '',
    options: [
      {
        optionId: 0,
        text: 'En av dem ångrade sig',
        correctAnswer: false
      },
      {
        optionId: 1,
        text: 'Ett äpple var kvar på baksidan av trädet',
        correctAnswer: false
      },
      {
        optionId: 2,
        text: 'Dottern når inte äpplena',
        correctAnswer: false
      },
      {
        optionId: 3,
        text: 'Prästens dotter är klockarens fru',
        correctAnswer: true
      }
    ],
    textEnding:
      'Jag hoppas ni nu listat ut vem det är som har stulit kringlan, för nu har ni besökt alla som kan tyckas veta något i staden!',
    clue: 'moped',
    nextPlace: ''
  }
]

// !! SKA LIGGA LÄNGST NER !!
export const storylines = { storyLine1, storyLine2 }
