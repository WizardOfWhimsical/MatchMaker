/*
Pages targeting 
*/
let $firstPage = $("#firstIndexPage");//hide/show targeting
let $profilePage = $("#createProfilePage");//hide/show targeting
let $exit = $(".exit-title");//hide/show targeting
let $logInBox = $(".logInBox");//hide/show targeting
/*
Button targeting
*/
let $surlink = $(".surlink"); //e.handlefor local storage
let $back = $(".back");//e.handler for going back
let $mislead = $(".mislead"); //e.listener for profile activation
let $profileVerification = $("img");//e.handle for img targeting

let personProfile = {};

// $firstPage.hide()
$profilePage.hide();
$exit.hide();
$logInBox.hide();

$mislead.on("click", () => {
  $profilePage.show();
  $firstPage.hide();
  $logInBox.hide();
});
$(".home").on("click", () => {
  $firstPage.show();
  $profilePage.hide();
  $exit.hide();
  $logInBox.hide();
  $(".pickedProfile").remove();
  delete personProfile.name;
  delete personProfile.photo;
});

$profileVerification.on("click", (e) => {
  //shows your picks to move forward, with creation of object
  const $name = $("#name").val();
  const $photo = e.target.src;
  if (!$name.match(/\w/)) {
        $("#name").val("")
        $("#name").attr("placeholder", "Needs Name Please")
      } else {
  personProfile["name"] = $name;
  personProfile["photo"] = $photo;
  $exit.show();
  $firstPage.hide()
  $profilePage.hide();
  $logInBox.hide();
  $("footer")
    .before(`
    <div class="row pickedProfile">
    <h2 class="col-3 offset-3 text-center">${personProfile.name}</h2>
    <img class="col-3" src=${personProfile.photo}>
    </div>
    `)
    .removeClass(".img");
      }
});

$surlink.on("click", () => {
  //continues to survey and save current object
  localStorage.setItem("profile", JSON.stringify(personProfile));
});

$back.on("click", () => {
  $profilePage.show();
  $firstPage.hide();
  $exit.hide();
  $logInBox.hide();
  $(".pickedProfile").remove();
  delete personProfile.name;
  delete personProfile.photo;
});