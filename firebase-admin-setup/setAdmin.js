import admin from "firebase-admin";
import readline from "readline";

// Initialize Firebase Admin SDK
const serviceAccount = {
  "type": "service_account",
  "project_id": "techforgeguild",
  "private_key_id": "6510f0a8d68c61223fd7c45f6df7533ce02465c2",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCri573z915Q20t\nhMvZWHd4zol1nP/XUD6VcXM3F8R5+tykcG3nhuXuLTSBhK9f0KUM3nIRYsFFADpc\n9ppmcNzRzAUQZhomGTMEXlZ05jWEzw9BAfkRw50bBVW6BYxQKlGlyo4pqA39/alX\nC4TUqDl7VRcI/qp4fZ43lqBKHoxVTYh5xox5wh/a7o8TmbT5u/7KARfDHUVDxrvy\nzKQpBaX8DVJ+/k3+UO+sxYMdTkCZ4SailbnrUPInIz4zjxRc+tjKGszRi7+K4Vg1\nrK6RPkkFQ/wsQnEhIekGSpgQAtGmkIAuvtpi7dfsYWDN23v7FmvgKinU/9FeHM6+\nX0WR9DbLAgMBAAECggEAO5TmdWb+oxAeuwkdLlPSRyThTHbny3aFDi3V2SRJqx5N\nBVZBbgGGGfgcfQHDUdGrifE3CD/XJeqi2sgSL5NytvGYLq5v1Zy6AgHsIHUW0JaE\nU01mn1tkVU7AjDhCGFPigOV+BAzpMzcn2mJXU+9L68DNm+Or/OaQjfkkminLDxMp\nuzcIzalCRm3A+r0iBZ6kQph94BCOhKx6CqpdQc1UmbcNVDyojGYNPFFq7BmUlQ3t\nZ/KhzU6+gcmn4SuvrRuShFhOpmOYvfaVxEmGJyGSMLi6B771ttrI3qOoRicX+vv8\nW10WWv2dc8bFoyaqRnnpm4PgQt9hOYmdlIXdN+zIbQKBgQDXeMVbBtiFpbh2hxuw\n0beX4YSvC8E11kEmBxdLxTtMDISG+WsNEpj1Nh2TaoTaV5SGwsRdF31zfUpapwLT\nscehBknhbxO/Beyv+Z6pZ21w5fcgKPj3RChLX4QoQmOsgopI9bm7DHW6opHPWYCR\n+jC/oNTsoJbsZGEN6oR03ZJdpQKBgQDLz73gakeyj2iQ3ssaV8vgykfNtbUGeoRs\nwEZzCWO4y1o49AiUiGHZw/xVX27Ip1gQDfkqwibSm4RrbSb+8MS/PIK3bc1yRDd+\nMNPR4gPjh1OIC9iEFTDoNLCNSFh/jn70fL9aE+U9kTOVuqSNQ0FjPbmSfYLG/jvc\nj16Q6pz3rwKBgHGJhMyrNcpugV2LYc7xIsGYJpcqJXvd0uRb1i2p1s4Cxo5svLjd\ntNV412rHNQvsHCpKVLgM2aDSQyyzVi0AP4Wcz69HHWuJjqdHbBAtnKBhvK8oh8+b\nDXRx9yxTlzveaUl6mYxzS1G1ugk9Sx8gazF+aNPq5rvXRMDVc0g1PJu1AoGADOWJ\nW1D+VnMyp7AhY/pYQVIrdv3fhZhtFsCX9KGMeN4NSHtQq61xm6kGJ5TRWssUDHgF\n40nD0SHcIDwY8prjqEI490hwbqGYbVjDno1Rt60RgRNW0QzSOm9TGK2SRAgNSoU2\nSonlwJ6WiAv2a6Xs1k3Kl1Vv2A2wVgWQc1UVN6sCgYEAqpPQomAVx6OCJIaBIsZz\nicqEQFM6Fd4TO7Z1JOlz9qChR4aiQm9HzChGQkqqpwRHYF407n+qCzC+3n7NyGZN\njzn2SIB4efY7Qr0+wBLTl60g9/RTU6I7s0nkLv8ai2pZQhqYp0MbA6Ogs3RSmhOY\n4tEAj7ssTHDI++g7j4UK0C8=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-6xo3g@techforgeguild.iam.gserviceaccount.com",
  "client_id": "112519288885183207816",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6xo3g%40techforgeguild.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://techforgeguild-default-rtdb.firebaseio.com"
  });
}

const auth = admin.auth();

// Create a readline interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for the email of the user to set as admin
rl.question("Enter the email of the user you want to set as admin: ", (email) => {
  if (!email) {
    console.error("No email provided. Exiting...");
    rl.close();
    return;
  }
  console.log(`Setting admin role for ${email}...`);
  // Fetch user by email
  auth.getUserByEmail(email)
    .then((userRecord) => {
      // Set custom claims for admin
      return auth.setCustomUserClaims(userRecord.uid, { admin: true });
    })
    .then(() => {
      console.log(`Successfully set admin role for ${email}`);
    })
    .catch((error) => {
      console.error("Error setting admin role:", error.message);
    })
    .finally(() => {
      rl.close();
    });
});
