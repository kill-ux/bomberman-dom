import { SimpleJS } from "../dist/index.js"
import { ws } from "./index.js"

export const Welcome = () => {
    const handelClick = (e) => {
        if (e.key === "Enter") {
            const playername = e.target.value.trim()
            if (playername.length > 0) {
                ws.send(JSON.stringify({ type: "newPlayer", playername }))
            }
        }
    }
    return (
        SimpleJS.createElement("div", { class: "welcome" }, [
            SimpleJS.createElement("div", { class: "cheap-welcom" }),
            SimpleJS.createElement("div", { class: "title-welcom" }, [
                "Arena Bomb"
            ]),
            SimpleJS.createElement("div", { class: "bg-input" }, [
                SimpleJS.createElement("input", { class: "input", onkeydown: handelClick }),
            ]),
            SimpleJS.createElement("div", { class: "body-welcome" }, [
                SimpleJS.createElement("div", { class: "" }, [
                    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, ?",
                ]),
                SimpleJS.createElement("div", { class: "space" }, [
                   
                ]),
                SimpleJS.createElement("div", { class: "" }, [
                    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, ?",
                ]),
                SimpleJS.createElement("div", { class: "" }, [
                    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, ?",
                ]),
            ]),
        ])
    )
}

