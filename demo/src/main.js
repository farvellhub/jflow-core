// Import modules
import { Handler } from "../../dist/index";
// Webpack styles
import "./styles/index.scss";


// Init Web
const initPage = () => {
    const loader = new Handler({
        element: "loader",
        css: "disappear"
    });

    return loader.onTimeout( 1600 ) ;
};

// Main function
window.addEventListener( "load", () => {
    initPage()
        .then(() => console.log( "Say hello!" ));
});