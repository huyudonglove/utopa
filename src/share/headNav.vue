<template>
  <div class="nav-common container">
    <div class="nav-common" style="float:left" >
      <div class="logo">
        <div>Utopa AR</div>
      </div>
      <div style="float:left">
         <span class="logoTitle">Utopa AR后台</span>
         <el-menu style="float:left"
        mode="horizontal"
        class="el-menu-demo"
        text-color="#333"
        active-text-color="#FF644E"
        router
        :default-active="$route.path"
        @select="handleSelect"
      >
        <headMenu :headMenus="menus"></headMenu>
      </el-menu>


      </div>
      <div class="user" >

        <!-- <span>{{userRole}}</span> -->
        <span>{{userName}}</span>
        <span class="btn_logout cur"  @click="logOut()">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64';
import headMenu from "@/share/headMenu.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "headNav",
  data() {
    return {
        roleCode:'',
        userName:'',
        loginName:'',
        subjectCode:"3",
    };
  },
 created(){
    function getCookie(name)
    {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  　　 return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
    }
    let  token = getCookie('backgroundToken')
    if(token){
    let arr=token.split('.')
    let tokenMsg=arr[1];
    let tokens = Base64.decode(tokenMsg);
    let Obj=JSON.parse(tokens)
    this.loginName=Obj.loginName
    this.roleCode = Obj.userCode
    this.userName = Obj.userName
     }
    this.$store.dispatch("navMenu/menuInit",{subjectCode:this.subjectCode,roleCode:this.roleCode,routeName:this.$route.path})
  },

   computed:{
  ...mapState('navMenu',{menus:'menus'}),
  },
  methods: {
      logOut(){
        this.$confirm('确认退出AR吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path:'/logout'
          })
        }).catch(() => {
          return
        });
      },
    handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }

  },
  watch:{
    $route(){
      	this.$store.dispatch("navMenu/menuInit",{subjectCode:this.subjectCode,roleCode:this.roleCode,routeName:this.$route.path})
    }
  },
  components: {
    headMenu
  }

};
</script>

<style scoped>
.container{ position: relative;}
.nav-common{background:#fff;color: #FF644E; overflow: hidden; height:60px;}
  .logo{ float:left; width: 210px;background: #fff;height:59px;border-bottom:2px solid #f0f0f0}
  .logo div{ background: url("../assets/logo.png") no-repeat center  center;text-indent:-999px;width: 100%; height: 100%;}


  .user{padding-left:20px;margin-top:20px;text-align: right; font-size: 14px;border-bottom: 2px solid #f0f0f0;height: 39px; line-height: 22px;position: absolute;right:15px;}
  .logoTitle{
    font-size:22px;font-weight: 500;text-align: left;float: left;margin-left: 20px;color:#FF644E;line-height: 60px;
  }
  .user span{margin-right:10px;position:relative; }
  .user span.logout{ font-size:16px}
  .cur{ cursor: pointer;
  }

</style>
