<template>
  <div v-if="positionPower.length">
    <el-card class="box-card"  style="margin-bottom:10px;">
      <div slot="header" class="clearfix">
        <span style="font-size:20px;">查询条件</span>
      </div>
      <el-row class="tac" style="padding-bottom:15px;">
        <span>省
          <el-select v-model="provinceValue" placeholder="请选择">
            <el-option v-for="(item,idx) in provinceList" :key="idx" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </span>
        <span>市
          <el-select v-model="cityValue" placeholder="请选择">
            <el-option v-for="(item,idx) in cityList" :key="idx" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </span>
        <span>区
          <el-select v-model="areaValue" placeholder="请选择">
            <el-option v-for="(item,idx) in areaList" :key="idx" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </span>
      </el-row>
      <el-row class="tac">
        <span>资产名称
          <el-input v-model="inputAssetsName" style="width:150px;" maxlength="50"></el-input>
        </span>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="info" @click="resetSearch">重置</el-button>
      </el-row>
    </el-card>
    <el-container>
      <div class="asideTree">
        <div :style="{'overflow':'auto','height':treeHeight+'px'}">
          <el-tree :highlight-current="true" node-key="id" :default-expanded-keys="[treeId]" ref="bigTree" class="filter-tree" :data="treedata" @node-click="nodeClick" @node-expand="treeExpand" @node-collapse="treeCollapse" :props="defaulProps" :filter-node-method="filterNode"></el-tree>
        </div>
      </div>
      <el-main>
        <div>
          <el-row class="tac" style="border-bottom:1px solid #eeeeee; padding-bottom:15px;">
            <el-button type="primary" @click="createDialog" :disabled="!positionPower[0].isCheck">新增</el-button>
            <el-button type="success" @click="open" :disabled="!positionPower[1].isCheck">启用</el-button>
            <el-button type="denger" @click="close" :disabled="!positionPower[1].isCheck">禁用</el-button>
          </el-row>
        </div>
        <div>
          <el-table ref="positionRef" :data="positionTable" tooltip-effect="dark" @selection-change="positionSelectionChange" :max-height="tableHeight">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column label="状态" prop="state">
              <template slot-scope="scope">
                <span v-if="scope.row.state==1">启用</span>
                <span v-if="scope.row.state==2">禁用</span>
              </template>
            </el-table-column>
            <el-table-column label="上级机构" prop="parentName"></el-table-column>
            <el-table-column label="资产名称" prop="name"></el-table-column>
            <el-table-column label="资产种类" prop="type">
              <template slot-scope="scope">
                {{form.assetsTypeList.length?form.assetsTypeList.filter(v=>v.code==scope.row.type)[0].name:''}}
              </template>
            </el-table-column>
            <el-table-column label="资产位置" prop="provinceCityArea"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="创建人" prop="createUser"></el-table-column>
            <el-table-column label="最后修改时间" prop="updateTime"></el-table-column>
            <el-table-column label="最后修改人" prop="updateUser"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button :disabled="!positionPower[1].isCheck" type="primary" size="mini" @click="positionInfo(scope.row.id)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <pagination></pagination>
        </div>
        <el-dialog title="资产添加" :visible.sync="showAssetsDialog" @close="closeDialog" width="35%" center>
          <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <el-form-item label="资产种类" prop="assetsType">
              <!-- <el-select v-if="!isEdit" v-model="form.assetsType" placeholder="请选择">
                <el-option v-for="(item,idx) in form.assetsTypeList" :key="idx" :label="item.name" :value="item.code"></el-option>
              </el-select> -->
              <span>{{(form.assetsTypeList.length&&form.assetsType)?form.assetsTypeList.find(v=>v.code==form.assetsType).name:''}}</span>
            </el-form-item>
            <el-form-item v-if="form.assetsType!=1" label="上级机构" prop="parentName">
              <span>{{form.parentName}}</span>
              <!-- <el-input class="input-with-select" v-model="form.parentName"  disabled style="width:300px;" placeholder="请选择上级机构" maxlength="50">
              <el-button :disabled="isEdit" slot="append" icon="el-icon-search" @click="selectDialog=true;">搜索</el-button> -->
              <!-- </el-input> -->
            </el-form-item>
            <el-form-item label="资产名称" prop="assetsName">
              <el-input v-model="form.assetsName" style="width:200px;" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="位置所属" v-if="form.assetsType==1" prop="areaC">
              <span>省
                <el-select v-model="form.provinceC" placeholder="请选择" style="width:100px;">
                  <el-option v-for="(item,idx) in provinceListC" :key="idx" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </span>
              <span>市
                <el-select v-model="form.cityC" placeholder="请选择" style="width:100px;">
                  <el-option v-for="(item,idx) in cityListC" :key="idx" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </span>
              <span>区
                <el-select v-model="form.areaC" placeholder="请选择" style="width:100px;">
                  <el-option v-for="(item,idx) in areaListC" :key="idx" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </span>
            </el-form-item>
            <el-form-item label="位置所属" v-if="form.assetsType!=1" prop="positionBelong">
              <span>{{form.positionBelong}}</span>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="createAssets">确 定</el-button>
            <!-- <el-button v-if="!isEdit" @click="resetForm('form')">重置</el-button> -->
          </span>
        </el-dialog>
        <!-- <el-dialog title="选择上级" :visible.sync="selectDialog" width="25%" center>
          <el-tree :data="treedataC" @node-click="showTableC" :props="defaulProps" ></el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmParent">确 定</el-button>
            <el-button @click="selectDialog=false;">取消</el-button>
          </span>
        </el-dialog> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import pagination from '../../share/pagination'
import {getDistrictList,getAssetsDropDown,getPositionTree,getPositionList,openAssets,closeAssets,createPosition,editPosition,getPositionInfo} from '../../http/request'
import { mapState } from 'vuex';
export default {
  name:'positionList',
  inject:['reload'],
  components:{
    pagination
  },
  data(){
    return{
      isEdit:false,
      provinceValue:'',
      provinceList:[],//省列表
      cityValue:'',
      cityList:[],//城市列表
      areaValue:'',
      areaList:[],//地区列表
      inputAssetsName:'',//搜索条件，资产名称
      treedata:[],//树形列表
      defaulProps:{label:'name'},
      positionTable:[],//资产位置列表
      showAssetsDialog:false,//显示创建资产弹窗
      form:{
        assetsName:'',//资产名称
        assetsType:'',//资产种类
        assetsTypeList:[],//资产种类列表
        parentName:'',//上级机构
        parentId:'',//上级机构id
        status:1,//状态
        provinceC:'',//省创建
        cityC:'',//市创建
        areaC:'',//区创建
        positionBelong:'',//选择的位置所属
      },
      rules:{
        assetsType:[{required: true, message: '请选择资产种类', trigger: 'blur'}],
        parentName:[{required: true, message: '请选择上级机构', trigger: 'blur'}],
        assetsName:[{required: true, message: '请输入资产名称', trigger: 'blur'}],
        areaC:[{required: true, message: '请选择地区', trigger: 'blur'}],
      },
      selectId:[],
      provinceListC:[],//省列表创建
      cityListC:[],//城市列表创建
      areaListC:[],//地区列表创建
      treedataC:[],//树形结构创建
      clickId:-1,//当前点击的树状id
      treeId:'',//记录当前点击的树id
      // selectDialog:false,
      selectParent:'',//选择的上级名
      selectParentId:'',//选择的上级id
      positionBelong:'',//选择的位置所属
      selectBelongIdList:{//选择的位置省市区id
        "provinceId":"",
        "cityId":"",
        "areaId":""
      },
      typeId:'',//保存选择的种类id
      clickTypeId:'',//专用列表判断种类id
      editId:'',
      tableHeight:0,//表格的高度
      treeHeight:0,//树的高度
    }
  },
  watch:{
    page(newValue){
      this.getTable(this.clickId);
    },
    limit(newValue){
      if(this.page!=1){
        this.$store.commit('setClickPage',1);
      }
      this.getTable(this.clickId);
    },
    provinceValue(newValue){
      if(newValue!=''){
        this.getCity(newValue);
        this.cityValue = '';
        this.areaValue = '';
      }
    },
    cityValue(newValue){
      if(newValue!=''){
        this.getArea(newValue);
        this.areaValue = '';
      }
    },
    'form.provinceC':{
      handler(newValue,oldvalue){
        if(newValue!=''&&this.form.assetsType==1){
          this.getCityC(newValue);
          if(oldvalue!=''&&newValue!=''){
            this.form.cityC = '';
            this.form.areaC = '';
          }
        }
      },
      deep: true,
      immediate:true
    },
    'form.cityC':{
      handler(newValue,oldvalue){
        if(newValue!=''&&this.form.assetsType==1){
          this.getAreaC(newValue);
          if(oldvalue!=''&&newValue!=''){
            this.form.areaC = '';
          }
        }
      },
      deep: true,
      immediate:true
    },
    // 'form.assetsType':{
    //   handler(newValue){
    //     if(this.$refs.form&&this.form.assetsType==1){
    //       this.$refs.form.clearValidate();
    //       this.form.provinceC='';
    //       this.form.cityC = '';
    //       this.form.areaC = '';
    //       this.form.parentId='';
    //     }
    //   },
    //   deep: true,
    //   immediate:true 
    // },
  },
  computed:{
    ...mapState('pagination',{page:'clickPage',limit:'limitPage'}),
    ...mapState('currentUserPower',{positionPower:'positionPower'}),
    allParams(){
      return{
        "name":this.form.assetsName,
        "parentId":this.form.parentId?this.form.parentId:0,
        "parentName":this.form.assetsType==1?'':this.form.parentName,
        "source":'Background',
        "provinceId":this.form.provinceC,
        "cityId":this.form.cityC,
        "areaId":this.form.areaC,
        "state":this.form.status,
        "type":this.form.assetsType,
        "provinceCityArea":this.form.positionBelong
      }
    },
    searchParams(){
      return{
        "provinceId":this.provinceValue,
        "cityId":this.cityValue,
        "areaId":this.areaValue,
      }
    }
  },
  methods:{
    filterNode(value, data) {//大树形结构方法
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    nodeClick(arr){
      if(!arr.children||!arr.children.length){
        if(arr.type==5){
          this.typeId = arr.type+1;//保存上级机构种类id
          this.clickTypeId = arr.type;//保存种类id
          this.selectParentId=arr.id;//保存选择的上级id
          this.selectParent = arr.name;//选择的上级名
          this.positionBelong=arr.provinceCityArea;//保存选择的位置所属
          this.selectBelongIdList.provinceId=arr.provinceId;//保存省id
          this.selectBelongIdList.cityId=arr.cityId;//保存市id
          this.selectBelongIdList.areaId=arr.areaId;//保存区id
          this.clickId = arr.id;//保存当前点击的id
          this.treeId = arr.id;
        }else{
          this.typeId = arr.type+1;//保存上级机构种类id
          this.clickTypeId = arr.type;//保存种类id
          this.selectParentId=arr.id;//保存选择的上级id
          this.selectParent = arr.name;//选择的上级名
          this.positionBelong=arr.provinceCityArea;//保存选择的位置所属
          this.selectBelongIdList.provinceId=arr.provinceId;//保存省id
          this.selectBelongIdList.cityId=arr.cityId;//保存市id
          this.selectBelongIdList.areaId=arr.areaId;//保存区id
          this.clickId = arr.id;//保存当前点击的id
          this.treeId = arr.id;
        }
        this.getTable(this.clickId,5);
      }
    },
    treeExpand(arr){//节点展开
      this.typeId = arr.type+1;//保存上级机构种类id
      this.clickTypeId = arr.type;//保存种类id
      this.selectParentId=arr.id;//保存选择的上级id
      this.selectParent = arr.name;//选择的上级名
      this.positionBelong=arr.provinceCityArea;//保存选择的位置所属
      this.selectBelongIdList.provinceId=arr.provinceId;//保存省id
      this.selectBelongIdList.cityId=arr.cityId;//保存市id
      this.selectBelongIdList.areaId=arr.areaId;//保存区id
      this.clickId = arr.id;//保存当前点击的id
      this.treeId = arr.id;
      this.getTable(this.clickId,this.clickTypeId);
    },
    treeCollapse(arr){//节点关闭
      this.typeId = arr.type;//清空
      this.clickTypeId = arr.type-1;//保存种类id
      this.selectParentId=arr.parentId;//保存选择的上级id
      this.selectParent = arr.parentName;//选择的上级名
      this.positionBelong=arr.provinceCityArea;//保存选择的位置所属
      this.selectBelongIdList.provinceId=arr.provinceId;//保存省id
      this.selectBelongIdList.cityId=arr.cityId;//保存市id
      this.selectBelongIdList.areaId=arr.areaId;//保存区id
      this.clickId = arr.parentId===0?-1:arr.parentId;//保存当前点击父级的id
      this.treeId = arr.parentId;
      this.getTable(this.clickId,this.clickTypeId);
    },
    // showTableC(arr){//创建里选择的树形节点
    //   this.typeId = arr.type+1;//保存种类id
    //   this.selectParent = arr.name;//选择的上级名
    //   this.selectParentId=arr.id;//保存选择的上级id
    //   this.positionBelong=arr.provinceCityArea;//保存选择的位置所属
    //   this.selectBelongIdList.provinceId=arr.provinceId;//保存省id
    //   this.selectBelongIdList.cityId=arr.cityId;//保存市id
    //   this.selectBelongIdList.areaId=arr.areaId;//保存区id
    // },
    positionSelectionChange(arr){
      this.selectId=arr.map(v=>v.id);
    },
    getProvince(){//获取省
      getDistrictList({"parentId":0}).then(res=>{
        this.provinceListC=this.provinceList = res.data;
      })
    },
    getCity(id){//获取市
      getDistrictList({"parentId":id}).then(res=>{
        this.cityList = res.data;
      })
    },
    getArea(id){//获取地区
      getDistrictList({"parentId":id}).then(res=>{
        this.areaList = res.data;
      })
    },
    getCityC(id){//获取市创建
      getDistrictList({"parentId":id}).then(res=>{
        this.cityListC = res.data;
      })
    },
    getAreaC(id){//获取地区创建
      getDistrictList({"parentId":id}).then(res=>{
        this.areaListC = res.data;
      })
    },
    assetsDropDwon(){
      getAssetsDropDown().then(res=>{
        this.form.assetsTypeList=res.data;
        this.form.assetsTypeList.push({"code":'',"name":''});
      })
    },
    search(){//查询位置树状结构
      this.clickId = -1;
      this.treeId='';
      this.$store.commit('pagination/setClickPage',1);
      this.$store.commit('pagination/setLimitPage',20);
      getPositionTree(this.searchParams).then(res=>{
        this.treedata = res.data;
        if(this.inputAssetsName!==''){
          this.$nextTick(()=>{
            this.$refs.bigTree.filter(this.inputAssetsName);//输入框筛选树形结构
          })         
        }
      });
      this.positionTable=[];
      // this.getTable(this.clickId);
    },
    resetSearch(){
      this.provinceValue='',
      this.cityValue='',
      this.areaValue='',
      this.inputAssetsName='';
      this.clickId = -1;
      this.treeId='';
      this.$store.commit('pagination/setClickPage',1);
      this.$store.commit('pagination/setLimitPage',20);
      this.getTable(this.clickId);
      this.searchTree();
    },
    searchTree(){//创建里查询树状结构
      getPositionTree({}).then(res=>{
        this.treedata=this.treedataC = res.data;
      })
    },
    getTable(id,type){
      if(type==5){//判断为最后一级查自己
        getPositionInfo({id}).then(res=>{
          this.positionTable=[res.data];
          this.$store.commit('pagination/setTotal', 1);
        })
      }else{
        getPositionList({id,"page":this.page,"limit":this.limit}).then(res=>{
          this.positionTable = res.data.items;
          this.$store.commit('pagination/setTotal', res.data.total);
        });
      }     
    },
    createAssets(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.isEdit){
            if(this.form.assetsType==1){
              let provinceName=this.provinceListC.find(v=>v.id==this.form.provinceC)?this.provinceListC.find(v=>v.id==this.form.provinceC).name:'';
              let cityName=this.cityListC.find(v=>v.id==this.form.cityC)?this.cityListC.find(v=>v.id==this.form.cityC).name:'';
              let areaName=this.areaListC.find(v=>v.id==this.form.areaC)?this.areaListC.find(v=>v.id==this.form.areaC).name:'';
              this.form.positionBelong=provinceName+'-'+cityName+'-'+areaName;
            }
            editPosition({"id":this.editId,...this.allParams}).then(res=>{
              this.closeDialog();
              this.getTable(this.clickId,this.clickTypeId);
              this.searchTree();
            })
          }else{
            if(this.form.assetsType==1){
              let provinceName=this.provinceListC.find(v=>v.id==this.form.provinceC)?this.provinceListC.find(v=>v.id==this.form.provinceC).name:'';
              let cityName=this.cityListC.find(v=>v.id==this.form.cityC)?this.cityListC.find(v=>v.id==this.form.cityC).name:'';
              let areaName=this.areaListC.find(v=>v.id==this.form.areaC)?this.areaListC.find(v=>v.id==this.form.areaC).name:'';
              this.form.positionBelong=provinceName+'-'+cityName+'-'+areaName;
            }
            createPosition(this.allParams).then(res=>{
              this.closeDialog();
              this.getTable(this.clickId,this.clickTypeId);
              this.searchTree();
            });
          }
          this.isEdit=false;       
        } else {
          console.log('error submit!!');
          return false;
        }
      });   
    },
    positionInfo(id){
      this.isEdit=true;
      this.editId = id;
      this.showAssetsDialog=true;
      getPositionInfo({id}).then(res=>{
        if(res.code){
          this.$message.error(res.msg);
        }else{
          this.form.assetsName = res.data.name;
          this.form.assetsType = res.data.type;
          this.form.parentName = res.data.parentName;
          this.form.parentId = res.data.parentId;
          this.form.provinceC =res.data.provinceId;
          this.form.cityC =res.data.cityId;
          this.form.areaC =res.data.areaId;
          this.form.positionBelong=res.data.provinceCityArea;
          this.form.status=res.data.state;
        }
      })
    },
    resetForm(formName){//重置创建资产位置表单
      this.form.assetsName='';
      this.$refs[formName].resetFields();
      if(this.form.assetsType==1){
        this.form.provinceC='';
        this.form.cityC='';
        this.form.areaC='';
      }
    },
    createDialog(){//创建窗口
      if(this.typeId>5){
        this.$message.error('单元种类为最下级，无法作为上级机构');
        return;
      }
      this.showAssetsDialog=true;
      this.form.assetsType = this.typeId?this.typeId:1;
      this.form.parentName = this.selectParent;
      this.form.parentId = this.selectParentId;
      this.form.provinceC =this.selectBelongIdList.provinceId;
      this.form.cityC =this.selectBelongIdList.cityId;
      this.form.areaC =this.selectBelongIdList.areaId;
      this.form.positionBelong=this.positionBelong;
    },
    closeDialog(){
      this.isEdit=false;
      this.showAssetsDialog=false;
      this.resetForm('form');
      // this.selectParent='',
      // this.selectParentId='',
      // this.positionBelong='',
      // this.selectBelongIdList.provinceId="",
      // this.selectBelongIdList.cityId="",
      // this.selectBelongIdList.areaId="";
      // this.typeId='';
    },
    // confirmParent(){//确认选择的上级机构
    //   if(this.selectParent===''){
    //     this.$message.error('请选择上级机构');
    //     return;
    //   }
    //   if(this.typeId>5){
    //     this.$message.error('单元种类为最下级，无法作为上级机构');
    //     return;
    //   }
    //   this.selectDialog= false;
    //   this.form.assetsType = this.typeId;
    //   this.form.parentName = this.selectParent;
    //   this.form.parentId = this.selectParentId;
    //   this.form.provinceC =this.selectBelongIdList.provinceId;
    //   this.form.cityC =this.selectBelongIdList.cityId;
    //   this.form.areaC =this.selectBelongIdList.areaId;
    //   this.form.positionBelong=this.positionBelong;
    // },
    open(){//启用
      if(this.selectId.length==0){
        this.$message.error('请勾选需要启用的行');
        return;
      }
      openAssets({"ids":this.selectId,"source":"Background"}).then(res=>{
        this.getTable(this.clickId,this.clickTypeId);
      })
    },
    close(){//禁用
      if(this.selectId.length==0){
        this.$message.error('请勾选需要禁用的行');
        return;
      }
      closeAssets({"ids":this.selectId,"source":"Background"}).then(res=>{
        this.getTable(this.clickId,this.clickTypeId);
      })
    }
  },
  created(){
    this.$store.commit('pagination/setClickPage',1);
    this.$store.commit('pagination/setLimitPage',20);
    this.$store.commit('pagination/setTotal', 0);//重置数据
    this.getProvince();
    this.searchTree();//获取外边的树
    this.assetsDropDwon();//获取资产种类下拉框
    this.getTable(this.clickId);
  },
  updated(){
    this.$nextTick(()=>{
      this.tableHeight = window.innerHeight - this.$refs.positionRef.$el.offsetTop - 110;
      this.treeHeight = window.innerHeight - this.$refs.bigTree.$el.offsetTop - 110;
    })
  }
}
</script>

<style scoped>
.asideTree {
  width: 25%;
  height: 100%;
}
</style>