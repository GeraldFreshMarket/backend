const express = require("express");
const router = express.Router();
const mongo = require("../../../mongo_Connection");

var ObjectId = require("mongodb").ObjectID;

router.get("/", async function (req, res) {
  const db = mongo.get().collection("fruits");

  await db.find().toArray(function (err, result) {
    if (err) throw err;
    else res.send(result);
  });
});

router.post("/update", function (req, res) {
  const db = mongo.get().collection("fruits");

  const values = {
    fruitname: req.body.name,
    fruitprice: req.body.price,
    fruitquantity: req.body.quantity,
    fruitadvantage: req.body.advantage,
    fruitdescription: req.body.description,
    fruitstatus:req.body.status,
    fruitimage: req.body.image,
  };

  db.update(
    { _id: ObjectId(req.body.id) },
    { $set: values },
    function (err, result) {
      if (err) throw err;
      else res.send(values.fruitname + " has been updated.");
    }
  );
});
module.exports = router;
