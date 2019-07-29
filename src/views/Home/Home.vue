<template>
  <div id='home' class='eas-flex' style='flex-direction: column; justify-content: flex-start;'>
    <div class='eas-flex eas-home-navigation'>
      <!-- <img src='/assets/images/logo-main-dark.png' style='padding: 0px 10px; width: auto; height: 80%;'> -->
      <el-menu :default-active='$route.path' mode='horizontal'  class="el-menu-demo"  router >
        <template v-for='i in modules'>
          <el-menu-item v-if='!i.children' :key='i.path' :index='i.path'>
            <i :class='`${i.iconClass} menu-item`'></i>
            {{i.title}}
          </el-menu-item>
          <el-submenu v-else :index='i.path' :key='i.path'>
            <template slot='title'>
              <i :class='`${i.iconClass} menu-item`'></i>
              {{i.title}}
            </template>
            <el-menu-item :index='item.path' :key='item.path' v-for='item in i.children'>{{item.meta.title}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>

      <div style='position: absolute; right: 10px;'>
        <span ref='currentTime' style='font-size: 0.85em; padding-right: 20px;'></span>
        <el-dropdown @command='userDropDown' trigger='click' style='padding-right: 5px;'>
          <el-button type='text'>{{myAccount.data ? myAccount.data.nickname : ''}}</el-button>
          <el-dropdown-menu slot='dropdown' style='width: 120px; padding: 0px; font-size: 0.85em;'>
            <el-dropdown-item command='editUser'>修改资料</el-dropdown-item>
            <el-dropdown-item command='logout'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <dialog-edit-user ref='dialogEditUser'></dialog-edit-user>
    <router-view class='eas-home-container'></router-view>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import axios from 'axios';
import { RouteConfig } from 'vue-router';
import DialogEditUser from '@/components/DialogEditUser.vue';
import API from '../../api';
import { routes } from '../../router';
import { Mutation } from 'vuex-class'

@Component({
  components: {
    DialogEditUser
  }
})
export default class Home extends Vue {
  $refs!:{
    dialogEditUser: DialogEditUser,
    currentTime:any
  }
  @Mutation ('allUsers') saveAllUsers;
  public myAccount: any = {};
  public modules: any[] = [];
  public allUsers:any[]=[];

  public async created() {
    setInterval(() => {
      const t: any = this.$refs.currentTime;
      if (t) t.innerText = moment().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);
    this.myAccount = (await API.user.getMyAccount()) || {};
    this.allUsers = await API.user.getAllUsers() || [];
    this.saveAllUsers( this.allUsers );
  }

  async mounted() {
    this.initModules();
    this.$router.push({ path: this.modules[0].path });
    this.$nextTick(async () => {
      this.myAccount = (await API.user.getMyAccount()) || {};
    })
  }

  public initModules() {
    const homeRoutes = routes.find(r => r.name === 'home');
    this.modules = homeRoutes!.children!.map(({ path, meta, children }) => {
      const { title, iconClass } = meta;
      if (children) {
        children.forEach(item => {
          item.path = homeRoutes!.path + path + '/' + item.path;
        });
        return { path: homeRoutes!.path + path, title, iconClass, children };
      } else {
        return { path: homeRoutes!.path + path, title, iconClass };
      }
    });
  }
  
  private async userDropDown(cmd: string) {
    switch (cmd) {
      case 'editUser':
        this.$refs.dialogEditUser.popup(this.myAccount.data);
        break;
      case 'logout':
        sessionStorage.removeItem('AUTH_TOKEN');
        localStorage.removeItem('AUTH_TOKEN');
        axios.defaults.headers.common.Authorization = null;
        this.$router.push({ path: '/login' });
        break;
      default:
        break;
    }
  }
}
</script>
<style lang='scss'>
  #home{
   .el-menu--horizontal>.el-menu-item{
      height: 42px ;
      line-height: 42px ;
      .el-submenu__title{
        height: 42px;
      }
    }
   .el-menu--horizontal>.el-submenu .el-submenu__title{
     height: 42px;
     line-height: 42px;
   }
  }
</style>
<style lang='scss' scoped>
  #home {
  .eas-home-navigation {
    flex-direction: row;
    justify-content: flex-start;
    height: $navHeight;
    box-shadow: 0px 0px $navShadow gray;
    background-color: white;
    opacity: 1;
  }
  .eas-home-container {
    position: absolute;
    left: $bindBlank;
    top: $navHeight + $navShadow * 2;
    right: 0px;
    bottom: $bindBlank;
  }
  .menu-item {
    display: inline-block;
    width: 24px;
    height: 18px;
    margin-right: 5px;
    line-height: 18px;
    text-align: center;
    font-size: 18px;
  }

}
</style>

<style lang='scss' scoped>
#home {
}
</style>
