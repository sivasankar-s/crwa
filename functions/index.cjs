const express = require('express');
const serverless = require('serverless-http');
const app = express();
const port = 3000;
const cors = require('cors'); // Choose an appropriate port

const router = express.Router();

// Parse JSON request bodies
// app.use(express.json());
app.use(cors());

// Define an API endpoint to receive data from your React component
router.post('/send-sms', (req, res) => {
  // Access the data sent from your React component
  const { title, location, phnNos } = req.body;

  // Use the Twilio library to send an SMS
  const accountSid = "AC4dee4863afba02e1b8f8365a22578ba2";
  const authToken = "babb7878240937410826ddf3de25eb21";
  const client = require('twilio')(accountSid, authToken);

  phnNos.forEach(function(number){
    var message = client.messages.create({
      body: `${title}, happened on ${location} visit https://dynamic-youtiao-ea47d1.netlify.app/ ...`,
      from: '+12567332270',
      to: `+91${number}`
    })
    .then(message =>  console.log(message.status));
    // .done();
  });
  router.get('/', (req, res)=>{
    res.json({
      'hello':'hi'
    })
  })

  // client.messages
  // .create({
  //    body: `${title}, happened on ${location} visit website...`,
  //    from: '+12567332270',
  //    to: '+917812866727'
  //  })
  // .then(message => console.log(message.sid));

//   client.messages
//     .create({
});

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);



    //twilio requirements -- Texting API 


    


// app.listen(4000, () => console.log("Running on Port 4000"))