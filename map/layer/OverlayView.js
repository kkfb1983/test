var overlay;
var geocoder;
function initialize(){
 address = $G("address");
 name = $G("name");
 geocoder=new google.maps.Geocoder();//实例化地址解析
 var myLatLng = new google.maps.LatLng(30.658602, 104.064587);//初始化坐标中心点，这里以成都为列
 var myOptions = {
      zoom: 15,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP//指定地图类型
 };
 var map = new google.maps.Map(document.getElementById("show"), myOptions);
 geocoder.geocode({
  'address':address
 },function (results,status) {
  if(status==google.maps.GeocoderStatus.OK) {
   map.setCenter(results[0].geometry.location);//将地图中心定位到查询结果
   overlay = new LableMarker(map,name,results[0].geometry.location);//实例化OverlayView类
  }
 }); 
}
 
function LableMarker(map, text, latLng){
 this.map_ = map;
 this.text_ = '<div class="iconTheStyle"><div class="s1"></div><div class="s2">'+text+'</div><div class="s3"></div><div class="s4"></div><div class="s5"></div></div>';
 this.latLng_ = latLng;
 this.div_ = null;
 this.setMap(map);
}  
// 继承自  google.maps.OverlayView
LableMarker.prototype = new google.maps.OverlayView();
// 当准备将 悬浮层 添加到地图上时 调用

LableMarker.prototype.onAdd = function(){
 var div = document.createElement('DIV');
 div.style.border = 'none';
 div.style.position='absolute';   
 div.innerHTML = this.text_;   
 this.div_ = div;   
 var panes = this.getPanes();
 panes.overlayLayer.appendChild(div);
};
  
// 当第一次在地图上显示时 调用
LableMarker.prototype.draw = function(){
 var overlayProjection = this.getProjection();
 var latLng = overlayProjection.fromLatLngToDivPixel(this.latLng_);
 // 设置层的大小 和 位置
 var div = this.div_;
 var size = new google.maps.Size(-26, -42); // 修正坐标的值;
 div.style.left = (latLng.x + size.width) + 'px';
 div.style.top = (latLng.y + size.height) + 'px';
};
// 当设置 悬浮层的 setMap(null) 会自动调用 
LableMarker.prototype.onRemove = function(){
 this.div_.parentNode.removeChild(this.div_);
 this.div_ = null;
};