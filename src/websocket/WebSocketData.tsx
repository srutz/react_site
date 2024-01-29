

import { useEffect, useState } from "react";

export function useWebSocketData() {
    const [data, setData] = useState("")

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");

        socket.onopen = () => {
            console.log("WebSocket Connected");
        };

        socket.onmessage = (event) => {
            console.log("Message from server ", event.data);
            setData(event.data);
        };

        socket.onerror = (error) => {
            console.error("WebSocket Error ", error);
        };

        socket.onclose = () => {
            console.log("WebSocket Disconnected");
        };

        return () => {
            /* cleanup */
            socket.close();
        };
    }, []);

    return data
}

