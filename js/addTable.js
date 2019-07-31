//appraisalManagement的数据自动填入
$(function () {
    var curMenu = null, zTree_Menu = null;
    var setting = {
        view: {
            showIcon: false,
            showLine: false,
            selectedMulti: false,
            dblClickExpand: false,
            addHoverDom: addHoverDom,   //增加
            removeHoverDom: removeHoverDom, //删除
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

    var zNodes = JSON.parse(localStorage.getItem('table') || '[]');         /*从localStorage获取数据*/
    $(document).ready(function(){
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);  //初始化
    });

    // 添加新结点
    var newCount = 1;
    function addHoverDom(treeId, treeNode) {
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId //id
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
            });
            return false;
        });
    }

    //删除结点
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    }

    //单击展开
    function beforeClick(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.expandNode(treeNode);
    }

    //删除节点前模态框的提示
    function beforeRemove(treeId, treeNode) {
        $("#modalDel").modal({});   //调用bootstrap模态框
        $('#modalBody').append("确定删除" + treeNode.name + "?");    //为模态框动态添加内容
        $('.close,.closeModal,#confirm').unbind('click').bind('click',function (event) {
            if(event.target.id == 'confirm'){
                var zTree = $.fn.zTree.getZTreeObj(treeId);
                zTree.removeNode(treeNode)
            }else if(event.target.class == 'close'){
                $('#modalBody').empty();  //点×时将模态框内容置空
            }
            $('#modalBody').empty();                /*取消、确认模态框时将模态框内容置空*/
            $('#modalDel').modal('toggle');
        });
        return false;
    }
    //通过回调函数获取日期（年、月）
    var year,month;

    layui.use('laydate', function(){
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#test3' //指定元素
            ,type: 'month'
            ,event:'focus'
            ,done:function (value,date) { //控件选择完毕的回调
                year = JSON.stringify(date.year); //获取年
                month = JSON.stringify(date.month); //获取月

                // //    判断是否存在变量x
                // if(localStorage.hasOwnProperty(tes)){
                //     //若存在，调出表
                //     console.log("已存在");
                // }else{
                //     //若不存在，写入
                //     localStorage.setItem(tes,tes);
                //     //表置空
                //
                //     console.log("不存在");
                // }
                // console.log(localStorage);
            }
        });
    });


    //定义全局结点,结点在JSON中的下标
    var treeNodeInfo,index;
    //根据键获取值
    var temp = localStorage.getItem('table');
    //变为JSON
    var tempJson = JSON.parse(temp);

    //点击人员后将趋势表信息渲染到右边表格中
    function ztreeOnclick(event,treeId, treeNode){
        treeNodeInfo = treeNode;
        if(treeNode.level == 2){
            //判断日期(测试日期，2019年12月)
            if(year==treeNode.趋势表["日期-年"]["2019年"]&&
              month==treeNode.趋势表["日期-月"]["12月"]){
                //table表填内容
                index = treeNodeInfo.index;  //获取结点在JSON数组中的下表
                $("#11z").val(tempJson[index]["趋势表"]["表"]["个人素质"]["1"].直接领导考核);
                $("#11j").val(tempJson[index]["趋势表"]["表"]["个人素质"]["1"].分管领导考核);
                $("#11bei").val(tempJson[index]["趋势表"]["表"]["个人素质"]["1"].备注);
                $("#12z").val(tempJson[index]["趋势表"]["表"]["个人素质"]["2"].直接领导考核);
                $("#12j").val(tempJson[index]["趋势表"]["表"]["个人素质"]["2"].分管领导考核);
                $("#12bei").val(tempJson[index]["趋势表"]["表"]["个人素质"]["2"].备注);
                $("#13z").val(tempJson[index]["趋势表"]["表"]["个人素质"]["3"].直接领导考核);
                $("#13j").val(tempJson[index]["趋势表"]["表"]["个人素质"]["3"].分管领导考核);
                $("#13bei").val(tempJson[index]["趋势表"]["表"]["个人素质"]["3"].备注);
                $("#14z").val(tempJson[index]["趋势表"]["表"]["个人素质"]["4"].直接领导考核);
                $("#14j").val(tempJson[index]["趋势表"]["表"]["个人素质"]["4"].分管领导考核);
                $("#14bei").val(tempJson[index]["趋势表"]["表"]["个人素质"]["4"].备注);
                $("#15z").val(tempJson[index]["趋势表"]["表"]["个人素质"]["合计"].直接领导考核);
                $("#15j").val(tempJson[index]["趋势表"]["表"]["个人素质"]["合计"].分管领导考核);
                $("#15bei").val(tempJson[index]["趋势表"]["表"]["个人素质"]["合计"].备注);
            }else{
                $('input').val("");//置空
            }

        }else{
            $('input').val("");//置空
        }
    }

    //table修改函数
    $('#alter').unbind('click').bind('click',function () {
        $('input').attr("disabled",false);
        alert('你现在可以修改表格！');
    });

    //点击保存按钮将修改的数据保存到localStorage中
    $('#save').unbind('click').bind('click',function () {
        $('input').attr('disabled','disabled');
        //判断日期是否准确
        if(year=="2019"&&month=="12"){
            //修改JSON对应的值
            tempJson[index]["趋势表"]["表"]["个人素质"]["1"].直接领导考核=$("#11z").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["1"].分管领导考核=$("#11j").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["1"].备注=$("#11bei").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["2"].直接领导考核=$("#12z").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["2"].分管领导考核=$("#12j").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["2"].备注=$("#12bei").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["3"].直接领导考核=$("#13z").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["3"].分管领导考核=$("#13j").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["3"].备注=$("#13bei").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["4"].直接领导考核=$("#14z").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["4"].分管领导考核=$("#14j").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["4"].备注=$("#14bei").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["合计"].直接领导考核=$("#15z").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["合计"].分管领导考核=$("#15j").val();
            tempJson[index]["趋势表"]["表"]["个人素质"]["合计"].备注=$("#15bei").val();
            //存入localStorage
            localStorage.setItem('table',JSON.stringify(tempJson));
        }
        alert('保存成功！');
    });
});

