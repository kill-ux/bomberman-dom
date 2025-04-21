import { SimpleJS } from '../../dist/index.js'
import { SendMessage } from "../index.js";

export const Chat = () => {
    let messageText = "";

    return (
        SimpleJS.createElement("div", { class: "chat" }, [


            SimpleJS.createElement("div", { class: "body" }, [
                SimpleJS.createElement("textarea", {
                    class: "chat",
                    onInput: (e) => {
                        messageText = e.target.value;
                    }
                }, []),
                SimpleJS.createElement("button", {
                    type: "submit",
                    onClick: () => {
                        SendMessage(messageText);
                        messageText = "";
                    }
                }, ["submit"])
            ]),

        ],

        ...SimpleJS.state.chat.map(([ playerName, message ]) => {
            console.log(playerName);
            console.log(message);
            
        })
        //     console.log(playerName);
            
        //         SimpleJS.createElement("div", { class: "" }, [
        //             SimpleJS.createElement("h4", { class: "" }, [
        //                 playerName
        //             ]),
        //             SimpleJS.createElement("p", { class: "" }, [
        //                 message
        //             ])
        //         ])
        //     })
        )
    )
}