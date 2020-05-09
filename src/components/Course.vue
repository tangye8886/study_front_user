<template>
<div>
   <div class="container layout layout-margin-top">
		<div class="row">
			<div class="col-md-9 layout-body">
				<div class="content">
					<div class="row course-cates">
						<div class="col-md-1 course-cates-title">标签：</div>
						<div class="col-md-11 course-cates-content">
							<a class="active" @click="queryAll()">全部</a>
							<a v-for="item in typeList" :key="item.id">
								<span @click="queryByType(item.id)">{{item.name}}</span>
							</a>
						</div>
					</div>
				</div>
				<div class="content position-relative">
					<div class="clearfix"></div>
					<div class="courses-sort">
						<a>最新</a>/
						<a>最热</a>
					</div>
					<el-tabs v-model="activeName">
						<el-tab-pane label="已上线" name="first">
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

						<el-tab-pane label="收费" name="thrid">
							<div class="row">
								<div class="col-md-4 col-sm-6  course" v-for="item in vipTableData" :key="item.id">
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
									v-if="vipPage.total>vipPage.size"
									layout="prev, pager, next"
									@current-change="currentChange2"
									:page-size="vipPage.size"
									:current-page="vipPage.index"
									:total="vipPage.total">
								</el-pagination>
							</nav>
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
								<a href="#sign-modal" data-toggle="modal" data-sign="signin"><span class="glyphicon glyphicon-bookmark"></span> 加入私有课</a>
							</div>
							<div class="col-md-6 col-xs-6 pos-right">
								<a target="_blank"><span class="glyphicon glyphicon-send"></span> 我要投稿</a>
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
	  activeName: 'first',
	  tableData:[],
	  vipTableData:[],
	  typeList:[],
	  courseRank:[],
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
	  vipPage:{
 		size:8,
    	total:0,
    	index:1,
	  },
	  rankCount:0,
	  rankStart:0,
	  rankEnd:9,
	  rankSize:9,
    }
  },
  mounted () {
	  this.initRank();
	  this.initCourseData();
  },
  watch: {
		'$route' (to, from) {
			// 路由发生变化页面刷新
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
			"pageSize":+this.page.size,"pageNum":this.page.index,"type":this.form.type,"title":title
        };
        this.$axios.post(url_course,jsonDate).then((response)=>{
          this.tableData=response.data.data.list;
          this.page.total=response.data.data.total;
          this.page.index=response.data.data.pageNum;
        });
			//初始化课程类型
		let url_type='api/user/course/type/queryAll';
        this.$axios.get(url_type).then((response)=>{
			this.typeList=response.data;
		});

		let vipData={
			"pageSize":+this.page.size,"pageNum":this.page.index,"isFree":1
        };
        this.$axios.post(url_course,vipData).then((response)=>{
          this.vipTableData=response.data.data.list;
          this.vipPage.total=response.data.data.total;
          this.vipPage.index=response.data.data.pageNum;
        });
		

	  },
	  queryByType(value){
		this.page.index=1;
		this.form.searchKey='';
		if(value)this.form.type=value;
		this.initCourseData();
	  },
	  queryAll(){
		 this.form.type='';
		 this.form.searchKey='';
		 this.initCourseData();
	  },
	  //分页触发的方法
       currentChange(current){
            this.page.index=current;
            this.initCourseData();
	   },
	   currentChange2(current){
			this.vipPage.index=current;
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
				   this.$axios.post('api/user/course/redis/addSeeRecord',json,{headers:{"Authorization":"Bearer "+sessionStorage.getItem('token')}}).then((response)=>{});
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
				   this.$axios.post('api/user/course/redis/addLoveCourse',json,{headers:{"Authorization":"Bearer "+sessionStorage.getItem('token')}}).then((response)=>{
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
	   //初始化 排行榜   根据学习人数排行
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
	   
  }
}
</script>
