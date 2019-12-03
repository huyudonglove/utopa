<template>
  <div>
    <div v-if="$route.name=='applicationInfo'">
      <div style="height:50px;border-bottom:1px solid #DFDCDC;">
        <span style="font-size:24px;font-weight:bold;color:#614a4d;">应用配置</span>
      </div>
      <div style="padding-top:15px;">
        <el-button type="primary" plain size="mini" @click="goTo()">返回</el-button> 
        <span style="font-weight:600;color:#614a4d">素材库列表查询:</span>
      </div>
      <el-divider></el-divider>
      <div style="margin-top:15px;">
        <el-form  ref="formSize" label-width="100px" class="demo-formSize">
        <el-form-item label="选择素材库">
          <div class="tag-group">
            <el-tag v-for="item in moduleDetail" :key="item.id" @click="tag(item.module,item.moduleName)" :type="item.module == tagKey?'success':''">{{item.moduleName}}-({{(item.materialCount)}})</el-tag>
          </div>
        </el-form-item>
        <span style="display:block;width:110px;text-align:right;padding-right:12px;font-weight:600;color:#614a4d">{{tagValue}}素材:</span>
        <el-divider></el-divider>
        <el-row class="tac" style="border-bottom:1px solid #eeeeee; padding:15px 0">
          <span>
            <el-input
              placeholder="输入素材关键字"
              class="input-with-select pl15"
              style="width: 15%"
              v-model="wd"
            ></el-input>
          </span>
          <span>
            类别筛选：
             <el-cascader
            ref="tree"
            v-model="moduleTreeSelect"
            :options="moduleTree"
            :props="props"
            :show-all-levels="false"
            @change="handleChange"
            filterable
				   clearable
            >
            </el-cascader>
          </span>
        </el-row>
          <!-- 数据展示 -->
        <el-table :data="tableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%" :key="(new Date()).valueOf()" :max-height="tableHeight">
         <el-table-column prop="id" :label="'id'" width="120" align="center"
        :key="Math.random()+9"
        >
        </el-table-column>
        <el-table-column prop="name" :label="`${tagValue}名称`" width="" align="center" :key="Math.random()+10">
        </el-table-column>
        <el-table-column prop="materialCategoryName" :label="'所属类别'" width="" align="center" :key="Math.random()+11">
        </el-table-column>
        <el-table-column prop="parentIdUrl" :label="`${tagValue}预览`" width="200" align="center" v-if="tagKey==100" :key="Math.random()+12">
           <template slot-scope="scope">
              <span style="cursor: pointer;" >
              <img src="@/assets/play.png" alt="" v-if="!scope.row.play" @click="tableData.forEach(v=>{v.play=false;});scope.row.play=true;playMusic(scope.row.androidMaterial)">
               <img src="@/assets/stop.png" alt="" v-if="scope.row.play" @click="scope.row.play=!scope.row.play;playMusic()">
            </span>
             </template>
        </el-table-column>
        
        <el-table-column  :label="`${tagValue}展示`" width="150" align="center" v-if="tagKey==101||tagKey==103||tagKey==102" :key="Math.random()+13">
            <template slot-scope="scope">
              <span style="cursor: pointer;" >
                <img :src="scope.row.webUrl?`/static/${scope.row.webUrl}`:null" alt=""  style="width:50px;height:50px" v-focus>
              </span>
            </template>
        </el-table-column>
         
        <el-table-column  :label="`${tagValue}预览`" width="150" align="center" v-if="tagKey==105||tagKey==107" :key="Math.random()+14">
           <template slot-scope="scope">
              <span style="cursor: pointer;" >
                <img :src="scope.row.webUrl?`/static/${scope.row.webUrl}`:null" alt=""  style="width:50px;height:50px" v-focus>
              </span>
            </template>
          </el-table-column>
           <el-table-column  :label="`${tagValue}预览`" width="150" align="center" v-if="tagKey==104" :key="Math.random()+15">
           <template slot-scope="scope">
              <a :href="`http://${scope.row.videoUrl}`" target="_blank">{{scope.row.videoUrl}} </a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column  :label="`占位图展示`" width="200" align="center" v-if="tagKey==102" :key="Math.random()+16">
           <template slot-scope="scope">
              <span style="cursor: pointer;" >
                <img :src="scope.row.pictureUrl?`/static/${scope.row.pictureUrl}`:null" alt="" style="width:50px;height:50px" v-focus v-if="scope.row.pictureUrl">
              </span>
            </template>
        </el-table-column>
        <el-table-column prop="isLyric" label="是否包含歌词" width="120" align="center" v-if="tagKey==101" :key="Math.random()+17">
          <template slot-scope="scope">
            <span v-if="scope.row.isLyric==1">是</span>
            <span v-if="!scope.row.isLyric" style="color:#FF644E">否</span>
      
          </template>
          </el-table-column>
          <el-table-column  label="资源包大小" width="150" align="center" v-if="tagKey ==100||tagKey ==107" :key="Math.random()+18">
             <template slot-scope="scope">
               {{((scope.row.androidResourcePackageSize/(1024*1024))+'').slice(0,4)}}M
               
            </template>
          </el-table-column>
          <el-table-column  label="安卓资源包大小" width="150" align="center" v-if="tagKey ==101||tagKey ==102||tagKey ==103" :key="Math.random()+19">
             <template slot-scope="scope">
               {{((scope.row.androidResourcePackageSize/(1024*1024))+'').slice(0,4)}}M
            </template>
          </el-table-column>
          <el-table-column prop="iosResourcePackageSize" label="IOS资源包大小" width="150" align="center" v-if="tagKey ==101||tagKey ==102||tagKey ==103||tagKey ==105||tagKey ==106" :key="Math.random()+20">
             <template slot-scope="scope">
               {{((scope.row.iosResourcePackageSize/(1024*1024))+'').slice(0,4)}}M
            </template>
          </el-table-column>
          <el-table-column prop="durationTimeStr" label="总时长" width align="center" v-if="tagKey==100||tagKey==101||tagKey ==105||tagKey ==106||tagKey ==107" :key="Math.random()+21"></el-table-column>
          <el-table-column prop="state" label="状态" width align="center" width="120" >
            <template slot-scope="scope">
            <span v-if="scope.row.state==1">上架</span>
            <span v-if="scope.row.state==2" style="color:#FF644E">下架</span>
          </template>
          </el-table-column>
        </el-table>
         <div>
         <audio :src="url" autoplay="autoplay" ref="audio"></audio>
        </div>
		<div style="margin-top:15px;margin-bottom:15px"> <pagination v-if="showPagination"></pagination></div>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {applicationM,applicationToTree,getFile} from "../../http/request";
import pagination from '../../share/pagination'

export default {
  name: "applicationInfo",
  inject:['replace','reload'],
  data(){
	  return{
      moduleTreeSelect:[],
      options:[],//玩法
      moduleDetail:[],//素材种类
      moduleTree:[],//模块分类
      wd:'',
      showPagination:false,
      tagValue:'',
      tagKey:'',
      moduleTreeVal:'',
      formSize:{
        "name": '',
        "playId":'',
        "moduleList":[]      
      },
       props: {
        label: "name",
        children: 'children',
        value:'id',
        checkStrictly: true,
        expandTrigger:'hover'
    },
    url:'',
    tableHeight:0
      
	  }
  },
  created(){
	let query=this.$route.query
  let pageRecord = query.page;//记录上一次页码操作
  let limitRecord = query.limit;//记录上一次limit操作
  this.wd=query.wd?query.wd:'';
  this.moduleTreeVal=query.moduleTreeVal?parseInt(query.moduleTreeVal):'';
  if(query.id){
    this.isCreate=false;
    this.info({appId:query.id})
  }
	this.$nextTick(()=>{
		this.$store.commit('pagination/setClickPage',pageRecord);
		this.$store.commit('pagination/setLimitPage',limitRecord);
		this.showPagination = true;//加载分页组件
})
  },
  computed:{
	...mapState('pagination',{page:'clickPage',limit:'limitPage'}),
  ...mapState('applicationList',{tableData:'tableData3',total:'total3',currentRow:'currentRow'}),
  playId(){
    return this.formSize.playId
  }
  },
  methods:{
	  ...mapActions('applicationList',['initListModule','info']),
    tag(code,value){
      this.tagKey=code;
      this.tagValue=value
    },
      //返回
    goTo(){
      // console.log(this.$route.query.msg,'this.$route.msg')
      this.$router.push({path:'/applicationManagement/applicationList',query:JSON.parse(this.$route.query.msg)})
    },
   handleChange(value){
        this.moduleTreeVal=value[value.length-1]
      },
  playMusic(id,row){
          id?(()=>{
              this.url=`/static/${Base64.decode(id)}`;
              this.$refs.audio.load();
              this.$refs.audio.play();
              this.$refs.audio.onended=function () {
                row.play=!row.play;
              }
              })():(()=>{
                this.$refs.audio.pause();
              })();
        },
  },
  watch:{
	page(){
		this.replace("page",this.page);
    },
  limit(){
      this.replace('limit',this.limit);
  },
  wd(){
    this.$store.commit('pagination/setClickPage',1);
    this.replace('wd',this.wd);
  },
  moduleTreeVal(){
    this.$store.commit('pagination/setClickPage',1);
    this.replace('moduleTreeVal',this.moduleTreeVal);
  },
  tagKey(){
    // console.log(this.tagKey,'tagKey')
     this.initListModule({...this.$route.query,module:this.tagKey,appId:this.formSize.id}).then(res=>{
     this.$store.commit('pagination/setTotal',this.total);
     applicationToTree({moduleId:this.tagKey}).then(res=>{
      this.moduleTree=res.data?res.data:[]
      this.moduleTree.push({id: "",name:"全部"})
    })
    })
    this.moduleTreeVal=''
    this.wd=''
    this.$refs.audio.pause();
  },
	currentRow(){
    this.formSize = Object.assign(this.formSize, this.currentRow);
    this.moduleDetail=this.formSize.moduleList
    this.tagValue=this.moduleDetail[0].moduleName
    this.tagKey=this.moduleDetail[0].module
  },
	$route(){//判断路由query变化执行请求
    if(this.$route.name=='applicationInfo'){
      //  console.log(this.$route.query,'this.$route.msg')
		this.initListModule({...this.$route.query,module:this.tagKey,appId:this.formSize.id}).then(res=>{
		this.$store.commit('pagination/setTotal',this.total);
		})
      }
    }
  },
  updated(){
      this.$nextTick(()=>{
        this.tableHeight = window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 110;
        
      })
  },
  components: {
    pagination
  }
};
</script>

<style scoped>
.tac span {
  font-size:14px;
  color:#606266;
  padding-left: 5px;
  padding-right: 10px;
}
.el-tag{
  margin-right: 10px;cursor: pointer;
}
</style>