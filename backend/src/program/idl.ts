export default {
  version: "0.1.0",
  name: "counter",
  instructions: [
    {
      name: "initialize",
      accounts: [
        { name: "counter", isMut: true, isSigner: false },
        { name: "signer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "increment",
      accounts: [
        { name: "counter", isMut: true, isSigner: false },
        { name: "signer", isMut: true, isSigner: true },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "Counter",
      type: { kind: "struct", fields: [{ name: "value", type: "u64" }] },
    },
  ],
  events: [
    {
      name: "CounterIncremented",
      fields: [{ name: "newValue", type: "u64", index: false }],
    },
  ],
} as const
