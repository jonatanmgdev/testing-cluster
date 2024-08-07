'use client';
// import firebase from "firebase/compat/app";
// import "firebase/compat/messaging";
// import { getToken, deleteToken } from "firebase/messaging";
// import { NotificationFCM } from "./interfaces/notification_fcm_interface";

// const firebaseConfig = {
//     apiKey: "AIzaSyD30ASB9nUrkMiojkrlE-aCUjYMv0_ZIqg",
//     authDomain: "ventajon-app.firebaseapp.com",
//     databaseURL: "https://ventajon-app-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "ventajon-app",
//     storageBucket: "ventajon-app.appspot.com",
//     messagingSenderId: "657852234413",
//     appId: "1:657852234413:web:bc54aaa6480b17ea272424",
//     measurementId: "G-12J4Z1QNYG"
// };

// // Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// // Firebase VAPID KEY AÑADIRLO AL BAULT
// const vapidKey = 'BEYmb8LO0E04evuXbuwcud-7xqB_nKeYCDzKZcLjR9SVdcF6V2lTnskU-LLyGMq9VgT_KGPcTeFNrBVQQ5Kcn6o';


// export async function requestToken() {
//     const permission = await Notification.requestPermission();

//     switch( permission ){
//         case 'granted':
//             const messaging = firebaseApp.messaging();
//             const serviceWorkerRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
//             const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration });
//             return token;
//         default: 
//             return '';
//     }
// }

// export async function removeToken() : Promise<boolean> {
//     const messaging = firebaseApp.messaging();
//     return await deleteToken( messaging );
// }

// function generateNotificationFCM ( payload: firebase.messaging.MessagePayload ) : NotificationFCM {
//     const id = payload.data?.id;
//     const notificationId = payload.data?.notification_id;
//     const title = payload.notification?.title;
//     const body = payload.notification?.body;
//     const image = payload.notification?.image;
//     const ongoing = payload.data?.ongoing == 'true' ?? false;
//     const isSilence = payload.data?.is_silence == 'true' ?? false;
//     const deeplink = payload.data?.deeplink;


//     const myNotification: NotificationFCM = {
//         id: id,
//         notificationId: notificationId,
//         title: title,
//         body: body,
//         icon: image,
//         image: image,
//         ongoing: ongoing,
//         silent: isSilence,        
//         data: {
//           url: deeplink
//         }
//     };

//     return myNotification;
// }

// export function onReceiveNotification() : void {
//     const messaging = firebaseApp.messaging();    
//     messaging.onMessage(( payload: firebase.messaging.MessagePayload ) => {
//         const notification = generateNotificationFCM( payload );
//         navigator.serviceWorker.register('/firebase-messaging-sw.js').then(( registration ) => {
//             if( registration == null ) return;
//             registration.showNotification(notification.title ?? '', notification);
//         });
//     });
// }