function setPic(imgurl,width,height,alt){
	imgurl = decode64(imgurl);
	imgstr = "<img src=\"" + imgurl + "\"";
	if(width!=0){
		imgstr = imgstr + " width=\"" + width + "\"";
	}
	if(height!=0){
		imgstr = imgstr + " height=\"" + height + "\"";
	}
	imgstr = imgstr + " alt=\"" + alt + "\" border=\"0\" />";
	document.write(imgstr);
}

function clickurl(urlid){
	//urlid = decode64(urlid);
	window.open("gosite.php?url=" + urlid);
}

function tihuan(str){
	str = decode64(str);
	document.getElementById("titem_desc").innerHTML = str;
}