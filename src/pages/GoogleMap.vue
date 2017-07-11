<template>
    <div class="container">
        <!--<div class="destination">-->
            <!--<div class="destination__item" @click="setDestinationMode('start')">-->
                <!--<b>Start: </b>-->
                <!--<gmap-autocomplete @place_changed="setWaypoint"></gmap-autocomplete>-->
            <!--</div>-->
            <!--<div class="destination__item" @click="setDestinationMode('end')">-->
                <!--<b>End: </b>-->
                <!--<gmap-autocomplete @place_changed="setWaypoint"></gmap-autocomplete>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="map">-->
            <!--<gmap-map-->
                    <!--ref="map"-->
                    <!--:center="center"-->
                    <!--:zoom="10"-->
                    <!--style="width: 100%; height: 100%"-->
            <!--&gt;-->
            <!--</gmap-map>-->
            <!--<transition name="fade">-->
                <!--<button class="direction-btn" @click="showPanel" v-if="direction.steps.length"><</button>-->
            <!--</transition>-->
            <!--<transition name="slide-right">-->
                <!--<div class="direction" v-if="direction.showPanel">-->
                    <!--<div class="direction__step"-->
                        <!--v-for="item in direction.steps"-->
                        <!--@click="showDirectionLine(item)"-->
                    <!--&gt;-->
                        <!--<div class="direction__step-instructions" v-html="item.instructions"></div>-->
                        <!--<div class="direction__step-distance" v-html="item.distance.text"></div>-->
                        <!--<div class="direction__step-duration" v-html="item.duration.text"></div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</transition>-->
        <!--</div>-->
        <v-map style="height: 500px; width: 100%;" :zoom="zoom" :center="center">
            <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
            <v-marker :lat-lng="marker"></v-marker>
        </v-map>
    </div>
</template>

<script>
    import Vue2Leaflet from 'vue2-leaflet';

    export default {
        components: {
            'v-map': Vue2Leaflet.Map,
            'v-tilelayer' :Vue2Leaflet.TileLayer,
            'v-marker': Vue2Leaflet.Marker
        },
        data () {
            return {
//                center: {lat: 10.0, lng: 10.0},
                destination: {
                    inputMode: '',
                    start: {
                        formatted_address: 'Москва, Россия'
                    },
                    end: {
                        formatted_address: 'Самара, Россия'
                    }
                },
                directionsService: {},
                directionsDisplay: {},
                direction: {
                    showPanel: false,
                    steps: []
                },
                flightPath: {},
                zoom:13,
                center: L.latLng(47.413220, -1.219482),
                url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker: L.latLng(47.413220, -1.219482),
            }
        },
        mounted() {
            setTimeout(() => {
                this.init()
            }, 1000)
        },
        methods: {
            init() {
                this.directionsService = new google.maps.DirectionsService,
                this.directionsDisplay = new google.maps.DirectionsRenderer
                this.directionsDisplay.setMap(this.$refs.map.$mapObject)
                this.calculateAndDisplayRoute()
            },
            calculateAndDisplayRoute() {
                let _ = this

                _.directionsService.route({
                    origin: _.destination.start.formatted_address,
                    destination: _.destination.end.formatted_address,
                    travelMode: 'DRIVING'
                }, (response, status) => {
                    if (status === 'OK') {
                        _.directionsDisplay.setDirections(response)
                        _.direction.steps = response.routes[0].legs[0].steps
                    } else {
                        console.log('Directions request failed due to ' + status)
                    }
                });
            },
            setWaypoint(place) {
                this.destination[this.destination.inputMode] = place

                if(this.destination.start.formatted_address && this.destination.end.formatted_address) {
                    this.calculateAndDisplayRoute()
                }
            },
            setDestinationMode(mode) {
                this.destination.inputMode = mode
            },
            showPanel() {
                this.direction.showPanel = !this.direction.showPanel
            },
            showDirectionLine(item) {
                let polyline = google.maps.geometry.encoding.decodePath(item.polyline.points);

                this.flightPath = new google.maps.Polyline({
                    path: item.path,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: .5,
                    strokeWeight: 3
                });

                let bounds = new google.maps.LatLngBounds()
                this.flightPath.getPath().forEach((e) => {
                    bounds.extend(e)
                })
                this.$refs.map.$mapObject.fitBounds(bounds)

                this.flightPath.setMap(null)
                this.flightPath.setMap(this.$refs.map.$mapObject)
            }
        }
    }
</script>

<style lang="scss">
    .map {
        overflow: hidden;
        position: relative;
        height: 500px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .destination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        &__item {
            width: 48%;
            b {
                margin-right: 10px;
            }
            input {
                width: 100%;
            }
        }
    }
    .direction {
        position: absolute;
        top: 0;
        right: 0;
        width: 30%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #fff;
        &-btn {
            z-index: 100;
            display: block;
            width: 30px;
            height: 30px;
            line-height: 20px;
            border: none;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 10px;
            margin: auto;
            background-color: #fff;
            border-radius: 5px;
            font-size: 16px;
        }
        &__step {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            padding: 10px;
            border-bottom: 1px #ccc solid;
            &-distance {

            }
            &-duration {
                margin-left: 20px;
            }
            &-instructions {
                width: 100%;
                margin-bottom: 10px;
            }
        }
    }
</style>