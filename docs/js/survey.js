// fetch("/count")
//   .then((r) => r.text())
//   .then((r) => {
//     $(".friendsCount").append(`<p>We have ${r} online</p>`);
//   });

  /*SIMPLE VARIBLES*/
let personProfile = {}; //to store and manipulate
let i = 0;
let numValue = null;

/*PAGES CONTROL*/
let $intro = $(".surveyIntro"); //to hide/show
let $survey = $(".survey"); //to hide/show
let $verify = $(".verifySurvey"); //to hide/show
let $match = $(".matchingUp"); //to hide/show
let $thxU = $(".tryThis");//to hide/show
let $pickPlease = $(".pickPlease"); //to hide/show error for not picking number

/*E.HANDLERS*/
let $takeTest = $(".toSurvey"); //click handler
let $ok = $("#ok"); //click handler for lil box
let $retake = $(".retake"); //click for retake
let $continue = $(".continueToMatch"); //click final step
let $finish = $(".finish"); //click event to go back and save profile(writeFile)
let $addProfile = $(".addProfile"); //event for writeFile on server
let $surveyHome = $("#dangerousSurvey");//e.handle for nav item to go home

let $button = $(".buttonController"); //get buttons value
let $next = $(".next"); //set next question button
let $placement = $(".questionsAsked"); //plave where i want questions to goto

let surveyQuestions = [
  "You like to be outside in the forrest?",
  "You are more acive than docile?",
  "You like going to the movies?",
  "You a enjoy the restaurant?",
  "You are photogenic?",
  "You are a boat person who enjoys water?",
  "You do like animals?",
  "You do enjoy a quiet library?",
  "The bar make more sence to you?",
  "You and your friends all enjoy 4:20pm?",
];

/* intial hides for page load */
$survey.hide(); //second page
$verify.hide(); //third page
$match.hide(); //forth page
$thxU.hide();//fifth page
$pickPlease.hide(); //mini box

/*
hides into to survey via "continue to survey" prompt on intro page
should also start questions and button set up
*/

$takeTest.on("click", () => {
  let save = localStorage.getItem("profile");
  personProfile = JSON.parse(save);
  personProfile["scores"]=[];
  $intro.hide(); //first page
  $survey.show(); //second page
  $placement.append(`<p class="thisOne">${surveyQuestions[i]}</p>`);
});

$button.on("click", (e) => {
  numValue = e.target.value;
  activeState(numValue);
}); //end button

$next.on("click", () => {
  personProfile.scores.push(parseInt(numValue));
  let lastValue = personProfile.scores[personProfile.scores.length - 1]; //has to be declared after push
  $("button").removeClass("active");
  if (isNaN(lastValue)) {
    personProfile.scores.pop();
  }
  if (numValue === null) {
    $pickPlease.show();
    $survey.hide();
  } else {
    i++;
    $("p.thisOne").remove();
    $placement.append(`<p class="thisOne">${surveyQuestions[i]}</p>`);
    if (i === 10) {
      $verify.show();
      $survey.hide();
      questionAndAnswers();
    } else {
      numValue = null;
    }
  }
}); //end next

$ok.on("click", () => {
  //show pick please box
  $survey.show();
  $pickPlease.hide();
});

$retake.on("click", () => {
  switchingActiveToSurvey();
  $verify.hide();
  $survey.show();
  $("ul").remove();
  $("p.thisOne").remove();
  $match.hide();
  $(".funkyPrint").remove();
  i = 0;
  numValue = null;
  personProfile.scores = [];
  $placement.append(`<p class="thisOne">${surveyQuestions[i]}</p>`);
});

$continue.on("click", () => {
  //this shows matches info page
  switchingActiveToMatches();
  $verify.hide();
  $match.show();

  fetch("/compareProfile", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(personProfile),
  })
    .then((answers) => answers.json())
    .then((ans) => {
      let it = ans;
      heresYourMatch(it);
    });
});

/*so no we are on add and finish */
$addProfile.on("click", () => {
  fetch("/addProfile", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(personProfile),
  })
    .then((r) => r.json()) /*will need to fill with a success thing*/
    .then((r) => {
      $match.hide()
      $thxU.show();
      thankYouForYourSupport(r);
    });
}); //end of click

$finish.on("click", () => {
  window.location = "index.html";

});

/* nav items click events */
$surveyHome.on("click", () => {
  personProfile.scores = []
  $("ul").remove();
  $intro.show();//home page for survey
  $survey.hide(); //second page
  $verify.hide(); //third page
  $match.hide(); //forth page
  $thxU.hide();//fifth page
  $pickPlease.hide(); //mini box
})