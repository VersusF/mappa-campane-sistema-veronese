import * as LF from "leaflet";
const iconUrl = require("./assets/bellIcon.svg");

window.onload = () => {
    main();
}

function main() {
    const map = LF.map("map", {
        maxZoom: 19,
        minZoom: 8,
        center: {
            lat: 45.45627757127799,
            lng: 11.30149841308594
        },
        zoom: 10,
        inertia: true
    });
    map.addLayer(LF.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }));

    const towers: Tower[] = require('./assets/torri2.min.json');
    console.log(`There are ${towers.length} towers in total`);
    const icon = LF.icon({
        iconUrl: iconUrl,
        iconSize: [25, 25]
    });
    towers.slice(0, 10).forEach(t => {
        LF.marker({
            lat: t.latitude,
            lng: t.longitude
        }, {
            title: t.properties.titolo,
            icon: icon
        })
        .on("click", () => {
            console.log(t.properties.titolo);
        })
        .addTo(map);
    })
}

interface Tower {
    latitude: number,
    longitude: number,
    id: number,
    properties: {
        nota: string,
        numero: number,
        peso: number,
        suonabile: string,
        titolo: string
    }
}
