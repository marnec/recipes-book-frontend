// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'recipes-ac036',
    appId: '1:320224370121:web:52fd8c7dbca4550c049c18',
    storageBucket: 'recipes-ac036.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyBKCgzrncsKImMBbPq7x2EBKi5SaMA3Lks',
    authDomain: 'recipes-ac036.firebaseapp.com',
    messagingSenderId: '320224370121',
    measurementId: 'G-ND7VKS1HCE',
  },
  production: false,
  api: 'http://localhost:3000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
