<template>
<div>
   <div class="container layout layout-margin-top">
		<div class="row">
			<div class="col-md-9 layout-body">
				<div class="content position-relative">
					<div class="clearfix"></div>
					<el-tabs v-model="activeName">
						<el-tab-pane :label="myTitle" name="first">
							<div class="search-result"></div>
							<div class="row">
								<div class="col-md-4 col-sm-6  course" v-for="item in tableData" :key="item.id">
										<a class="course-box">
											<div class="sign-box">
													<i class="fa fa-star-o course-follow pull-right" style="display:none"></i>
											</div>
											<div class="course-img" @click="gotoCourseInfo(item.id)">
												<img :alt="item.title" :src="item.image">
											</div>
											<div class="course-body">
												<span class="course-title" data-toggle="tooltip" data-placement="bottom" :title="item.title">{{item.title}}</span>
											</div>
											<div class="course-footer">
												<span class="course-per-num pull-left">
													<i class="el-icon-star-on"></i>
													 <span>{{item.loveNumber}}</span>
												</span>
												<span class="course-money pull-right" v-if="item.price==0">免费</span>
												<span class="course-money pull-right" v-if="item.price>0">会员</span>
											</div>
										</a>
								</div>
							</div>

							<nav class="pagination-container">
								<!-- 分页-->
								<el-pagination
									background
									style="margin-top:10px;"
									v-if="page.total>page.size"
									layout="prev, pager, next"
									@current-change="currentChange"
									:page-size="page.size"
									:current-page="page.index"
									:total="page.total">
								</el-pagination>
							</nav>
						</el-tab-pane>
					</el-tabs>
	
				</div>
			</div>
			<div class="col-md-3 layout-side">
				
				<div class="sidebox mooc-teacher">
					<div class="sidebox-header mooc-header">
						<h4 class="sidebox-title">课程教师</h4>
					</div>
					<div class="sidebox-body mooc-content">
						<a  target="_blank">
						<img :src="teacher.img">
						</a>
						<div class="mooc-info">
							<div class="name"><strong>{{teacher.username}}</strong> </div>
							
							<div class="courses">已发布多门课程</div>
						</div>
						<div class="mooc-extra-info">
							<div class="word long-paragraph">
								{{teacher.info}}
							</div>
						</div>
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
      activeName: 'first',
	  teacherNo:this.$route.query.teacherNo,
	  teacher:{
		  username:'',
		  info:'',
		  img:''
	  },
	  tableData:[],
	  form:{
		  type:'',
		  searchKey:this.$route.query.title,
	  },
	  page:{
          size:9,
          total:0,
          index:1,
          flag:true,
	  },
	  courseRank:[],
	  rankCount:0,
	  rankStart:0,
	  rankEnd:9,
	  rankSize:9,
	  myTitle:''
    }
  },
  mounted () {
	  this.initCourseData();
	  this.initRank();
  },
  watch: {
		'$route' (to, from) {
			this.$router.go(0);
		}
	},
  methods:{
      initCourseData()
      {
           //初始化课程
		let url_course='api/user/course/query';
		let title=this.form.searchKey;
		if(!title) title='';
        let jsonDate={
            "pageSize":+this.page.size,
            "pageNum":this.page.index,
            "title":title,
            "role":2,
            "creater":this.teacherNo
        };
        this.$axios.post(url_course,jsonDate).then((response)=>{
            this.tableData=response.data.data.list;
            this.page.total=response.data.data.total;
            this.page.index=response.data.data.pageNum;
		});
		
		this.$axios.get('api/user/userInfo/query/'+this.teacherNo).then((response)=>{
			this.teacher.username=response.data.data.nick;
			this.teacher.info=response.data.data.info;
			this.teacher.img=response.data.data.image;
			this.myTitle=this.teacher.username+'老师的所有课程';
		});


	  },
	  //分页触发的方法
       currentChange(current){
            this.page.index=current;
            this.initCourseData();
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
	   love(id){ //点击收藏触发
		   if(sessionStorage.getItem('token'))  //如果用户有登录  新增用户的收藏记录
		   {
			   let userNo=sessionStorage.getItem('userID');
			   if(userNo)
			   {
				   let json={"uid":userNo,"cid":id};
				   this.$axios.post('api/user/course/redis/addLoveCourse',json).then((response)=>{
					   this.$message.success("收藏成功");
				   });
			   }
		   }else{
			   this.$message.error("您还没登录哦");
		   }
	   },
	   //返回课程收藏的人数
	   queryLove(id){
		   let count=0;
		   this.$axios.get('api/user/course/redis/queryLoveStudy?cid='+id).then((response)=>{
				return count= response.data.love;
			});
		  //return count;
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
			   this.rankStart=0;
			   this.rankEnd=this.rankSize;
		   }
		   this.initRank();
	   }
	   
  }
}
</script>
