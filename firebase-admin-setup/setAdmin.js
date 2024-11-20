const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./techforgeguild-firebase-adminsdk-6xo3g-6510f0a8d6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://techforgeguild.firebaseio.com" // Replace with your Firebase database URL
});

// Assign Admin Role
const uid = "x4ctQhmPOaaEnTQbMBRf342bmFa2"; // Replace with the user's UID
admin.auth().setCustomUserClaims(uid, { admin: true })
    .then(() => {
        console.log(`Admin role assigned to user with UID: ${uid}`);
        process.exit();
    })
    .catch(error => {
        console.error("Error assigning admin role:", error);
        process.exit(1);
    });
