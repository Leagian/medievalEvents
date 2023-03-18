const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
// const eventControllers = require("./controllers/EventControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// router.get("/", ventControllers.browse);
// router.get("/items/:id", eventControllers.read);
// router.post("/", eventControllers.add);

module.exports = router;
