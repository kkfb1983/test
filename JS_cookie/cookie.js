//JS操作cookies方法
//js写cookies
function setCookie(name,value)
{
var Days = 30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
var strsec = getsec(time);
var exp = new Date();
exp.setTime(exp.getTime() + strsec*1);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//js读取cookies
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return (arr[2]);
else
return null;
}


function getsec(str)
{
alert(str);
var str1=str.substring(1,str.length)*1;
var str2=str.substring(0,1);
if (str2=="s")
　{return str1*1000;}
else if (str2=="h")
　 {return str1*60*60*1000;}
else if (str2=="d")
　 {return str1*24*60*60*1000;}
}