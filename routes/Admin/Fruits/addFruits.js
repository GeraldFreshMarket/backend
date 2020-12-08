const express = require("express");
const router = express.Router();

const mongo = require("../../../mongo_Connection");

router.post("/", async function (req, res) {
  var message = [];

  const db = mongo.get().collection("fruits");

  const addFruits = {
    fruitname: req.body.fruit_name,
    fruitprice: req.body.fruit_price,
    fruitquantity: req.body.fruit_quantity,
    fruitdescription: req.body.fruit_description,
    fruitstatus: req.body.fruit_status,
    fruitimage: req.body.fruit_image,
    fruitadvantage: req.body.fruit_advantage,
  };
  await db.find({ fruitname: addFruits.fruitname }).toArray((err, results) => {
    var output = results.map((item) => {
      return item.fruitname;
    });
    if (output.length === 0) {
      db.insert(addFruits);
      message.push({
        status: 2,
        message: addFruits.fruitname + " has been added to the database",
      });
    } else {
      for (var i = 0; i < output.length; i++) {
        if (output[i] === addFruits.fruitname) {
          message.push({
            status: 1,
            message:
              addFruits.fruitname + " has already been added in the database.",
          });
        } else {
          db.insert(addFruits);
          message.push({
            status: 2,
            message: addFruits.fruitname + " has been added to the database",
          });
        }
      }
    }
    res.send(message);
  });
});

module.exports = router;
