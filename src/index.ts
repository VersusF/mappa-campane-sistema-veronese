import "leaflet";
import { Marker, MarkerClusterGroup } from "leaflet";
import "leaflet.markercluster";
const LF = window['L'];
const towerIconUrl = require("./assets/towerIcon.svg");
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
                iconSize: [40, 35]
            })
        }
    });

    // Add data
    const towers: Tower[] = require('./assets/torri2.min.json');
    addTowers(cluster, towers);
    map.addLayer(cluster);
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

function addTowers(cluster: MarkerClusterGroup, towers: Tower[]) {
    const icon = LF.icon({
        iconUrl: towerIconUrl,
        iconSize: [TOWER_WIDTH_PX, TOWER_WIDTH_PX * 4],
        iconAnchor: [TOWER_WIDTH_PX / 2, TOWER_WIDTH_PX * 4],
        tooltipAnchor: [TOWER_WIDTH_PX / 2, TOWER_WIDTH_PX * 2]
    });
    const markers: Marker[] = []
    towers.forEach(t => {
        const marker = LF.marker({
            lat: t.latitude,
            lng: t.longitude
        }, {
            title: t.properties.titolo,
            icon: icon
        })
        marker.on("click", () => {
            console.log(t.properties.titolo);
        });
        marker.bindPopup(t.properties.titolo);
        markers.push(marker);
    });
    cluster.addLayers(markers);
}