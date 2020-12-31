import "leaflet";
import { Marker, MarkerClusterGroup } from "leaflet";
import "leaflet.markercluster";
const LF = window['L'];
const towerIconUrl: string = require("./assets/towerIcon.svg");
const towerShadowUrl: string = require("./assets/towerShadow.svg");
const popupTemplate: string = `
<h3>%PAESE%</h3>
<h5>%CHIESA%</h5>
<ul>
    <li><b>N° campane: </b>%NUMERO%</li>
    <li><b>Peso: </b>%PESO% Kg</li>
    <li><b>Nota: </b>%NOTA%</li>
    <li><b>Suonabile: </b>%SUONABILE%</li>
</ul>
`.replace(/(\n|\t|\s\s\s\s)/g, "");

const TOWER_WIDTH_PX = 24;

window.onload = () => {
    main();
}

function main() {
    // Init map
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
    const cluster = LF.markerClusterGroup({
        showCoverageOnHover: false,
        disableClusteringAtZoom: 17,
        spiderfyOnMaxZoom: false,
        singleMarkerMode: false,
        iconCreateFunction: (c) => {
            return LF.divIcon({
                html: c.getChildCount().toString(),
                className: 'clusterIcon',
                iconSize: [45, 45]
            })
        }
    });

    // Add data
    const towers: Tower[] = require('./assets/torri.json');
    addTowers(cluster, towers);
    map.addLayer(cluster);
}

interface Tower {
    lat: number,
    lng: number,
    id: number,
    nota: string,
    numero: number,
    peso: number | 'Sconosciuto',
    suonabile: string,
    titolo: string
}

function addTowers(cluster: MarkerClusterGroup, towers: Tower[]) {
    const icon = LF.icon({
        iconUrl: towerIconUrl,
        iconSize: [TOWER_WIDTH_PX, TOWER_WIDTH_PX * 4],
        iconAnchor: [TOWER_WIDTH_PX / 2, TOWER_WIDTH_PX * 4],
        popupAnchor: [0, - TOWER_WIDTH_PX * 2],
        shadowUrl: towerShadowUrl,
        shadowSize: [TOWER_WIDTH_PX, TOWER_WIDTH_PX * 4],
        shadowAnchor: [TOWER_WIDTH_PX / 2 - 2, TOWER_WIDTH_PX * 4 - 2]
    });
    const markers: Marker[] = []
    towers.forEach(t => {
        const marker = LF.marker({
            lat: t.lat,
            lng: t.lng
        }, {
            title: t.titolo,
            icon: icon
        })
        marker.bindPopup(customPopup(t), {
            className: "tower-popup",
            closeButton: false
        });
        markers.push(marker);
    });
    cluster.addLayers(markers);
}

function customPopup(tower: Tower) {
    const titoloSplit = tower.titolo.split(/,/);
    return popupTemplate.replace('%PAESE%', titoloSplit[0])
        .replace('%CHIESA%', titoloSplit[1])
        .replace('%NUMERO%', tower.numero.toString())
        .replace('%NOTA%', tower.nota)
        .replace('%SUONABILE%', tower.suonabile)
        .replace('%PESO%', tower.peso.toString());
}