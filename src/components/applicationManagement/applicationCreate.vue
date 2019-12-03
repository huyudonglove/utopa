<template>
  <div>
    <div v-if="$route.name=='applicationCreate'">
      <div  v-if="isCreate"style="height:50px;border-bottom:1px solid #DFDCDC;">
        <span style="font-size:24px;font-weight:bold;color:#614a4d;">新建应用配置</span>
      </div>
       <div v-else style="height:50px;border-bottom:1px solid #DFDCDC;margin-bottom:15px;">
        <span style="font-size:24px;font-weight:bold;color:#614a4d;">编辑应用配置</span>
      </div>
      <div style="margin-top:15px;">
        <el-form :model="formSize" :rules="rules" ref="formSize" label-width="100px" class="demo-formSize">
        <el-form-item label="应用名称" prop="name">
          <el-input v-model="formSize.name" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="玩法选择" prop="playId">
           <el-select v-model="formSize.playId" placeholder="请选择">
              <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择素材库" prop="moduleList">
          <div class="tag-group">
            <el-tag v-for="item in moduleDetail" :key="item.id" @click="tag(item.module,item.moduleName)" :type="item.module == tagKey?'success':''">{{item.moduleName}}</el-tag>
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
          <span>
            <el-button type="primary"  @click="selectAll()">批量选择</el-button>
          </span>
        </el-row>
          <!-- 数据展示 -->
        <el-table :data="tableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :key="(new Date()).valueOf()" :max-height="tableHeight" :min-height="250">
        <el-table-column
        type="selection"
        width="55"
        :selectable="(row)=>multipleSelectionAll100.map(v=>v.id).indexOf(row.id)==-1&&row.state==1"
        v-if="tagKey==100"
        :key="Math.random()+1"
        >
        </el-table-column>
        <el-table-column
        type="selection"
        width="55"
        :selectable="(row)=>multipleSelectionAll101.map(v=>v.id).indexOf(row.id)==-1&&row.state==1"
        v-if="tagKey==101"
        :key="Math.random()+2"
        >
        </el-table-column>
        <el-table-column
        type="selection"
        width="55"
        :selectable="(row)=>multipleSelectionAll102.map(v=>v.id).indexOf(row.id)==-1&&row.state==1"
        v-if="tagKey==102"
        :key="Math.random()+3"
        >
        </el-table-column>
        <el-table-column
        type="selection"
        width="55"
        :selectable="(row)=>multipleSelectionAll103.map(v=>v.id).indexOf(row.id)==-1&&row.state==1"
        v-if="tagKey==103"
        :key="Math.random()+4"
        >
        </el-table-column>
        <el-table-column
        type="selection"
        width="55"
        :selectable="(row)=>multipleSelectionAll104.map(v=>v.id).indexOf(row.id)==-1&&row.state==1"
        v-if="tagKey==104"
        :key="Math.random()+5"
        >
        </el-table-column>
        <el-table-column
        type="selection"
        width="55"
        :selectable="(row)=>multipleSelectionAll105.map(v=>v.id).indexOf(row.id)==-1&&row.state==1"
        v-if="tagKey==105"
        :key="Math.random()+5"
        >
        </el-table-column>
        <el-table-column
        type="selection"
        width="55"
        :selectable="(row)=>multipleSelectionAll106.map(v=>v.id).indexOf(row.id)==-1&&row.state==1"
        v-if="tagKey==106"
        :key="Math.random()+7"
        >
        </el-table-column>
         <el-table-column
        type="selection"
        width="55"
        :selectable="(row)=>multipleSelectionAll107.map(v=>v.id).indexOf(row.id)==-1&&row.state==1"
        v-if="tagKey==107"
        :key="Math.random()+8"
        >
        </el-table-column>
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
                <img :src="scope.row.pictureUrl?`/static/${scope.row.pictureUrl}`:null" alt=""  style="width:50px;height:50px" v-focus>
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
		<div style="margin-top:15px;margin-bottom:15px">
       <!-- <pagination v-if="showPagination"></pagination> -->
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[ 20, 40, 60,80]"
          :page-size="limit"
          layout="total,sizes, prev, pager, next,jumper"
          :total="total?total:0">
          </el-pagination>
       </div>
    
    <span style="display:block;padding-right:12px;font-weight:600;color:#614a4d">已选{{tagValue}}素材列表:</span>
    <el-divider></el-divider>
    <el-row class="tac" style="border-bottom:1px solid #eeeeee; padding:15px 0">
          <span>
            <el-input
              placeholder="输入素材关键字"
              class="input-with-select pl15"
              style="width: 15%"
              v-model="keyWord"
              clearable
            ></el-input>
          </span>
          <!-- <span>
            类别筛选：
          <el-cascader
            ref="treeOther"
            v-model="moduleTreeOtherSelect"
            :options="moduleTree"
            :props="props"
            :show-all-levels="false"
            @change="handleChange2"
            filterable
				   clearable
            >
            </el-cascader>
          </span> -->
          <span>
            <el-button type="danger" plain @click="delAll(multipleSelectionList)">批量取消</el-button>
          </span>
          
        </el-row>
         <div class="tag-group" style="margin-top:15px">
            <el-tag v-for="item in moduleDetail2" :key="item.id" @click="tag2(item.module,item.moduleName)" :type="item.module == tagCode?'success':''">{{item.moduleName}}
              <span v-if="item.module==''">({{multipleSelectionAll.length}})</span>
              <span v-if="item.module==100">({{multipleSelectionAll100.length}})</span>
              <span v-if="item.module==101">({{multipleSelectionAll101.length}})</span>
              <span v-if="item.module==102">({{multipleSelectionAll102.length}})</span>
              <span v-if="item.module==103">({{multipleSelectionAll103.length}})</span>
              <span v-if="item.module==104">({{multipleSelectionAll104.length}})</span>
              <span v-if="item.module==105">({{multipleSelectionAll105.length}})</span>
              <span v-if="item.module==106">({{multipleSelectionAll106.length}})</span>
              <span v-if="item.module==107">({{multipleSelectionAll107.length}})</span>
              </el-tag>
          </div>
        <!-- 数据展示  已选素材列表 start-->
        <el-table :data="electionFlag" ref="selectMultipleTable" tooltip-effect="dark" :key="Math.random()" style="width: 100%" @selection-change="selectList">
        <el-table-column
        type="selection"
        width="55"
        > 
        </el-table-column>
        <el-table-column prop="id" :label="'id'" width="120" align="center" :key="Math.random()+30">
        </el-table-column>
        <el-table-column prop="name" :label="`${tagValue}名称`" width="" align="center" :key="Math.random()+31">
        </el-table-column>
        <el-table-column prop="materialCategoryName" :label="'所属类别'" width="" align="center" :key="Math.random()+32">
        </el-table-column>
        <el-table-column prop="parentIdUrl" :label="`${tagValue}预览`" width="200" align="center" v-if="tagKey==100" :key="Math.random()+33">
           <template slot-scope="scope">
              <span style="cursor: pointer;" >
              <img src="@/assets/play.png" alt="" v-if="!scope.row.play" @click="electionFlag.forEach(v=>{v.play=false;});scope.row.play=true;playMusic(scope.row.androidMaterial)">
               <img src="@/assets/stop.png" alt="" v-if="scope.row.play" @click="scope.row.play=!scope.row.play;playMusic()">
            </span>
             </template>
        </el-table-column>
        
        <el-table-column  :label="`${tagValue}展示`" width="150" align="center" v-if="tagKey==101||tagKey==103||tagKey==102" :key="Math.random()+34">
            <template slot-scope="scope">
              <span style="cursor: pointer;" >
                <img :src="scope.row.webUrl?`/static/${scope.row.webUrl}`:null" alt=""  style="width:50px;height:50px" v-focus>
              </span>
            </template>
        </el-table-column>
         
        <el-table-column  :label="`${tagValue}预览`" width="150" align="center" v-if="tagKey==105||tagKey==107" :key="Math.random()+35">
           <template slot-scope="scope">
              <span style="cursor: pointer;" >
                <img :src="scope.row.webUrl?`/static/${scope.row.webUrl}`:null" alt=""  style="width:50px;height:50px" v-focus>
              </span>
            </template>
          </el-table-column>
           <el-table-column  :label="`${tagValue}预览`" width="150" align="center" v-if="tagKey==104" :key="Math.random()+36">
           <template slot-scope="scope">
              <a :href="`${scope.row.videoUrl}`" target="_blank">{{scope.row.videoUrl}} </a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column  :label="`占位图展示`" width="200" align="center" v-if="tagKey==102" :key="Math.random()+37">
           <template slot-scope="scope">
              <span style="cursor: pointer;" >
               <img :src="scope.row.pictureUrl?`/static/${scope.row.pictureUrl}`:null" alt=""  style="width:50px;height:50px" v-focus>
              </span>
            </template>
        </el-table-column>
        <el-table-column prop="isLyric" label="是否包含歌词" width="120" align="center" v-if="tagKey==101" :key="Math.random()+38">
          <template slot-scope="scope">
            <span v-if="scope.row.isLyric==1">是</span>
            <span v-if="!scope.row.isLyric" style="color:#FF644E">否</span>
      
          </template>
          </el-table-column>
          <el-table-column  label="资源包大小" width="150" align="center" v-if="tagKey ==100||tagKey ==107" :key="Math.random()+39">
             <template slot-scope="scope">
               {{((scope.row.androidResourcePackageSize/(1024*1024))+'').slice(0,4)}}M
            </template>
          </el-table-column>
          <el-table-column  label="安卓资源包大小" width="150" align="center" v-if="tagKey ==101||tagKey ==102||tagKey ==103" :key="Math.random()+40">
             <template slot-scope="scope">
               {{((scope.row.androidResourcePackageSize/(1024*1024))+'').slice(0,4)}}M
            </template>
          </el-table-column>
          <el-table-column prop="iosResourcePackageSize" label="IOS资源包大小" width="150" align="center" v-if="tagKey ==101||tagKey ==102||tagKey ==103||tagKey ==105||tagKey ==106" :key="Math.random()+41">
             <template slot-scope="scope">
               {{((scope.row.iosResourcePackageSize/(1024*1024))+'').slice(0,4)}}M
            </template>
          </el-table-column>
          <el-table-column prop="durationTimeStr" label="总时长" width align="center" v-if="tagKey==100||tagKey==101||tagKey ==105||tagKey ==106||tagKey ==107" :key="Math.random()+42">
          </el-table-column>
           <el-table-column prop="state" label="状态" width="120" align="center" :key="Math.random()+43">
              <template slot-scope="scope">
                <span v-if="scope.row.state==1">上架</span>
                <span v-if="scope.row.state==2" style="color:#FF644E">下架</span>
              </template>
          </el-table-column>
           <el-table-column label="操作" align="center" width="250" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
               @click="del(scope.row,scope.$index,tagKey)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 数据展示  已选音乐素材列表 end-->
        <el-form-item style="margin-top:15px;">
          <el-button v-if="isCreate" type="primary" @click="submitForm('formSize')" >立即新增</el-button >
          <el-button v-else type="primary" @click="updateForm('formSize')" >立即修改</el-button>
          <el-button @click="goTo()">取消</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {applicationPlay,applicationM,applicationToTree,getFile} from "../../http/request";
import pagination from '../../share/pagination'
export default {
  name: "applicationCreate",
  inject:['replace','reload'],
  data(){
	  return{
      options:[],//玩法
      moduleDetail:[],//素材种类
      moduleDetail2:[],//素材种类
      moduleTree:[],//模块分类
      wd:'',
      showPagination:false,
      tagValue:'',
      tagKey:'',
      tagCode:'',
      keyWord:'',
      url:'',
      multipleSelection100:[],
      multipleSelection101:[],
      multipleSelection102:[],
      multipleSelection103:[],
      multipleSelection104:[],
      multipleSelection105:[],
      multipleSelection106:[],
      multipleSelection107:[],
      multipleSelectionAll:[],//已选全部素材
      multipleSelectionAll100:[],
      multipleSelectionAll101:[],
      multipleSelectionAll102:[],
      multipleSelectionAll103:[],
      multipleSelectionAll104:[],
      multipleSelectionAll105:[],
      multipleSelectionAll106:[],
      multipleSelectionAll107:[],
      multipleSelectionList:[],
      materialIdsAarray:[],
      electionFlag:[],
      electionFlagCopy:[],//已选择内容 关键字的筛选备份
      flag:false,
      moduleTreeVal:'',
      moduleTreeSelect:[],
      moduleTreeValOther:'',
      moduleTreeOtherSelect:[],
      isCreate:true,
      firstTime:0,
      formSize:{
        "name": '',
        "playId":'',
        "moduleList":[]      
      },
      rules: {
          name: [
            { required: true, message: '请输入应用名称', trigger: 'blur' }
          ],
          playId: [
            { required: true, message: '请选择玩法', trigger: 'change' }
          ],
          moduleList: [
            { type: 'array', required: true, message: '请至少选择一个素材题库', trigger: 'change' }
          ]
        },
     props: {
        label: "name",
        children: 'children',
        value:'id',
        checkStrictly: true,
        expandTrigger:'hover'
    },
    tableHeight:0,
    tableHeight2:0,
    limit:20,
    page:1
	  }
  },
  created(){
	let query=this.$route.query
  let pageRecord = query.page;//记录上一次页码操作
  let limitRecord = query.limit;//记录上一次limit操作
  this.wd=query.wd?query.wd:'';
  this.moduleTreeVal=query.moduleTreeVal?parseInt(query.moduleTreeVal):'';
  applicationPlay({}).then(res=>{
    this.options=res.data
    if(this.isCreate){
      this.formSize.playId=this.options[this.options.length-1].id
    }else{
      
    }
  })
  if(this.$route.query.id){
    this.isCreate=false;
    this.info({appId:query.id}).then(v=>{
      this.formSize=v.data
    })
    
  }
  },
  computed:{
	// ...mapState('pagination',{page:'clickPage',limit:'limitPage'}),
  ...mapState('applicationList',{tableData:'tableData2',total:'total2',currentRow:'currentRow'}),
  playId(){
    return this.formSize.playId
  },
  
  },
  methods:{
	  ...mapActions('applicationList',['initModule','save','info','initListModule','update']),
	  handleSelectionChange(val) {
		switch (this.tagKey) {
      case 100:
        this.multipleSelection100=this.multipleSelectionAll100.concat(val)
        break;
      case 101:
        this.multipleSelection101=this.multipleSelectionAll101.concat(val)
        break;
        case 102:
        this.multipleSelection102=this.multipleSelectionAll102.concat(val)
        break;
        case 103:
        this.multipleSelection103=this.multipleSelectionAll103.concat(val)
        break;
        case 104:
        this.multipleSelection104=this.multipleSelectionAll104.concat(val)
        break;
        case 105:
        this.multipleSelection105=this.multipleSelectionAll105.concat(val)
        break;
        case 106:
        this.multipleSelection106=this.multipleSelectionAll106.concat(val)
        break;
        case 107:
        this.multipleSelection107=this.multipleSelectionAll107.concat(val)
        break;
      default:
        break;
    }
	  },
    tag(code,value){
      this.tagKey=code;
      this.tagValue=value;
      this.tagCode=code;
      this.firstTime++
    },
    selectAllCom(){
        this.$message({
          showClose: true,
          message: '请最少选择一个选项',
          type: 'error'
        });
    },
    selectAll(){
      switch (this.tagCode) {
        case 100:
          if(this.multipleSelection100.length>0){
          this.multipleSelectionAll100=this.multipleSelection100
          }else{
          this.selectAllCom()
          }
          break;
        case 101:
        if(this.multipleSelection101.length>0){
          this.multipleSelectionAll101=this.multipleSelection101
          }else{
          this.selectAllCom()
          }
          break;
          case 102:
          if(this.multipleSelection102.length>0){
           this.multipleSelectionAll102=this.multipleSelection102
          }else{
          this.selectAllCom()
          }
          break;
        case 103:
         if(this.multipleSelection103.length>0){
          this.multipleSelectionAll103=this.multipleSelection103
          }else{
          this.selectAllCom()
          }
        break;
        case 104:
         if(this.multipleSelection104.length>0){
          this.multipleSelectionAll104=this.multipleSelection104
          }else{
          this.selectAllCom()
          }
        break;
        case 105:
         if(this.multipleSelection105.length>0){
          this.multipleSelectionAll105=this.multipleSelection105
          }else{
          this.selectAllCom()
          }
        break;
        case 106:
         if(this.multipleSelection106.length>0){
          this.multipleSelectionAll106=this.multipleSelection106
          }else{
          this.selectAllCom()
          }
        break;
        case 107:
         if(this.multipleSelection107.length>0){
          this.multipleSelectionAll107=this.multipleSelection107
          }else{
          this.selectAllCom()
          }
        break;
      default:
        break;
    }
    },
    delCom(row){
      this.formSize.moduleList.forEach((v,index)=>{
         if(this.tagCode==v.module){
         this.formSize.moduleList.splice(index,1,{})
         this.$refs.multipleTable.toggleRowSelection(row); 
        }
      })
    },
    del(row,idx,ref){
      switch (ref) {
        case 100:
        var i=this.multipleSelectionAll100.map(v=>v.id).indexOf(row.id)
        this.multipleSelectionAll100.splice(i, 1)
        this.delCom(row)
        break;
        case 101:
        var i=this.multipleSelectionAll101.map(v=>v.id).indexOf(row.id)
        this.multipleSelectionAll101.splice(i, 1)
        this.delCom(row)
        break;
        case 102:
        var i=this.multipleSelectionAll102.map(v=>v.id).indexOf(row.id)
        this.multipleSelectionAll102.splice(i, 1)
        this.delCom(row)
        break;
        case 103:
        var i=this.multipleSelectionAll103.map(v=>v.id).indexOf(row.id)
        this.multipleSelectionAll103.splice(i, 1)
        this.delCom(row)
        break;
        case 104:
        var i=this.multipleSelectionAll104.map(v=>v.id).indexOf(row.id)
        this.multipleSelectionAll104.splice(i, 1)
        this.delCom(row)
        break;
        case 105:
        var i=this.multipleSelectionAll105.map(v=>v.id).indexOf(row.id)
        this.multipleSelectionAll105.splice(i, 1)
        this.delCom(row)
        break;
        case 106:
        var i=this.multipleSelectionAll106.map(v=>v.id).indexOf(row.id)
        this.multipleSelectionAll106.splice(i, 1)
        this.delCom(row)
        break;
        case 107:
        var i=this.multipleSelectionAll107.map(v=>v.id).indexOf(row.id)
        this.multipleSelectionAll107.splice(i, 1)
        this.delCom(row)
        break;
          default:
           break;
       } 
    },
    
    selectList(val){
      // console.log(val,'seltlist')
      this.multipleSelectionList=val;
      // console.log(this.multipleSelectionList,'seltlist22')
    },
    delAllCom(){
      this.formSize.moduleList.forEach((v,index)=>{
          if(this.tagCode==v.module){
          this.formSize.moduleList.splice(index,1,{})
          this.formSize.moduleList=this.formSize.moduleList.filter(v=>v.materialIds&&v.materialIds.length>0)
          }
          })
      for(let j = 0 ;j<this.multipleSelectionList.length;j++){
          let idxArray2=this.multipleSelectionList.map(v=>v.id)
          let index= this.tableData.map(v=>v.id).indexOf(idxArray2[j]);
          this.$refs.multipleTable.toggleRowSelection(this.tableData[index]);
          }
    },
    //批量取消
    delAll(rows){
      if(rows.length>0){
        let idxArray=this.multipleSelectionList.map(v=>v.id)
        switch (this.tagKey) {
        case 100:
          for(let i = 0 ;i<this.multipleSelectionAll100.length;i++){
          let idx= this.multipleSelectionAll100.map(v=>v.id).indexOf(idxArray[i]);
          this.multipleSelectionAll100.splice(idx,1,{})
          }
          this.delAllCom()
          this.multipleSelectionAll100=this.multipleSelectionAll100.filter(v=>v.id)
          break;
        case 101:
          for(let i = 0 ;i<this.multipleSelectionAll101.length;i++){
          let idx= this.multipleSelectionAll101.map(v=>v.id).indexOf(idxArray[i]);
          this.multipleSelectionAll101.splice(idx,1,{})
          }
          this.delAllCom()
          this.multipleSelectionAll101=this.multipleSelectionAll101.filter(v=>v.id)
          break;
        case 102:
          for(let i = 0 ;i<this.multipleSelectionAll102.length;i++){
          let idx= this.multipleSelectionAll102.map(v=>v.id).indexOf(idxArray[i]);
          this.multipleSelectionAll102.splice(idx,1,{})
          }
          this.delAllCom()
          this.multipleSelectionAll102=this.multipleSelectionAll102.filter(v=>v.id)
          break;
        case 103:
           for(let i = 0 ;i<this.multipleSelectionAll103.length;i++){
          let idx= this.multipleSelectionAll103.map(v=>v.id).indexOf(idxArray[i]);
          this.multipleSelectionAll103.splice(idx,1,{})
          }
          this.delAllCom()
          this.multipleSelectionAll103=this.multipleSelectionAll103.filter(v=>v.id)
          break;
        case 104:
          for(let i = 0 ;i<this.multipleSelectionAll104.length;i++){
          let idx= this.multipleSelectionAll104.map(v=>v.id).indexOf(idxArray[i]);
          this.multipleSelectionAll104.splice(idx,1,{})
          }
          this.delAllCom()
          this.multipleSelectionAll104=this.multipleSelectionAll104.filter(v=>v.id)
          break;
        case 105:
          for(let i = 0 ;i<this.multipleSelectionAll105.length;i++){
          let idx= this.multipleSelectionAll105.map(v=>v.id).indexOf(idxArray[i]);
          this.multipleSelectionAll105.splice(idx,1,{})
          }
          this.delAllCom()
          this.multipleSelectionAll105=this.multipleSelectionAll105.filter(v=>v.id)
          break;
        case 106:
          for(let i = 0 ;i<this.multipleSelectionAll106.length;i++){
          let idx= this.multipleSelectionAll106.map(v=>v.id).indexOf(idxArray[i]);
          this.multipleSelectionAll106.splice(idx,1,{})
          }
          this.delAllCom()
          this.multipleSelectionAll106=this.multipleSelectionAll106.filter(v=>v.id)
          break;
        case 107:
           for(let i = 0 ;i<this.multipleSelectionAll107.length;i++){
          let idx= this.multipleSelectionAll107.map(v=>v.id).indexOf(idxArray[i]);
          this.multipleSelectionAll107.splice(idx,1,{})
          }
          this.delAllCom()
          this.multipleSelectionAll107=this.multipleSelectionAll107.filter(v=>v.id)
          break;
        default:
          break;
    }
      }else{
        this.selectAllCom()
      }
       
    },
    //保存
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.save(this.formSize).then(res=>{
              this.goTo()
            })
          } else {
            this.$message({
            showClose: true,
            message: '有必填项未填写',
            type: 'error'
            });
            return false;
          }
        });
      },
      // update
      updateForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.update(this.formSize).then(res=>{
              this.goTo()
            })
          } else {
            this.$message({
            showClose: true,
            message: '有必填项未填写',
            type: 'error'
            });
            return false;
          }
        });
      },
      //返回
      goTo(){
        // console.log(this.$route.query.msg,'this.$route.msg')
        this.$router.push({path:'/applicationManagement/applicationList',query:JSON.parse(this.$route.query.msg)})
      },
      tag2(code,value){
        this.tagCode=code
        this.firstTime++
      },
      watchSelectAll(){
          let idx=this.formSize.moduleList.map(v=>v.module).indexOf(this.tagKey)
          if(idx !== -1){
          this.formSize.moduleList.splice(idx,1,{module:this.tagKey,materialIds:this.materialIdsAarray})
          }else{
            this.formSize.moduleList.push({module:this.tagKey,materialIds:this.materialIdsAarray})
          }
         this.formSize.moduleList.forEach((v,index)=>{
                if(this.tagCode==v.module){
                this.formSize.moduleList=this.formSize.moduleList.filter(v=>v.materialIds&&v.materialIds.length>0)
                }
          })
      },
      handleChange(value){
        this.moduleTreeVal=value[value.length-1]
      },
      handleChange2(value){
        this.moduleTreeValOther=value[value.length-1]
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
      handleSizeChange(value){
        this.limit = value;
      },
      handleCurrentChange(value){
        this.page = value;
      },
  },
  watch:{
  playId(){
    applicationM({playId:this.formSize.playId}).then(res=>{
    // console.log(res,'res')
    this.moduleDetail=res.data
    this.moduleDetail2=this.moduleDetail.map(v=>v)
    this.tagValue=this.moduleDetail[0].moduleName
    this.tagKey=this.moduleDetail[0].module
    this.tagCode=this.moduleDetail[0].module
    this.initModule({...this.$route.query,module:this.moduleDetail[0].module,materialCategoryId:null}).then(res=>{
    this.$store.commit('pagination/setTotal',this.total);
    applicationToTree({moduleId:this.moduleDetail[0].module}).then(res=>{
      // console.log(res,'applicationToTree')
      this.moduleTree=res.data
      this.moduleTree.push({id: "",name:"全部"})
    })
  })
  this.moduleDetail.forEach((v,index)=>{
    if(!this.isCreate){
      this.initListModule({appId:this.$route.query.id,module:v.module}).then(res=>{
        switch (v.module) {
          case 100:
          console.log(res,res,'res111')
          this.multipleSelectionAll100=res.data.items||[]
            break;
          case 101:
          console.log(res,res,'res222')
          this.multipleSelectionAll101=res.data.items||[]
           break;
          case 102:
          this.multipleSelectionAll102=res.data.items||[]
           break;
           case 103:
          this.multipleSelectionAll103=res.data.items||[]
           break;
           case 104:
          this.multipleSelectionAll104=res.data.items||[]
           break;
           case 105:
          this.multipleSelectionAll105=res.data.items||[]
           break;
          case 106:
          this.multipleSelectionAll106=res.data.items||[]
           break;
          case 107:
          this.multipleSelectionAll107=res.data.items||[]
           break;
          default:
            break;
        }
    })
    }
  })
  })
  this.moduleTreeVal=''
  this.wd=''
  this.page=1;
  this.formSize.moduleList=[]
  this.multipleSelectionAll100=[]
  this.multipleSelectionAll101=[]
  this.multipleSelectionAll102=[]
  this.multipleSelectionAll103=[]
  this.multipleSelectionAll104=[]
  this.multipleSelectionAll105=[]
  this.multipleSelectionAll106=[]
  this.multipleSelectionAll107=[]
  },
	page(){
		this.replace("page",this.page);
    },
  limit(){
      this.replace('limit',this.limit);
  },
  wd(){
    this.page=1;
    this.replace('wd',this.wd);
  },
  keyWord(){
    switch (this.tagKey) {
          case 100:
          this.keyWord?this.electionFlag=this.electionFlag.filter(item=>item.name.toLowerCase().indexOf(this.keyWord.toLowerCase()) != -1):this.electionFlag=this.multipleSelectionAll100
          // this.electionFlagCopy=this.electionFlag
           break;
           case 101:
           this.keyWord?this.electionFlag=this.electionFlag.filter(item=>item.name.toLowerCase().indexOf(this.keyWord.toLowerCase()) != -1):this.electionFlag=this.multipleSelectionAll101
           break;
           case 102:
           this.keyWord?this.electionFlag=this.electionFlag.filter(item=>item.name.toLowerCase().indexOf(this.keyWord.toLowerCase()) != -1):this.electionFlag=this.multipleSelectionAll102
           break;
           case 103:
           this.keyWord?this.electionFlag=this.electionFlag.filter(item=>item.name.toLowerCase().indexOf(this.keyWord.toLowerCase()) != -1):this.electionFlag=this.multipleSelectionAll103
           break;
           case 104:
           this.keyWord?this.electionFlag=this.electionFlag.filter(item=>item.name.toLowerCase().indexOf(this.keyWord.toLowerCase()) != -1):this.electionFlag=this.multipleSelectionAll104
           break;
           case 105:
           this.keyWord?this.electionFlag=this.electionFlag.filter(item=>item.name.toLowerCase().indexOf(this.keyWord.toLowerCase()) != -1):this.electionFlag=this.multipleSelectionAll105
           break;
          case 106:
           this.keyWord?this.electionFlag=this.electionFlag.filter(item=>item.name.toLowerCase().indexOf(this.keyWord.toLowerCase()) != -1):this.electionFlag=this.multipleSelectionAll106
           break;
           case 107:
           this.keyWord?this.electionFlag=this.electionFlag.filter(item=>item.name.toLowerCase().indexOf(this.keyWord.toLowerCase()) != -1):this.electionFlag=this.multipleSelectionAll107
           break;
          default:
            break;
        }
  },
  //过滤 已经选择分类
  moduleTreeValOther(){
    switch (this.tagKey) {
          case 100:
          if(this.keyWord){
            this.electionFlag=this.electionFlag.filter(item=>item.materialCategoryId ==this.moduleTreeValOther)
          }else{
            this.electionFlag=this.multipleSelectionAll100.filter(item=>item.materialCategoryId ==this.moduleTreeValOther)
          }
            break;
          case 101:
            this.keyWord?this.electionFlag=this.electionFlag.filter(item=>item.materialCategoryId ==this.moduleTreeValOther):this.electionFlag=this.multipleSelectionAll101.filter(item=>item.materialCategoryId ==this.moduleTreeValOther)
           break;
          default:
            break;
        }
  },
  moduleTreeVal(){
    this.page=1;
    this.replace('moduleTreeVal',this.moduleTreeVal);
  },
  tagKey(){
     this.initModule({...this.$route.query,module:this.tagKey}).then(res=>{
     this.$store.commit('pagination/setTotal',this.total);
     applicationToTree({moduleId:this.tagKey}).then(res=>{
      this.moduleTree=res.data?res.data:[]
      this.moduleTree.push({id: "",name:"全部"})
    })
    })
    this.$refs.audio.pause();
    this.moduleTreeVal=''
    this.wd=''
    this.multipleSelectionList=[]
    this.page=1
    this.$nextTick(() => {
      this.$refs.multipleTable.doLayout();
    });
    
    switch (this.tagKey) {
      case 100:
        this.electionFlag=this.multipleSelectionAll100
        break;
      case 101:
        this.electionFlag=this.multipleSelectionAll101
        break;
      case 102:
        this.electionFlag=this.multipleSelectionAll102
        break;
      case 103:
        this.electionFlag=this.multipleSelectionAll103
        break;
      case 104:
        this.electionFlag=this.multipleSelectionAll104
        break;
      case 105:
        this.electionFlag=this.multipleSelectionAll105
        break;
      case 106:
        this.electionFlag=this.multipleSelectionAll106
        break;
      case 107:
        this.electionFlag=this.multipleSelectionAll107
        break;
      default:
        break;
    }
  },
	currentRow(){
	  this.formSize = Object.assign(this.formSize, this.currentRow);
  },
  
  multipleSelectionAll100(){
    this.materialIdsAarray=this.multipleSelectionAll100.length>0?this.multipleSelectionAll100.map(v=>v.id):[]
    this.watchSelectAll()
    if(this.tagKey==100){this.electionFlag=this.multipleSelectionAll100}
  },
  multipleSelectionAll101(){
    this.materialIdsAarray=this.multipleSelectionAll101.length>0?this.multipleSelectionAll101.map(v=>v.id):[]
    this.watchSelectAll()
    if(this.tagKey==101){this.electionFlag=this.multipleSelectionAll101}
  },
  multipleSelectionAll102(){
    this.materialIdsAarray=this.multipleSelectionAll102.length>0?this.multipleSelectionAll102.map(v=>v.id):[]
    this.watchSelectAll()
    if(this.tagKey==102){this.electionFlag=this.multipleSelectionAll102}
  },
  multipleSelectionAll103(){
    this.materialIdsAarray=this.multipleSelectionAll103.length>0?this.multipleSelectionAll103.map(v=>v.id):[]
    this.watchSelectAll()
    if(this.tagKey==103){this.electionFlag=this.multipleSelectionAll103}
  },
  multipleSelectionAll104(){
    this.materialIdsAarray=this.multipleSelectionAll104.length>0?this.multipleSelectionAll104.map(v=>v.id):[]
    this.watchSelectAll()
    if(this.tagKey==104){this.electionFlag=this.multipleSelectionAll104}
  },
  multipleSelectionAll105(){
    this.materialIdsAarray=this.multipleSelectionAll105.length>0?this.multipleSelectionAll105.map(v=>v.id):[]
    this.watchSelectAll()
    if(this.tagKey==105){this.electionFlag=this.multipleSelectionAll105}
  },
  multipleSelectionAll106(){
    this.materialIdsAarray=this.multipleSelectionAll106.length>0?this.multipleSelectionAll106.map(v=>v.id):[]
    this.watchSelectAll()
    if(this.tagKey==106){this.electionFlag=this.multipleSelectionAll106}
  },
  multipleSelectionAll107(){
    this.materialIdsAarray=this.multipleSelectionAll107.length>0?this.multipleSelectionAll107.map(v=>v.id):[]
    this.watchSelectAll()
    if(this.tagKey==107){this.electionFlag=this.multipleSelectionAll107}
  },
  tagCode(){
    if(this.tagCode){
      this.tagKey=this.tagCode
    }
  },
	$route(){//判断路由query变化执行请求
    if(this.$route.name=='applicationCreate'){
      //  console.log(this.$route.query,'this.$route.msg')
		this.initModule({...this.$route.query,module:this.tagKey},).then(res=>{
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