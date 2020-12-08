const express = require("express");
const router = express.Router();
const userLogin = require("./users");
const order = require("./Client/Order/addOrder");
const updateProfile = require("./Client/Profile/updateProfile");
const orderDetails = require("./Client/Order/getOrder");
const cancelOrder = require("./Client/Order/cancelOrder");

const addVegetable = require("./Admin/Vegetables/addVegetable");
const updateVegetable = require("./Admin/Vegetables/updateVegetable");
const deleteVegetable = require("./Admin/Vegetables/deleteVegetable");
const addCart = require("./Client/Cart/cartFile");

const addFruit = require("./Admin/Fruits/addFruits");
const deleteFruit = require("./Admin/Fruits/deleteFruits");
const updateFruit = require("./Admin/Fruits/updateFruits");

const getVegetables = require("./Client/Vegetables/getVegetables");
const getFruits = require("./Client/Fruits/getFruits");

const viewOrder = require("./Orders/orders");
const reset = require("./Client/Password/reset");

router.use("/login", userLogin);
router.use("/addVegetable", addVegetable);
router.use("/updateVegetable", updateVegetable);
router.use("/deleteVegetable", deleteVegetable);
router.use("/addfruit", addFruit);
router.use("/deletefruit", deleteFruit);
router.use("/updatefruit", updateFruit);
router.use("/getVegetables", getVegetables);
router.use("/order", order);
router.use("/getOrderDetails", orderDetails);
router.use("/update", updateProfile);
router.use("/cart", addCart);
router.use("/cancelOrder", cancelOrder);
router.use("/getFruits", getFruits);
router.use("/vieworder", viewOrder);
router.use("/reset", reset);

module.exports = router;
