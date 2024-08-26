import express from "express"
import db from "../config/db.js"

const router = express.Router()

router.get("/api", (req, res) => {
  res.json(db.data.events)
})

export default router
