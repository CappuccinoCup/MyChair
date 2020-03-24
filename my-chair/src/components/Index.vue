<template>
  <el-container>

    <!-- 会议申请表单 -->
    <el-dialog title="会议申请" :visible.sync="dialogFormVisible">
      <RegisterConference @close-dialogue="dialogFormVisible = false"/>
    </el-dialog>

    <el-header id="home_header">
      <el-row>
        <el-col :span="15">
          <el-menu mode="horizontal">
            <el-menu-item><h1 class="logo">主页</h1></el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="9">
          <el-menu default-active="1" mode="horizontal">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-submenu index="4">
              <template slot="title">个人中心</template>
              <el-menu-item id="username" index="4-1">{{username}}</el-menu-item>
            </el-submenu>
            <el-menu-item index="5" @click="logout">退出登录</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <h3>工作区</h3>
        <el-menu default-active="3" id="home_menu">

          <el-menu-item index="1" @click="dialogFormVisible = true">
            <i class="el-icon-s-comment"></i>
            <span slot="title">会议申请</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航二</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组二">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">导航五</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main></el-main>
    </el-container>
    <el-footer id="home_footer">
      <div class="info">FudanSoft 2020 SE &copy;GLXLG</div>
    </el-footer>
  </el-container>
</template>

<script>
    import RegisterConference from "./RegisterConference";

    export default {
        name: 'Home',
        data() {
            return {
                dialogFormVisible: false
            }
        },
        computed: {
            username: function () {
                return this.$store.state.userDetails ? this.$store.state.userDetails.username : '用户名';
            }
        },
        components: {
            RegisterConference
        },
        methods: {
            logout: function () {
                this.$store.commit('logout');
                this.$router.replace({path: '/login'});
            }
        }
    }
</script>

<style scoped>
  #home_header .logo {
    margin: 5px;
  }

  #username {
    font-weight: bold;
    text-align: center;
  }

  h3 {
    margin: 20px 0;
  }

  #home_menu {
    text-align: left;
  }

  #home_footer {
    background-color: #F2F6FC
  }

  #home_footer .info {
    padding: 20px;
  }
</style>
