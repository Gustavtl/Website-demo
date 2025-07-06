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
const siteKey = '6Lfdw3ErAAAAAI9X9hyaiJJ7ERQOZAiD0yXVoDHy';
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', function(e) {
  e.preventDefault();  // Prevent default form submission

  // Ensure reCAPTCHA is ready
  grecaptcha.ready(function() {
    // Execute reCAPTCHA
    

      // Now submit the form with the token
      fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)  // Send form data (including reCAPTCHA response)
      })
      .then(response => response.text())  // Get response from Google Sheets
      .then(data => {
        if(data === 'OK') {
          alert('Takk! Meldingen din er sendt.');  // Show success message
          form.reset();  // Reset form fields
        } else {
          alert('Noe gikk galt: ' + data);  // Show error message
        }
      })
      .catch(error => {
        alert('Noe gikk galt. Prøv igjen.');
        console.error('Error!', error);  // Log the error for debugging
      });
    });
  });
});
