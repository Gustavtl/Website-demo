function onSubmit(token) {
}

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(element, tabname){
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    element.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px"
}


// -------------------kontakt skjema innsending------------------------


const scriptURL = 'https://script.google.com/macros/s/AKfycbwAsnWVea4YT1-qfDePz_jDmHbXiwRBFrWU3L-du_gtgwAR6KdYMqj5c2uE_cNnplI0/exec';
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', function(e) {
  e.preventDefault();  // Hindrer standard innsending

  // Sjekk at reCAPTCHA er krysset av (g-recaptcha-response finnes og er ikke tom)
  const recaptchaResponse = form.querySelector('textarea[name="g-recaptcha-response"]') || form.querySelector('input[name="g-recaptcha-response"]');
  if (!recaptchaResponse || recaptchaResponse.value === '') {
    alert('Vennligst bekreft at du ikke er en robot.');
    return;
  }

  // Send skjemaet til Apps Script
  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form)
  })
  .then(response => response.text())
  .then(data => {
    if(data === 'OK') {
      alert('Takk! Meldingen din er sendt.');
      form.reset();
      grecaptcha.reset(); // Reset reCAPTCHA etter innsending
    } else {
      alert('Noe gikk galt: ' + data);
    }
  })
  .catch(error => {
    alert('Noe gikk galt. Prøv igjen.');
    console.error('Feil:', error);
  });
});
