import { SimpleJS } from "../dist/index.js"
import { Chat } from "./components/chat.js"

export const Queue = () => {
    return (
        SimpleJS.createElement("div", { class: "PageQueue" }, [
            SimpleJS.createElement("div", { class: "queue" }, [
                SimpleJS.createElement("h2", { class: "" }, [
                    `${SimpleJS.state.playerCount} players`
                ]),
                SimpleJS.createElement("h6", { class: "" }, [
                    `${SimpleJS.state.timer != undefined ? `starting in ${SimpleJS.state.timer}` : "waiting..."}`
                ])
            ]),
            Chat()
        ])
    )
}
