import * as anchor from "@coral-xyz/anchor";
import * as web3 from "@solana/web3.js";
import type { Counter } from "../target/types/counter";

describe("Test", () => {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as anchor.Program<Counter>;
  
  const [counter] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId
  );
  it("initialize", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        counter: counter,
        signer: program.provider.wallet.payer,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log(tx);
  });
  it("increment", async () => {
    const tx = await program.methods
      .increment()
      .accounts({ counter, signer: program.provider.wallet.payer })
      .rpc();

    console.log(tx);
  });
});
