<template>
  <div v-if="mapListPower.length||enablePower.length||unapprovedPower.length||unablePower.length"> 
    <div v-if="$route.name=='identifyList'||$route.name=='checkState1'||$route.name=='checkState2'||$route.name=='checkState3'">
      <div style="height:50px;border-bottom:1px solid #DFDCDC;">
        <span style="font-size:24px;font-weight:bold;color:#614a4d;">图像识别</span>
      </div>
      <div>
        <el-row class="tac" style="border-bottom:1px solid #eeeeee; padding:15px 0">
          <span>
            <el-input
              placeholder="识别图名称"
              class="input-with-select pl15"
              style="width: 10%"
              v-model="wd"
            ></el-input>
          </span>
		      <span>
            类别：
            <el-select v-model="type" placeholder="请选择">
              <el-option label="全部" value></el-option>
              <el-option label="云识别" value="1"></el-option>
              <el-option label="本地识别" value="2"></el-option>
            </el-select>
          </span>
           <span>
            所属渠道:
            <el-select v-model="saasCode" placeholder="请选择">
            <el-option
              v-for="item in listSaasAccount"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
          </span>
          <span>
            <el-button v-if="!showMoudle" type="primary" plain @click="delAll()" :disabled="!mapListPower[3].isCheck">批量删除</el-button>
            <el-button v-if="showMoudle=='3'" type="primary" plain @click="delAll()" :disabled="!unablePower[2].isCheck">批量删除</el-button>
            <el-button v-if="showMoudle=='2'" type="primary" plain @click="delAll()" :disabled="!enablePower[2].isCheck">批量删除</el-button>
            <el-button v-if="showMoudle=='1'" type="primary" plain @click="delAll()" :disabled="!unapprovedPower[3].isCheck">批量删除</el-button>
          </span>
        </el-row>
        <!-- 数据展示 -->
        <el-table :data="tableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :max-height="tableHeight" :key="1">
		  <el-table-column
		  type="selection"
		  width="55">
		  </el-table-column>
          <el-table-column prop="id" label="id" width="60" align="center">
            <template slot-scope="scope">{{ scope.row.id}}</template>
          </el-table-column>
          <el-table-column prop="webUrl" label="图片" width="100" align="center">
            <template slot-scope="scope">
               <img
              :src="scope.row.webUrl?`/static/${scope.row.webUrl}`:null"
              alt
              style="width: 50px;height: 50px"
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="'识别图名称'" width="" align="center">
            <template slot-scope="scope">{{ scope.row.name}}</template>
          </el-table-column>
          <el-table-column prop="targetId" :label="'识别图ID'" width align="center"></el-table-column>
          <el-table-column prop="state" label="类别" width="120" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type==1">云识别</span>
              <span v-if="scope.row.type==2">本地识别</span>
            </template>
          </el-table-column>
		      <el-table-column prop="type" label="审核" width="120" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.checkState==1">未审核</span>
              <span v-if="scope.row.checkState==2">通过</span>
              <span v-if="scope.row.checkState==3" style="color:#FF644E">不通过</span>
            </template>
          </el-table-column>
           <el-table-column prop="saasCodeName" label="中台渠道" width="" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="上传时间" width="" align="center"></el-table-column>

          <el-table-column prop="pic" label="识别图地址" width align="center">
            <template slot-scope="scope">
              <!-- <span style="display:block">{{hostApi}}/file/download?uuid={{scope.row.pic}}</span> -->
               <a :href="`/api/file/download?uuid=${scope.row.pic}`" download="" style="text-decoration:none" class="downBtn"  v-if="scope.row.type==2">下载</a>
                <a href="javascript:void(0)" download="" style="text-decoration:none" class="downDisable"  v-if="scope.row.type==1">下载</a>
                <span v-if="!showMoudle">
                 <el-button size="small" :disabled="scope.row.type==1||!mapListPower[0].isCheck" @click="uploadAction(scope.row.id)">上传</el-button>
                
                </span>
                <span v-if="showMoudle=='3'">
                  <el-button size="small" :disabled="scope.row.type==1||!unablePower[0].isCheck" @click="uploadAction(scope.row.id)">上传</el-button>
                </span>
                <span v-if="showMoudle=='2'">
                  <el-button size="small" :disabled="scope.row.type==1||!enablePower[0].isCheck" @click="uploadAction(scope.row.id)">上传</el-button>
                 
                </span>
                 <span v-if="showMoudle=='1'">
                   <el-button size="small" :disabled="scope.row.type==1||!unapprovedPower[0].isCheck" @click="uploadAction(scope.row.id)">上传</el-button>
                 
                </span>
               
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.row);dialogFormVisible = true"
              >查看</el-button>
              <el-button
                v-if="!showMoudle"
                type="success"
                size="mini"
                :disabled="scope.row.checkState ==2||scope.row.checkState !==1 ||!mapListPower[1].isCheck"
                @click="upper(scope.row.id).then(v=>{
              reload()})"
              >通过</el-button>
               <el-button
                v-if="showMoudle=='3'"
                type="success"
                size="mini"
                :disabled="scope.row.checkState ==3"
                @click="upper(scope.row.id).then(v=>{
              reload()})"
              >通过</el-button>
               <el-button
                v-if="showMoudle=='2'"
                type="success"
                size="mini"
                :disabled="scope.row.checkState ==2"
                @click="upper(scope.row.id).then(v=>{
              reload()})"
              >通过</el-button>
               <el-button
                v-if="showMoudle=='1'"
                type="success"
                size="mini"
                :disabled="scope.row.checkState !==1 ||!unapprovedPower[1].isCheck"
                @click="upper(scope.row.id).then(v=>{
              reload()})"
              >通过</el-button>
              <el-button
                v-if="!showMoudle"
                type="danger"
                size="mini"
                :disabled="scope.row.checkState !==1 || !mapListPower[1].isCheck"
               @click="lower(scope.row.id).then(v=>{
              reload()})"
              >拒绝</el-button>
              <el-button
                v-if="showMoudle=='3'"
                type="danger"
                size="mini"
                :disabled="scope.row.checkState !==1"
               @click="lower(scope.row.id).then(v=>{
              reload()})"
              >拒绝</el-button>
              <el-button
                v-if="showMoudle=='2'"
                type="danger"
                size="mini"
                :disabled="scope.row.checkState !==1"
               @click="lower(scope.row.id).then(v=>{
              reload()})"
              >拒绝</el-button>
              <el-button
                v-if="showMoudle=='1'"
                type="danger"
                size="mini"
                :disabled="scope.row.checkState !==1 || !unapprovedPower[1].isCheck"
               @click="lower(scope.row.id).then(v=>{
              reload()})"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
		<div style="margin-top:15px"> <pagination v-if="showPagination"></pagination></div>
      </div>
  <!-- 识别图详情 start-->
	<el-dialog title="识别图信息" :visible.sync="dialogVisible" width="25%">
			<el-form :model="formSize">
			<el-form-item label="识别图名称：" :label-width="formLabelWidth">
			<span>{{formSize.name}}</span>
			</el-form-item>
			<el-form-item label="图片宽度：" :label-width="formLabelWidth">
			<span>{{formSize.width?formSize.width:'无'}}</span>
			</el-form-item>
			<el-form-item label="图片类型：" :label-width="formLabelWidth">
			<span>{{formSize.type==1?'云识别':'本地识别'}}</span>
      
			</el-form-item>
			<el-form-item label="识别图：" :label-width="formLabelWidth">
			 <img
          :src="formSize.pic?`/static/${formSize.webUrl}`:null"
          alt
          style="width: 150px;height: 150px"
          >
			</el-form-item>
			<div style="margin-top:30px;" v-if="formSize.type==1" >
            <h3>
              <span><label>推荐使用：</label></span>
            </h3>
            <div style="clear:both;">
              <span ><label style="color:#999">可识别度：</label>
              <img v-if="formSize.rating<3"  src="../../assets/startOrange.png" v-for="item in parseInt(formSize.rating)" />
              <img v-if="formSize.rating>=3"  src="../../assets/startGreen.png" v-for="item in parseInt(formSize.rating)" />
              <img  src="../../assets/startNull.png" v-for="item in ratingOther" />
              </span>
            </div>
          </div>
			</el-form-item>
		</el-form>
	</el-dialog>
  <!-- 识别图详情 end -->
  <!-- 识别图上传 start-->
        <el-dialog title="添加识别图" :visible.sync="imgVisible" width="25%" @closed="closeDialog()">
        <el-upload
        class="upload-demo"
        action="/api/file/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleAvatarSuccess"
        :file-list="fileList"
        multiple
        :limit="1"
        :data="myData"
        :headers="myHeader"
        :on-exceed="handleExceed"
        >
        安卓包上传:
        <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
         <div style="position:absoult;bottom:20px;left:0px;" v-if="resourcePackage.androidFileName||formSize.androidFileName">资源包名称:{{resourcePackage.androidFileName||formSize.androidFileName}}</div>
         
        <div style="position:absoult;bottom:20px;left:0px;" v-if="resourcePackage.androidResourcePackageSize||formSize.androidResourcePackageSize">资源包大小{{((resourcePackage.androidResourcePackageSize/(1024*1024))+'').slice(0,4)||((formSize.androidResourcePackageSize/(1024*1024))+'').slice(0,4)}}M</div>
        <div style="margin-top:15px;">
          <el-upload
        class="upload-demo"
        action="/api/file/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleAvatarSuccess2"
        :before-upload="beforeAvatarUpload"
        :file-list="fileList"
        multiple
        :limit="1"
        :data="myData"
        :headers="myHeader"
        :on-exceed="handleExceed"
        >
         IOS包上传:
        <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        
        <div style="position:absoult;bottom:20px;left:0px;" v-if="resourcePackage.iosFileName||formSize.iosFileName">资源包名称:{{resourcePackage.iosFileName||formSize.iosFileName}}</div>
        <div style="position:absoult;bottom:20px;left:0px;" v-if="resourcePackage.iosResourcePackageSize||formSize.iosResourcePackageSize">资源包大小{{((resourcePackage.iosResourcePackageSize/(1024*1024))+'').slice(0,4)||((formSize.iosResourcePackageSize/(1024*1024))+'').slice(0,4)}}M</div>
        </div>
       
        <el-button size="small" type="success" @click="save({'identifiedImageId':formSize.id,'resourcePackage':resourcePackage}).then(res=>{imgVisible=false;reload();})" v-if="resourcePackage.iosResourcePackageSize&&resourcePackage.androidResourcePackageSize/1024">确定</el-button>
        <!-- <el-button style="margin-left: 10px;" size="small" v-if="upSuccess"  @click="quit()">取消</el-button> -->
        </el-dialog>
  <!-- 识别图上传 end -->
    </div>
  </div>
</template>

<script>
import {identifyListSaasAccount,identifyInfo} from "../../http/request";
import { mapState, mapActions } from "vuex";
import pagination from '../../share/pagination'
import VueCookies from 'vue-cookies'
import { Base64 } from 'js-base64';
export default {
  name: "identify",
  inject:['replace','reload'],
  data(){
	  return{
		status:"",
		type:"",
		wd:"",
		showPagination:false,
		multipleSelection:[],
		multipleSelectionId:[],
    dialogVisible:false,
    saasCode:"",
    hostApi:'',
		formSize:{
      name:'',
      id:'',
      androidFileName:'',
      iosFileName:''
    },
    formLabelWidth: '120px',
    imgVisible:false,
    identifiedForm:{
      imgIdentifiedName:'',
    },
    fileList: [],
    listSaasAccount:[],
    upSuccess:false,
    listF:1,
    resourcePackage:{
      iosResourcePackage:'',
      iosFileName:'',
      iosResourcePackageSize:'',
      androidResourcePackage:'',
      androidFileName:'',
      androidResourcePackageSize:''
    },
    checkState:'',
    idxCopy:'',
    checkA:'',
    tableData:[],
    tableHeight:0,
    showMoudle:''
	  }
  },
  created(){
	let query=this.$route.query
  let pageRecord = query.page;//记录上一次页码操作
  let limitRecord = query.limit;//记录上一次limit操作
  this.wd=query.wd?query.wd:'';
	this.status=query.status?query.status:'';
  this.type=query.type?query.type:'';
  this.saasCode=query.saasCode?query.saasCode:'';
  switch (this.$route.name) {
      case 'checkState1':
        this.replace('checkState',1);
        this.showMoudle='1'
        break;
      case 'checkState2':
        this.replace('checkState',2);
        this.showMoudle='2'
        break;
      case 'checkState3':
        this.replace('checkState',3);
        this.showMoudle='3'
        break;
      default:
        this.showMoudle=''
        break;
    }
  // if(this.$route.path =='/identidfyManagement/identifyList'){
    
  // }
  
  this.init({...query,source:'Background',saasCode:this.saasCode}).then(res=>{
    res.data.items.forEach(v=>v.webUrl=Base64.decode(v.pic))
    this.tableData=res.data.items
		this.$store.commit('pagination/setTotal',this.total);
  })

  identifyListSaasAccount({}).then(res=>{
    this.listSaasAccount=res.data
    this.listSaasAccount.push({code: "",name:"全部"})
  })
	this.$nextTick(()=>{
		this.$store.commit('pagination/setClickPage',pageRecord);
		this.$store.commit('pagination/setLimitPage',limitRecord);
		this.showPagination = true;//加载分页组件
})
// console.log('created')
  },
  computed:{
	...mapState('pagination',{page:'clickPage',limit:'limitPage'}),
  ...mapState('identifyList',{total:'total',currentRow:'currentRow'}),
  ...mapState('currentUserPower',{mapListPower:'mapListPower',enablePower:'enablePower',unapprovedPower:'unapprovedPower',unablePower:'unablePower'}),
  ratingOther(){
    return 5-this.formSize.rating
  },
  myData(){
        return {
            "type":'file',
            "moduleCode":'identifyList'
        }
    },
    myHeader(){
    return {
        "Authorization":VueCookies.get('backgroundToken')
    }
},
  },
  methods:{
	  ...mapActions('identifyList',['init','upper','lower','info','del','save']),
	  handleSelectionChange(val) {
		this.multipleSelection = val;
		this.multipleSelectionId=this.multipleSelection.map(v=>v.id)
	  },
	  handleEdit(row){
		this.info({id:row.id}).then(v=>{
      this.dialogVisible=true
    })
    },
    handleRemove(file, fileList) {
        
        this.upSuccess=false
      },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleAvatarSuccess(res, file,fileList){
      res.code==0?this.resourcePackage.androidResourcePackageSize=res.data.size:this.resourcePackage.androidResourcePackageSize
      res.code==0?this.resourcePackage.androidFileName=res.data.originFileName:this.resourcePackage.androidFileName=''
      res.code==0?this.resourcePackage.androidResourcePackage=res.data.fileId:this.resourcePackage.androidResourcePackage=''
    },
    handleAvatarSuccess2(res, file,fileList){
      res.code==0?this.resourcePackage.iosResourcePackageSize=res.data.size:this.resourcePackage.iosResourcePackageSize=''
      res.code==0?this.resourcePackage.iosFileName=res.data.originFileName:this.resourcePackage.iosFileName=''
      res.code==0?this.resourcePackage.iosResourcePackage=res.data.fileId:this.resourcePackage.iosResourcePackage=''
    },
    beforeAvatarUpload(file) {
      },
    closeDialog(){
      this.resourcePackage.iosResourcePackage='',
      this.resourcePackageiosFileName='',
      this.resourcePackageiosResourcePackageSize='',
      this.resourcePackageandroidResourcePackage='',
      this.resourcePackageandroidFileName='',
      this.resourcePackageandroidResourcePackageSize='',
      this.iosResourcePackageSize=''
      this.iosFileName=''
      this.formSize.iosResourcePackageSize=''
      this.formSize.androidResourcePackageSize=''
      this.imgVisible=false
    },
    uploadAction(id){
      this.formSize.id=id
      this.info({id:id}).then(v=>{
      this.resourcePackage.androidFileName=this.formSize.androidFileName;
      this.resourcePackage.androidResourcePackage=this.formSize.androidResourcePackage;
      this.resourcePackage.androidResourcePackageSize=this.formSize.androidResourcePackageSize;
      this.resourcePackage.iosFileName=this.formSize.iosFileName;;
      this.resourcePackage.iosResourcePackage=this.formSize.iosResourcePackage;;
      this.resourcePackage.iosResourcePackageSize=this.formSize.iosResourcePackageSize;;
      this.imgVisible=true
    })
     
    },
    delAll(){
      this.multipleSelection.length?this.del(this.multipleSelectionId).then(res=>{this.reload()}):this.$message.error('最少选择一项删除项')
    }
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
    status(){
      this.$store.commit('pagination/setClickPage',1);
      this.replace('status',this.status);
	},
	type(){
      this.$store.commit('pagination/setClickPage',1);
      this.replace('type',this.type);
  },
  saasCode(){
      this.$store.commit('pagination/setClickPage',1);
      this.replace('saasCode',this.saasCode);
	},
	currentRow(){
    this.formSize = Object.assign(this.formSize, this.currentRow);
    this.formSize.webUrl=Base64.decode(this.formSize.pic)
	},
  $route(){//判断路由query变化执行请求
      //  console.log(11,'111')
      if(this.$route.name=='identifyList'||this.$route.name=='checkState1'||this.$route.name=='checkState2'||this.$route.name=='checkState3'){
      switch (this.$route.name) {
      case 'checkState1':
        this.replace('checkState',1);
        this.showMoudle='1'
        break;
      case 'checkState2':
        this.replace('checkState',2);
        this.showMoudle='2'
        break;
      case 'checkState3':
        this.replace('checkState',3);
        this.showMoudle='3'
        break;
      default:
        this.showMoudle=''
        break;
    } 
      this.init({...this.$route.query,source:'Background',saasCode:this.saasCode}).then(res=>{
      res.data.items.forEach(v=>v.webUrl=Base64.decode(v.pic))
      this.tableData=res.data.items
      this.$store.commit('pagination/setTotal',this.total);
     
    })
      }
     if(this.$route.fullPath =='/identidfyManagement/identifyList'||this.$route.fullPath =='/identidfyManagement/identifyList/state1?checkState=1'||this.$route.fullPath =='/identidfyManagement/identifyList/state2?checkState=2'||this.$route.fullPath =='/identidfyManagement/identifyList/state3?checkState=3'){
        this.status=""
        this.type=""
        this.wd=""
        this.saasCode=''
        this.$store.commit('pagination/setClickPage',1);
        this.$store.commit('pagination/setLimitPage',20);
     }
    },

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
  padding-left: 5px;
  padding-right: 10px;
}
.downBtn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 4px;
}
.downDisable{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border-color: #D4D4D4;
    background-color: #D4D4D4;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 10px 12px;
    font-size: 12px;
    border-radius: 4px;
}

</style>