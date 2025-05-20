function activeState(num) {
    $("button").removeClass("active");
    switch (num) {
      case "1":
        $(".one").addClass("active");
        break;
      case "2":
        $(".two").addClass("active");
        break;
      case "3":
        $(".three").addClass("active");
        break;
      case "4":
        $(".four").addClass("active");
        break;
      case "5":
        $(".five").addClass("active");
        break;
    }
  }
  
  function questionAndAnswers() {
    $(".verifySurvey").prepend(`
  <ul class = "surveyText text-center">
  <li>${surveyQuestions[0]}    ${personProfile.scores[0]}</li>
  <li>${surveyQuestions[1]}    ${personProfile.scores[1]}</li>
  <li>${surveyQuestions[2]}    ${personProfile.scores[2]}</li>
  <li>${surveyQuestions[3]}    ${personProfile.scores[3]}</li>
  <li>${surveyQuestions[4]}    ${personProfile.scores[4]}</li>
  <li>${surveyQuestions[5]}    ${personProfile.scores[5]}</li>
  <li>${surveyQuestions[6]}    ${personProfile.scores[6]}</li>
  <li>${surveyQuestions[7]}    ${personProfile.scores[7]}</li>
  <li>${surveyQuestions[8]}    ${personProfile.scores[8]}</li>
  <li>${surveyQuestions[9]}    ${personProfile.scores[9]}</li>
  </ul>
  `);
  }
  
  function heresYourMatch(yourMatch) {
    $(".showsMatch").prepend(`<div class="funkyPrint">
  <h1 class="text-center">${yourMatch.name}</h1>
  <img class="text-center" src="${yourMatch.photo}" alt="Your Match">
  </div>`);
  }
  
  function switchingActiveToMatches() {
    $("#dangerousSurvey").removeClass("active");
    $("#combatibleMatches").addClass("active");
  }
  function switchingActiveToSurvey() {
    $("#dangerousSurvey").addClass("active");
    $("#combatibleMatches").removeClass("active");
  }
  
  function thankYouForYourSupport(valuedPerson){
  $(".thxU").prepend(`
  <h2 class="text-center px-lg-5">Thank You</h2>
  <p class="text-center">Thank you for using StangerDanger's services and hope you will continue to do so</p>
  <p>Your log-in name is ${valuedPerson.name}, you will want this for when outher members contact you. Have a nice day!</p>
  `)
  };
  