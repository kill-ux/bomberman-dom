import { SimpleJS } from "../dist/index.js"
import { ws } from "./index.js"

export const Welcome = () => {
    const handelClick = (e) => {
        if (e.key === "Enter") {
            const playername = e.target.value.trim()
            if (playername.length > 0 && playername.length <= 10) {
                ws.send(JSON.stringify({ type: "newPlayer", playername }))
                SimpleJS.state.error = ""
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
                SimpleJS.createElement("input", { class: "input", placeholder : "nickname" , maxlength: "10", onkeydown: handelClick }),
                SimpleJS.state.error ? SimpleJS.createElement("div", { class: "error" }, [
                    SimpleJS.state.error
                ]) : "",
            ]),
            SimpleJS.createElement("div", { class: "body-welcome" }, [
                SimpleJS.createElement("div", { class: "images-space" }, [
                    SimpleJS.createElement("div", { class: "imgs" }, [
                        SimpleJS.createElement("div", { class: "space" }),
                        SimpleJS.createElement("div", { class: "description" }, [
                            "place a bomb ",
                        ]),
                    ]),

                    SimpleJS.createElement("div", { class: "imgs" }, [
                        SimpleJS.createElement("div", { class: "buttons" }),
                        SimpleJS.createElement("div", { class: "description" }, [
                            "move the player ",
                        ]),
                    ]),
                ]),

                SimpleJS.createElement("div", { class: "images-space" }, [
                    SimpleJS.createElement("div", { class: "imgs" }, [
                        SimpleJS.createElement("div", { class: "power battery" }),
                        SimpleJS.createElement("div", { class: "description" }, [
                            " Increases movement speed; ",
                        ]),
                    ]),
                    SimpleJS.createElement("div", { class: "imgs" }, [
                        SimpleJS.createElement("div", { class: " power fire" }),
                        SimpleJS.createElement("div", { class: "description" }, [
                            " Increases explosion range  ",
                        ]),
                    ]),
                    SimpleJS.createElement("div", { class: "imgs" }, [
                        SimpleJS.createElement("div", { class: "power idel" }),
                        SimpleJS.createElement("div", { class: "description" }, [
                            "Increases bombs amount",
                        ]),
                    ]),
                ]),
            ]),
        ])
    )
}

