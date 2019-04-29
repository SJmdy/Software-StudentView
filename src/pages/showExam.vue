<template>
    <div class='loading' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 10%;">
                    <span style="font-family: Helvetica Neue; font-size: 14px">您等待完成的考试如下：</span>
                    <el-button type="text" @click="changeShowModus">{{show_modus}}</el-button>
                    <div class="block" style="margin-bottom: 5%;">
                        <div class="radio">
                            <span style="font-family: Helvetica Neue; font-size: 14px">排序：</span>
                            <el-radio-group v-model="reverse">
                                <el-radio :label="true">倒序</el-radio>
                                <el-radio :label="false">正序</el-radio>
                            </el-radio-group>
                        </div>
                    </div>

                    <el-timeline
                            v-if="show_time_line"
                            :reverse="reverse">
                        <el-timeline-item
                                v-for="(exam, index) in myExam"
                                :key="index"
                                :timestamp="exam.week">
                            <el-card>
                                <el-col :span="12">
                                    <h4>{{exam.e_name}}&nbsp;&nbsp;&nbsp;任课教师：{{exam.t_name}}</h4>
                                    <p>地点：{{exam.place}} 时间：{{exam.weekday}}&nbsp;{{exam.segment}}</p>
                                    <p>tips：{{exam.tips}}</p>
                                </el-col>
                                <el-col :span="12">
                                    <el-button
                                            size="mini"
                                            @click="handleFinish(index, exam)">完成</el-button>
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            @click="handleDelete(index, exam)">删除</el-button>
                                </el-col>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>

                    <el-table
                            v-else
                            :data="myExam"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="e_name"
                                label="课程名"
                                width="100">
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
                                prop="start"
                                label="开始时间">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="end"
                                label="结束时间">
                        </el-table-column>
                        <el-table-column
                                prop="t_name"
                                label="教师"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="place"
                                label="地点"
                                width="100">
                        </el-table-column>

                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="handleFinish(scope.$index, scope.row)">完成</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

    export default {
        name: "showExam",
        components: {
            headTop
        },

        data() {
            return {
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

                show_time_line: true,
                reverse: false,
                show_modus: '以列表形式显示',
            }
        },

        methods: {
            handleFinish(index, row) {
                this.$confirm('预约已完成？',{
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                }).then(({value})=>{
                    console.log(row)
                    this.$store.dispatch('post_data', {
                        api: '/api/s_finish_exam',
                        data: {
                            'account': localStorage.getItem('account'),
                            'serial': row.serial
                        }
                    }).then((response) => {
                        if (response.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '预约已完成！'
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
                        alert(error)
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: ' '
                    });
                })
                //console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
                console.log(row.t_name)
            },
            changeShowModus () {
                if (this.show_time_line) {
                    this.show_time_line = false;
                    this.show_modus = '以时间线形式显示';
                }
                else {
                    this.show_time_line = true;
                    this.show_modus = '以列表形式显示';
                }
            }
        },
        mounted() {
            this.$store.dispatch('post_data', {
                api: '/api/view_own_exams',
                data: {
                    account: localStorage.getItem('account')
                }
            }).then((response) => {
                if (response.data.status == 200) {
                    this.myExam = response.data.exams
                    for (let i = 0; i < this.myExam.length; i = i + 1) {
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