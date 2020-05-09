<template>
  <div class="hello" style="text-align: center;">


 <el-carousel :interval="5000" arrow="always" style="margin-top:40px">
    <el-carousel-item v-for="item in imgList" :key="item">
        <img :src="item"/>
    </el-carousel-item>
  </el-carousel>

 <div class="introduce-container" id="fourFeatures">
            <div class="container">
                <div class="row">
                    <div class="introduce-unit col-sm-6 col-md-3">
                        <div><a class="introduce-img"><img src="../../static/img/introduceContainer1.gif" /></a></div>
                        <div><span class="introduce-span">丰富全面的计算机热门课程</span></div>
                    </div>
                    <div class="introduce-unit col-sm-6 col-md-3">
                        <div><a class="introduce-img"><img src="../../static/img/introduceContainer2.gif" /></a></div>
                        <div><span class="introduce-span">视频环境，1秒启动</span></div>
                    </div>
                    <div class="introduce-unit col-sm-6 col-md-3">
                        <div><a class="introduce-img"><img src="../../static/img/introduceContainer3.gif" /></a></div>
                        <div><span class="introduce-span">每天一个项目视频，丰富你的项目经验</span></div>
                    </div>
                    <div class="introduce-unit col-sm-6 col-md-3">
                        <div><a class="introduce-img"><img src="../../static/img/introduceContainer4.gif" /></a></div>
                        <div><span class="introduce-span">有效学习时间，真实记录你的代码生涯</span></div>
                    </div>
                </div>
            </div>
        </div>


        <div class="line-and-laboratory">
                <div class="container">
                    <div class="clearfix text-center item-header">
                        <span class="line"></span>
                        <span class="text-center item-title">学习路径</span>
                        <span class="line"></span>
                    </div>
                    <div class="tab-content">
                        <div class="tab-pane clearfix active" id="study-line">

                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <a @click="find('入门')">
                                    <div class="path-item">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471513730333.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">新手入门</div>
                                            <div class="path-course-num">
                                                <span>6</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">新手入门路径帮助对 IT 技术感兴趣的新手0基础入门计算机编程。本路径通过新手入门、Linux 及 Vim课程熟悉实验楼的实践学习环境，再以 C 语言和一个简单的项目引导你一步步进入计算机技术的殿堂。</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            
                            <div class="col-xs-12 col-sm-6 col-md-4">
                                
                                    <div class="path-item" @click="find('python')">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471513769430.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">Python研发工程师</div>
                                            <div class="path-course-num">
                                                <span>83</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">Python技术路径中包含入门知识、Python基础、Web框架、基础项目、网络编程、数据与计算及综合项目七个模块。模块中的课程将带着你逐步深入，学会如何使用 Python 实现项目一个博客，桌面词典，微信机器人或网络安全软件等。完成本路径的实验课，将具备独立开发 Python 软件和 Web 应用的能力。</div>
                                        </div>
                                    </div>
                                
                            </div>

                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <a @click="find('C++')">
                                    <div class="path-item">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471513793360.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">C++ 研发工程师</div>
                                            <div class="path-course-num">
                                                <span>26</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">C++ 学习路径中将通过使用 C++ 语言实现 Web 服务器，Markdown 解析器，内存池以及 Docker 容器管理工具等，学习并实践 C++ 编程基础，C++ 11/14 标准，C++ 图像处理及增强现实技术。完成本路径的所有实验课，将能够使用 C++  独立实现复杂的应用程序。</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            
                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <a @click="find('大数据')">
                                    <div class="path-item">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471513926288.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">大数据工程师</div>
                                            <div class="path-course-num">
                                                <span>36</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">大数据学习路径中会学习并实践 Java、Scala、Hadoop、HBase、Mahout、Sqoop及Spark等大数据技术，本路径通过大量的动手实验，在实验数据集上实践各种大数据工具，帮助你成长为具备动手能力的大数据工程师。</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            
                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <a @click="find('信息安全')">
                                    <div class="path-item">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471513867033.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">信息安全工程师</div>
                                            <div class="path-course-num">
                                                <span>38</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">信息安全学习路径首先完成 Linux、脚本编程、数据库和网络等基础知识学习，然后通过密码学实验、系统安全实验、Web安全实验、网络安全实验四个核心模块的动手实践，强化信息安全工程师必须要掌握的系统防护，Web渗透及网络攻防等基本技能。</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            
                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <a @click="find('运维')">
                                    <div class="path-item">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471514004752.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">Linux运维工程师</div>
                                            <div class="path-course-num">
                                                <span>33</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">Linux运维技术路径中首先学习 Linux 相关的基本操作和系统管理，然后依次学习并实践服务部署、数据库管理、脚本编程、系统监控和安全防护、以及Web服务运维技术。最后学习 Docker 容器服务和 Windows Server的运维知识。本路径的实验将帮助你成为一名合格的 Linux 运维工程师。</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            
                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <a @click="find('java')">
                                    <div class="path-item">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471514111981.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">Java研发工程师</div>
                                            <div class="path-course-num">
                                                <span>25</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">Java 学习路径中将首先完成 Java基础、JDK、JDBC、正则表达式等基础实验，然后进阶到 J2SE 和 SSH 框架学习。通过使用 Java 语言实现日记本，个人相册、编辑器、通讯录等，学习并实践 Java 编程基础，SSH 项目实战以及Java Web 应用开发。</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            
                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <a @click="find('PHP')">
                                    <div class="path-item">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471514095761.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">PHP研发工程师</div>
                                            <div class="path-course-num">
                                                <span>30</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">PHP 技术路径中包含入门知识、PHP 编程基础、PHP Web 框架、项目实战和项目进阶五个模块。模块中的课程将带着你逐步深入，学会如何使用 PHP 实现项目一个博客，聊天室，MVC框架及搜索系统等。完成本路径所有实验课，将具备使用 PHP 独立开发 Web 应用的能力。</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            
                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <a @click="find('Web')">
                                    <div class="path-item">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471514153000.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">Web前端工程师</div>
                                            <div class="path-course-num">
                                                <span>34</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">Web 前端学习路径中首先实践 HTML、CSS、JavaScript、jQuery、HTML5等基础知识，然后完成实现页面特效组件、网页游戏、Web应用等一系列项目，帮助你通过动手实践成长为合格的 Web 前端工程师。</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
 
                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <a @click="find('研发')">
                                    <div class="path-item">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471514037180.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">Linux研发工程师</div>
                                            <div class="path-course-num">
                                                <span>27</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">Linux 研发学习路径中首先学习 Linux基础、C语言、Git、GDB、数据结构等基础知识，然后完成 TCP/IP、MySQL 数据库、操作系统等实验课程。项目阶段将实现 cp、ls、touch、ping等一系列Linux命令和端口扫描、Web服务器、聊天室等网络应用，帮助你通过动手实践入门 Linux 系统研发。</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            
                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <a @click="find('NodeJS')">
                                    <div class="path-item">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471513817808.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">NodeJS研发工程师</div>
                                            <div class="path-course-num">
                                                <span>21</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">NodeJS 学习路径中将通过使用 NodeJS 实现博客、在线笔记、爬虫、即时搜索、漂流瓶、端口扫描器等应用，学习并实践 NodeJS 编程基础和Web 应用开发等技术。完成本路径的所有实验课，将能够使用 NodeJS 独立实现 Web 应用程序。</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                             
                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <a @click="find('MongoDB')">
                                    <div class="path-item">
                                        <div class="col-xs-5 col-sm-4 path-img">
                                            <img src="../../static/img/1471514058548.png">
                                        </div>
                                        <div class="col-xs-7 col-sm-8">
                                            <div class="path-name">MongoDB工程师</div>
                                            <div class="path-course-num">
                                                <span>6</span>
                                                门课程
                                            </div>
                                        </div>
                                        <div class="desc-layer">
                                            <div class="center">MongoDB 技术路径中首先学习 Linux、Bash、MySQL基础知识，然后依次学习并实践 Memcached、Redis 和 MongoDB技术。本路径的实验将帮助你逐步入门 MongoDB 这类 NoSQL 数据库。</div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        <div class="line-and-laboratory">
            <div class="container">
                <div class="clearfix text-center item-header">
                    <span class="line"></span>
                    <div class="text-center item-title">推荐课程</div>
                    <span class="line"></span>
                </div>
                <div class="clearfix courses">
                        <div class="col-md-3 col-sm-6  course" v-for="item in tableData" :key="item.id">
                            <a class="course-box" @click="gotoCourseInfo(item.id)">
                                <div class="sign-box">
                                    <i class="fa fa-star-o course-follow pull-right" style="display:none"  ></i>
                                </div>
                                <div class="course-img">
                                    <img :alt="item.title" :src="item.image">
                                </div>
                                <div class="course-body">
                                    <span class="course-title" data-toggle="tooltip" data-placement="bottom" :title="item.title">{{item.title}}</span>
                                </div>
                                <div class="course-footer">
                                    <span class="course-per-num pull-left">
                                        <i class="fa fa-users"></i>{{item.loveNumber}}
                                    </span>
                                    <span class="course-money pull-right" v-if="item.price==0">免费</span>
                                    <span class="course-money pull-right" v-if="item.price>0">会员</span>
                                </div>
                            </a>
                        </div>
                </div>
                 <div class="clearfix item-footer">
                    <div class="pull-right watch-all">
                        <router-link to="/course">
                            <a>查看更多></a>
                        </router-link>
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
      msg: 'Welcome to Your Vue.js App',
      list:[1],
      imgList:[ 'https://edu-image.nosdn.127.net/563b4fee166741ab872edffe3f9acc69.jpg?imageView&quality=100&thumbnail=1205y400',
        'https://edu-image.nosdn.127.net/8014b3e857784aeeb4100f41908ab9bd.jpg?imageView&quality=100&thumbnail=1205y400'],
      tableData:[]
    }
  },
  mounted () {
      this.initHomeData();
  },
  methods:{
      initHomeData()
      {
           //初始化教师列表
        let url='api/user/course/query';
        let jsonDate={
            "pageSize":4,"pageNum":1
        };
        this.$axios.post(url,jsonDate)
        .then((response)=>{
          this.tableData=response.data.data.list;
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
      },
      find(searchKey){
        this.$router.push({path:'/course',query:{title:searchKey}})
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
       }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #f1f4f8;
  }
</style>
