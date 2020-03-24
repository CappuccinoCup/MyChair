<template>
  <div id="base_register">
    <el-form :model="registerForm" :rules="rules" label-position="left" label-width="0px"
             v-loading="loading" :ref="registerForm" class="register_container">
      <h3 class="register_title">注册</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="registerForm.username"
                  auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="registerForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="conpassword">
        <el-input type="password" v-model="registerForm.conpassword"
                  auto-complete="off" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="text" v-model="registerForm.email"
                  auto-complete="off" placeholder="电子邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="organization">
        <el-input type="text" v-model="registerForm.organization"
                  auto-complete="off" placeholder="所属单位，如：复旦大学"></el-input>
      </el-form-item>
      <el-form-item prop="region">
        <el-input type="text" v-model="registerForm.region"
                  auto-complete="off" placeholder="所在地区，如：中国"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="register(registerForm)"
                   style="width: 100%;background: #909399;border: none">注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            const checkUsername = (rule, value, callback) => {
                const usernamePattern = /^([a-z]|-)+([a-z]|[0-9]|-|_)*$/i;
                const usernameNumber = /^([a-z]|[0-9]|-|_){5,32}$/i;
                if (!usernamePattern.test(value)) {
                    callback(new Error('用户名仅支持字母、数字、- 和 _且以字母或 - 开头'));
                } else if (!usernameNumber.test(value)) {
                    callback(new Error('用户名应为5-32个字符'));
                } else {
                    callback();
                }
            };
            const checkPassword = (rule, value, callback) => {
                if (value.length < 6 || value.length > 32) {
                    callback(new Error('密码应为6-32个字符'));
                } else {
                    const patterns = [/[a-z]/i, /[0-9]/, /-/, /_/];
                    let kinds = 0;
                    // 遍历字符串，计算字符种类
                    for (let i = 0; i < patterns.length; i++) {
                        if (patterns[i].test(value)) kinds++;
                    }
                    if (kinds < 2) {
                        callback(new Error('密码应包含字母、数字、- 和 _ 中至少两种'));
                    } else if (value.search(this.registerForm.username) !== -1) {
                        callback(new Error('密码不应包含用户名'));
                    } else {
                        callback();
                    }
                }
            };
            const confirmPassword = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            const checkEmail = (rule, value, callback) => {
                const emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
                if (!emailPattern.test(value)) {
                    callback(new Error('电子邮箱格式错误'));
                } else {
                    callback();
                }
            };
            return {
                registerForm: {
                    username: '',
                    password: '',
                    conpassword: '',
                    email: '',
                    organization: '',
                    region: ''
                },
                rules: {
                    // blur 失去鼠标焦点时触发验证
                    username: [{required: true, message: '用户名不能为空', trigger: 'blur'}, {
                        validator: checkUsername,
                        trigger: 'blur'
                    }],
                    password: [{required: true, message: '密码不能为空', trigger: 'blur'}, {
                        validator: checkPassword,
                        trigger: 'blur'
                    }],
                    conpassword: [{validator: confirmPassword, trigger: 'blur'}],
                    email: [{required: true, message: '电子邮箱不能为空', trigger: 'blur'}, {
                        validator: checkEmail,
                        trigger: 'blur'
                    }],
                    organization: [{required: true, message: '所属单位不能为空', trigger: 'blur'}],
                    region: [{required: true, message: '所在区域不能为空', trigger: 'blur'}]
                },
                loading: false
            }
        },
        methods: {
            register(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 前端检测通过，显示loading
                        this.loading = true;
                        this.$axios.post('/register', {
                                username: this.registerForm.username,
                                password: this.registerForm.password,
                                email: this.registerForm.email,
                                organization: this.registerForm.organization,
                                region: this.registerForm.region
                            }
                        )
                            .then(resp => {
                                // 根据后端的返回数据修改
                                if (resp.status === 200) {
                                    // 跳转到login
                                    this.$message({
                                        showClose: true, type: 'success',
                                        message: '注册成功'
                                    });
                                    this.$router.replace('/login');
                                } else {
                                    this.$message({
                                        showClose: true, type: 'warning',
                                        message: '注册错误'
                                    });
                                }
                            })
                            .catch(error => {
                                this.$message({
                                    showClose: true, type: 'error',
                                    message: error.message ? error.message : '注册失败，请检查网络设置'
                                });
                            })
                            .finally(() => {
                                // 隐藏loading
                                this.loading = false;
                            })
                    } else {
                        // 不符合填写规范
                        this.$message({
                            showClose: true, type: 'error',
                            message: '提交格式错误'
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
  #base_register {
    background: url("/img/login_background.jpg") center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  .register_container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 60px auto;
    width: 350px;
    padding: 80px 80px 60px 80px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .register_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
