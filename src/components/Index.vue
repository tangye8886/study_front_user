<template>
<div>
            <nav class="navbar navbar-default navbar-fixed-top header">
                    <div class="container">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#header-navbar-collapse" aria-expanded="false">
                                <span class="sr-only">实验楼</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand">
                                <router-link to="/home">
                                    <img src="../../static/img/logo_me.png">
                                </router-link>
                            </a>
                        </div>
                        <div class="collapse navbar-collapse" id="header-navbar-collapse">
                            <ul class="nav navbar-nav">
                                <li class="dropdown ">
                                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
                                        课程
                                        <span class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                          <router-link to="/course"><a>全部课程</a></router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div class="navbar-right btns">
                                <div v-if="isLogin==false">
                                  <router-link :to="{path:'/login'}">
                                    <a class="btn btn-default navbar-btn sign-in" data-sign="signin" data-toggle="modal">登录</a>
                                  </router-link>
                                  <a class="btn btn-default navbar-btn sign-up" data-sign="signup"  @click="registerVisal=true">注册</a>
                                </div>
                                <div class="user-info" v-if="isLogin==true">
                                  <el-dropdown>
                                      <span class="el-dropdown-link">
                                          <img class="user-logo" :src="userImage">
                                      </span>
                                      <el-dropdown-menu slot="dropdown">     
                                          <router-link :to="{path:'/userInfo?tab=first'}"><el-dropdown-item>个人中心</el-dropdown-item></router-link>  
                                          <router-link :to="{path:'/userInfo?tab=second'}"><el-dropdown-item>我的订单</el-dropdown-item></router-link>
                                          <router-link :to="{path:'/userInfo?tab=third'}"><el-dropdown-item>足迹</el-dropdown-item></router-link>
                                          <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
                                      </el-dropdown-menu>
                                  </el-dropdown>
                                  <a>{{userName}}</a>
                                </div>
                            </div>
                            <form class="navbar-form navbar-right" method="get" role="search" style="margin-right:30%">
                                <div class="form-group">
                                <el-col :span="30">
                                  <el-autocomplete
                                    class="inline-input"
                                    v-model="searchKey"
                                    :fetch-suggestions="querySearch"
                                    placeholder="请输入您想学习的课程"
                                    :trigger-on-focus="false"
                                    @select="handleSelect"
                                    @keyup.enter.native="find()">
                                    <template slot-scope="{ item }">
                                      <div class="name">{{ item.value }}</div>
                                    </template>
                                  </el-autocomplete>
                                </el-col>
                              </div>
                            </form>

                      <!-- 注册弹出框-->
                        <el-dialog title="注册中心" :visible.sync="registerVisal" width="400px">
                          <el-form :model="registerForm">
                            <el-form-item label="用户名">
                                  <el-input v-model="registerForm.username" autocomplete="off" @change="checkUserName()"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                  <el-input v-model="registerForm.password" autocomplete="off" type="password" ></el-input>
                            </el-form-item>
                          </el-form>
                          <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                            <el-button type="primary" @click="register()" :disabled="isExisit">注 册</el-button>
                          </div>
                        </el-dialog>

                        </div>
                    </div>
           </nav>
    

        <router-view/>   



  <div class="footer">
    <div class="container">
        <div class="row">
            <div class="col-md-4 clearfix footer-col">
                <img src="../../static/img/logo_me.png">
                <div class="footer-slogan">认真看视频，轻松学编程</div>
            </div>
            <div class="col-xs-6 col-sm-3 col-md-2 footer-col">
                <div class="col-title">公司</div>
                <a href="privacy/index.html" target="_blank">关于我们</a><br>
                <a href="privacy/index.html" target="_blank">联系我们</a><br>
                <a href="#" target="_blank">加入我们</a><br>
                <a href="#" target="_blank">技术博客</a><br>
            </div>
            <div class="col-xs-6 col-sm-3 col-md-2 footer-col">
                <div class="col-title">合作</div>
                <a href="privacy/index.html" target="_blank">我要投稿</a><br>
                <a href="labs/index.html" target="_blank">教师合作</a><br>
                <a href="edu/index.html" target="_blank">高校合作</a><br>
                <a href="privacy/index.html" target="_blank">友情链接</a>
            </div>
            <div class="col-xs-6 col-sm-3 col-md-2 footer-col">
                <div class="col-title">服务</div>
                <a href="bootcamp/index.html" target="_blank">实战训练营</a><br>
                <a href="vip/index.html" target="_blank">会员服务</a><br>
                <a href="courses/reports.html" target="_blank">实验报告</a><br>
                <a href="questions/index.html?tag=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98" target="_blank">常见问题</a><br>
                <a href="privacy/index.html" target="_blank">隐私条款</a>
            </div>
            <div class="col-xs-6 col-sm-3 col-md-2 footer-col">
                <div class="col-title">学习路径</div>
                <a href="paths/index.html" target="_blank">Python学习路径</a><br>
                <a href="paths/index.html" target="_blank">Linux学习路径</a><br>
                <a href="paths/index.html" target="_blank">大数据学习路径</a><br>
                <a href="paths/index.html" target="_blank">Java学习路径</a><br>
                <a href="paths/index.html" target="_blank">PHP学习路径</a><br>
                <a href="paths/index.html" target="_blank">全部</a>
            </div>
        </div>
    </div>
    <div class="text-center copyright">
        <span>Copyright @2013-2016 在线教育</span>
        <span class="ver-line"> | </span>
        <a href="#" target="_blank">粤ICP备00000000号</a>
    </div>
</div>       


</div>
</template>

<script>

 export default {
    data() {
      return {
        restaurants: [],
        searchKey: '',
        isLogin:false,
        userName:'',
        userImage:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        registerForm:{
          username:'',
          password:''
        },
        registerVisal:false,
        isExisit:false
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "java", "address": "java" },
          { "value": "python", "address": "python" },
          { "value": "PHP", "address": "PHP" },
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      find(){
        this.$router.push({path:'/course',query:{title:this.searchKey}})
      },
      logout()
      {
          if(confirm("是否退出?"))
          {
            window.sessionStorage.clear();   //清除掉SessionStore里面的内容
            this.$router.push("/login");
          }else{
            this.isLogin=false;
          }
      },
       checkUserName(){
          let that=this;
          that.$axios.get('api/user/userInfo/existUsername?username='+that.registerForm.username).then((response)=>{
            if(response.data)
            {
                that.$message.error("用户名已存在！");
                that.isExisit=true;
            }else{
                that.isExisit=false;
            }
          });
        },
        register(){
          if(this.registerForm.username && this.registerForm.password)
          {
              let jsonData={"username":this.registerForm.username,"password":this.registerForm.password,"flag":0,"role":4,"createder":this.registerForm.username};
              this.$axios.post('api/user/userInfo/insert',jsonData).then((response)=>{
                  //注册成功直接登录
                  // let map=response.data;
                   this.$message.success("注册成功");
                  // sessionStorage.setItem("token",map.token);
                  // sessionStorage.setItem('userName',map.data.username);
                  // sessionStorage.setItem('userinfo_Image',map.data.image);
                  // sessionStorage.setItem('userID',map.data.id);
                  // sessionStorage.setItem('role',map.data.role);
                  this.$router.push("/login");
                  this.registerVisal=false;
              })
          }
        }
    },
    mounted() {
      this.restaurants = this.loadAll();
      if(sessionStorage.getItem('token'))
      {
        if(sessionStorage.getItem('userinfo_Image')) this.userImage=sessionStorage.getItem('userinfo_Image'); // 有登陆的前提下初始化头像
        else this.userImage='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
      }
    },
    updated(){
      this.restaurants = this.loadAll();
      this.userName=sessionStorage.getItem('userName');
      let username=sessionStorage.getItem('userName');
      let token=sessionStorage.getItem('token');
      if(token)
      {
        if(sessionStorage.getItem('userinfo_Image')) this.userImage=sessionStorage.getItem('userinfo_Image'); // 有登陆的前提下初始化头像
        this.userName=username;
        this.isLogin=true;
      }else{
        this.isLogin=false;
      }
    },
    created()
    {
      if(sessionStorage.getItem('token')){
        if(sessionStorage.getItem('userinfo_Image'))this.userImage=sessionStorage.getItem('userinfo_Image');
      }
      this.restaurants = this.loadAll();
      this.userName=sessionStorage.getItem('userName');
      let username=sessionStorage.getItem('userName');
      let token=sessionStorage.getItem('token');
      if(token)
      {
        this.userName=username;
        this.isLogin=true;
      }else{
        this.isLogin=false;
      }
    }
  }
</script>


<style scoped>
 .el-dropdown-link{
                position: relative;
                display: inline-block;
                padding-left: 50px;
                color: #fff;
                cursor: pointer;
                vertical-align: middle;
 }
 .user-logo{
    position: absolute;
    left:0;
    width:40px;
    height:40px;
    border-radius: 50%;
}

.router-link-active {
  text-decoration: none;
}
</style>
