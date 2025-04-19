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
            SimpleJS.createElement("input", { onkeydown: handelClick })
        ])
    )
}
