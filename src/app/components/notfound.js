import { SimpleJS } from "../../dist/index.js";

export const Notfound = () => {
    return (
        SimpleJS.createElement('div', { class: 'header' }, [
            SimpleJS.createElement('div', { class: 'link Home', onClick: () => SimpleJS.Link("/") }, ["page 404 | go Home"]),
        ])
    );
}
