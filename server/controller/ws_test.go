package controller

import (
	"fmt"
	"testing"
	"time"

	"github.com/gorilla/websocket"
)

func TestWebsocket(t *testing.T) {
	url := "ws://localhost:8088/api/v1/ws"
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		t.Fatal(err)
	}
	defer conn.Close()

	go func() {
		for {
			if err := conn.WriteMessage(websocket.BinaryMessage, []byte("ping")); err != nil {
				t.Fatal(err)
			}
			time.Sleep(time.Second * 2)
		}
	}()

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			t.Fatal(err)
		}
		fmt.Printf("msg: %v\n", string(msg))
	}
}
