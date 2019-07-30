$(function(){

    var curMenu = null, zTree_Menu = null;
    var setting = {
        view: {
            showIcon: false,
            showLine: false,
            selectedMulti: false,
            dblClickExpand: false,
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            dblClickExpand: false,
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        edit: {
            enable: true,
            showRemoveBtn: true,
            // showRemoveBtn: setRemoveBtn,         //设置结点删除按钮
        },
        callback: {
            beforeClick: beforeClick,
            beforeRemove: beforeRemove,
            onClick: ztreeOnclick
            // beforeRename: beforeRename
        }
    };

    var zNodes = JSON.parse(localStorage.getItem('cmts') || '[]');         /*从localStorage获取数据*/

    $(document).ready(function(){
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    });


    // 添加新结点
    var newCount = 1;
    function addHoverDom(treeId, treeNode) {
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
            + "' title='添加' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if (btn) btn.bind("click", function(){
            $("#modalAdd").modal({});        //调用添加模态框
            $('.closeModal,#modalAddconfirm').unbind('click').bind('click',function (event) {
                if(event.target.id == 'modalAddconfirm'){
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:$('#addInput').val()});
                    newCount++;
                }
                $('#modalAdd').modal('toggle')          /*关闭模态框*/
            })
            return false;
        });
    };
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    };

    //单击展开
    function beforeClick(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.expandNode(treeNode);
    }


    //删除节点
    function beforeRemove(treeId, treeNode) {
        $("#modalDel").modal({});   //调用bootstrap模态框
        $('#modalBody').append("确定删除" + treeNode.name + "?");       //为模态框动态添加内容
        $('.closeModal,#confirm').unbind('click').bind('click',function (event) {
            if(event.target.id == 'confirm'){
                var zTree = $.fn.zTree.getZTreeObj(treeId);
                zTree.removeNode(treeNode)
            }
            $('#modalBody').empty();                /*关闭模态框时将模态框内容置空*/
            $('#modalDel').modal('toggle')          /*关闭模态框*/
        })
        return false;
    }


    //    取消模态框 将input内容置空
    $('#off').unbind('click').bind('click',function () {
        $('#departNameText').val('');
    });

    //点击人员后将人员信息渲染到右边表格中
    function ztreeOnclick(event,treeId, treeNode){
        // $().val(''ahhah)
        if(treeNode.level == 2){
            $('#name').val(treeNode.name);
            $('#idNumber').val(treeNode.身份证号);
            $('#genderSelect').val(treeNode.性别);
            $('#phoneNumber').val(treeNode.手机号);
            $('#jobNumber').val(treeNode.工号);
            $('#position').val(treeNode.岗位);
            $('#school').val(treeNode.毕业学校);
            $('#s_province').val(treeNode.家庭住址.省份);
            $('#s_city').append($('<option>', {
                text: treeNode.家庭住址.市,
                selected: true
            }));
            $('#eduBack').val(treeNode.最高学历);
            $('#s_province1').val(treeNode.籍贯.省份);
            $('#s_city1').append($('<option>', {
                text: treeNode.籍贯.市,
                selected: true
            }));
            $("input[type=radio][name=options]").val([treeNode.政治面貌]);
            $('#entryTime').val(treeNode.入职时间)
        }
    }

    //点击保存按钮将修改的数据保存到localStorage中
    // $('#archivesSave').


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
