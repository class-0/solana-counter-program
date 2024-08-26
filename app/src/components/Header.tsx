"use client"

import dynamic from "next/dynamic"

import "@solana/wallet-adapter-react-ui/styles.css"
import Link from "next/link"

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (res) => res.WalletMultiButton
    ),
  { ssr: false }
)

const Header = () => {
  return (
    <header className="bg-gray-400 py-3">
      <div className="container flex items-center justify-between">
        <div className="fle items-center space-x-10">
          <Link href={"/"} className="text-purple-800 font-semibold">
            Counter
          </Link>
          <Link href={"/events"} className="text-purple-800 font-semibold">
            Events
          </Link>
        </div>
        <WalletMultiButton />
      </div>
    </header>
  )
}

export default Header
