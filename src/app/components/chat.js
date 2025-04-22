import { SimpleJS } from '../../dist/index.js'
import { SendMessage } from "../index.js";

export const Chat = () => {
    let messageText = "";

    return (
        SimpleJS.createElement("div", { class: "chat" }, [


            SimpleJS.createElement("div", { class: "chatInput" }, [
                SimpleJS.createElement("textarea", {
                    class: "Input",
                    onInput: (e) => {
                        console.log("event", e.target.value);

                        messageText = e.target.value;
                       
                    }
                }, []),
                SimpleJS.createElement("button", {
                    type: "submit",
                    onClick: () => {
                        console.log("messageText", messageText);
                        const textarea = document.querySelector(".Input");
                        if (textarea) textarea.value = "";
                        SendMessage(messageText);
                        
                        SimpleJS.setState((prev) => {
                            return {
                            ...prev,  chat: [...prev.chat, { playerName:SimpleJS.state.playerName,message: messageText }]
                            }
                        })
                        messageText=""
                    }
                }, ["submit"])
            ]),




            ...SimpleJS.state.chat.map(({ playerName, message }) => {
                return (
                    SimpleJS.createElement("div", { class: "" }, [
                        SimpleJS.createElement("h4", { class: "gggggg" }, [
                            playerName
                        ]),
                        SimpleJS.createElement("p", { class: "sdgsdfgsdfgsdf" }, [
                            message
                        ])
                    ])
                )
            })

        ])

    )
}