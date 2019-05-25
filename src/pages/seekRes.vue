<template>
    <div class='bg_image' style="min-height: 100%;">
        <head-top></head-top>
        <div>


            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 5%;">
                    <span style="font-family: Helvetica Neue; font-size: 18px">预约信息如下：</span>
                    <el-radio v-model="showsss" label='true'>表格</el-radio>
                    <el-radio v-model="showsss" label='false'>日历</el-radio>

                    <el-row v-if="showsss == 'false'">
                        <el-row>
                            <el-col :span="4" :offset="0" style="margin-top: 10px; margin-left: 2em">
                                <el-input placeholder="请输入老师姓名" v-model='ttname'></el-input>
                            </el-col>
                        </el-row>
                        <el-row>
                            <full-calendar
                                    style="margin-top: 2%"
                                    class="test-fc" :events="resinfo"
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
                        </el-row>
                    </el-row>

                    <el-table
                            v-else
                            :data="resInfo.filter(data => !search || data.t_name.toLowerCase().includes(search.toLowerCase()))"
                            stripe
                            :highlight-current-row="'true'"
                            max-height="480"
                            style="width: 100%; margin-top: 2%">
                        <el-table-column
                                label="状态"
                                width="80">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" plain>
                                    <i class="el-icon-loading"></i>
                                </el-button>
                            </template>
                        </el-table-column>


                        <el-table-column
                                sortable
                                prop="week"
                                label="周次"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="weekday"
                                label="天次"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="segment"
                                label="时间段">
                        </el-table-column>
                        <el-table-column
                                prop="t_name"
                                label="教师">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>姓名: {{ scope.row.t_name }}</p>
                                    <p>邮件: {{ scope.row.t_email }}</p>
                                    <p>电话: {{ scope.row.t_phone }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.t_name }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="place"
                                label="地点">
                        </el-table-column>

                        <el-table-column
                                prop="tips"
                                label="注意事项">
                        </el-table-column>

                        <el-table-column
                                align="right">
                            <template slot="header" slot-scope="scope">
                                <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="输入教师名搜索"/>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="success"
                                        @click="submitRes(scope.$index, scope.row)">预约
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
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
        }]
    ;

    export default {
        name: "seekRes",

        components: {
            'full-calendar': require('vue-fullcalendar'),
            headTop
        },

        data() {
            return {
                ttname: '',
                name: 'Sunny!',
                fcEvents: demoEvents,
                showsss: 'true',
                resInfo: [
                    {

                        week: '第1周',
                        weekday: '周五',
                        segment: '10:30 ^ 11:00',
                        t_name: '***',
                        place: '宋健1号楼***',
                        tips: '',
                        t_email: '',
                        t_phone: '',
                        serial: 1
                    }
                ],
                search: '',
            }
        },
        computed: {
            resinfo() {
                if (this.ttname == '') {
                    return this.fcEvents
                } else {
                    let me = []
                    for (let i = 0; i < this.fcEvents.length; i = i + 1) {
                        if (this.fcEvents[i].t_name == this.ttname) {
                            me.push(this.fcEvents[i])
                        }
                    }
                    return me
                }
            }
        },
        methods: {
            'changeMonth'(current) {
                console.log('changeMonth')
            },
            'eventClick'(event,) {
                console.log('eventClick')
            },
            'dayClick'(jsEvent) {
                console.log(jsEvent)
                if (jsEvent.events.length != 0) {
                    this.$prompt('请输入预约原因', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({value}) => {
                        this.$store.dispatch('post_data', {
                            api: '/api/s_release_reservation',
                            data: {
                                'account': localStorage.getItem('account'),
                                'serial': jsEvent.events[0].serial,
                                'reason': value
                            }
                        }).then((response) => {
                            if (response.data.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '预约成功！'
                                })
                                location.reload()
                            } else {
                                this.$store.commit({
                                    type: 'show_message',
                                    status: response.data.status
                                })
                                console.log(response.data.status)
                                this.$message(this.$store.state.app.message_box)
                            }
                        }).catch((error) => {
                            // // // alert(error)
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });
                    });
                }
            },
            'moreClick'(day, events, jsEvent) {
                console.log('moreCLick', day, events, jsEvent)
            },
            submitRes(index, row) {
                this.$prompt('请输入预约原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    console.log(row)
                    this.$store.dispatch('post_data', {
                        api: '/api/s_release_reservation',
                        data: {
                            'account': localStorage.getItem('account'),
                            'serial': row.serial,
                            'reason': value
                        }
                    }).then((response) => {
                        if (response.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '预约成功！'
                            })
                            location.reload()
                        } else {
                            this.$store.commit({
                                type: 'show_message',
                                status: response.data.status
                            })
                            console.log(response.data.status)
                            this.$message(this.$store.state.app.message_box)
                        }
                    }).catch((error) => {
                        // // alert(error)
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
        },

        mounted() {

            this.$store.dispatch('post_data', {
                api: '/api/seek_reservation',
                data: {}
            }).then((response) => {
                console.log(response.data.ress)
                if (response.data.status == 200) {
                    this.resInfo = response.data.ress
                    let dd = $.extend(true, [], this.resInfo);
                    this.fcEvents = dd
                    console.log(this.fcEvents, 'sss')
                    for (let i = 0; i < this.resInfo.length; i = i + 1) {
                        this.resInfo[i]['segment'] = this.$store.state.map_segment[this.resInfo[i]['segment']]
                        this.resInfo[i]['week'] = this.$store.state.map_week[this.resInfo[i]['week']]
                        this.resInfo[i]['weekday'] = this.$store.state.map_weekday[this.resInfo[i]['weekday']]
                    }
                } else {
                    this.$store.commit({
                        type: 'show_message',
                        status: response.data.status
                    })
                    console.log(response.data.status)
                    this.$message(this.$store.state.app.message_box)
                }
            }).catch((error) => {
                // // alert(error)
            })
        }
    }
</script>

<style scoped>
    .bg_image {
        background-image: url("../assets/bg.jpg");
        background-repeat: repeat;
    }
</style>