<template>
    <div style="padding: 20px">
      <h3>当前版本1.1.7</h3>
      <h3>版本说明</h3>
      <div>版本号1.1.7</div>
      <div>
        <p>修复：</p>
        <p>1.修复预览音乐点击多个预览后，图标显示问题。</p>
        <p>2.修复创建应用图片访问路径报错。</p>
        <p>3.位置列表placeholder文字修改。</p>
      </div>
      <div>版本号1.1.6</div>
      <div>
        <p>修复：</p>
        <p>1.修复识别图列表未勾选  给出提示。</p>
        <p>2.修复应用管理  切换模型，音乐停止。</p>
        <p>3.修复中台用户配置-新建用户，选择地址时，无法正常显示第二页数据。</p>
      </div>
      <div>版本号1.1.5</div>
      <div>
        <p>更新：</p>
        <p>1.更新前端上传接口，返回字节，前端转换为兆</p>
        <p>2.音乐预览播放一次后无法恢复图标，无法再次播放</p >
      </div>
      <div>版本号1.1.4</div>
      <div>
        <p>修复：</p>
        <p>1.地址启用禁用纳入编辑权限</p>
        <p>2.地址管理查询初始化列表</p>
        <p>3.更新素材筛选时间，改为创建时间段</p>
        <p>4.更新类别管路筛选时间，改为创建时间段</p>
        <p>5.【查看】和【删除】状态下应该禁用【上传】按钮</p >
        <p>6.识别图“未通过”建议改为“不通过”，保持统一</p >
        <p>7.未勾选记录进行批量删除时应给出提示，而不是进行“确认删除”操作</p >
        <p>8.上下架功能应纳入编辑权限中</p >
        <p>更新：</p>
        <p>1.素材上传接口</p>
        <p>2.屏幕自适应</p>
        <p></p>
      </div>
      <div>版本号1.1.3</div>
      <div>
        <p>新增：</p>
        <p>1.新增登录用户识别字段。</p>
        <p>修复：</p>
        <p>1.修复素材上架功能。</p>
        <p>2.修复音乐播放功能。</p>
        <p>3.修复退出后页面样式问题。</p>
        <p></p>
      </div>
      <div>版本号1.1.2</div>
      <div>
        <p>修复：</p>
        <p>1.中台用户配置：应用数和地址数弹出框无数据、因地址树节点点击失效，无法分配地址.</p>
      </div>
      <h4>版本号1.1.1</h4>
      <div>
        <p>修复：</p>
        <p>1.修复退出账户后页面导航栏显示错误。</p>
        <p>2.修复中台用户已选地址无法取消问题。</p>
        <p>3.去除批量选择和批量删除操作。</p>
        <p>4.去掉状态筛选。</p>
        <p>5.修复审批权限无法进行权限控制问题。</p>
        <p>新增：</p>
        <p>1.中台创建用户新增切换页码高亮已选择的行。</p>
      </div>
      <h4>版本号1.1.0</h4>
      <div>
        <p>优化:</p>
        <p>1.优化素材管理页面，增加必填标志，以及必填未填提交时的错误提示（音乐，模型，视频，mp4等页面）。</p>
        <p>2.优化上传提示，优化上传格式限制，限制相关页面gif图和jpg,png图片的上传限制。</p>
        <p>3.优化输入框的长度限制，增加最大长度50的输入限制。</p>
        <p>4.优化输入框限制，在数字输入框限制只能输入数字。</p>
        <p>5.位置搜索的重置按钮优化</p >
        <p>修复：</p>
        <p>1.修复音乐文件无法试听的问题。</p>
        <p>2.修复类别管理页面展示模块id,改为模块名称。</p>
        <p>3.修复类别管理页面，删除编辑权限未控制的情况。</p>
        <p>4.修复类别管理页面，类别名过长会覆盖下一行的问题。</p>
        <p>5.修复在线视频页面，前端拼凑视频地址问题。</p>
        <p>6.修复玩法页面，玩法说明未显示问题。</p>
        <p>7.修复动画管理页面，增加总时长列。</p>
        <p>8.修复素材管理页面，增加类别筛选条件。</p>
        <p>9.修复识别图管理-识别图列表页面，在识别图列表的第二页页面，直接点击左边菜单的“未审核”模块，页数显示也是第二页，但是页面却是第一页的内容问题。</p>
        <p>10.修复审批权限无法进行权限控制。</p>
        <p>11.修复查看页面和编辑页面已选素材数对不上问题。</p>
        <p>12.修复在线视频取消资源包大小字段。 </p>
        <p>13.修复后台-应用管理，将列名“类别”改成“状态” 。</p>
        <p>14.修复上传报错。</p>
        <p>15.修复批量删除列表刷新显示空。</p >
        <p>16.修复中台用户查看位置项目名称级别显示问题。</p >
        <p>17.删除创建中台用户的批量选择和批量删除按钮</p >
        <p>更新：</p>
        <p>1.新增，素材管理页面新增上下架操作，以及操作管理权限。</p>
        <p>2.新增，素材管理搜索时间选择改为创建时间段时间。</p>
        <p>3.新增后再次新增时，新增界面应保持与前一次一致</p >
        <p>4.新增编辑后，地址树刷新保持展开上次的层级</p >
        <p>6.增加位置树形超出滑动条</p >
      </div>
      <h4>版本号1.0.5</h4>
      <div>
        <p>bug修复</p>
        <p>1.中台用户列表搜索优化</p>
        <p>2.资产创建弹框原型修改，去掉种类下拉框，数据从树形结构获取,修复创建编辑相关bug</p>
        <p>3.新增项目保存成功后，左侧地址树未刷新显示</p>
        <p>4.无法批量删除中台用户</p>
        <p>新增:</p>
        <p>1.创建中台用户中的应用列表添加上下架状态</p>
      </div>
      <h4>版本号1.0.4</h4>
      <div>
        <p>版本号1.0.4</p>
        <p>更新</p>
        <p>1.更新应用上传字段。</p>
      </div>
      <div>
        <p>版本号1.0.3</p>
        <p>bug修复</p>
        <p>1.用户列表“职位”字段建议取消</p>
        <p>2.资产添加报空指针异常</p>
        <p>3.批量删除后列表内容刷新显示错误</p>
        <p>4.音乐素材内容显示错误</p>
        <p>5.编辑动画显示不正确</p>
      </div>
      <h4>版本号1.0.2</h4>
      <div>
        <p>新增：</p>
        <p>1.新增音乐mp4视频模块增加ios字段。</p>
      </div>
      <h4>版本号1.0.1</h4>
      <div>
        <p>修复：</p>
        <p>1.修复用户权限管理前端传入字段。</p>
      </div>
      <h4>版本号1.0.0</h4>
      <div>
        <p>完成</p>
        <p>1.完成utopaAR后台管理页面功能。</p>
        <p>优化</p>
        <p>1.优化前端框架写法，更好的记录页面信息和用户信息。</p>
        <p>感谢</p>
        <p>1.感谢前后端小伙伴一起努力，感谢练习时长两年半的前端练习生徐，和前端仙女吴。</p>
        <h1 style="color: red">
          let's enjoy it;
        </h1>
      </div>
    </div>
</template>

<script>
    export default {
        name: "version"
    }
</script>

<style scoped>

</style>
