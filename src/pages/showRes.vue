<template>
    <div class='loading' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 10%;">
                    <span style="font-family: Helvetica Neue; font-size: 18px">您的预约信息如下：</span>
                    <el-table
                            :data="myRes"
                            stripe
                            style="width: 100%">
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
                        </el-table-column>
                        <el-table-column
                                prop="place"
                                label="地点">
                        </el-table-column>
                        <el-table-column
                                prop="tips"
                                label="主题">
                        </el-table-column>

                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="handleFinish(scope.$index, scope.row)">完成</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">取消</el-button>
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
        name: "showRes",
        components: {
            headTop
        },

        data() {
            return {
                myRes : [
                    {
                        week: '第1周',
                        weekday: '周五',
                        segment: '10:30 ~ 11:00',
                        t_name: '***',
                        place: '宋健一号院北***',
                        reason: '答疑',
                        tips: '',
                    }
                ]
            }
        },

        methods: {
            handleFinish(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
                console.log(row.teacher)
            }
        },
        mounted() {
            this.$request.post('/api/s_view_reservation', {
                account: localStorage.getItem('account')
            }).then((response) => {
                console.log('sadddddddddddddd')
                console.log(response.data)
                if (response.data.status == 200) {
                    this.myRes = response.data.results
                    console.log('asdasdasd')
                    for (let i = 0; i < this.myRes.length; i = i + 1) {
                        this.myRes[i]['segment'] = this.$store.state.map_segment[this.myRes[i]['segment']]
                        this.myRes[i]['week'] = this.$store.state.map_week[this.myRes[i]['week']]
                        this.myRes[i]['weekday'] = this.$store.state.map_weekday[this.myRes[i]['weekday']]
                    }
                } else if (response.data.status == 201) {
                    this.$message({
                        type: 'error',
                        message: '网络异常，请稍后再试'
                    })
                } else if (response.data.status == 401) {
                    this.$message({
                        type: 'error',
                        message: '网络异常，请稍后再试'
                    })
                }
            }).catch((error) => {
                this.$message({
                    type: 'error',
                    message: '网络异常，请稍后再试'
                })
            })
        }
    }
</script>

<style scoped>

</style>