import { SimpleJS } from "../../dist/index.js"

export const menu = ()=>{
    return (
        SimpleJS.createElement("div", {id:"menu", class:""},[
            SimpleJS.createElement("h3",{},["Game Paused!"]),
            SimpleJS.createElement("button",{class:"btn", id:"restart"},["Restart"]),
            SimpleJS.createElement("button",{class:"btn", id:"continue"},["Continue"])
            
        ])
    )
}