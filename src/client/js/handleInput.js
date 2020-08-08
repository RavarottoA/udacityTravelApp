let intervalCountdown; 

function handleInput(event) {
    event.preventDefault();
    const baseURL = "http://localhost:8081/traerDatos";
    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    const whenText = document.getElementById('when').value;
    
    if (formText && whenText) {
        const query = baseURL + "?name=" + formText + "&when=" + whenText;
        console.log(query);
        fetch(query)
        .then(res => res.json())
        .then(function(res) {
            document.getElementById('results').innerHTML = "Place: " + formText;
            if (res.APIPic) {
                const picDiv = document.getElementById("toShowPic");
                picDiv.innerHTML = `<img id="pictures" src="${res.APIPic}" alt="Image of your destination"></img>`
            } 
            if (res.highTemp && res.lowTemp && res.precip) {
                console.log(res.highTemp, res.lowTemp, res.precip);
                document.getElementById("forecast").innerHTML = "Forecast: <br/>High Temp: " + res.highTemp + "<br/>"
                                                                        + "Low Temp: " + res.lowTemp + "<br/>"
                                                                        + "Precipitation: " + res.precip;
            } else {
                document.getElementById("forecast").innerHTML = "<p>Forecast available if departure day is within the next 16 days from today</p>";
            }
            
        })
        .catch (function (error){
            console.log(error);
        })

    } else {
        alert('The input "Place" is not valid');
    }
    
    if (whenText) {
        let countDownDate = new Date(whenText).getTime();
        if (intervalCountdown) {
            clearInterval(intervalCountdown);
        }
        intervalCountdown = setInterval(function() {
            let now = new Date().getTime();
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="departure"
            document.getElementById("departure").innerHTML = "Time left to departure: " + days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
            if (distance < 0) {
                clearInterval(intervalCountdown);
                document.getElementById("departure").innerHTML = "Time left to departure: No time left";
            }
        }, 1000);
    } else {
        alert('The input "When?" is not valid');
    }
}

export {handleInput}