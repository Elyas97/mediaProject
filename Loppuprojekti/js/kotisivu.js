"use strict";

const button = document.getElementById("generate_joke");
button.addEventListener("click", generateJoke)

// Funktio generoi vitsin ja tulostaa sen diviin.
function generateJoke() {
    const request = new XMLHttpRequest();

    request.open('GET', 'https://api.icndb.com/jokes/random');
    request.send();

    request.onload = () => {
        if (request.status === 200) {
            //console.log("Success"); 

            //Extracting data
            let joke = JSON.parse(request.response).value.joke;
            //console.log(joke);

            //Showing the joke in the table
            document.getElementById("joke").innerHTML = joke;
        }
    };

    request.onerror = () => {
        console.log("ERROR");
        document.getElementById("joke").innerHTML = "ERROR!<br>Check the console.";
    }
}