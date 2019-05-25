<template>
    <div class="bg_image">
        <head-top></head-top>
        <p>
        </p>
        <full-calendar class="test-fc" :events="fcEvents"
                       first-day='1' locale="zh"
                       @changeMonth="changeMonth"
                       @eventClick="eventClick"
                       @dayClick="dayClick"
                       @moreClick="moreClick">
            <template slot="fc-event-card" scope="p">
                <span style="font-weight: bolder; opacity: 1.0">&nbsp;老师：</span>
                <span>{{p.event.t_name}}</span>
                <br>
                <span style="font-weight: bolder; opacity: 1.0">地点：</span>
                <span>{{p.event.place}}</span>
                <br>
                <span style="font-weight: bolder; opacity: 100;">注意事项：</span>
                <span>{{p.event.tips}}</span>
            </template>
        </full-calendar>
    </div>
</template>
<script>
    import headTop from '../components/Header'

    let demoEvents = [
        {
            'score': '5',
            'segment': '2',
            's_name': 'zhijie zhang',
            'tips': '带书',
            'serial': '3',
            'place': '宋健',
            'weekday': '4',
            't_name': '张志捷',
            'reason': '看书',
            'week': '4',
            'cssClass': 'family'
        }];

    export default {
        data() {
            return {
                name: 'Sunny!',
                fcEvents: demoEvents
            }
        },
        components: {
            'full-calendar': require('vue-fullcalendar'),
            headTop
        },
        mounted() {
            this.$store.dispatch('post_data', {
                api: '/api/s_view_reservation',
                data: {
                    account: localStorage.getItem('account')
                }
            }).then((response) => {
                console.log(response.data.ress)
                if (response.data.status == 200) {
                    this.fcEvents = response.data.ress;
                } else {
                    this.$store.commit({
                        type: 'show_message',
                        status: response.data.status
                    });
                    console.log(response.data.status);
                    this.$message(this.$store.state.app.message_box)
                }
            }).catch((error) => {
                alert(error)
            })
        },
        methods: {
            'changeMonth'(current) {
                console.log('changeMonth')
            },
            'eventClick'(event,) {
                console.log('eventClick')
            },
            'dayClick'(jsEvent) {
                console.log('dayClickdsdsds', jsEvent)
            },
            'moreClick'(day, events, jsEvent) {
                console.log('moreCLick', day, events, jsEvent)
            }
        }
    }
</script>
<style scoped>
    .bg_image {
        background-image: url("../assets/bg.jpg");
        height: 200%;
        background-repeat: repeat;
    }
</style>
