<template>
  <div>
    <el-dialog title="已配置应用列表" :visible.sync="dialogVisible" @close="close" width="80%">
      <el-row class="tac" style="padding-bottom:15px">
        <el-input placeholder="请输入应用名称" class="input-with-select" v-model="appName" style="width: 20%;" maxlength="50">
          <el-button slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
        <span>
          玩法
          <el-select v-model="playType" style="width:150px;">
            <el-option v-for="(item,idx) in playTypeList" :key="idx" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </span>
      </el-row>
      <el-table ref="multipleTable" :data="applicationList" border style="width: 100%" class="mt15 mb15">
        <el-table-column prop="id" label="ID" width="150" align="center"></el-table-column>
        <el-table-column prop="name" label="应用名称" align="center"></el-table-column>
        <el-table-column prop="playName" label="玩法" align="center"></el-table-column>
      </el-table>
      <span>
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
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {selectAppList,getPlayDropDown} from '../../http/request'
export default {
  name:'appDialog',
  props:['userId'],
  data(){
    return{
      dialogVisible:true,
      appName:'',
      playType:'',//玩法类型
      playTypeList:[],//玩法类型下拉框
      applicationList:[],
      total:'',//总行数
      page:1,//页码
      limit:20,//一页行数
    }
  },
  computed:{
    allParams(){
      return{
        "userId":this.userId,
        "name":this.appName,
        "playId":this.playType,
        "page":this.page,
        "limit":this.limit,
        "status":1
      }
    }
  },
  watch:{
    page(){
      this.getList();
    },
    limit(){
      if(this.page!=1){
        this.page=1;
      }
      this.getList();
    },
    appName(){
      if(this.page!=1){
        this.page=1;
      }
      this.getList();
    },
    playType(){
      if(this.page!=1){
        this.page=1;
      }
      this.getList();
    },
  },
  methods:{
    handleSizeChange(val) {
      this.limit =val;
    },
    handleCurrentChange(val) {
      this.page =val;
    },
    close(){
      this.$emit("appDialogClose");
    },
    getList(){
      selectAppList(this.allParams).then(res=>{
        this.applicationList=res.data.items;
        this.total = res.data.total;
      })
    },
    getDropList(){//获取下拉框
      getPlayDropDown().then(res=>{
        this.playTypeList = res.data;
        this.playTypeList.unshift({"id":'',"name":'全部'})
      })
    },
  },
  created(){
    this.getList();
    this.getDropList();
  }
}
</script>

<style scoped>

</style>
