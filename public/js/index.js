$(".menu li a, .cta-button").on("click", function (e) {
  if (this.hash !== "") {
    e.preventDefault();
    const hash = this.hash;
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top,
      },
      1000
    );
  }
});

$(document).ready(function () {
  //Check to see if the window is top if not then display button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".scrollToTop").fadeIn();
    } else {
      $(".scrollToTop").fadeOut();
    }
  });

  //Click event to scroll to top
  $(".scrollToTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});

let copyText = document.querySelector(".copy-text");
copyText.querySelector("button").addEventListener("click", () => {
  let input = copyText.querySelector("input.text");
  input.select();
  document.execCommand("copy");
  copyText.classList.add("active");
  window.getSelection().removeAllRanges();
  setTimeout(() => {
    copyText.classList.remove("active");
  }, 2500);
});

const hamburger = document.querySelector("#menu-button");
const menu = document.querySelector(".menu");
const close_button = document.querySelector("#close");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});
close_button.addEventListener("click", () => {
  menu.classList.toggle("active");
});

let email = document.getElementById('email')
let subscribe = document.getElementById('subscribe')
let cta = document.getElementById("cta")
let success = document.getElementById("success")
let error = document.getElementById("error")

cta.addEventListener("click", (e) => {
  e.preventDefault();
  if (this.email.value == "" || this.email.value == null) {
    error.classList.add("errorAnim")
  } else {
    let fetchData = {
      method: "POST",
      body: JSON.stringify({
        email: this.email.value,
        js: true
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
    fetch("/subscribe", fetchData)
      .then((response) => {
        if (response.status == 200) {
          subscribe.classList.add('fadeout')
          setTimeout(() => {
            success.classList.add('fadein')
            subscribe.style.display = "none"
          }, 300);
        } else {
          error.style.display = "block"
        }
      })
  }
})

AOS.init({
  offset: 200,
  duration: 1000,
});
