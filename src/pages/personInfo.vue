<template>
    <div>
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="16" :offset="2" style="margin-top: 10%">
                    <span>修改 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <el-switch v-model="disabled"
                                                                                 @change="changedis"></el-switch></span>
                    <el-form style="margin-top: 2%" :label-position="labelPosition" label-width="80px"
                             :model="personInfo" :rules="rules">
                        <el-form-item label="姓名" prop="name">
                            <el-input :disabled="disabled2" v-model="personInfo.name"></el-input>
                        </el-form-item>
                        <el-form-item label="学号">
                            <el-input :disabled="disabled2" v-model="personInfo.number"></el-input>
                        </el-form-item>
                        <el-form-item label="email">
                            <el-input :disabled="disabled2" v-model="personInfo.email"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码">
                            <el-input :disabled="disabled2" v-model="personInfo.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="院系">
                            <el-input :disabled="disabled2" v-model="personInfo.department"></el-input>
                        </el-form-item>
                        <el-form-item label="班级">
                            <el-input :disabled="disabled2" v-model="personInfo.classroom"></el-input>
                        </el-form-item>
                        <el-form-item label="兴趣方向">
                            <el-input :disabled="disabled2" v-model="personInfo.direction"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" plain :disabled="disabled2" @click="submitPerInfo">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/Header'

    export default {
        name: "personInfo",
        components: {
            headTop
        },

        data() {
            let validatePass = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请输入姓名'));
                } else {
                    if (this.SignUpForm.name !== '') {
                        this.$refs.SignUpForm.validateField('name');
                    }
                    callback();
                }
            };
            return {

                labelPosition: 'left',


                disabled: false,
                disabled2: true,
                personInfo: {
                    name: '',
                    email: '',
                    phone: '',
                    department: '',
                    number: '',
                    classroom: '',
                },

                rules: {
                    name: [
                        {validator: validatePass, trigger: 'blur', required: true}
                    ]
                }
            }
        },
        methods: {
            changedis() {
                console.log(this.disabled2)
                this.disabled2 = !this.disabled2
            },

            submitPerInfo() {
                this.$request.post('/api/submit_per_info', {
                    identify: this.$store.state.identify,
                    name: this.personInfo.name,
                    email: this.personInfo.email,
                    classroom: this.personInfo.classroom,
                    direction: this.personInfo.direction,
                    introduction: this.personInfo.introduction,
                    // workplace: this.personInfo.workplace,
                    phone: this.personInfo.phone,
                    department: this.personInfo.department,
                    number: this.personInfo.number,
                    account: localStorage.getItem('account')
                }).then((response) => {
                    console.log(response.data)
                    if (response.data.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '发布成功'
                        })

                        this.$store.commit({
                            'type' :'sidebar_disabled',
                            'sidebar_disabled': false
                        })
                        localStorage.setItem('sidebar_disabled', 'false')
                        this.disabled2 = true
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

        },

        mounted() {
            this.$request.post('/api/get_s_info', {
                'account': localStorage.getItem('account')
            }).then((response) => {
                console.log(response.data)
                if (response.data.status == 200) {
                    this.personInfo = response.data.info
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