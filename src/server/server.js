
// Require Express to run server and routes
const express = require("express");
const axios = require("axios")
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Geonames
const apiURL = "http://api.geonames.org/searchJSON?name=";   
const urlRest = "&maxRows=1&username=";
const userName = "alejandror";

//weatherbit APi => Forecast (fijate bien async!!!!)
const foreCastURL = "http://api.weatherbit.io/v2.0/forecast/daily?";
const lat = "lat=";
const long = "&lon=";
const APIKey = "&key=";
const foreKey = "886fd37c4c9347bdb66e82b67d105eff";

// Pixabay API
const pixURL = "https://pixabay.com/api/?key=";
const pixKey = "17800755-dc3c4db21742e0896a432380f";
const cityNamePrefix = "&q=";
const pixURLEnd = "&image_type=photo";

let datos = {};

 app.get("/traerDatos", function (req, res){
    datos = {};
    const name = req.query.name;
    const geoURL = apiURL + name + urlRest + userName;
    axios.post(geoURL, {})
    .then(function (axiosRes){
        const result = axiosRes.data; 
        const latitude = result.geonames[0].lat; 
        const longitude = result.geonames[0].lng; 
        const country = result.geonames[0].countryName; 
        datos["APILat"] = latitude;
        datos["APILong"] = longitude;
        datos["APICountry"] = country;
        

        const when = req.query.when;
        const forecastCallURL = foreCastURL + lat + latitude + long + longitude + APIKey + foreKey;
        console.log("this is when txt: " + when);
        axios.get(forecastCallURL, {})
        .then(function (axiosRes){
            const resultado = axiosRes.data.data; 
            let forecast = dateCheck (resultado, when);
            datos["highTemp"] = forecast.highTemp;
            datos["lowTemp"] = forecast.lowTemp;
            datos["precip"] = forecast.precip;
            


        const pixabayCall = pixURL + pixKey + cityNamePrefix + name + pixURLEnd;

        axios.get(pixabayCall, {})
        .then(function (axiosRes){
            const pixResult = axiosRes.data;
            const imgURL = pixResult.hits[0].webformatURL;
            datos["APIPic"] = imgURL;
            res.json(datos);
            res.end();
        })

        
    }) 
        })
    .catch (function (error) {
        console.log(error);
        res.end();
    });
})

function dateCheck (apiRes, userDate) {
    for (let i = 0; i < apiRes.length ; i++) {
        if (apiRes[i].datetime === userDate) {
            return {
                highTemp: apiRes[i].high_temp, 
                lowTemp: apiRes[i].low_temp, 
                precip: apiRes[i].precip 
            }
        }
    }
}

// Setup Server
const port = 8081;
if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(port, function () {
        console.log("Server Running!")
        console.log(`Running on localHost: ${port}`);
    });
}



module.exports = { app }

