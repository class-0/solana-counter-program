import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"

export type EventData = {
  signature: string
  slot: number
  event: string
  value: number
}

type Data = {
  events: EventData[]
}

const defaultData: Data = { events: [] }

const db = new Low<Data>(new JSONFile("db.json"), defaultData)

export default db
