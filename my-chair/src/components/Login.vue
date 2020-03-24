<template>
  <div id="base_login">
    <el-form :model="loginForm" :rules="rules" label-position="left" label-width="0px"
             v-loading="loading" :ref="loginForm" class="login_container">
      <h3 class="login_title">登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"/>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="10" :offset="1">
            <el-button type="primary" v-on:click="login(loginForm)"
                       style="width: 100%;background: #909399;border: none">登录
            </el-button>
          </el-col>
          <el-col :span="10" :offset="2">
            <router-link to="/register">
              <el-button type="primary"
                         style="width: 100%;background: #C0C4CC;border: none">注册
              </el-button>
            </router-link>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                    password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
                },
                loading: false
            }
        },
        methods: {
            login(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 前端检测通过，先显示loading
                        this.loading = true;
                        this.$axios.post('/login', {
                            username: this.loginForm.username,
                            password: this.loginForm.password
                        })
                            .then(resp => {
                                if (resp.status === 200 && resp.data.token) {
                                    this.$message({
                                        showClose: true, type: 'success',
                                        message: '登录成功'
                                    });
                                    this.$store.commit('login', resp.data);
                                    this.$router.replace({path: '/'});
                                } else {
                                    this.$message({
                                        showClose: true, type: 'error',
                                        message: '登录错误'
                                    });
                                }
                            })
                            .catch(error => {
                                this.$message({
                                    showClose: true, type: 'error',
                                    message: (error.message === "用户名错误" || error.message === "密码错误") ?
                                        "用户名或密码错误" : '登录失败，请检查网络设置'
                                });
                            })
                            .finally(() => {
                                // 隐藏loading
                                this.loading = false;
                            })
                    } else {
                        // 不符合填写规范
                        this.$message({
                            showClose: true, type: "error",
                            message: "用户名或密码为空"
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
  #base_login {
    background: url("/img/login_background.jpg") center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .login_container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 90px 90px 70px 90px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #494e8f;
  }
</style>
