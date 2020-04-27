<template>
<div>
	<el-container>
		<el-main>
			<div class="video-box" style="height:650px;width:1180px;margin-top:40px">
				<video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
			</div>
		</el-main>
		<el-aside width="300px">
          <el-row class="tac">
            <el-col :span="12">
              <h5>视频</h5>
              <el-menu
                :default-active="vedioNo"
                class="el-menu-vertical-demo"
                style="margin-top:40px;width:300px;height:660px"
                >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>目录</span>
                  </template>
                </el-submenu>
                
                <el-menu-item-group v-for="chapterItem in list" :key="chapterItem.id">
                  <template slot="title">{{chapterItem.name}} {{chapterItem.content}}</template>
                  <el-menu-item :index="vedioItem.id" v-for="vedioItem in chapterItem.vedioChildren" :key="vedioItem.id">
                    <span @click="selectVedio(vedioItem.src)">
                        {{vedioItem.title}} 
                    </span>
                  </el-menu-item>
                </el-menu-item-group>

              </el-menu>
            </el-col>
          </el-row>
		</el-aside>
	</el-container>
</div>
</template>

<script>
export default {
	data() {
         return {
             courseNo:this.$route.query.courseNo,
             vedioNo:this.$route.query.vedioNo,
             playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                //autoplay: "muted", //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "",
                    src:""+this.$route.query.src
                    //src:""
                }],
                //poster: "https://img20.360buyimg.com/babel/s590x470_jfs/t1/89215/5/10472/98081/5e1d649cE48754854/0e2c243c6e310f26.jpg.webp", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
					      timeDivider: true,
					      durationDisplay: false,
		          	remainingTimeDisplay: false,
		          	currentTimeDisplay: false, // 当前时间
		          	volumeControl: false, // 声音控制键
		          	playToggle: false, // 暂停和播放键
		          	progressControl: true, // 进度条
		          	fullscreenToggle: true ,// 全屏按钮
                }
            },
            list:[]
        }
    },
    created () {
	    this.initCourseInfo();
    },
    methods:{
      initCourseInfo(){
        if(this.courseNo)  //获取右边目录
        {
          this.$axios.get('api/user/course/query/'+this.courseNo).then((response)=>{
            let data=response.data;
            this.list=data.chapterChildren;
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });
        }
      },
      selectVedio(srcPath){
        this.playerOptions['sources'][0]['src']=srcPath.toString();
      }
   },

}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 600px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }


</style>