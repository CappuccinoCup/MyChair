<template>
  <div class="register-conference-container">
    <el-form :rules="rules" :model="form" ref="form" label-width="80px" v-loading="loading">

      <el-form-item label="会议简称" prop="shortname">
        <el-input v-model="form.shortname"/>
      </el-form-item>

      <el-form-item label="会议全称" prop="fullname">
        <el-input v-model="form.fullname"/>
      </el-form-item>

      <el-form-item label="举办地点" prop="place">
        <el-input v-model="form.place"/>
      </el-form-item>

      <el-form-item label="举办日期" prop="dateHeld">
        <el-date-picker class="fd-date-picked" type="date" value-format="yyyy-MM-dd" placeholder="选择举办日期"
                        v-model="form.dateHeld"/>
      </el-form-item>


      <el-form-item label="截止日期" prop="deadline">
        <el-date-picker class="fd-date-picked" type="date" value-format="yyyy-MM-dd" placeholder="选择投稿截止日期"
                        v-model="form.deadline"/>
      </el-form-item>

      <el-form-item label="发布日期" prop="dateReleased">
        <el-date-picker class="fd-date-picked" type="date" value-format="yyyy-MM-dd" placeholder="选择评审结果发布日期"
                        v-model="form.dateReleased"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="confirmRegisterConference">创建</el-button>
        <el-button type="plain" @click="cancelRegisterConference">取消</el-button>
      </el-form-item>

    </el-form>

  </div>

</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                form: {
                    shortname: '',
                    fullname: '',
                    place: '',
                    dateHeld: '',
                    deadline: '',
                    dateReleased: ''
                },
                rules: {
                    shortname: [
                        {required: true, message: '请输入会议简称', trigger: 'blur'},
                    ],
                    fullname: [
                        {required: true, message: '请输入会议全称', trigger: 'blur'}
                    ],
                    place: [
                        {required: true, message: '请输入举办地点', trigger: 'blur'}
                    ],
                    dateHeld: [
                        {type: 'string', required: true, message: '请选择举办日期', trigger: 'blur'}
                    ],
                    deadline: [
                        {type: 'string', required: true, message: '请选择投稿截止日期', trigger: 'blur'}
                    ],
                    stringReleased: [
                        {type: 'string', required: true, message: '请选择评审结果发布日期', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            confirmRegisterConference() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$axios.post('/registerConference',
                            {
                                ...this.form,
                                username: this.$store.state.userDetails.username
                            }
                        ).then(res => {
                            // console.log(res);
                            if (res.status === 200) {
                                this.$message({
                                    showClose: true, type: 'success',
                                    message: '会议申请成功'
                                })
                            } else {
                                this.$message({
                                    showClose: true, type: 'warning',
                                    message: '会议申请失败'
                                })
                            }
                        }).catch(() => {
                            // console.log(error);
                            this.$message({
                                showClose: true, type: 'error',
                                message: '用户认证错误'
                            });
                        }).finally(() => {
                            this.loading = false;
                            setTimeout(
                                () => this.cancelRegisterConference(),
                                100
                            )
                        });
                    }
                });
            },
            cancelRegisterConference() {
                for (let key in this.form) {
                    this.form[key] = '';
                }
                this.$emit('close-dialogue');
            }
        }
    }
</script>
<style>

  .fd-date-picked {
    width: 100% !important;
  }

</style>
