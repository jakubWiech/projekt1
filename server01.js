var express = require("express")
var app = express()
var path = require("path")
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const { table } = require("console");
app.use(express.static('static'))

var zalogowany = false

var tab = [
    { id: 1, log: "AAA", pass: "PASS1", wiek: 10, uczen: "checked", plec: "m" },
    { id: 2, log: "BBB", pass: "PASS2", wiek: 13, uczen: "", plec: "k" },
    { id: 3, log: "CCC", pass: "PASS3", wiek: 1, uczen: "checked", plec: "m" },
    { id: 4, log: "DDD", pass: "PASS4", wiek: 17, uczen: "checked", plec: "k" },
]
app.post("/login", function (req, res) {
    zalogowany = false;
    for (i = 0; i < tab.length; i++) {
        if (tab[i].log == req.body.login && tab[i].pass == req.body.password) {
            zalogowany = true;
        }
    }
    if (zalogowany) {
        res.redirect("/admin")
    } else {
        res.send("Podałeś błędny login lub hasło. Spróbuj ponownie.")
    }
})
app.post("/register", function (req, res) {
    if (zalogowany) {
        zalogowany = false;
    }
    if (req.body.student == "checked") {
        checked = "checked"
    } else {
        checked = "unchecked"
    }
    var userExists = false
    for (i = 0; i < tab.length; i++) {
        if (tab[i].log == req.body.login) {
            userExists = true
        }
    }
    if (userExists) {
        res.send("Taki użytkownik już istnieje")
    } else {
        if (req.body.password.length < 3) {
            res.send("Podałeś za krótkie hasło.")
        } else {
            tab.push({ id: tab.length + 1, log: req.body.login, pass: req.body.password, wiek: req.body.age, uczen: checked, plec: req.body.plec })
            res.send("<div class='title' style='font-size: 100px; color:#cccccc; font-family: Calibri;'>Witaj " + req.body.login + ", właśnie się zarejestrowałeś!</div><div style'margin: 0 auto;'><a href='login' style='text-decoration:none; color:blue;'>Kliknij aby się zalogować!</div>")
        }
    }
})
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/static/pages/main.html")
})
app.get("/main", function (req, res) {
    res.sendFile(__dirname + "/static/pages/main.html")
})
app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/static/pages/register.html")
})
app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/static/pages/login.html")
})
app.get("/admin", function (req, res) {
    if (zalogowany) {
        res.sendFile(__dirname + "/static/pages/admin2.html")
    } else {
        res.sendFile(__dirname + "/static/pages/admin1.html")
    }
})
app.get("/logout", function (req, res) {
    zalogowany = false
    res.redirect("/")
})
app.get("/show", function (req, res) {
    if (zalogowany) {
        tab.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id)
        })
        var zawartosc = ""
        zawartosc += "<head>"
        zawartosc += "<style> *{margin: 0; padding: 0;} td{padding: 10px; border: 1px solid white; color: white}</style>"
        zawartosc += "</head>"
        zawartosc += "<body>"
        zawartosc += "<div style='font-size: 20px; width: 100vw; height: 100vh; overflow: hidden; background-color: #333333; color: white;'>"
        zawartosc += "<div>"
        zawartosc += "<a href='sort' style='text-decoration: none; color: white; padding:10px;'>sort</a>"
        zawartosc += "<a href='gender' style='text-decoration: none; color: white; padding:10px;'>gender</a>"
        zawartosc += "<a href='show' style='text-decoration: none; color: white; padding:10px;'>show</a>"
        zawartosc += "</div>"
        zawartosc += "<table style='margin: 10px;; border: 1px solid white;'>"
        for (x = 0; x < tab.length; x++) {
            zawartosc += "<tr>"
            zawartosc += "<td> id: " + tab[x].id + "</td>"
            zawartosc += "<td> login: " + tab[x].log + "</td>"
            zawartosc += "<td> hasło: " + tab[x].pass + "</td>"
            zawartosc += "<td> wiek: " + tab[x].wiek + "</td>"
            zawartosc += "<td> uczeń: <input type='checkbox' disabled " + tab[x].uczen + "></td>"
            zawartosc += "<td> płeć: " + tab[x].plec + "</td>"
            zawartosc += "</tr>"
        }
        zawartosc += "</table>"
        zawartosc += "</div>"
        zawartosc += "</body>"
        res.send(zawartosc)
    } else {
        res.send("Musisz się zalogować")
    }
})
app.get("/gender", function (req, res) {
    if (zalogowany) {
        tab.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id)
        })
        var zawartosc = ""
        zawartosc += "<head>"
        zawartosc += "<style> *{margin: 0; padding: 0;} td{padding: 10px; border: 1px solid white; color: white}</style>"
        zawartosc += "</head>"
        zawartosc += "<body>"
        zawartosc += "<div style='font-size: 20px; width: 100vw; height: 100vh; overflow: hidden; background-color: #333333; color: white;'>"
        zawartosc += "<div>"
        zawartosc += "<a href='sort' style='text-decoration: none; color: white; padding:10px;'>sort</a>"
        zawartosc += "<a href='gender' style='text-decoration: none; color: white; padding:10px;'>gender</a>"
        zawartosc += "<a href='show' style='text-decoration: none; color: white; padding:10px;'>show</a>"
        zawartosc += "</div>"
        zawartosc += "<table style='margin: 10px;; border: 1px solid white;'>"
        for (x = 0; x < tab.length; x++) {
            if (tab[x].plec == "m") {
                zawartosc += "<tr>"
                zawartosc += "<td> id: " + tab[x].id + "</td>"
                zawartosc += "<td> login: " + tab[x].log + "</td>"
                zawartosc += "<td> hasło: " + tab[x].pass + "</td>"
                zawartosc += "<td> wiek: " + tab[x].wiek + "</td>"
                zawartosc += "<td> uczeń: <input type='checkbox' disabled " + tab[x].uczen + "></td>"
                zawartosc += "<td> płeć: " + tab[x].plec + "</td>"
                zawartosc += "</tr>"
            }
        }
        zawartosc += "</table>"
        zawartosc += "<br>"
        zawartosc += "<br>"
        zawartosc += "<table style='margin: 10px;; border: 1px solid white;'>"
        for (x = 0; x < tab.length; x++) {
            if (tab[x].plec == "k") {
                zawartosc += "<tr>"
                zawartosc += "<td> id: " + tab[x].id + "</td>"
                zawartosc += "<td> login: " + tab[x].log + "</td>"
                zawartosc += "<td> hasło: " + tab[x].pass + "</td>"
                zawartosc += "<td> wiek: " + tab[x].wiek + "</td>"
                zawartosc += "<td> uczeń: <input type='checkbox' disabled " + tab[x].uczen + "></td>"
                zawartosc += "<td> płeć: " + tab[x].plec + "</td>"
                zawartosc += "</tr>"
            }
        }
        zawartosc += "</table>"
        zawartosc += "</div>"
        zawartosc += "</body>"
        res.send(zawartosc)
    } else {
        res.send("Musisz się zalogować")
    }
})

app.get("/show", function (req, res) {
    if (zalogowany) {
        tab.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id)
        })
        var zawartosc = ""
        zawartosc += "<head>"
        zawartosc += "<style> *{margin: 0; padding: 0;} td{padding: 10px; border: 1px solid white; color: white}</style>"
        zawartosc += "</head>"
        zawartosc += "<body>"
        zawartosc += "<div style='font-size: 20px; width: 100vw; height: 100vh; overflow: hidden; background-color: #333333; color: white;'>"
        zawartosc += "<div>"
        zawartosc += "<a href='sort' style='text-decoration: none; color: white; padding:10px;'>sort</a>"
        zawartosc += "<a href='gender' style='text-decoration: none; color: white; padding:10px;'>gender</a>"
        zawartosc += "<a href='show' style='text-decoration: none; color: white; padding:10px;'>show</a>"
        zawartosc += "</div>"
        zawartosc += "<table style='margin: 10px;; border: 1px solid white;'>"
        for (x = 0; x < tab.length; x++) {
            zawartosc += "<tr>"
            zawartosc += "<td> id: " + tab[x].id + "</td>"
            zawartosc += "<td> login: " + tab[x].log + "</td>"
            zawartosc += "<td> hasło: " + tab[x].pass + "</td>"
            zawartosc += "<td> wiek: " + tab[x].wiek + "</td>"
            zawartosc += "<td> uczeń: <input type='checkbox' disabled " + tab[x].uczen + "></td>"
            zawartosc += "<td> płeć: " + tab[x].plec + "</td>"
            zawartosc += "</tr>"
        }
        zawartosc += "</table>"
        zawartosc += "</div>"
        zawartosc += "</body>"
        res.send(zawartosc)
    } else {
        res.send("Musisz się zalogować")
    }
})
app.all("/sort", function (req, res) {
    if (zalogowany) {
        tab.sort(function (a, b) {
            return parseFloat(a.wiek) - parseFloat(b.wiek)
        })
        var zawartosc = ""
        zawartosc += "<head>"
        zawartosc += "<style> *{margin: 0; padding: 0;} td{padding: 10px; border: 1px solid white; color: white}</style>"
        zawartosc += "</head>"
        zawartosc += "<body>"
        zawartosc += "<div style='font-size: 20px; width: 100vw; height: 100vh; overflow: hidden; background-color: #333333; color: white;'>"
        zawartosc += "<div>"
        zawartosc += "<a href='sort' style='text-decoration: none; color: white; padding:10px;'>sort</a>"
        zawartosc += "<a href='gender' style='text-decoration: none; color: white; padding:10px;'>gender</a>"
        zawartosc += "<a href='show' style='text-decoration: none; color: white; padding:10px;'>show</a>"
        zawartosc += "</div>"
        zawartosc += "<div style='padding: 10px;'>"
        zawartosc += "<form onchange='this.submit()' method='POST'>"
        if (req.body.sort == "up") {
            zawartosc += "<p>Rosnąco <input type='radio' value='up' name='sort' checked> Malejąco <input type='radio' value='down' name='sort'></p>"
        } else {
            zawartosc += "<p>Rosnąco <input type='radio' value='up' name='sort'> Malejąco <input type='radio' value='down' name='sort' checked></p>"
        }
        zawartosc += "</form>"
        zawartosc += "</div>"
        zawartosc += "<table style='margin: 10px;; border: 1px solid white;'>"
        for (x = 0; x < tab.length; x++) {
            if (req.body.sort == "up") {
                zawartosc += "<tr>"
                zawartosc += "<td> id: " + tab[x].id + "</td>"
                zawartosc += "<td> login: " + tab[x].log + "</td>"
                zawartosc += "<td> hasło: " + tab[x].pass + "</td>"
                zawartosc += "<td> wiek: " + tab[x].wiek + "</td>"
                zawartosc += "<td> uczeń: <input type='checkbox' disabled " + tab[x].uczen + "></td>"
                zawartosc += "<td> płeć: " + tab[x].plec + "</td>"
                zawartosc += "</tr>"
            } else {
                zawartosc += "<tr>"
                zawartosc += "<td> id: " + tab[tab.length - 1 - x].id + "</td>"
                zawartosc += "<td> login: " + tab[tab.length - 1 - x].log + "</td>"
                zawartosc += "<td> hasło: " + tab[tab.length - 1 - x].pass + "</td>"
                zawartosc += "<td> wiek: " + tab[tab.length - 1 - x].wiek + "</td>"
                zawartosc += "<td> uczeń: <input type='checkbox' disabled " + tab[tab.length - 1 - x].uczen + "></td>"
                zawartosc += "<td> płeć: " + tab[tab.length - 1 - x].plec + "</td>"
                zawartosc += "</tr>"
            }
        }
        zawartosc += "</table>"
        zawartosc += "</div>"
        zawartosc += "</body>"
        res.send(zawartosc)
    } else {
        res.send("Musisz się zalogować")
    }
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Start serwera")
})