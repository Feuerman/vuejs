<template>
    <div class="products__item">
        <div class="title">{{ data.title }}</div>
        <transition name="slide-fade">
            <div class="timer" v-if="countdown">{{ countdown }}</div>
        </transition>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        props: ['data'],
        data() {
            return {
                countdown: ''
            }
        },
        created() {
            this.timer()
        },
        methods: {
            timer() {
                let _ = this,
                    eventTime= new Date(this.data.endDate).getTime(),
                    currentTime = new Date().getTime(),
                    diffTime = eventTime - currentTime,
                    duration = moment.duration(diffTime, 'milliseconds');

                setInterval(function(){
                    duration = moment.duration(duration - 1000, 'milliseconds');
                    _.countdown = duration.days() + ":" + duration.hours() + ":" + duration.minutes() + ":" + duration.seconds()
                }, 1000);
            }
        }
    }
</script>