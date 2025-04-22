import { SimpleJS } from "../dist/index.js"
import { Chat } from "./chat.js"

export const Queue = () => {
    return (
        SimpleJS.createElement("div", { class: "queue-bg " }, [
            SimpleJS.createElement("div", { class: "queue q container-body" }, [
                Chat(),
                SimpleJS.createElement("div", { class: "" }, [
                    SimpleJS.createElement("h2", { class: "" }, [
                        `${SimpleJS.state.playerCount} players`
                    ]),
                    SimpleJS.createElement("h6", { class: "" }, [
                        `${SimpleJS.state.timer != undefined ? `starting in ${SimpleJS.state.timer}` : "waiting..."}`
                    ])
                ]),

            ])
        ])
    )
}
