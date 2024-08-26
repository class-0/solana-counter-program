import express from "express"
import "./services/solana.js"
import db from "./config/db.js"
import router from "./router/index.js"
import cors from "cors"

const app = express()

;(async () => {
  await db.read()
})()

app.use(cors())
app.use(router)

app.listen(8000, () => {
  console.log(`Server is running at PORT 8000`)
})
