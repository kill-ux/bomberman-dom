import { SimpleJS } from "../dist/index.js"

export const Forbidden = () => {

    const handelClick = () => {
        SimpleJS.Link("/")
    }

    return (
        SimpleJS.createElement("div", { class: "Forbidden" }, [
            "Please Go ",
            SimpleJS.createElement("button", { class: "btn", onClick: handelClick }, [
                "Home",
            ]),
            " First , "
        ])
    )
}
