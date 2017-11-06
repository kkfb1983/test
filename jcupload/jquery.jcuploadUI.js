
(function($){$.fn=$.fn||{};$.jcu_size={one_kb:1024,one_mb:1024*1024};$.jcu_pretty_size=function(size){if(size>$.jcu_size.one_mb){return(Math.round((size/$.jcu_size.one_mb)*10)/10)+" MB";}
else if(size>$.jcu_size.one_kb){return(Math.round((size/$.jcu_size.one_kb)*10)/10)+" KB";}
return size+" b";};$.fn.jcuploadUI={instances:[],build:function(user_config){this.to_console=function(msg){$.fn.to_console(this.jcupload.config.instance_name+" [UI] : "+msg);};this.append_to=function(elem){this.container=$(document.createElement("div")).addClass("jcu_container").appendTo(elem);var jcu_tbar=$(document.createElement("div")).addClass("jcu_toolbar").appendTo(this.container);var jcu_tbar_left=$(document.createElement("div")).addClass("jcu_toolbar_left").css({"width":this.jcupload.config.flash_width+"px"}).appendTo(jcu_tbar);this.status_bar=$(document.createElement("div")).addClass("jcu_toolbar_right").html("&nbsp;").appendTo(jcu_tbar);$(document.createElement("div")).addClass("jcu_toolbar_clear").appendTo(jcu_tbar);this.file_container=$(document.createElement("div")).addClass("jcu_file_container").css({"height":this.config.box_height+"px"}).html("&nbsp;").appendTo(this.container);this.jcupload.append_to(jcu_tbar_left);this.error_container=$(document.createElement("div")).addClass("jcu_error_container").appendTo(this.container);};this.init=function(uo,jcu_version,flash_version){uo.to_console("[UIcallback] init("+jcu_version+", "+flash_version+")");var ui=$.fn.jcuploadUI.instances[uo.config.instance_index];if(typeof(ui.callback.init)=="function"){try{ui.callback.init(uo,jcu_version,flash_version);}catch(e){ui.to_console(e);}}};this.add_error=function(ui,msg){if(ui.errors_on_list==0){ui.error_container.fadeIn('fast');}
var error_msg=$(document.createElement("div")).addClass("jcu_error").html(msg).appendTo(this.error_container);error_msg.fadeIn('fast',function(){setTimeout(function(){error_msg.fadeOut('fast',function(){ui.errors_on_list++;if(ui.errors_on_list==0){ui.error_container.fadeOut('fast');}});},ui.config.error_timeout);});ui.errors_on_list++;};this.pre_dialog=function(uo){uo.to_console("[UIcallback] pre_dialog()");var ui=$.fn.jcuploadUI.instances[uo.config.instance_index];if(typeof(ui.callback.pre_dialog)=="function"){try{ui.callback.pre_dialog(uo);}catch(e){ui.to_console(e);}}};this.file_added=function(uo,file_index){uo.to_console("[UIcallback] file_added("+file_index+")");var ui=$.fn.jcuploadUI.instances[uo.config.instance_index];if(ui.files.length==0){ui.file_container.empty();ui.file_table=$(document.createElement("table")).attr({cellSpacing:0,cellPadding:0,border:0,width:'100%'}).addClass('jcu_file_table').appendTo(ui.file_container);}
var fp=uo.get_file_params(file_index);ui.files[file_index]={};if(ui.files_on_list>0){ui.files[file_index].delimeter=$(ui.file_table[0].insertRow(0));$(document.createElement("td")).addClass("jcu_file_delimeter").attr({colSpan:3}).html("&nbsp;").appendTo(ui.files[file_index].delimeter);}
ui.files[file_index].file_row=$(ui.file_table[0].insertRow(0));ui.files[file_index].cell_icon=$(document.createElement("td")).addClass("jcu_file_cell_icon").appendTo(ui.files[file_index].file_row);ui.files[file_index].icon=$(document.createElement("img")).attr({src:ui.config.file_icon_ready}).appendTo(ui.files[file_index].cell_icon);ui.files[file_index].cell_name=$(document.createElement("td")).addClass("jcu_file_cell_name").html(fp.name+" ("+$.jcu_pretty_size(fp.size)+")").appendTo(ui.files[file_index].file_row);ui.files[file_index].cell_status=$(document.createElement("td")).addClass("jcu_file_cell_status").appendTo(ui.files[file_index].file_row);ui.files[file_index].progress_back=$(document.createElement("div")).addClass("jcu_file_progress_back").appendTo(ui.files[file_index].cell_status);ui.files[file_index].progress=$(document.createElement("div")).addClass("jcu_file_progress").appendTo(ui.files[file_index].progress_back);ui.files_on_list++;if(typeof(ui.callback.file_added)=="function"){try{ui.callback.file_added(uo,file_index);}catch(e){ui.to_console(e);}}};this.upload_start=function(uo,file_index){uo.to_console("[UIcallback] upload_start("+file_index+")");var ui=$.fn.jcuploadUI.instances[uo.config.instance_index];ui.files[file_index].icon.attr({src:ui.config.file_icon_uploading});ui.files[file_index].progress.css({width:'0%'});ui.files[file_index].progress_back.fadeIn('fast');if(typeof(ui.callback.upload_start)=="function"){try{ui.callback.upload_start(uo,file_index);}catch(e){ui.to_console(e);}}};this.upload_progress=function(uo,file_index,file_sended,file_size){uo.to_console("[UIcallback] upload_progress("+file_index+", "+file_sended+", "+file_size+")");var ui=$.fn.jcuploadUI.instances[uo.config.instance_index];var proc=Math.round((file_sended*100)/file_size);ui.files[file_index].progress.css({width:proc+'%'});var fp=uo.get_file_params(file_index);ui.status_bar.html(fp.name+" ("+proc+"%)");if(typeof(ui.callback.upload_progress)=="function"){try{ui.callback.upload_progress(uo,file_index,file_sended,file_size);}catch(e){ui.to_console(e);}}};this.upload_end=function(uo,file_index){uo.to_console("[UIcallback] upload_end("+file_index+")");var ui=$.fn.jcuploadUI.instances[uo.config.instance_index];ui.files[file_index].icon.attr({src:ui.config.file_icon_finished});ui.files[file_index].progress.css({width:'100%'});ui.files[file_index].progress_back.fadeOut('fast');if(ui.config.hide_file_after_finish){setTimeout(function(){ui.files[file_index].file_row.fadeOut('fast',function(){ui.files_on_list--;});if(ui.files[file_index].delimeter){ui.files[file_index].delimeter.fadeOut('fast');}},ui.config.hide_file_after_finish_timeout);}
ui.status_bar.html("&nbsp;");if(typeof(ui.callback.upload_end)=="function"){try{ui.callback.upload_end(uo,file_index);}catch(e){ui.to_console(e);}}};this.queue_upload_end=function(uo){uo.to_console("[UIcallback] queue_upload_end()");var ui=$.fn.jcuploadUI.instances[uo.config.instance_index];if(typeof(ui.callback.queue_upload_end)=="function"){try{ui.callback.queue_upload_end(uo);}catch(e){ui.to_console(e);}}};this.error_file_size=function(uo,file_name,file_type,file_size){uo.to_console("[UIcallback] error_file_size("+file_name+","+file_type+","+file_size+")");var ui=$.fn.jcuploadUI.instances[uo.config.instance_index];ui.add_error(ui,"File &quot;"+file_name+"&quot; is too big!");if(typeof(ui.callback.error_file_size)=="function"){try{ui.callback.error_file_size(uo,file_name,file_type,file_size);}catch(e){ui.to_console(e);}}};this.error_queue_count=function(uo,file_name,file_type,file_size){uo.to_console("[UIcallback] error_queue_count()");var ui=$.fn.jcuploadUI.instances[uo.config.instance_index];ui.add_error(ui,"File &quot;"+file_name+"&quot; ignored- queue full!");if(typeof(ui.callback.error_queue_count)=="function"){try{ui.callback.error_queue_count(uo,file_name,file_type,file_size);}catch(e){ui.to_console(e);}}};this.error_queue_size=function(uo,file_name,file_type,file_size){uo.to_console("[UIcallback] error_queue_size()");var ui=$.fn.jcuploadUI.instances[uo.config.instance_index];ui.add_error(ui,"File &quot;"+file_name+"&quot; ignored- queue size full!");if(typeof(ui.callback.error_queue_size)=="function"){try{ui.callback.error_queue_size(uo,file_name,file_type,file_size);}catch(e){ui.to_console(e);}}};this.container;this.status_bar;this.file_container;this.file_table;this.files=[];this.files_on_list=0;this.error_container;this.errors_on_list=0;this.callback={};this.config={box_height:400,file_icon_ready:'jcu_file_ready.gif',file_icon_uploading:'jcu_file_uploading.gif',file_icon_finished:'jcu_file_finished.gif',hide_file_after_finish:false,hide_file_after_finish_timeout:2000,error_timeout:3000,callback:{init:this.init,pre_dialog:this.pre_dialog,file_added:this.file_added,upload_start:this.upload_start,upload_progress:this.upload_progress,upload_end:this.upload_end,queue_upload_end:this.queue_upload_end,error_file_size:this.error_file_size,error_queue_count:this.error_queue_count,error_queue_size:this.error_queue_size}};if(typeof(user_config)=="object"){user_config=$.extend($.jcuploadUI_config,user_config);}
else if(typeof($.jcuploadUI_config)=="object"){user_config=$.jcuploadUI_config;}
if(typeof(user_config)=="object"){if(typeof(user_config.callback)=="object"){this.callback=$.extend(this.callback,user_config.callback);delete user_config.callback;}}
this.config=$.extend(this.config,user_config);this.jcupload=$.jcupload(this.config);$.fn.jcuploadUI.instances[this.jcupload.config.instance_index]=this;return this;}};$.jcuploadUI=function(user_config){return new $.fn.jcuploadUI.build(user_config);};})($);