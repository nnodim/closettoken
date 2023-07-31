require('dotenv').config()
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/subscribe", (req, res) => {
    const { email, js } = req.body
    const fetchData = {
        members: [{
            email_address: email,
            status: "subscribed",
        }]
    }

    const options = {
        url: "https://us13.api.mailchimp.com/3.0/lists/03b8510f8f",
        method: "POST",
        headers: {
            Authorization: `auth ${process.env.API_KEY}`,
        },
        body: JSON.stringify(fetchData),
    }
    if (email) {
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                if (js) {
                    res.status(200).send("success")
                } else {
                    res.redirect("/success.html")
                }
            } else {
                res.status(400).send("error")
            }
        })

    } else {
        res.status(404).send("error")
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

