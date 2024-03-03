import { useEffect } from "react"

const url = "ws://localhost:8088/api/v1/ws"
let ws: any
export default function useWebsocket() {
  if (!ws) {
    ws = new WebSocket(url)
  }
  return { ws }
}
