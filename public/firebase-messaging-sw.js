// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// self.addEventListener("notificationclick", e =>  {

//   const notification = e.notification;
  
//   notification.data.url = notification.data.url 
//   ?? notification?.data?.FCM_MSG?.data?.deeplink
//   ?? notification.notification.data.url;

//   const response = clients.matchAll()
//   .then( users => {

//       let client = users.find( c => {
//           return c.visibilityState === 'visible';
//       });

//       if ( client !== undefined ) {
//           client.navigate( notification.data.url );
//       } else {
//         clients.openWindow( notification.data.url );
//       }

//     return notification.close();

//   });
//   e.waitUntil( response );
// });

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// firebase.initializeApp({
//   apiKey: "AIzaSyD30ASB9nUrkMiojkrlE-aCUjYMv0_ZIqg",
//   authDomain: "ventajon-app.firebaseapp.com",
//   databaseURL: "https://ventajon-app-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "ventajon-app",
//   storageBucket: "ventajon-app.appspot.com",
//   messagingSenderId: "657852234413",
//   appId: "1:657852234413:web:bc54aaa6480b17ea272424",
//   measurementId: "G-12J4Z1QNYG"
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler((payload) => {  
//   const id = payload.data?.id;
//   const notificationId = payload.data?.notification_id;
//   const title = payload.notification?.title;
//   const body = payload.notification?.body;
//   const image = payload.notification?.image;
//   const ongoing = payload.data?.ongoing == 'true' ?? false;
//   const isSilence = payload.data?.is_silence == 'true' ?? false;
//   const deeplink = payload.data?.deeplink;

  
//   notificationBackgroundPayload = {
//     id: id,
//     notificationId: notificationId,
//     title: title,
//     body: body,
//     badge: '', // fav icon de ventajon
//     openUrl: '/',
//     icon: image,
//     image: image,
//     ongoing: ongoing,
//     silent: isSilence,        
//     data: {
//       url: deeplink
//     }
//   };
  
//   return self.registration.showNotification(title, notificationBackgroundPayload);
// });


