
import { ws } from "./index.js";
import { SimpleJS } from "../dist/index.js";


export const Chat = () => {

    const handelonKeyDown = (e) => {
        if (e.key === "Enter") {
            if (SimpleJS.state.message.length > 0) {
                ws.send(JSON.stringify({ type: "newMessage", message: SimpleJS.state.message, playerName: SimpleJS.state.playerName }))
                SimpleJS.setState((prev) => {
                    return {
                        ...prev, chat: [...prev.chat, { playerName: SimpleJS.state.playerName, message: SimpleJS.state.message }]
                    }
                })
                e.target.value = "";
                SimpleJS.state.message = ""
            }
        }
    }

    const handelonInput = (e) => {
        SimpleJS.setState((prev) => {
            return {
                ...prev, message: e.target.value
            }
        })
    }

    return (
        SimpleJS.createElement("div", { class: "chat" }, [
            SimpleJS.createElement("div", { class: "chat-header" }, [
                SimpleJS.createElement("h2", { class: "" }, ["Chat"])
            ]),
            SimpleJS.createElement("div", { class: "chat-body" }, [
                SimpleJS.createElement("div", { class: "chat-messages" }, [
                    ...SimpleJS.state.chat.map(({ playerName, message }) => {
                        return (
                            SimpleJS.createElement("div", { class: "" }, [
                                SimpleJS.createElement("div", { class: "chat-message" }, [
                                    SimpleJS.createElement("span", { class: "chat-username" }, [`${playerName}`]),
                                    SimpleJS.createElement("span", { class: "chat-text" }, [`${message}`])
                                ])
                            ])
                        )
                    })
                ]),
                SimpleJS.createElement("input", {
                    type: "text",
                    class: "chat-input",
                    placeholder: "Type a message...",
                    onInput: handelonInput,
                    onKeyDown: handelonKeyDown
                })
            ])]
        )
    )
}
