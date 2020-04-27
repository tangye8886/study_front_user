<template>
<div>
   <div class="container layout layout-margin-top">
		<div class="row">
			<div class="col-md-9 layout-body">
				<div class="content">
					<el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="个人中心" name="first">
                            <el-form ref="form" :model="form" label-width="80px">
                                 <el-form-item label="我的头像">
                                    <el-avatar shape="circle" class="myImg" fit="scale-down" :size="100" :src="form.image" alt="我的头像"></el-avatar>
                                    <input class="upload-demo" multiple type="file" ref="file" id="uploadFile" @change="fileUpload($event)" v-if="isEdit" />
                                    <el-progress style="margin-top:5px;" :text-inside="true" :stroke-width="15" :percentage="fileUploadPercent" status="success" v-if="fileUploadPercent!==0 && isEdit"></el-progress>
                                </el-form-item>
                                <el-form-item label="用户名">
                                    <el-input v-model="form.username" :disabled="isDis"></el-input>
                                </el-form-item>
                                <el-form-item label="昵称">
                                    <el-input v-model="form.nick" :disabled="isQuery"></el-input>
                                </el-form-item>
                                <el-form-item label="联系方式">
                                    <el-input v-model="form.phone" :disabled="isQuery"></el-input>
                                </el-form-item>
                                <el-form-item label="地址">
                                    <el-input v-model="form.address" :disabled="isQuery"></el-input>
                                </el-form-item>
                                <el-form-item label="当前积分">
                                    <el-input v-model="form.score" :disabled="isDis"></el-input>
                                </el-form-item>
                                <el-form-item label="当前余额">
                                    <el-input v-model="form.yue" :disabled="isDis"></el-input>
                                </el-form-item>
                                <el-form-item label="当前等级">
                                    <el-input v-model="form.role" :disabled="isDis"></el-input>
                                </el-form-item>
                                <el-form-item label="注册时间">
                                    <el-input v-model="form.creatime" :disabled="isDis"></el-input>
                                </el-form-item>
                            </el-form>
                            <el-row>
                                <el-button type="info" style="float:right;margin:0 5px" v-if="isEdit" @click="closeEdit()">取消</el-button>
                                <el-button type="warning" style="float:right;margin:0 5px" v-if="isQuery" @click="openEdit()">编辑</el-button>
                                <el-button type="primary" style="float:right;margin:0 5px" v-if="isEdit" @click="saveUserInfo()">保存</el-button>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="我的订单" name="second">
                            <el-table
                                :data="tableData"
                                style="width: 100%">
                                <el-table-column
                                    prop="detailCourse"
                                    width="200"
                                    label="图片">
                                    <template slot-scope="scope">
                                        <el-image
                                            style="width: 180px; height: 80px"
                                            :src="scope.row.detailCourse.image">
                                        </el-image>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="detailCourse.title"
                                    label="课程名称"
                                    :show-overflow-tooltip="true"
                                    width="200">
                                </el-table-column>
                                <el-table-column
                                    prop="count"
                                    label="数量"
                                    width="80">
                                </el-table-column>
                                <el-table-column
                                    prop="detailCourse.price"
                                    width="80"
                                    label="单价">
                                </el-table-column>
                                <el-table-column
                                    prop="status"
                                    label="状态">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.status == 1 ? 'success' : 'danger' " disable-transitions>{{scope.row.status==1?'完成':'取消订单'}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="price"
                                    label="实付">
                                </el-table-column>
                            </el-table>
                             <!-- 订单分页-->
                            <el-pagination
                                background
                                style="margin-top:10px;float:right"
                                v-if="orderPage.total>orderPage.size"
                                layout="prev, pager, next"
                                @current-change="orderCurrentChange"
                                :page-size="orderPage.size"
                                :current-page="orderPage.index"
                                :total="orderPage.total">
                            </el-pagination>
                        </el-tab-pane>

                        <el-tab-pane label="浏览足迹" name="third">
                            <div class="row">
                                <div class="col-md-4 col-sm-6  course" v-for="item in seeCordList" :key="item.id">
                                        <a class="course-box">
                                            <div class="sign-box">
                                                <i class="fa fa-star-o course-follow pull-right" style="display:none"></i>
                                            </div>
                                            <router-link :to="{path:'/courseInfo?id='+item.id}">
                                                <div class="course-img">
                                                    <img :alt="item.title" :src="item.image">
                                                </div>
                                                <div class="course-body">
                                                    <span class="course-title" data-toggle="tooltip" data-placement="bottom" :title="item.title">{{item.title}}</span>
                                                </div>
                                            </router-link>
                                            <div class="course-footer">
                                                <span class="course-per-num pull-left">
                                                    <i class="el-icon-view"></i>
                                                </span>
												<span class="course-money pull-right" v-if="item.price==0">免费</span>
												<span class="course-money pull-right" v-if="item.price>0">会员</span>
                                            </div>
                                        </a>
                                </div>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="学习足迹" name="six">
                            <div class="row">
                                <div class="col-md-4 col-sm-6  course" v-for="item in studyCordList" :key="item.id">
                                        <a class="course-box">
                                            <div class="sign-box">
                                                <i class="fa fa-star-o course-follow pull-right" style="display:none"></i>
                                            </div>
                                            <router-link :to="{path:'/courseInfo?id='+item.id}">
                                                <div class="course-img">
                                                    <img :alt="item.title" :src="item.image">
                                                </div>
                                                <div class="course-body">
                                                    <span class="course-title" data-toggle="tooltip" data-placement="bottom" :title="item.title">{{item.title}}</span>
                                                </div>
                                            </router-link>
                                            <div class="course-footer">
                                                <span class="course-per-num pull-left">
                                                    <i class="el-icon-view"></i>
                                                </span>
												<span class="course-money pull-right" v-if="item.price==0">免费</span>
												<span class="course-money pull-right" v-if="item.price>0">会员</span>
                                            </div>
                                        </a>
                                </div>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="收藏夹" name="fourth">
                            <div class="row">
                                <div class="col-md-4 col-sm-6  course" v-for="item in loveList" :key="item.id">
                                        <a class="course-box">
                                            <div class="sign-box">
                                                <i class="fa fa-star-o course-follow pull-right" style="display:none"></i>
                                            </div>
                                            <router-link :to="{path:'/courseInfo?id='+item.id}">
                                                <div class="course-img">
                                                    <img :alt="item.title" :src="item.image">
                                                </div>
                                                <div class="course-body">
                                                    <span class="course-title" data-toggle="tooltip" data-placement="bottom" :title="item.title">{{item.title}}</span>
                                                </div>
                                            </router-link>
                                            <div class="course-footer">
                                                <span class="course-per-num pull-left">
                                                    <i class="el-icon-star-off"></i>
                                                </span>
                                                <span class="course-money pull-right" v-if="item.price==0" @click="removeLove(item.id)">移除</span>
                                            </div>
                                        </a>
                                </div>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="我的评论" name="five">
                            <el-table
                                :data="commentData"
                                style="width: 100%">
                                <el-table-column
                                    prop="courseDetail.title"
                                    label="课程"
                                    :show-overflow-tooltip="true"
                                    width="230">
                                </el-table-column>
                                <el-table-column
                                    prop="content"
                                    :show-overflow-tooltip="true"
                                    label="评论内容"
                                    width="200">
                                </el-table-column>
                                <el-table-column
                                    prop="creatime"
                                    width="170"
                                    label="评论时间">
                                </el-table-column>
                                 <el-table-column
                                    prop="status"
                                    label="状态"
                                    width="100">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.status == '1' ? 'success' : 'danger' " disable-transitions>{{scope.row.status=='1'?'正常':'停用'}}</el-tag>
                                    </template>
                                 </el-table-column>
                                 <el-table-column
                                    prop="status"
                                    label="操作"
                                    width="100">
                                    <template slot-scope="scope">
                                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteComment(scope.row.id)"></el-button>
                                    </template>
                                 </el-table-column>
                            </el-table>
                            <!-- 评论分页-->
                            <el-pagination
                                background
                                style="margin-top:10px;float:right"
                                v-if="commentPage.total>commentPage.size"
                                layout="prev, pager, next"
                                @current-change="commentPageCurrentChange"
                                :page-size="commentPage.size"
                                :current-page="commentPage.index"
                                :total="commentPage.total">
                            </el-pagination>
                        </el-tab-pane>



                    </el-tabs>
				</div>
			</div>
			<div class="col-md-3 layout-side">
				<div class="panel panel-default panel-userinfo">
					<div class="panel-body body-userinfo">
						<div class="media userinfo-header">
							<div class="media-left">
								<div class="user-avatar">
									 <a class="avatar" href="#sign-modal" data-toggle="modal" data-sign="signin">
										 <img class="circle" src="../../static/img/1476173256875.png">
									 </a>
								</div>
							 </div>
							<div class="media-body">
								 <span class="media-heading username">欢迎来到云学堂</span>
								 <p class="vip-remain">看视频，学编程</p>
							</div>
						</div> 
						
						<div class="userinfo-footer row">
							<div class="col-md-6 col-xs-6 pos-left">
								<a  data-toggle="modal" data-sign="signin"><span class="glyphicon glyphicon-bookmark"></span> 加入私有课</a>
							</div>
							<div class="col-md-6 col-xs-6 pos-right">
								<a  target="_blank"><span class="glyphicon glyphicon-send"></span> 我要投稿</a>
							</div>
							
						</div>
					</div>
				</div>
				<div class="sidebox">
					<div class="sidebox-header">
						<h4 class="sidebox-title" style="color:red">热门课程</h4>
						<span style="float:right" @click="changeRank()"><i class="el-icon-refresh"></i>换一换</span>
					</div>
					<div class="sidebox-body course-content side-list-body">
						<a v-for="item in courseRank" :key="item.id"  @click="gotoCourseInfo(item.id)">
							<img style="width:50px;height:25px" :src="item.image"> 
							<span>{{item.title | ellipsis}}</span> 
						</a>
					</div>
				</div>
				<div class="side-image side-qrcode">
					<img src="../../static/images/tht.png">
					<div class="side-image-text">关注公众号，手机看教程</div>
				</div>
			</div>
		</div>
	</div>

</div>
</template>

<script>
export default {
  name: 'Home',
  filters: {  //字符串过滤器
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 10) {
        return value.slice(0,10) + '...'
      }
      return value
    }
  },
  data () {
    return {
      currentUserNo:sessionStorage.getItem('userID'),
      currentUserRole:sessionStorage.getItem('role'),
      tableData: [],
      seeCordList:[],//浏览记录
      studyCordList:[],//学习记录
      loveList:[],
      courseRank:[],
      commentData:[],
      activeName: ''+this.$route.query.tab,
      isQuery:true,
      isEdit:false,
      isDis:true,
      rankCount:0,
	  rankStart:0,
	  rankEnd:9,
      rankSize:9,
      fileUploadPercent:0,
	  form:{   //用户表单
          id:'',
          username:'',
          phone:'',
          address:'',
          score :'',
          yue:'',
          role:'',
          creatime:'',
          image:'',
          nick:''
      },
      orderForm:{   //订单表单
        id:'',
        uid:'',
        cid:'',
        address:'',
        phone:'',
        person:'',
        count:'',
        price:'',
        status:'',
        paytime:'',
        paystatus:'',
      },
	  orderPage:{
          size:1,
          total:0,
          index:1,
      },
      commentPage:{
          size:8,
          total:0,
          index:1,
      }
    }
  },
  mounted () {
    if(sessionStorage.getItem('token'))   //如果用户已经登录才执行
    {
        let id=sessionStorage.getItem('userID');
        let url='api/user/userInfo/query/'+id;
        this.$axios.get(url).then((response)=>{
            let result=response.data.data;
            if(result)
            {
                this.form.id=result.id;
                this.form.username=result.username;
                this.form.phone=result.phone;
                this.form.nick=result.nick;
                this.form.address=result.address;
                this.form.score=result.score;
                this.form.yue=result.yue;
                this.form.role=result.roleDetail.name;
                this.form.creatime=result.creatime;
                this.form.image=result.image;
            }else{
                this.$message.error("系统出错！");
            }
        })
        .catch(function (error) { // 请求失败处理
           this.$message.error(error);
        });
    }
    this.initRank();
  },
  created(){
    this.initOrder()
    this.initSeeCord();
    this.initLoveCord();
    this.initComment();
    this.initStudyCordList();
  },
  updated(){
    if(sessionStorage.getItem('token'))
    {
      if(sessionStorage.getItem('userinfo_Image')) 
        this.userImage=sessionStorage.getItem('userinfo_Image'); // 有登陆的前提下初始化头像
    }
  },
  methods:{
    handleClick(tab, event) {
     console.log(tab, event);
    },
    initOrder(){
        let url='api/user/order/query';
        let jsonDate={
            "pageSize":+this.orderPage.size,"pageNum":this.orderPage.index,"uid":this.currentUserNo,"role":this.currentUserRole
        };
        this.$axios.post(url,jsonDate).then((response)=>{
            let result=response.data.data;
            this.tableData=result.list;
            this.orderPage.total=result.total;
            this.orderPage.index=result.pageNum;
        });
    },
    initSeeCord()
    {
        if(sessionStorage.getItem('token')){  // 保证登录后才调用
            if(sessionStorage.getItem('userID')){
                let url_course='api/user/course/redis/querySeeRecord';
                let jsonDate={
                    "pageSize":9,"pageNum":1,"uid":this.currentUserNo
                };
                this.$axios.post(url_course,jsonDate)
                .then((response)=>{
                    this.seeCordList=response.data.data.list;
                })
            }
        }
    },
    initStudyCordList()
    {
        if(sessionStorage.getItem('token')){  // 保证登录后才调用
            if(sessionStorage.getItem('userID')){
                let url_course='api/user/course/redis/queryUserStudy';
                let jsonDate={
                    "uid":sessionStorage.getItem('userID')
                };
                this.$axios.post(url_course,jsonDate)
                .then((response)=>{
                    this.studyCordList=response.data.data;
                })
            }
        }
    },
    initLoveCord()
    {
        if(sessionStorage.getItem('token')){
            let url_course='api/user/course/redis/queryLoveCourse';
            let jsonDate={
                "pageSize":9,"pageNum":1,"uid":this.currentUserNo
            };
            this.$axios.post(url_course,jsonDate)
            .then((response)=>{
                this.loveList=response.data.data.list;
            })
        }
    },
    closeEdit(){  //个人信息-点击取消按钮触发
        this.isQuery=true;
        this.isEdit=false;
    },
    openEdit(){  //个人信息-点击编辑按钮触发
        this.isQuery=false;
        this.isEdit=true;
    },
    saveUserInfo(){ //个人信息-修改个人信息  (点击保存按钮触发)
        if(confirm('是否保存？'))
        {
            let url='api/user/userInfo/modify';
            let postData = {
                "phone":this.form.phone,
                "address":this.form.address,
                "id":this.form.id,
                "image":this.form.image,
                "nick":this.form.nick};
            this.$axios.put(url,postData).then((response)=>{
                this.$message.success("保存成功！");
                this.isEdit=false;
                this.isQuery=true;
                sessionStorage.setItem('userinfo_Image',this.form.image);
            });
        }
    } ,
    //个人信息-分页触发的方法
    orderCurrentChange(current){
        this.orderPage.index=current;
        this.initOrder();
    },
    removeLove(id){
        let userNo=sessionStorage.getItem('userID');
        let url='api/user/course/redis/delLoveCourse?uid='+userNo+'&cid='+id;
        this.$axios.get(url).then((response)=>{
            this.$message.success("移除成功！");
        });
        this.initLoveCord();
    },
    //初始化 排行榜 默认11个  根据学习人数排行
	initRank(){
		this.$axios.get('api/user/course/redis/queryCourseRank?start='+this.rankStart+'&end='+this.rankEnd).then((response)=>{
			this.courseRank= response.data.data;
			this.rankCount=response.data.count;
		});
	},
    changeRank(){
		   this.rankStart=this.rankEnd+1;
		   this.rankEnd=this.rankStart+this.rankSize;
		   if(this.rankEnd+1> this.rankCount)  //游标到底  重新重第一个开始遍历
		   {
			   this.rankStart=1;
			   this.rankEnd=this.rankSize;
		   }
		   this.initRank();
    },
    fileUpload(e) {
            let that=this;
            let post_url="http://127.0.0.1:8002/api/vedio/fileUpload";
            var _this = this;
            var formData = new FormData();
            formData.append("file",e.target.files[0]);
            this.$axios({
                method: "post",
                url: post_url, 
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',  // 文件上传
                    // 'Content-Type': 'application/x-www-form-urlencoded',  // 表单
                    //'Content-Type': 'application/json;charset=UTF-8'  // json
                },
                onUploadProgress: progressEvent => {
                  this.fileUploadPercent=(progressEvent.loaded / progressEvent.total * 100) | 0 //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
                }
            }).then(function (response) {
                that.form.image=response.data;
                //sessionStorage.setItem('userinfo_Image',response.data);
            }).catch(function (reason) {
                this.$message.success("上传失败");
           });
           if(this.fileUploadPercent>0 && this.form.image)  //如果用户操作了上传文件
           {
               this.$axios.delete('http://127.0.0.1:8002/api/vedio/fileDelete?path='+this.form.image).then((response)=>{});
           }
      },
       gotoCourseInfo(id){
		   this.$router.push({path: '/courseInfo?id=' + id});
		   if(sessionStorage.getItem('token'))  //如果用户有登录  新增用户的浏览记录
		   {
			   let userNo=sessionStorage.getItem('userID');
			   if(userNo)
			   {
				   let json={"uid":userNo,"cid":id};
				   this.$axios.post('api/user/course/redis/addSeeRecord',json).then((response)=>{});
			   }
		   }
       },
       initComment(){
		let json={
            "pageSize":this.commentPage.size,
            "pageNum":this.commentPage.index,
            "user":this.currentUserNo,
            "role":this.currentUserRole
            };
		this.$axios.post('api/user/course/comment/query',json).then((response)=>{
			this.commentData=response.data.data.list;
          	this.commentPage.total=response.data.data.total;
         	this.commentPage.index=response.data.data.pageNum;
		});
       },
       deleteComment(id){
          if(confirm('确定删除该评论？'))
          {
              this.$axios.delete('api/user/course/comment/delete?idList='+id).then((response)=>{
                this.$message.success("删除成功");
                this.initComment();
            });
          }
       },
       commentPageCurrentChange(current){
        this.commentPage.index=current;
        this.initComment();
       }
  }
}
</script>

<style scope>
.myImg 
{border-style: solid;border-color: blue rgb(25%,35%,45%) #909090 red;}
</style>
