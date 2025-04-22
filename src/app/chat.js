import { SimpleJS } from "../dist/index.js"

export const Chat = () => {
    return (
        SimpleJS.createElement("div", { class: "chat" }, [
            SimpleJS.createElement("div", { class: "chat-header" }, [
                SimpleJS.createElement("h2", { class: "" }, ["Chat"])
            ]),
            SimpleJS.createElement("div", { class: "chat-body" }, [
                SimpleJS.createElement("div", { class: "chat-messages" }, [
                    SimpleJS.createElement("div", { class: "chat-message" }, [
                        SimpleJS.createElement("span", { class: "chat-username" }, ["User1:"]),
                        SimpleJS.createElement("span", { class: "chat-text" }, ["Hello!"])
                    ]),
                    SimpleJS.createElement("div", { class: "chat-message" }, [
                        SimpleJS.createElement("span", { class: "chat-username" }, ["User2:"]),
                        SimpleJS.createElement("span", { class: "chat-text" }, ["How are you?"])
                    ]),

                ]),
                SimpleJS.createElement("input", {
                    type: "text",
                    class: "chat-input",
                    placeholder: "Type a message...",
                })
            ])]
        )
    )
}