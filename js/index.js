$(function(){
    //登录界面的JS代码
    //密码是否可见以及图片的切换
    $('#loginEyePassword').click(function () {
        let pass_type = $('input.password').attr('type');
        if (pass_type === 'password' ){
            $('input.password').attr('type', 'text');      //设置属性
            // $('.show_pass').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
            $('#loginEyePassword').attr('src','imgs/eyeOpen.png')
        } else {
            $('input.password').attr('type', 'password');
            // $('.show_pass').removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
            $('#loginEyePassword').attr('src','imgs/eyeClose.png')
        }
    });

    //档案管理界面JS
    //添加班组
    $('.addClass').unbind('click').bind('click',function () {
        var self = $(this).parent().parent().parent();
        addClass(self)
    });

    //添加人员
    $('.addPerson').unbind('click').bind('click',function (event) {
        var self = $(this).parent().parent().parent();
        addPerson(self)
    });
    //删除人员
    $('.del').bind('click',function () {
        var self = $(this).parent().parent();
        Del(self)
    });

    //添加部门
    $('.addDepart').unbind('click').bind('click',function () {
        var self = $(this).parent().parent().parent();
        $('#confim').unbind('click').bind('click',function () {
            var time = String((new Date()).valueOf());
            var idName = '#'+ time;
            var name = $('#departNameText').val();
            $('#departNameText').val('');
            self.before(`<div class="panel  collapseFive_Inner">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a data-toggle="collapse" data-parent="#Inner"
                                           href=${idName}>
                                            ${name}
                                        </a>
                                    </h4>
                                </div>

                                <div id=${time} class="panel panel-collapse collapse ">
                                    <div class="panel-group" >
                                        <div class="panel-body">
                                            <!--2层嵌套折叠-->
                                            <div class="panel  collapseFive_Inner">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title" style="text-align: center">
                                                        <a href="#" data-toggle="modal" data-target="#myModal" class = "addClass">添加</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
            //为新添加的班组中的添加按钮添加绑定事件
            $('.addClass').unbind('click').bind('click',function () {
                var self = $(this).parent().parent().parent();
                addClass(self)
            });
            // $('#confim').unbind('click')
            $('#myModal').modal('toggle')          /*关闭模态框*/
        })
    })


    //添加班组
    function addClass(self) {
        $('#confim').unbind('click').bind('click',function () {
            var time = String((new Date()).valueOf());
            var idName = '#'+ time;
            var name = $('#departNameText').val();
            $('#departNameText').val('');
            self.before(`<div class="panel  collapseFive_Inner">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a data-toggle="collapse" data-parent="#Inner"
                                           href=${idName}>
                                            ${name}
                                        </a>
                                    </h4>
                                </div>

                                <div id=${time} class=" panel-collapse collapse ">
                                    <div class="panel-group" >
                                        <div class="panel-body">
                                            <!--2层嵌套折叠-->
                                            <div class="panel  collapseFive_Inner">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title" style="text-align: center">
                                                        <a href="#" data-toggle="modal" data-target="#myModal" class = "addPerson">添加</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
            //为新添加的班组中的添加按钮添加绑定事件
            $('.addPerson').unbind('click').bind('click',function (event) {
                var self = $(this).parent().parent().parent();
                addPerson(self)
            });
            // $('#confim').unbind('click')
            $('#myModal').modal('toggle')          /*关闭模态框*/
        })
    }

//    添加领导 三层嵌套
    function addPerson(self) {
        $('#confim').unbind('click').bind('click',function () {
            var time = String((new Date()).valueOf());
            var idtime = '#'+ time;
            var name = $('#departNameText').val();
            $('#departNameText').val('');
            self.before(`<div class="panel  collapseFive_Inner">
<!--                                                 <div class="panel-heading">-->
                                                    <h4 class="panel-title panel-body layui-row" style="text-align: center">
                                                    <img src="imgs/person.png" alt="" class = "personalIcon layui-col-md2">
                                                        <a href="#" class="layui-col-md8">${name}</a>
                                                            <img src="imgs/delete.png" alt="delIcon"
                                                                     data-toggle="modal" data-target="#myModaDel" class = "del layui-col-md2" id = ${idtime}>
                                                    </h4>
<!--                                                </div>-->
                                            </div>`);
            //为新添加的人员绑定删除事件
            $('.del').unbind('click').bind('click',function () {
                var self = $(this).parent().parent();
                Del(self)
            });
            // $('#confim').unbind('click')
            $('#myModal').modal('toggle')          /*关闭模态框*/
        })
    }

//    删除
  function Del(self) {
        $('#confimDel').unbind('click').bind('click',function () {
            // console.log('querenshanchula')
            self.remove();
            // $('#confimDel').unbind('')
            $('#myModaDel').modal('toggle')          /*关闭模态框*/
        })
    }

//    取消模态框 将input内容置空
    $('#off').unbind('click').bind('click',function () {
        $('#departNameText').val('')
    });


    //工资管理界面导入人员名单
    $('#importPersion').unbind('click').bind('click',function () {
        $('#confimImport').unbind('click').bind('click',function () {
            $('#myModalImport').modal('toggle')
        })
    });

//    工资管理界面人员导入树
    layui.use(['tree', 'util'], function(){
        var tree = layui.tree
            ,layer = layui.layer
            ,util = layui.util
            //模拟数据
            ,data = [{
                title: '客户调度服务中心'
                ,id: 1
                ,checked: true
                ,spread: true
                ,children: [{
                    title: '班组1'
                    ,id: 3
                    ,children: [{
                        title: '组员1'
                        ,id: 23
                    },{
                        title: '组员2'
                        ,id: 7
                    },{
                        title: '组员3'
                        ,id: 8
                    }]
                },{
                    title: '班组2'
                    ,id: 4
                    ,spread: true
                    ,children: [{
                        title: '组员1'
                        ,id: 9
                        ,disabled: true
                    },{
                        title: '组员3'
                        ,id: 10
                    }]
                },{
                    title: '班组3'
                    ,id: 20
                    ,children: [{
                        title: '组员1'
                        ,id: 21
                    },{
                        title: '组员2'
                        ,id: 22
                    }]
                }]
            },{
                title: '企信部'
                ,id: 2
                ,spread: true
                ,children: [{
                    title: '班组1'
                    ,id: 5
                    ,spread: true
                    ,children: [{
                        title: '组员1'
                        ,id: 11
                    },{
                        title: '组员2'
                        ,id: 12
                    }]
                },{
                    title: '班组3'
                    ,id: 6
                    ,children: [{
                        title: '组员1'
                        ,id: 13
                    },{
                        title: '组员2'
                        ,id: 14
                        ,disabled: true
                    }]
                }]
            },{
                title: '校园中心'
                ,id: 16
                ,children: [{
                    title: '班组1'
                    ,id: 17
                    ,fixed: true
                    ,children: [{
                        title: '组员1'
                        ,id: 18
                    },{
                        title: '组员2'
                        ,id: 19
                    }]
                },{
                    title: '班组2'
                    ,id: 27
                    ,children: [{
                        title: '组员1'
                        ,id: 28
                    },{
                        title: '组员2'
                        ,id: 29
                    }]
                }]
            }];
        //常规用法
        tree.render({
            elem: '#test1' //默认是点击节点可进行收缩
            ,data: data
        });
        tree.render({
            elem: '#test1'
            ,data: data
            ,showCheckbox: true  //是否显示复选框
            ,id: 'demoId1'
            // ,isJump: true //是否允许点击节点时弹出新窗口跳转
            // ,click: function(obj){
            //     var data = obj.data;  //获取当前点击的节点数据
            //     layer.msg('状态：'+ obj.state + '<br>节点数据：' + JSON.stringify(data));
            // }
        });
        // tree.render({
        //     elem: '#test1'
        //     ,data: data2
        //     ,showCheckbox: true
        // });
    });






//    图片上传
    layui.use('upload', function(){
        var $ = layui.jquery
            ,upload = layui.upload;
        var uploadInst = upload.render({
            elem: '#upPhoto'
            ,url: '/upload/'
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    $('#demo1').attr('src', result); //图片链接（base64）
                });
            }
            ,done: function(res){
                //如果上传失败
                if(res.code > 0){
                    return layer.msg('上传失败');
                }
                //上传成功
            }
        });
    });
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //常规用法
        laydate.render({
            elem: '#entryTime'
        });
    });

    layui.use('jquery', function(){
        var $ = layui.$;
        //演示动画
        $('.site-doc-icon .layui-anim').on('click', function(){
            var othis = $(this), anim = othis.data('anim');
            // 停止循环
            if(othis.hasClass('layui-anim-loop')){
                return othis.removeClass(anim);
            }
            othis.removeClass(anim);
            setTimeout(function(){
                othis.addClass(anim);
            });
            // 恢复渐隐
            if(anim === 'layui-anim-scaleSpring'){
                setTimeout(function(){
                    othis.removeClass(anim);
                }, 1300);
            }
        });
        // //城市联动
         _init_area();
         _init_area1();
    });


});

//确认动画
