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
                                v-for="(exam, index) in examInfo"
                                :key="index"
                                color="#67C23A"
                                icon="el-icon-check"
                                :timestamp="exam.week">
                            <el-card>
                                <h4>考试名称：{{exam.e_name}}</h4>
                                <el-divider></el-divider>
                                <span>考试地点：{{exam.place}}</span>
                                <el-divider direction="vertical"></el-divider>
                                <span>考试时间：{{exam.week}} {{exam.weekday}} {{exam.start}}-{{exam.end}}</span>
                                <br>
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

        data() {
            return {
                reverse: true,
                myExam: [
                    {
                        e_name: '',
                        t_name: '***',
                        place: '宋健一号院北***',
                        week: '第1周',
                        weekday: '周五',
                        start: '',
                        end: '',
                        serial: ''
                    }
                ],
                search: '',
                examInfo: []
            }
        },

        methods: {},

        mounted() {

            this.$store.dispatch('post_data', {
                api: '/api/s_view_finish_exam',
                data: {
                    'account': localStorage.getItem('account')
                }
            }).then((response) => {
                if (response.data.status == 200) {
                    this.examInfo = response.data.exams
                    for (let i = 0; i < this.examInfo.length; i = i + 1) {
                        this.examInfo[i]['week'] = this.$store.state.map_week[this.examInfo[i]['week']]
                        this.examInfo[i]['weekday'] = this.$store.state.map_weekday[this.examInfo[i]['weekday']]
                        this.examInfo[i]['segment'] = this.$store.state.map_weekday[this.examInfo[i]['segment']]

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