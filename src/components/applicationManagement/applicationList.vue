<template>
  <div v-if="appPower.length">
    <div v-if="$route.name=='applicationList'">
      <div style="height:50px;border-bottom:1px solid #DFDCDC;">
        <span style="font-size:24px;font-weight:bold;color:#614a4d;">应用管理</span>
      </div>
      <div>
        <el-row class="tac" style="border-bottom:1px solid #eeeeee; padding:15px 0">
          <span>
            应用名称:
            <el-input
              placeholder="输入应用名称"
              class="input-with-select pl15"
              style="width: 20%"
              v-model="wd"
            ></el-input>
          </span>
          <span>
            玩法筛选：
            <el-select v-model="select" placeholder="请选择">
              <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.name"
              :value="item.key">
            </el-option>
            </el-select>
          </span>
          <span>
            <el-button type="primary"  @click="$router.push({path:'/applicationManagement/applicationList/applicationCreate',query:{msg:JSON.stringify($route.query)}})" :disabled="!appPower[0].isCheck">新建</el-button>
          </span>
          <span>
            <el-button  type="danger"  @click="delAll()" :disabled="!appPower[3].isCheck">批量删除</el-button>
          </span>
        </el-row>
        <!-- 数据展示 -->
        <el-table :data="tableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :max-height="tableHeight">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
          <el-table-column prop="id" label="id" width="100" align="center">
            <template slot-scope="scope">{{ scope.row.id}}</template>
          </el-table-column>
          <el-table-column prop="name" :label="'应用名称'" width="200" align="center">
            <template slot-scope="scope">{{ scope.row.name}}</template>
          </el-table-column>
          <el-table-column prop="playName" :label="'玩法'" width align="center"></el-table-column>
           <el-table-column  label="素材列表" width="120" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="$router.push({path:'/applicationManagement/applicationList/applicationInfo',query:{id:scope.row.id,msg:JSON.stringify($route.query)}})">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" width="120" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1">上架</span>
              <span v-if="scope.row.state==2" style="color:#FF644E">下架</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间" width align="center"></el-table-column>
          <el-table-column prop="updateBy" label="最后修改人" width align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="250" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                :disabled="!appPower[1].isCheck"
                @click="$router.push({path:'/applicationManagement/applicationList/applicationCreate',query:{id:scope.row.id,msg:JSON.stringify($route.query)}})"
              >编辑</el-button>
              <el-button
                type="success"
                size="mini"
                :disabled="scope.row.state==1||!appPower[1].isCheck"
                @click="upper(scope.row.id).then(v=>{
              reload()})"
              >上架</el-button>
              <el-button
                type="danger"
                size="mini"
               :disabled="scope.row.state==2||!appPower[1].isCheck"
               @click="lower(scope.row.id).then(v=>{
              reload()})"
              >下架</el-button>
            </template>
          </el-table-column>
        </el-table>
		<div style="margin-top:15px"> <pagination v-if="showPagination"></pagination></div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {applicationPlay} from "../../http/request";
import { mapState, mapActions } from "vuex";
import pagination from '../../share/pagination'
export default {
  name: "applicationList",
  inject:['replace','reload'],
  data(){
	  return{
    select:"",
    options:[],
		wd:"",
		showPagination:false,
		multipleSelection:[],
		multipleSelectionId:[],
		dialogVisible:false,
		formSize:{

    },
    tableHeight:0,
	  }
  },
  created(){
  let query=this.$route.query
  // console.log(query,'query')
  let pageRecord = query.page;//记录上一次页码操作
  let limitRecord = query.limit;//记录上一次limit操作
  this.wd=query.wd?query.wd:'';
	this.select=query.select?query.select:'';
	this.init(query).then(res=>{
		this.$store.commit('pagination/setTotal',this.total);
  })
  applicationPlay({}).then(res=>{
    this.options=res.data
    this.options.push({key: "",name:"全部"})
  })
	this.$nextTick(()=>{
		this.$store.commit('pagination/setClickPage',pageRecord);
		this.$store.commit('pagination/setLimitPage',limitRecord);
		this.showPagination = true;//加载分页组件
})
  },
  computed:{
	...mapState('pagination',{page:'clickPage',limit:'limitPage'}),
  ...mapState('applicationList',{tableData:'tableData',total:'total',currentRow:'currentRow'}),
  ...mapState('currentUserPower',{appPower:'appPower'}),
  },
  methods:{
	  ...mapActions('applicationList',['init','upper','lower','del']),
	  handleSelectionChange(val) {
		this.multipleSelection = val;
		this.multipleSelectionId=this.multipleSelection.map(v=>v.id)
	  },
	  handleEdit(row){
		this.info({id:row.id})
    },
    delAll(){
       this.multipleSelection.length?this.del({appIds:this.multipleSelectionId}).then(v=>{this.reload()}):this.$message.error('最少选择一项删除项');
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
    select(){
      this.$store.commit('pagination/setClickPage',1);
      this.replace('select',this.select);
	},
	currentRow(){
	  this.formSize = Object.assign(this.formSize, this.currentInfo);
	},
	$route(){//判断路由query变化执行请求
      if(this.$route.name=='applicationList'){
      this.init(this.$route.query).then(res=>{
      this.$store.commit('pagination/setTotal',this.total);
      this.$store.commit('pagination/setLimitPage',this.$route.query.limit)
      this.$store.commit('pagination/setClickPage',this.$route.query.page)
		})
      }
    }
  },
  updated(){
    if(this.$route.name=='applicationList'){
      this.$nextTick(()=>{
        this.tableHeight = window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 110;
      })
    }
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
</style>