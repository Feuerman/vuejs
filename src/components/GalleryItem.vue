<template>
    <div class="gallery__item">
        <gmap-map
            :center="center"
            style="width: 100%; height: 500px"
            :zoom="10"
        ></gmap-map>
        {{this.location}}
    </div>
</template>

<script>
    export default {
        props: ['location'],
        data() {
            return {
                center: {
                    lat: 0,
                    lng: 0
                }
            }
        },
        created() {
            this.geoCode()
        },
        mounted() {},
        watch: {
            'location': function () {
                this.geoCode()
            }
        },
        methods: {
            geoCode() {
                console.log(this.location)
                var _ = this;
                var geocoder = new google.maps.Geocoder();
                var address = this.location
                geocoder.geocode({'address': address}, function(results, status) {
                    if (status === 'OK') {
                        _.center = {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng()
                        }
                    } else {
//                        console.log('error');
                    }
                });
            }
        }
    }
</script>

