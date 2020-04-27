<template>
    <div>
        <div class="navbar-banner layout-no-margin-top">
                <div class="banner-container">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-7">
                                <a class="container-title">
                                    <img src="../../static/img/container-title-2.png" />
                                </a>
                                <div style="margin-top:24px;">
                                   
                                </div>
                            </div>
                            
                            <div class="col-md-5" style="margin-top:60px;width:400px">
                                <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                    <div class="form-group" prop="checkUsername" >
                                        <el-input v-model="form.username" placeholder="用户名"></el-input>
                                    </div>
                                    <div class="form-group" prop="password">
                                        <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
                                    </div>
                                    <div class="form-group">
                                       <el-button  class="loginBtn" @click="login()">登录</el-button>
                                    </div>
                                </el-form>
                            </div>
                        </div>
                    </div>
                </div>   
        </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
        form: {
          username:'',
          password:''
        },
    }
  },
  methods:{
    login()
    {
        if(this.form.username!='' && this.form.password!='')
        {
            let url='api/user/userInfo/userLogin?username='+this.form.username+'&password='+this.form.password
            this.$axios.get(url).then((response)=>{
                let map=response.data;
                 if(map.result==1)
                 {
                    this.$message.success("登陆成功");
                    sessionStorage.setItem("token",map.token);
                    sessionStorage.setItem('userName',map.data.username);
                    sessionStorage.setItem('userinfo_Image',map.data.image);
                    sessionStorage.setItem('userID',map.data.id);
                    sessionStorage.setItem('role',map.data.role);
                    sessionStorage.setItem('currentUserNick',map.data.nick);
                    this.$router.push("/home");
                    this.$message.success("登录成功");
                 }else{
                    this.$message.error("账号/密码错误");
                 }
             })
            .catch(function (error) { // 请求失败处理
                this.$message.error(error);
            });
        }else{
            if(this.form.username=='')
            {
                this.$message.error('用户名不能为空！');
            }
            if(this.form.password=='')
            {
                this.$message.error('密码不能为空！');
            }
        }
    }
  }
}
</script>


<style scoped>
.navbar-banner {
    margin-top: 50px;
    background: url("../../static/img/homepage-bg.png");
    background-size: cover;
}
.loginBtn{
    width:100%;
    color:#fff;
    background-color:#11aa8c;
    border:1px solid #11aa8c;
    border-radius:4px
}
</style>