importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyChz-rtmzNwLpX4snwgkb_TDylkLlwTFkA",
  authDomain: "crwa-face9.firebaseapp.com",
  projectId: "crwa-face9",
  storageBucket: "crwa-face9.appspot.com",
  messagingSenderId: "376185476577",
  appId: "1:376185476577:web:ea3112e4ed6974c8ddaea0",
  measurementId: "G-HGT7FJF18J"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});