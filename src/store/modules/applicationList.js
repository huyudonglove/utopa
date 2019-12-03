import { applicationList, applicationAdd, applicationUpdate, applicationInfo, applicationUpper, applicationLower, applicationModule, applicationDel, applicationlistModule} from '../../http/request'
import { Message } from 'element-ui';
import { Base64 } from 'js-base64';
const state={
  tableData: [],
  total: 0,
  tableData2:[],
  total2: 0,
  tableData3: [],
  total3: 0,
  currentRow:{}
};
const mutations={
  syncInit(state, payload) {
    state.tableData = payload.items
    state.total = payload.total
  },
  syncInitModule(state, payload) {
     if (payload.items!=null){
   let app = payload.items.map(v => {
      v.play = false;
      if (v.pic) {
        v.webUrl = Base64.decode(v.pic)
      }
      if(v.placeholderPictureUrl){
        v.pictureUrl = Base64.decode(v.placeholderPictureUrl)
      }
      return v
    })
       state.tableData2 = JSON.parse(JSON.stringify(app))
       state.total2 = payload.total
     }
    
  },
  
  syncInitListModule(state, payload) {
    if (payload.items!=null){
     let app = payload.items.map(v => {
        v.play = false;
        if (v.pic) {
          v.webUrl = Base64.decode(v.pic)
        }
        if (v.placeholderPictureUrl) {
          v.pictureUrl = Base64.decode(v.placeholderPictureUrl)
        }
        return v
      })
      state.tableData2 = JSON.parse(JSON.stringify(app))
      state.total2 = payload.total
    }
    state.tableData3 = payload.items
    state.total3 = payload.total
  },
  //当前行
  currentRow(state, payload) {
    state.currentRow = payload.data
  }

};
const actions={
  init({ commit }, params) {
    let page = params.page ? parseInt(params.page) : 1;
    let limit = params.limit ? params.limit : 20;
    let name = params.wd ? params.wd : '';
    let playId = params.select ? params.select : '';
    return new Promise((resovle, reject) => {
      applicationList({ page, limit, name, playId}).then(res => {
        if (res.code) {
          Message.error(res.msg);
        } else {
          resovle(res)
          commit('syncInit', res.data)
        }
      })
    }).catch(err => {
    })
  },
  // 批量删除
  del({ dispatch }, params) {
    // console.log(params,'params')
    return new Promise((resolve, reject) => {
      applicationDel(params).then(res => {
        if (res.code) {
          Message.error(res.msg);
        } else {
          resolve()
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 上架
  upper({ dispatch }, params) {
    return new Promise((resolve, reject) => {
      applicationUpper({ appId: params }).then(res => {
        if (res.code) {
          Message.error(res.msg);
        } else {
          resolve()
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 下架
  lower({ dispatch }, params) {
    return new Promise((resolve, reject) => {
      applicationLower({ appId: params }).then(res => {
        if (res.code) {
          Message.error(res.msg);
        } else {
          resolve()
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
 
  //详情
  info({ commit }, params) {
    return new Promise((resolve, reject) => {
      applicationInfo(params).then(res => {
        if (res.code !== 0) {
          Message.error(res.msg);
        } else {
          resolve(res)
          commit('currentRow', res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  //素材管理
  initModule({ commit }, params) {
    let pageNum = params.page ? parseInt(params.page) : 1;
    let pageSize = params.limit ? params.limit : 20;
    let name = params.wd ? params.wd : '';
    let module = params.module ? params.module : '';
    let materialCategoryId = params.moduleTreeVal ? params.moduleTreeVal :null;
    return applicationModule({ pageNum, pageSize, name, module, materialCategoryId}).then(res => {
        if (res.code) {
          Message.error(res.msg);
        } else {
          commit('syncInitModule',res.data)
        }
      })
  },
  //获取应用素材
  initListModule({ commit }, params) {
    // console.log(params,'paramsparamsparamsparamsparams')
    let page = params.page ? parseInt(params.page) : 1;
    let limit = params.limit ? params.limit : 20;
    let name = params.wd ? params.wd : '';
    let module = params.module ? params.module : '';
    let materialCategoryId = params.moduleTreeVal ? params.moduleTreeVal : null;
    let appId = params.appId ? params.appId : '';
    return new Promise((resolve, reject) => {
    return applicationlistModule({ page, limit, name, module, materialCategoryId, appId }).then(res => {
      if (res.code) {
        Message.error(res.msg);
      } else {
        resolve(res)
        commit('syncInitListModule', res.data)
      }
    })
    })
  },
  //新增保存
  save({commit},params){
    return new Promise((resolve, reject) => {
      return applicationAdd(params).then(res => {
        if (res.code) {
          Message.error(res.msg);
        } else {
          resolve()
        }
      }).catch(err => {
        reject(err)
      })
    })
   
  },
  //修改保存
  update({commit},params){
    return new Promise((resolve, reject) => {
      return applicationUpdate(params).then(res => {
        if (res.code) {
          Message.error(res.msg);
        } else {
          resolve()
        }
      }).catch(err => {
        reject(err)
      })
    })
   
  }
};
export default {
  namespaced:true,
  state,
  actions,
  mutations
}
