"use client"

import { useQuery } from "@tanstack/react-query"

export default function Events() {
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api`).then((res) =>
          res.json()
        )
        return data
      } catch (err) {
        console.log(err)
      }
    },
    refetchInterval: 5000,
  })
  console.log(data)
  return (
    <div className="container mt-10">
      {data?.map((item: any, i: number) => (
        <div key={i} className="border-b py-2">
          <div>Signature: {item.signature}</div>
          <div>Slot: {item.slot}</div>
          <div>Event: {item.event}</div>
          <div>Value: {item.value}</div>
        </div>
      ))}
    </div>
  )
}
