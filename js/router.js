"use strict";


function getRoute() {

    const hash =
        window.location.hash
        .replace("#/", "");

    return hash || "home";

}


function navigate() {

    const route =
        getRoute();

    renderPage(route);

}


window.addEventListener(
    "hashchange",
    navigate
);
