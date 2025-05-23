import { ws } from "./index.js";
import { SimpleJS } from "../dist/index.js";
import { useRef } from "../dist/utils.js";

export const Chat = () => {

    const chatMessages = useRef(null)
    const lastElement = useRef(null)

    if (lastElement.current && SimpleJS.state.chat.length > 0) {
        lastElement.current.scrollIntoView({ behavior: "smooth" });
    }

    const handelonKeyDown = (e) => {
        const message = e.target.value.trim()
        if (e.key === "Enter" && message.length > 0) {
            ws.send(JSON.stringify({ type: "newMessage", message, playerName: SimpleJS.state.playerName }))
            SimpleJS.setState((prev) => {
                return {
                    ...prev, chat: [...prev.chat, { playerName: SimpleJS.state.playerName, message }]
                }
            })
            e.target.value = "";
        }
    }


    return (
        SimpleJS.createElement("div", { class: "chat" }, [
            SimpleJS.createElement("div", { class: "chat-header" }, [
                SimpleJS.createElement("h2", { class: "" }, ["Chat"])
            ]),
            SimpleJS.createElement("div", { class: "chat-body" }, [
                SimpleJS.createElement("div", { class: "chat-messages", ref: chatMessages }, [
                    ...SimpleJS.state.chat.map(({ playerName, message }, index) => {
                        if (index === SimpleJS.state.chat.length - 1) {
                            return (
                                SimpleJS.createElement("div", { class: "", ref: lastElement }, [
                                    SimpleJS.createElement("div", { class: "chat-message" }, [
                                        SimpleJS.createElement("span", { class: "chat-username" }, [`${playerName}:`]),
                                        SimpleJS.createElement("span", { class: "chat-text" }, [`${message}`])
                                    ])
                                ])
                            )
                        } else {
                            return (
                                SimpleJS.createElement("div", { class: "" }, [
                                    SimpleJS.createElement("div", { class: "chat-message" }, [
                                        SimpleJS.createElement("span", { class: "chat-username" }, [`${playerName}`]),
                                        SimpleJS.createElement("span", { class: "chat-text" }, [`${message}`])
                                    ])
                                ])
                            )
                        }
                    })
                ]),
                SimpleJS.createElement("input", {
                    type: "text",
                    class: "chat-input",
                    placeholder: "Type a message...",
                    onKeyDown: handelonKeyDown
                })
            ])]
        )
    )
}
