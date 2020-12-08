const express = require("express");
const mongo = require("../mongo_Connection");
const router = express.Router();
var bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;

router.post("/", async function (req, res) {
  const db = mongo.get().collection("users");

  const login = {
    emailid: req.body.emailid,
    password: req.body.password,
  };

  await db.find({ emailid: login.emailid }).toArray(function (err, result) {
    if (result.length > 0) {
      const match = bcrypt.compareSync(login.password, result[0].password);
      if (match == true) {
        res.send(result);
      }
    } else if (err) res.send(err);
  });
});

router.post("/adduser", async function (req, res) {
  const db = mongo.get().collection("users");
  req.body.password = bcrypt.hashSync(req.body.password, 12);
  const data = {
    username: req.body.name,
    state: req.body.state,
    district: req.body.district,
    pincode: req.body.pincode,
    mobilenumber: req.body.mobileno,
    address: req.body.address,
    emailid: req.body.email,
    landmark: req.body.landmark,
    status: "2",
    password: req.body.password,
  };
  db.find({
    $or: [{ emailid: req.body.email }, { mobilenumber: req.body.mobileno }],
  }).toArray(function (err, result) {
    if (result.length > 0) {
      res.send(
        "Already account exists with the same Email-Id or Mobile Number"
      );
    } else {
      db.insert(data, function (err, result) {
        if (err) throw err;
        else res.send("Your account has been added.");
      });
    }
  });
});
router.post("/getuser", async function (req, res) {
  const db = mongo.get().collection("users");
  await db.find({ _id: ObjectId(req.body.id) }).toArray(function (err, result) {
    if (err) throw err;
    else res.send(result);
  });
});

router.post("/updateuser", async function (req, res) {
  const db = mongo.get().collection("users");
  req.body.state = bcrypt.hashSync(req.body.state, 12);
  const details = {
    username: req.body.username,
    state: req.body.state,
    district: req.body.district,
    pincode: req.body.pincode,
    mobilenumber: req.body.mobilenumber,
    address: req.body.address,
    emaildid: req.body.emailid,
    landmark: req.body.landmark,
  };
  await db.update(
    { _id: ObjectId(req.body.id) },
    {
      $set: {
        username: details.username,
        state: details.state,
        district: details.district,
        emaildid: details.emailid,
        pincode: details.pincode,
        mobilenumber: details.mobilenumber,
        address: details.address,
        landmark: details.landmark,
      },
    },
    function (err, result) {
      if (err) throw err;
      else res.send("Updated");
    }
  );
});

module.exports = router;
