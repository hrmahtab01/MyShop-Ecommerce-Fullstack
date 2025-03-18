const express = require("express");
const subscribeModel = require("../../Model/Subcriber");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({
      success: false,
      message: "email is require",
    });
  }
  try {
    let subscriber = await subscribeModel.findOne({ email });

    if (subscriber) {
      return res.status(400).send({
        message: "email is already subscribed",
      });
    }
    const newsubscriber = new subscribeModel({email});
    await newsubscriber.save();
    return res.status(201).send({
        success:true , message:" successfully subscribed to the newsletter"
    })

  } catch (error) {
    return res.status(500).send({
        success:false , message:error.message || "something went wrong"
    })
  }
});

module.exports = router;
