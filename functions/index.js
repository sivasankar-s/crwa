/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const sgMail = require("@sendgrid/mail");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
admin.initializeApp();

// sgMail.setApiKey("YOUR_SENDGRID_API_KEY");

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendNotificationOnNewPost = functions.firestore
    .document("posts/{date}")
    .onCreate(async () => {
      // Query the database for all registered FCM tokens
      const tokenshot = await admin.firestore().collection("tokens").get();
      const registrationTokens = tokenshot.docs.map((doc) => doc.data().token);

      // Construct a message to send
      const message = {
        tokens: registrationTokens,
        notification: {
          title: "New Post",
          body: "A new post has been created.",
        },
      };

      // Send the message
      try {
        const response = await admin.messaging().sendMulticast(message);
        console.log(`Notification sent to ${response.successCount} devices`);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });
