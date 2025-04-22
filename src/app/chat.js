import { on } from "ws";
import { SimpleJS } from "../dist/index.js"
import { SendMessage } from "../index.js";

export const Chat = () => {
    let messageText = "";
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
                    onInput: (e) => {
                        console.log("event", e.target.value);

                        messageText = e.target.value;

                    },
                    onKeyDown: (e) => {
                        if (e.key === "Enter") {
                            console.log("messageText", messageText);
                            const input = document.querySelector(".chat-input");
                            if (input) input.value = "";
                            SendMessage(messageText);

                            SimpleJS.setState((prev) => {
                                return {
                                    ...prev, chat: [...prev.chat, { playerName: SimpleJS.state.playerName, message: messageText }]
                                }
                            })
                            messageText = ""
                        }
                    }
                })
            ])]
        )
    )
}
