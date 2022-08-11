const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    res.redirect('/fail.html');
    return;
  }

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const postData = JSON.stringify(data);

  fetch('https://us14.api.mailchimp.com/3.0/lists/694f191d77', {
    method: 'POST',
    headers: {
      Authorization: 'auth 7788ad9871be16e35e5eed8c9503c3db-us14'
    },
    body: postData
  })
    .then(res.statusCode === 200 ?
      res.redirect('/success.html') :
      res.redirect('/fail.html'))
    .catch(err => console.log(err))
})

const PORT = process.env.PORT || 11000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
//api key 7788ad9871be16e35e5eed8c9503c3db-us14
//id 694f191d77