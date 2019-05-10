@extends('layout.part')

@section('header')
    <link rel="stylesheet" href="{{url('/')}}/js/datapicker/datapicker.css"/>
    <style>
        .daterangepicker.opensright .ranges, .daterangepicker.opensleft .ranges {
            width: 100%;
        }
        #searchform .form-group {
            margin-bottom: 10px;
        }
        .tabs-flat-report > li {
            position: relative;
        }
        .tabs-flat-report > li > span {
            display: block;
            position: absolute;
            top: -5px;
            right: 2px;
            border-radius: 7px;
            height: 14px;
            line-height: 14px;
            padding: 0 5px;
            font-size: 10px;
            color: #fff;
            background: #d33;
            z-index: 100;
        }
        .tabs-flat-report > .active > span {
            background: #d33;
        }
        .form-group {
            background: #fff;
        }
        .paginate {
            text-align: right;
            padding-top: 10px;
        }
        label {
            padding-left: 10px;
            text-align: right;
        }
        .glyphicon {
            margin-right: 5px;
        }
        .table_header_color {
            background-color: #f3f3f3;
        }
    </style>
@endsection

@section('body')
    <div class="widget">
        <div class="widget-body">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                    <form id="searchform">
                        <div class="form-inline">

                            <div class="form-group">
                                <label>时间维度：</label>
                                <select class="select2-container select2-select js_dimension" name="dimension" style="width:100px;">
                                    @foreach($data['dimension'] as $ko=>$vo)
                                        <option value="{{$ko}}">{{$vo}}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="form-group js_select_time" style="display: none;">
                                <label>自定义时间：</label>
                                <input name="select_time" style="cursor: pointer;" type="text" class="form-control datepickeronclick" />
                            </div><br/>

                            <div class="form-group">
                                <label>业务线：</label>
                                <select class="select2-container select2-select js_mark_rank" name="mark_rank" style="width:100px;">
                                    @foreach($data['mark_rank'] as $ko=>$vo)
                                        <option value="{{$ko}}">{{$vo}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group">
                                <label>城市：</label>
                                <select class="select2-container select2-select js_city_id" name="city_id" style="width:100px;">
                                    <option value="0">全部</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>战队：</label>
                                <select class="select2-container select2-select js_group_id" name="group_id" style="width:180px;">
                                    <option value="0">全部</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>销售：</label>
                                <select class="select2-container select2-select js_master_id" name="master_id" style="width:100px;">
                                    <option value="0">全部</option>
                                </select>
                            </div>

                            <div class="form-group" style="float:right; padding-right:20px;">
                                <button type="submit" class="btn btn-primary">查询</button>
                                <button type="button" class="btn btn-primary js_clean_btn">清空条件</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="widget-body margin-top-10">
            <div class="tabbable">
                <div class="tab-content tabs-flat">
                    <div id="task_sum_bar" style="width: 100%;height:400px;"></div>
                    <div id="success_percent_line" style="width: 100%;height:400px;"></div>
                    <div id="due_percent_line" style="width: 100%;height:400px;"></div>
                </div>
            </div>
        </div>

        <div class="widget-body margin-top-10">
            <div class="tabbable">
                <div id="list_container">
                    <p>加载中……</p>
                </div>
            </div>
        </div>

    </div>
@endsection

@section('footer')
    <script src="{{url('/')}}/js/datapicker/moment.js"></script>
    <script src="{{url('/')}}/js/datapicker/datapicker.js"></script>
    <script src="{{url('/')}}/assets/js/bootbox/bootbox.js"></script>
    <script src="{{url('/')}}/assets/js/sweetalert/sweetalert.min.js"></script>
    <script src="{{url('/')}}/assets/js/echarts.min.js"></script>

    <script>
        $(function () {
            $('.datepickeronclick').daterangepicker({
                startDate: '<?php echo date('Y/m/d', strtotime('-1 day')); ?>',
                endDate: '<?php echo date('Y/m/d', time()); ?>',
                minDate: '<?php echo date('Y/m/d', strtotime('-29 days')); ?>',
                maxDate: '<?php echo date('Y/m/d', strtotime('+1 day')); ?>',
                opens: 'left', //日期选择框的弹出位置
                buttonClasses: ['btn btn-default'],
                applyClass: 'btn-small btn-success',
                cancelClass: 'btn-small',
                format: 'YYYY-MM-DD', //控件中from和to 显示的日期格式
                separator: '至',
                showDropdowns: true,//这个才是关键，开启后可以单独选择年月
                locale: {
                    applyLabel: '确定',
                    cancelLabel: '取消',
                    fromLabel: '起始时间',
                    toLabel: '结束时间',
                    customRangeLabel: '自定义',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                        '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    firstDay: 1
                }
            }, function (start, end, label) {

            });

            // 自定义显示选择时间区间
            $(".js_dimension").change(function () {
                var dimension = $(this).val();
                if(dimension == 4) {
                    $(".js_select_time").show();
                } else {
                    $(".js_select_time").hide();
                }
            });

            // 清空按钮
            $('.js_clean_btn').on('click', function(e){
                $('#sidebar').find('ul.submenu li a[url="/data/board/getsalesmanpage"]').click();
            });

            //下拉列表搜索
            $('.select2-select').select2();

            // 加载列表
            var loadList = function (callback) {
                var paramstr = $('#searchform').serialize();
                var city_name = $('#searchform .js_city_id').find("option:selected").html();
                var group_name = $('#searchform .js_group_id').find("option:selected").html();
                var master_name =  $('#searchform .js_master_id').find("option:selected").html();
                var url = '/data/board/gettasklist?' + paramstr
                    + '&sales_type=1'
                    + '&city_name=' + city_name
                    + '&group_name=' + group_name
                    + '&master_name=' + master_name;;
                showLoading();
                $.get(url, function (data) {
                    if (callback) {
                        callback(data);
                    }
                    hideLoading();
                });
            };

            // 默认加载列表
            var container = $('#list_container');
            loadList(function (data) {
                if (data.code == 1) {
                    container.html(data.data.html);
                    showTaskSumBarChart();
                    showSuccessPercentLineChart();
                    showDuePercentLineChart();
                } else {
                    container.html(data.msg);
                }
            });

            // 分页
            container.delegate('.pagination a', 'click', function (e) {
                e.preventDefault();
                showLoading();
                container.html('<p>加载中……</p>');
                $.get($(this).attr('href'), function (data) {
                    if (data.code == 1) {
                        container.html(data.data.html);
                    } else {
                        container.html(data.msg);
                    }
                    hideLoading();
                });
            });

            //搜索
            $('#searchform').submit(function () {
                showSearch();
                return false;
            });
            var showSearch = function () {
                container.html('<p>加载中……</p>');
                loadList(function (data) {
                    if (data.code == 1) {
                        container.html(data.data.html);
                        showTaskSumBarChart();
                        showSuccessPercentLineChart();
                        showDuePercentLineChart();
                    } else {
                        container.html(data.msg);
                    }
                });
            };

            // 级联城市
            var getCityList = function (mark_rank) {
                var html = ' <option value="0">全部</option>';
                if(mark_rank == 0) {
                    $(".js_city_id, .js_group_id, .js_master_id").next().html(html);
                    $(".js_city_id, .js_group_id, .js_master_id").next().select2();
                    return false;
                }
                $.get('/data/board/getcity', {"mark_rank": mark_rank}, function (res) {
                    if (res.code == 1) {
                        var new_html = html;
                        $.each(res.data, function(ko, val) {
                            new_html += '<option value="' + val.cityid + '" >' + val.cityname + '</option>';
                        });
                    }
                    $(".js_city_id").next().html(new_html);
                    $(".js_group_id, .js_master_id").next().html(html);
                    $(".js_city_id, .js_group_id, .js_master_id").next().select2();
                });
            };
            // 初始加载城市
            var mark_rank = parseInt($(".js_mark_rank").find("option:selected").val());
            if(!isNaN(mark_rank) || mark_rank !=0) {
                getCityList(mark_rank);
            };
            // 级联加载城市
            $(".js_mark_rank").change(function () {
                var mark_rank = $(this).val();
                getCityList(mark_rank);
            });

            // 级联战队
            var getGroupList = function(city_id){
                var html = ' <option value="0">全部</option>';
                if(city_id == 0) {
                    $(".js_group_id, .js_master_id").next().html(html);
                    $(".js_group_id, .js_master_id").next().select2();
                    return false;
                }
                $.get('/data/board/getgroup', {"city_id": city_id}, function (res) {
                    if (res.code == 1) {
                        var new_html = html;
                        $.each(res.data, function(ko, val) {
                            new_html += '<option value="' + val.id + '" >' + val.group_name + '</option>';
                        });
                    }
                    $(".js_group_id").next().html(new_html);
                    $(".js_master_id").next().html(html);
                    $(".js_group_id, .js_master_id").next().select2();
                });
            };
            // 初始加载战队
            var city_id = parseInt($(".js_city_id").find("option:selected").val());
            if(!isNaN(city_id) || city_id !=0) {
                getGroupList(city_id);
            };
            // 级联加载战队
            $(".js_city_id").change(function () {
                var city_id = $(this).val();
                getGroupList(city_id);
            });

            // 级联销售
            $(".js_group_id").change(function () {
                var html = ' <option value="0">全部</option>';
                var group_id = $(this).val();
                if(group_id == 0) {
                    $(".js_master_id").next().html(html);
                    $(".js_master_id").next().select2();
                    return false;
                }
                $.get('/data/board/getmaster', {"group_id": group_id}, function (res) {
                    if (res.code == 1) {
                        $.each(res.data, function(ko, val) {
                            html += '<option value="' + val.masterid + '" >' + val.fullname + '</option>';
                        });
                    }
                    $(".js_master_id").next().html(html);
                    $(".js_master_id").next().select2();
                });
            });

            // 商户任务柱状图
            var showTaskSumBarChart = function () {

                var myChart_line = echarts.init(document.getElementById('task_sum_bar'));

                var xAxis_data = [],
                    task_sum_data_a = [],
                    task_sum_data_b = [];

                $('#list_container').each(function (i, qid) {
                    $(qid).find(".js_day").each(function (j, val) {
                        xAxis_data[j] = $(val).html();
                    });
                    $(qid).find(".js_task_sum_a").each(function (j, val) {
                        task_sum_data_a[j] = $(val).html();
                    });
                    $(qid).find(".js_task_sum_b").each(function (j, val) {
                        task_sum_data_b[j] = $(val).html();
                    });
                });

                option_line = {
                    title: {
                        text: '商户任务数'
                    },
                    color: ['#e5323e','#003366'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['A类任务', 'B类任务']
                    },
                    toolbox: {
                        show: true,
                        left: 'right',
                        top: 'top',
                        feature: {
                            mark: {show: true},
                            dataView: {show: false, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: xAxis_data
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'A类任务',
                            type: 'bar',
                            barGap: 0,
                            data: task_sum_data_a
                        },
                        {
                            name: 'B类任务',
                            type: 'bar',
                            data: task_sum_data_b
                        }
                    ]
                };
                myChart_line.setOption(option_line);
            };
            // 任务完成率折线图
            var showSuccessPercentLineChart = function () {
                var myChart_line = echarts.init(document.getElementById('success_percent_line'));
                var xAxis_data = [],
                    success_data_a = [],
                    success_data_b = [],
                    success_data_all = [];

                $('#list_container').each(function (i, qid) {

                    $(qid).find(".js_day").each(function (j, val) {
                        xAxis_data[j] = $(val).html();
                    });
                    $(qid).find(".js_success_percent_sum_a").each(function (j, val) {
                        success_data_a[j] = Math.floor(parseFloat($(val).html()) * 100) / 10000;
                        success_data_all[j] = Math.floor(parseFloat($(val).html()) * 100);
                    });
                    $(qid).find(".js_success_percent_sum_b").each(function (j, val) {
                        success_data_b[j] = Math.floor(parseFloat($(val).html()) * 100) / 10000;
                        success_data_all[j] += Math.floor(parseFloat($(val).html()) * 100);
                        success_data_all[j] = success_data_all[j] / 10000;
                    });
                });

                var option_line = {
                    title: {
                        text: '任务完成率走势'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['总完成率', 'A类任务完成率', 'B类任务完成率']
                    },
                    toolbox: {
                        show: true,
                        left: 'right',
                        top: 'top',
                        feature: {
                            mark: {show: true},
                            dataView: {show: false, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name:'总完成率',
                        data: success_data_all,
                        type: 'line'
                    },{
                        name:'A类任务完成率',
                        data: success_data_a,
                        type: 'line'
                    },{
                        name:'B类任务完成率',
                        data: success_data_b,
                        type: 'line'
                    }]
                };
                myChart_line.setOption(option_line);
            };
            // 任务逾期率折线图
            var showDuePercentLineChart = function () {
                var myChart_line = echarts.init(document.getElementById('due_percent_line'));
                var xAxis_data = [],
                    due_data_a = [],
                    due_data_b = [],
                    due_data_all = [];

                $('#list_container').each(function (i, qid) {

                    $(qid).find(".js_day").each(function (j, val) {
                        xAxis_data[j] = $(val).html();
                    });
                    $(qid).find(".js_due_percent_sum_a").each(function (j, val) {
                        due_data_a[j] = Math.floor(parseFloat($(val).html()) * 100) / 10000;
                        due_data_all[j] = Math.floor(parseFloat($(val).html()) * 100);
                    });
                    $(qid).find(".js_due_percent_sum_b").each(function (j, val) {
                        due_data_b[j] = Math.floor(parseFloat($(val).html()) * 100) / 10000;;
                        due_data_all[j] += Math.floor(parseFloat($(val).html()) * 100);
                        due_data_all[j] = due_data_all[j] / 10000;
                    });
                });
                var option_line = {
                    title: {
                        text: '任务逾期率走势'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['总逾期率', 'A类任务逾期率', 'B类任务逾期率']
                    },
                    toolbox: {
                        show: true,
                        left: 'right',
                        top: 'top',
                        feature: {
                            mark: {show: true},
                            dataView: {show: false, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis_data
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name:'总逾期率',
                        data: due_data_all,
                        type: 'line'
                    },{
                        name:'A类任务逾期率',
                        data: due_data_a,
                        type: 'line'
                    },{
                        name:'B类任务逾期率',
                        data: due_data_b,
                        type: 'line'
                    }]
                };
                myChart_line.setOption(option_line);
            };

        });
    </script>
@endsection