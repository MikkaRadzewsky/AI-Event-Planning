const express = require("express");
const router = express.Router();
const axios = require("axios");

const fastApiBaseUrl = "http://localhost:3002"; // FastAPI URL

// Route to call the translate_prompt
router.post("/translate_prompt", async (req, res) => {
  try {
    const { input } = req.query;
    const response = await axios.get(
      `${fastApiBaseUrl}/marvin/translate_prompt`,
      {
        params: { input },
      }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while calling the FastAPI." });
  }
});

// Route to call the ask_For_Blanks
router.post("/ask_For_Blanks", async (req, res) => {
  try {
    const { event } = req.query;
    const response = await axios.post(
      `${fastApiBaseUrl}/marvin/ask_For_Blanks`,
      {
        params: { event },
      }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while calling the FastAPI." });
  }
});

// Route to call the fill_In_Blanks
router.post("/fill_In_Blanks", async (req, res) => {
  try {
    const { event, input } = req.query;
    const response = await axios.post(
      `${fastApiBaseUrl}/marvin/fill_In_Blanks`,
      {
        event,
        params: { input },
      }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while calling the FastAPI." });
  }
});

export default router;
