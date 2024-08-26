"use client"

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import * as anchor from "@coral-xyz/anchor"
import * as borsh from "@coral-xyz/borsh"

import IDL from "../program/idl"
import { useQuery } from "@tanstack/react-query"

const PROGRAM_ID = new anchor.web3.PublicKey(
  "AEsFFSv6QcJrrREyTCEsR8fSFzhzQMVgaCderfJQrBd6"
)

export default function Home() {
  const wallet = useAnchorWallet()
  const { connection } = useConnection()

  const [counter] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    PROGRAM_ID
  )

  const { data, refetch } = useQuery({
    queryKey: ["value"],
    queryFn: async () => {
      try {
        const data = await connection.getAccountInfo(counter)
        if (!data?.data) return 0
        const value = borsh.u64("value").decode(data.data.slice(8))
        return value.toNumber()
      } catch (err) {
        console.log(err)
        return 0
      }
    },
    refetchInterval: 10000,
  })

  const onIncrement = async () => {
    if (!wallet) {
      return alert("Connect your wallet")
    }

    const provider = new anchor.AnchorProvider(connection, wallet, {})
    const program = new anchor.Program(
      IDL as unknown as anchor.Idl,
      PROGRAM_ID,
      provider
    )
    const tx = await program.methods
      .increment()
      .accounts({ counter, signer: wallet.publicKey })
      .rpc()

    console.log(tx)
    await refetch()
  }

  return (
    <main className="container pt-10">
      <div>Value: {data}</div>
      <button
        className="border border-purple-800 text-purple-600 py-3 px-6 mt-4"
        onClick={onIncrement}
      >
        Increment
      </button>
    </main>
  )
}
