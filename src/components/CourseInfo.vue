<template>
<div>

<div class="container layout layout-margin-top">   
	<ol class="breadcrumb">
		<li><a>全部课程</a></li>
		<li><a>Linux</a></li>
		<li class="active">
			<a>
				{{courseInfo.title}}
			</a>
		</li>
	</ol>
    <div class="row">
        <div class="col-md-9 layout-body">
			<div class="side-image side-image-mobile">
				<img>
			</div>
			<div class="content course-infobox">
				<div class="clearfix course-infobox-header">
					<h4 class="pull-left course-infobox-title">
						<span>{{courseInfo.title}}</span>
					</h4>
					<div class="pull-right course-infobox-follow" v-if="!isLove">
						<span class="course-infobox-followers">{{this.loveCount}}</span>
						<span>人关注</span>
						<i class="fa fa-star-o" @click="love()"></i>
					</div>
					<div class="pull-right course-infobox-follow" v-if="isLove">
						<span>已关注</span>
					</div>
				</div>
				<div class="clearfix course-infobox-body">
					<div class="course-infobox-content">
						<p>{{courseInfo.content}}</p>
					</div>
					<div class="pull-right course-infobox-price"></div>
				</div>
				<div class="clearfix course-infobox-footer">
					<div class="pull-right course-infobox-learned">{{studyCount}}人学过</div>
				</div>
			</div>
			<div class="content">
				<div class="tab-content">
					<el-tabs v-model="activeName">
						<el-tab-pane label="目录" name="first">
							<div class="clearfix bootcamp-infobox" v-if="!isBuy && courseInfo.price>0">
								<div class="bootcamp-infobox-footer">
									<div class="col-md-3 bootcamp-infobox-msg">
										<img src="../../static/img/bootcamp-course.png">
										<div class="msg-desc"><span>最详细的项目视频</span></div>
										<img class="bootcamp-infobox-footer-plus" src="../../static/img/bootcamp-plus.png">
									</div>
								
									<div class="col-md-3 bootcamp-infobox-msg">
										<img src="../../static/img/bootcamp-env.png">
										<div class="msg-desc"><span>最新实用的实战技术</span></div>
										<img class="bootcamp-infobox-footer-plus" src="../../static/img/bootcamp-plus.png">
									</div>
									<div class="col-md-3 bootcamp-infobox-msg">
										<img src="../../static/img/bootcamp-qa.png">
										<div class="msg-desc"><span>有问必答的实验助教</span></div>
										<img class="bootcamp-infobox-footer-plus" src="../../static/img/bootcamp-equal.png">
									</div>
								
									<div class="col-md-3 bootcamp-infobox-msg bootcamp-infobox-buybox">
											<div class="original-price">￥{{courseInfo.price}}</div>
											<div class="member-price">
											<span class="member-price" @click="joinVip()" data-container="body" data-toggle="popover" data-placement="top" data-original-title="会员优惠" data-html="true" data-content="普通会员
					(<span class='price-number'>8折</span>)：<span class='price-number'>￥159.2</span><br>高级会员 (<span class='price-number'>5折</span>)：<span class='price-number'>￥99.5</span>"><a title="">加入会员最低5折</a></span>			
											</div>
											<div class="bootcamp-infobox-buy" @click="buyCourse()">立即购买</div>
									</div>
								</div>
							</div>


							<div role="tabpanel" class="tab-pane active" id="labs">
								<div v-for="chapterItem in courseInfo.chapterChildren" :key="chapterItem.id">
									<div class="clearfix text-center path-title-box">
											<span class="line hidden-xs"></span>
											<span>{{chapterItem.name}} {{chapterItem.content}}</span>
											<span class="line hidden-xs"></span>
									</div>
									<div class="lab-item" v-for="(vedioItem,index) in chapterItem.vedioChildren" :key="vedioItem.id">
										<div class="lab-item-status">
											<img src="../../static/img/lab-not-ok.png">
										</div>
										<div class="lab-item-index">第{{ index+1 }}节</div>
										<div class="lab-item-title" data-toggle="tooltip" data-placement="bottom" title="Linux 系统简介">{{vedioItem.title}}</div>
										<div class="pull-right lab-item-ctrl">
											<!-- <router-link :to="{path:'/courseVedio?src='+vedioItem.src +'&courseNo='+courseNo+'&vedioNo='+vedioItem.id}"> -->
												<a class="btn btn-primary" data-toggle="modal" data-sign="signin"  @click="gotoStudy(vedioItem.id,vedioItem.src)">开始学习</a>
											<!-- </router-link> -->
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>

						<el-tab-pane label="讨论区" name="second">
							<div class="comment-form">
								<div class="comment-form-unlogin">
									<span v-if="!isLogin">
										请
										<a  data-toggle="modal" data-sign="signin" data-next="/courses/1" @click="dialogFormVisible2=true"> 登录 </a>
										后发表评论
									</span>
									<el-button type="primary" @click="openComment()" v-if="isLogin">发表评论</el-button>
								</div>
							</div>
							<ul class="row question-items">
								<li class="question-item" v-for="item in commentTableData" :key="item.id">
								<div class="col-md-10">
									<div class="col-sm-2 question-item-author">
										<div class="user-avatar ">
											<a class="avatar" target="_blank">
												<img :src="item.userDetail.image"/>
											</a>
											<a class="member-icon"><img src="../../static/img/vip-icon.png"/></a>
										</div>
									</div>
									<div class="col-sm-10">
										<h4><a class="question-item-title" target="_blank">{{item.content}}</a></h4>
										<div class="question-item-summary">
											<div class="user-username ">
												<span class="el-icon-user-solid"></span>
												<a class="username">{{item.userDetail.nick}}</a>
											</div>
											<span class="user-level">发表时间</span>
											<span class="question-item-date">{{item.creatime}}</span>
										</div>
										<!-- 回复内容-->
										<div class="answer-item" v-for="replyItem in item.children" :key="replyItem.id">
											<div class="answer-head">
												<div class="user-avatar ">
													<a class="avatar">
														<img :src="replyItem.userDetail.image">
													</a>
												</div>
											</div>
											<div class="answer-detail">
												<span class="comment-reply">
													<div class="user-username ">
														<a class="username">{{replyItem.userDetail.nick}}</a>
														<span class="user-level">{{replyItem.userDetail.role==2?'教师':'管理员'}}</span>
														<span style="margin-left:20px">回复时间</span>
														<span class="question-item-date">{{replyItem.creatime}}</span>
													</div>
												</span>
												<div class="answer-content markdown-body">
													{{replyItem.content}}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-2 question-item-rank">
									<i class="el-icon-star-off"></i>
									<div class="question-item-answered">
										<div>0</div>
										<div>有用</div>
									</div>
								</div>
								</li>
							</ul>

							<nav class="pagination-container">
								<!-- 分页-->
								<el-pagination
									background
									style="margin-top:10px;"
									v-if="commentPage.total>commentPage.size"
									layout="prev, pager, next"
									@current-change="commentCurrentChange"
									:page-size="commentPage.size"
									:current-page="commentPage.index"
									:total="commentPage.total">
								</el-pagination>
							</nav>
						</el-tab-pane>
					</el-tabs>

				</div>
			</div>
        </div>

		<!-- 评论弹出框-->
          <el-dialog title="请填写评论" :visible.sync="dialogFormVisible">
    		<el-input
               type="textarea"
               :rows="3"
               placeholder="请输入内容"
               v-model="textarea">
            </el-input>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="putComment()">发 布</el-button>
            </div>
          </el-dialog>


		  <!-- 登录弹出框-->
          <el-dialog title="登录" :visible.sync="dialogFormVisible2" width="400px">
			<el-form :model="form">
			  <el-form-item label="用户名">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
			  <el-form-item label="密码">
                <el-input v-model="form.password" autocomplete="off" type="password" ></el-input>
              </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="login()">登 录</el-button>
			</div>
          </el-dialog>




        <div class="col-md-3 layout-side">     
			<div class="side-image side-image-pc">
				<img :src="courseInfo.image">
			</div>
			
			<div class="sidebox mooc-teacher">
				<div class="sidebox-header mooc-header">
					<h4 class="sidebox-title">课程教师</h4>
				</div>
				<div class="sidebox-body mooc-content">
					<a  target="_blank">
					  <img :src="courseInfo.teacherImg">
					</a>
					<div class="mooc-info">
						<div class="name"><strong>{{courseInfo.teacher}}</strong> </div>
						
						<div class="courses">已发布多门课程</div>
					</div>
					<div class="mooc-extra-info">
						<div class="word long-paragraph">
							{{courseInfo.tinfo}}
						</div>
					</div>
				</div>
				<div class="sidebox-footer mooc-footer">
					<a @click="gotoTeacherCourse()">查看老师的所有课程 ></a>
				</div>
			</div>
			<div class="side-image">
				<a  target="_blank">
					<img src="../../static/img/banner-vip.png">
				</a>
			</div>
			<div class="sidebox adv-course">
				<div class="sidebox-header">
					<h4 class="sidebox-title">进阶课程</h4>
				</div>
				<div class="sideobx-body course-content">
					<a>实用Linux Shell编程</a>
					<a>Vim编辑器</a>
					<a>Linux命令实例练习</a>
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
		activeName: 'first',
		currentUserID:sessionStorage.getItem('userID'),
		currentUserRole:sessionStorage.getItem('role'),
		courseNo:this.$route.query.id, //获取页面传过来的ID
		courseInfo:{
			 title:'',
			 content:'',
			 teacher:'',
			 tid:'',
			 tinfo:'',
			 teacherImg:'',
			 teacherDescribe:'',
			 image:'',
			 price:0,
			 chapterChildren:''
		},
		form: {
          username:'',
          password:''
        },
		isLogin:false,
		circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
		loveCount:0,
		studyCount:0,
		isLove:false,
		commentTableData: [],
		 textarea:'',
		 dialogFormVisible:false,
		 dialogFormVisible2:false,
		 isBuy:false,
		 commentPage:{
			size:10,
          	total:0,
          	index:1
		 }
    }
  },
  created () {
	  this.initCourseInfo();
	  this.initComment();
	  if(sessionStorage.getItem('token'))
	  {
		  this.isLogin=true;
	  }
	  this.initBuy();
  },
	watch: {
		'$route' (to, from) {
			// 路由发生变化页面刷新
			this.$router.go(0);
		}
	},
  methods:{
	 initCourseInfo(){
		if(this.courseNo)
		{
			this.$axios.get('api/user/course/query/'+this.courseNo).then((response)=>{
				let data=response.data;
				this.courseInfo.title=data.title;
				this.courseInfo.content=data.content;
				this.courseInfo.teacher=data.teacherDetail.nick;
				this.courseInfo.teacherImg=data.teacherDetail.image;
				this.courseInfo.price=data.price;
				this.courseInfo.image=data.image;
				this.courseInfo.chapterChildren=data.chapterChildren;
				this.courseInfo.tid=data.teacher;
				this.courseInfo.tinfo=data.teacherDetail.info;
			}).catch(function (error) { // 请求失败处理
				console.log(error);
			});

			this.$axios.get('api/user/course/redis/queryLoveStudy?cid='+this.courseNo).then((response)=>{
				console.log(response.data);
				this.loveCount=response.data.love;
				this.studyCount=response.data.study;
			}).catch(function (error) { // 请求失败处理
				console.log(error);
			});

			if(sessionStorage.getItem('token'))
			{
				this.$axios.get('api/user/course/redis/isExisit?cid='+this.courseNo+'&uid='+this.currentUserID).then((response)=>{
					this.isLove=response.data.result;
				}).catch(function (error) { // 请求失败处理
					console.log(error);
				});
			}
		}
	 },
	 gotoStudy(id,src){
		  let userNo=sessionStorage.getItem('userID');
		 //需要登录才可以看视频
		 if(sessionStorage.getItem('token'))
		 {
			 console.log('可以看视频');
			 //已经购买或者已经是超级会员
			 if(sessionStorage.getItem('role')==3 || this.isBuy || this.courseInfo.price==0)
			 {
				 this.$router.push({path: '/courseVedio?src=' + src +"&courseNo="+this.courseNo + '&vedioNo='+id});
				 let json={"uid":userNo,"cid":this.courseNo};
				this.$axios.post('api/user/course/redis/addCourseStudy',json).then((response)=>{});   //新增学习记录
			 }else{
				 this.$message.error("您还没有购买该课程，请购买或者加入会员VIP");
			 }
		 }
		 else{
			this.dialogFormVisible2=true;
		 }
	 },
	love(){ //点击收藏触发
		if(sessionStorage.getItem('token'))  //如果用户有登录  新增用户的浏览记录
		{
		   let userNo=sessionStorage.getItem('userID');
		   if(userNo)
		   {
				let json={"uid":userNo,"cid":this.courseNo};
				this.$axios.post('api/user/course/redis/addLoveCourse',json).then((response)=>{
					this.isLove=true;
					this.$message.success("关注成功");
				});
			}
		   }else{
			   this.$message.error("请登录");
			   this.dialogFormVisible2=true;
		   }
	},
	initComment(){
		let json={"pageSize":this.commentPage.size,"pageNum":this.commentPage.index,"pid":this.courseNo};
		this.$axios.post('api/user/course/comment/query',json).then((response)=>{
			this.commentTableData=response.data.data.list;
			this.commentPage.total=response.data.data.total;
         	this.commentPage.index=response.data.data.pageNum;
		});
	},
	openComment(){
		if(sessionStorage.getItem('token')) //是否已经登陆
		{
			let json={"user":this.currentUserID,"pid":this.courseNo,"cid":this.courseNo,"role":1};
			this.$axios.post('api/user/course/comment/userIsComment',json).then((response)=>{
				if(response.data.isStudy==true && response.data.isComment==false) //已经学习过  并且没有评论过才可以评论
				{
					this.dialogFormVisible=true;
				}
				else
				{
					if(response.data.isStudy==false) this.$message.error("您还没学过该课程，暂时无权限评论!");
					if(response.data.isComment==true)this.$message.error("您已评论过,机会留给其他同学哦!");
				}
			});	

		}
	},
	putComment(){
		let json={"pid":this.courseNo,"content":this.textarea,
					"user":this.currentUserID,"status":1,
					"createder":this.currentUserID,"root":1};
		this.$axios.post('api/user/course/comment/insert',json).then((response)=>{
			this.$message.success("发布成功");
			this.initComment();
			this.dialogFormVisible=false;
		});
	},
	login()
    {
        if(this.form.username!='' && this.form.password!='')
        {
            let url='api/user/userInfo/userLogin?username='+this.form.username+'&password='+this.form.password
            this.$axios.get(url).then((response)=>{
                let map=response.data;
                console.log(map);
                 if(map.result==1)
                 {
                    this.$message.success("登陆成功");
                    sessionStorage.setItem("token",map.token);
                    sessionStorage.setItem('userName',map.data.username);
                    sessionStorage.setItem('userinfo_Image',map.data.image);
                    sessionStorage.setItem('userID',map.data.id);
                    sessionStorage.setItem('role',map.data.role);
                    this.$router.push("/home");
					this.$message.success("登录成功");
					//this.window.location.reload();
					this.$router.push({path: '/courseInfo?id=' + this.courseNo});
					this.dialogFormVisible2=false;
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
	},
	initBuy(){   //查询用户是否已经购买了该课程
		if(sessionStorage.getItem('token'))
		{
			let json={"pageSize":1,"pageNum":1,"cid":this.courseNo,"uid":this.currentUserID};
			this.$axios.post('api/user/order/query',json).then((response)=>{
				if(response.data.data.total>0)
				{
					this.isBuy=true;
				}
			});
		}
	},
	buyCourse(){
		if(sessionStorage.getItem('token'))
		{
			if(confirm('是否购买该课程'))
			{
				this.initBuy();  //查询是否已购买过该课程 不需要重复购买
				if(this.isBuy || sessionStorage.getItem('role')==3)
				{
					this.$message.error("您已是会员/已购买,请勿重新操作");
				}else{
					// let json={
					// 	"count":1,"status":1,"price":this.courseInfo.price,
					// 	"paystatus":1,"cid":this.courseNo,"uid":this.currentUserID,
					// 	"address":"非实物订单，无需地址。","phone":"非实物订单，无需联系方式。","person":"非实物订单，无需联系人。"
					// };
					// this.$axios.post('api/user/order/insert',json).then((response)=>{
					// 	this.$message.success("购买成功");
					// });
					// this.$router.push({path: '/courseInfo?id=' + this.courseNo});
					window.location.href="http://127.0.0.1:9200/study-user/api/user/pay/buyCourse?uid="+
					sessionStorage.getItem('userID')+"&price="+this.courseInfo.price+"&cid="+this.courseNo;
				}
			}
		}else{
			this.dialogFormVisible2=true;
		}
	},
	joinVip()  ///加入会员
	{
		if(sessionStorage.getItem('token'))
		{
			if(sessionStorage.getItem('role')==3)
			{
				this.$message.error('您已是会员');
			}
			else {
				if(confirm('是否加入会员'))
				{
					window.location.href="http://127.0.0.1:9200/study-user/api/user/pay/addVip?uid="+sessionStorage.getItem('userID');
				}
			}
		}else{
			this.dialogFormVisible2=true;
		}
	},
	commentCurrentChange(current){
		this.commentPage.index=current;
    	this.initComment();
	},
	gotoTeacherCourse()
	{
		this.$router.push({path: '/teacherCourse?teacherNo='+this.courseInfo.tid});
	}
  }
}
</script>