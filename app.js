const apiKey = "21bb028ecff2f13f18c4fe24fc488e6a";

var city = document.getElementById("city");
var datum = document.getElementById("datum");
var temperatura = document.getElementById("temp");
var icon = document.getElementById("icon");
var feel = document.getElementById("feel-like");
var humidity = document.getElementById("humidity");
var windspeed = document.getElementById("windspeed");
var pressure = document.getElementById("pressure");

document.getElementById("search").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    currentWeather(search.value);
  }
});

function currentWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      city.innerText = `${data.name}`;
      let now = new Date();
      datum.innerText = poveziDatum(now);
      temperatura.innerHTML = `${Math.round(data.main.temp)} <span>°C</span>`;
      icon.src = `http://openweathermap.org/img/w/${data.weather[0]["icon"]}.png`;
      feel.innerHTML = `Feels like: ${Math.round(
        data.main.feels_like
      )}<span>°C</span>`;
      humidity.innerText = `Humidity: ${data.main.humidity} %`;
      windspeed.innerText = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      pressure.innerText = `Pressure: ${data.main.pressure} hPa`;
    });
  document.getElementById("main").style.visibility = "visible";
}

function poveziDatum(d) {
  let dani = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let meseci = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dan = dani[d.getDay()];
  let datum = d.getDate();
  let mesec = meseci[d.getMonth()];
  let god = d.getFullYear();
  return `${dan} ${datum} ${mesec} ${god}`;
}
//--------------reg,log, localstorage---------------------

var korisnik = {};
var korisnici = [];
var trenutnoUlogovanKOr = {};
var ulogovan_korisnik = JSON.parse(localStorage.getItem("ulogovanKOR"));
var registrujSe = document.getElementById("reg");
var ulogujSe = document.getElementById("log");
var izlogujSe = document.getElementById("logout");

//ako imamo ulogovnog korisnika reg i log dugmad sakrivamo a izloguj se otkrivamo
if (ulogovan_korisnik != null) {
  if (ulogovan_korisnik.korIme != null) {
    registruj.setAttribute("class", "obrisi");
    ulogujSe.setAttribute("class", "obrisi");
    izlogujSe.setAttribute("class", "foot");
  }
}

izlogujSe.addEventListener("click", function () {
  var prazan = {};
  localStorage.setItem("ulogovanKOR", prazan);
  window.location.reload();
});

registrujSe.addEventListener("click", function () {
  var formaReg = document.getElementById("regis");
  if (formaReg.getAttribute("class") == "obrisi") {
    formaReg.setAttribute("class", "prikazi");
  } else if (formaReg.getAttribute("class") == "prikazi") {
    formaReg.setAttribute("class", "obrisi");
  }

  formaReg.onsubmit = function () {
    var greska = document.getElementById("greska");

    var korIme = document.getElementById("usname").value.trim();
    if (korIme == "") {
      greska.textContent = "You have not entered a username!";
      return false;
    }

    var k = dohvati();
    if (k != null) {
      for (var i = 0; i < k.length; i++) {
        if (k[i].korIme == korIme) {
          greska.textContent = "Username is already taken, please try again!";
          return false;
        }
      }
    }

    var email = document.getElementById("mail").value.trim();
    if (email == "") {
      greska.textContent = "You have not entered a email!";
      return false;
    }
    // var prMail = /[a-zA-Z0-9.!+-*%&_#]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}/;
    // if (!prMail.test(email)) {
    //   greska.textContent = "You entered an invalid email";
    //   return false;
    // }

    var pass = document.getElementById("psw").value.trim();
    if (pass == "") {
      greska.textContent = "You have not entered a password!";
      return false;
    }
    if (pass.length < 8) {
      greska.textContent = "The password must be at least 8 characters long!";
      return false;
    }

    //objekat korisnik
    korisnik.korIme = korIme;
    korisnik.email = email;
    korisnik.password = pass;
    //smestanje u localS
    if (k != null) {
      k.push(korisnik);
      nizS = JSON.stringify(k);
    } else {
      korisnici.push(korisnik);
      nizS = JSON.stringify(korisnici);
    }
    localStorage.setItem("korisniciVRP", nizS);
  };
});

//dohvata korisnika iz localStorage
function dohvati() {
  var dohvati = localStorage.getItem("korisniciVRP");
  var k = JSON.parse(dohvati);
  return k;
}

function obrisiGresku(){
  greska.textContent="";
}