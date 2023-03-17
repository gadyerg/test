const express = require("express");
const app = express();
const firebase = require("firebase/app");
const fireAuth = require("firebase/auth");
const fireStorage = require("firebase/storage");
const cors = require("cors");
const multer = require("multer");
const upload = multer()

const config = {
  projectId: "demo-test",
  appId: "test",
  apiKey: "test",
};
const fireApp = firebase.initializeApp(config);

const auth = fireAuth.getAuth();
fireAuth.connectAuthEmulator(auth, "http://localhost:9099");

const storage = fireStorage.getStorage(fireApp, "gs://demo-test.appspot.com/");
const ref = fireStorage.ref(storage, 'image.jpg')
fireStorage.connectStorageEmulator(storage, "localhost", 9199);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({methods: ["GET", "POST", "DELETE"]}));

app.post("/signup", async (req, res) => {
  await fireAuth.createUserWithEmailAndPassword(
    auth,
    req.body.email,
    req.body.password
  );
  return res.send({message: "User created"})
});

app.post("/login", async (req, res) => {
  try {
    await fireAuth.signInWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );
    return res.send({ message: "Logged In!" });
  } catch (e) {
    if (e.code == "auth/wrong-password" || e.code == "auth/user-not-found") {
      return res.status(401).send({ message: "Email or password wrong" });
    }
  }
});

app.post("/image", upload.single('stock'), async (req, res) => {
  await fireStorage.uploadBytes(ref, req.file.buffer)
  return res.send("nothing")
});

app.get("/image", async (req, res) => {
  try{
    const link = await fireStorage.getDownloadURL(ref)
    return res.send({link})
  } catch (e) {
    return res.status(500).send({message: "No Image"})
  }
})

app.delete("/image", async(req, res) => {
  try {
    await fireStorage.deleteObject(ref)
    return res.send({message: "Image deleted"})
  } catch (e) {
    return res.status(500).send({message: "No Image to delete"})
  }
}) 

app.listen(5000);
