import * as web3 from "@solana/web3.js"
import * as anchor from "@coral-xyz/anchor"
import IDL from "../program/idl.js"
import db from "../config/db.js"

const PROGRAM_ID = new web3.PublicKey(
  "AEsFFSv6QcJrrREyTCEsR8fSFzhzQMVgaCderfJQrBd6"
)

const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
const wallet = new anchor.Wallet(web3.Keypair.generate())
const provider = new anchor.AnchorProvider(connection, wallet, {})
const program = new anchor.Program(
  IDL as unknown as anchor.Idl,
  PROGRAM_ID,
  provider
)
program.addEventListener(
  "CounterIncremented",
  async (event, slot, signature) => {
    console.log(event)
    await db.update((data) => {
      if (!data.events.find((item) => item.signature === signature))
        data.events.push({
          event: "CounterIncremented",
          signature,
          slot,
          value: (event.newValue as anchor.BN).toNumber(),
        })
    })
  }
)
