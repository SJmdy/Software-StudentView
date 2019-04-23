<template>
    <div class='loading' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 5%;">
                    <span style="font-family: Helvetica Neue; font-size: 14px">历史考试信息如下：</span>
                    <div class="block">
                        <div class="radio">
                            <span style="font-family: Helvetica Neue; font-size: 14px">排序：</span>
                            <el-radio-group v-model="reverse">
                            <el-radio :label="true">倒序</el-radio>
                            <el-radio :label="false">正序</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="block">
            <el-row>
            <el-col :span="20" :offset="2" style="margin-top: 5%;">
            <el-timeline :reverse="reverse">
                <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp">
                <el-card>
                    <h4>{{activity.e_name}}</h4>
                    <p>{{activity.place}}   {{activity.start}}-{{activity.end}}</p>
                </el-card>
                </el-timeline-item>
            </el-timeline>
            </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/Header'

    export default {
        name: "hisExam",

        components: {
            headTop
        },

        data () {
            return {
                reverse: true,
                myExam : [
                    {
                        e_name:'',
                        t_name: '***',
                        place: '宋健一号院北***',
                        week: '第1周',
                        weekday: '周五',
                        start:'',
                        end:'',
                        serial:''
                    }
                ],
                search: '',
            }
        },

        methods: {
            
        },

        mounted() {

            this.$store.dispatch('post_data', {
                api: '/api/s_view_finish_exam',
                data: {account: localStorage.getItem('account')}
            }).then((response) => {
                if (response.data.status == 200) {
                    this.myExam = response.data.exams
                    for (let i = 0; i < this.resInfo.length; i = i + 1) {
                        this.myExam[i]['week'] = this.$store.state.map_week[this.myExam[i]['week']]
                        this.myExam[i]['weekday'] = this.$store.state.map_weekday[this.myExam[i]['weekday']]
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
                alert(error)
            })
        }
    }
</script>

<style scoped>

</style>