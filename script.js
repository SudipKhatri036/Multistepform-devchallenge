"use strict";

const nameInput = document.querySelector("#user-name");
const emailInput = document.querySelector("#user-email");
const nameSpan = document.querySelector(".name-span");
const emailSpan = document.querySelector(".email-span");
const firstStep = document.querySelector(".first-content");
const secondStep = document.querySelector(".second-content");
const thirdStep = document.querySelector(".third-content");
const errorMsg = document.querySelectorAll(".error-msg");
const roundLight = document.querySelectorAll(".roundlight");
const checkBoxLb = document.querySelectorAll(".topics");
const successMsg = document.querySelector(".success-msg");

const contBtn = document.querySelector(".btn-cont");

// ---------- Helper Function ----------
const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return emailRegex.test(String(email).toLowerCase());
};
const validateName = (name) => {
  const nameRegex = /^[a-zA-Z ]{2,30}$/;
  return nameRegex.test(name);
};
function getCheckedValue() {
  const checkBoxes = document.getElementsByName("check-box");

  for (let i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      userTopics.push(checkBoxes[i].value);
    }
  }
}
// _____
let steps = 0;
let userTopics = [];
contBtn.addEventListener("click", function () {
  const userName = nameInput.value;
  const userEmail = emailInput.value;
  if (firstStep.classList.contains("content-active")) {
    if (validateName(userName) && validateEmail(userEmail)) {
      // Removing all active classes from previous element
      roundLight.forEach((light) => light.classList.remove("active"));
      document;
      errorMsg.forEach((msg) => msg.classList.remove("errormsg-active"));
      document
        .querySelectorAll(".first-content input")
        .forEach((msg) => msg.classList.remove("error"));
      // Hiding FirstStep form
      firstStep.classList.remove("content-active");
      //   Showing SecondStep form and glowing 2nd step light
      secondStep.classList.add("content-active");
      roundLight[1].classList.add("active");
    } else {
      // Showing Error to user
      errorMsg.forEach((msg) => msg.classList.add("errormsg-active"));
      document
        .querySelectorAll(".first-content input")
        .forEach((msg) => msg.classList.add("error"));
    }
  }

  if (secondStep.classList.contains("content-active")) {
    steps++;
    checkBoxLb.forEach((topic) => topic.classList.remove("checked"));

    checkBoxLb.forEach((topic) => {
      topic.addEventListener("change", () => {
        topic.classList.toggle("checked");
      });
    });

    getCheckedValue();

    if (userTopics.length === 0) return;
    contBtn.textContent = "confirm";
    secondStep.classList.remove("content-active");

    thirdStep.classList.add("content-active");
    roundLight[2].classList.add("active");
    roundLight[1].classList.remove("active");
    //   2. Add user selected topic to an array
  }

  if (thirdStep.classList.contains("content-active")) {
    steps++;
    nameSpan.textContent = userName;
    emailSpan.textContent = userEmail;
    showsSummary();

    if (steps === 4) {
      thirdStep.classList.remove("content-active");
      successMsg.classList.add("content-active");
      contBtn.style.display = "none";

      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  }
});

function showsSummary() {
  const liHTML = userTopics.map(
    (topic) => `<li class="highlight" />${topic}</li>`
  );

  liHTML.forEach((li) => {
    document
      .querySelector(".topic-list ul")
      .insertAdjacentHTML("afterbegin", li);
  });
}

// function reset() {
//   steps = 0;
//   contBtn.textContent = "continue";
//   thirdStep.classList.remove("content-active");
//   firstStep.classList.add("content-active");
//   roundLight[0].classList.add("active");
//   roundLight[2].classList.remove("active");
//   nameInput.value = "";
//   emailInput.value = "";
//   userTopics = [];
//   checkBoxLb.forEach((topic) => topic.classList.remove("checked"));
//   document.querySelector(".topic-list ul").innerHTML = "";
//   nameSpan.textContent = "";
//   emailSpan.textContent = "";
// }
