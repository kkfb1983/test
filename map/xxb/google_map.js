var mapCls = {};
mapCls = function(){
	var _map;
	var _point;
	var _zoom = 10;
	var _myLatLng;
	var _myOptions;
	var _cityItude;
	return {
		/**
		 * 加载地图
		 * @param 载入地图ID mapId
		 * @param 做标点JSON itude
		 */
		loadMap : function(mapId,itude,city){
			_point = itude;
			this.codeAddress(city);
			_myLatLng = new google.maps.LatLng(40.023063,116.528227); //初始化一个坐标位置
				_myOptions = {
					zoom: _zoom, //缩放，数值越大地图显示的内容越具体
					center: _myLatLng, //地图中心点
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				_map = new google.maps.Map(document.getElementById(mapId), _myOptions); //根据option初始化地图
				this.setMarkerMap();
		},
		/**
		 * 添加坐标点
		 */
		setMarkerMap : function(){
			for (var v in _point) {
				var textHtml = '';
				myLatLng = new google.maps.LatLng(_point[v]['itude'][1], _point[v]['itude'][0]);
				marker = new google.maps.Marker({ //添加标记
					position: myLatLng,
					map: _map,
					title: "Hello World!"+v
				});
				textHtml += '<div class="content">';
				textHtml += '<strong>'+_point[v]['hotel_code']+'</strong><br>';
				textHtml += 'money:$'+_point[v]['price']+'<br>';
				textHtml += '<a href="http://www.baidu.com"><img src="./blue_big.jpg"></a>';
				textHtml += '</div>'
				this.setEvent(marker, textHtml); //点击标记后显示自定义的内容
			}
		},
		setEvent : function(marker,textHtml){
			var infowindow = new google.maps.InfoWindow({                //根据HTML初始化infowindow
				content: textHtml
			});
//			google.maps.event.addListener(marker, 'click', function () {      //添加点击事件
				infowindow.open(_map, marker);
//			});
	    },
		/**
		 * 获取地址的经纬度
		 * @param 城市名称 city
		 */
        codeAddress: function(city){
            var address = city;
			var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': address}, function(results, status){
                if (status == google.maps.GeocoderStatus.OK) {
                    cityMarker = new google.maps.Marker({
                        title: address+':'+results[0].geometry.location,
                        map: _map,
                        position: results[0].geometry.location,
                        icon: 'flag.png'
                    });
                    var infowindow = new google.maps.InfoWindow({
                        content: '<div class="content"><strong>' + address + '</strong><br>' + results[0].geometry.location + '</div>'
                    });
                    google.maps.event.addListener(cityMarker, 'click', function () {      //添加点击事件
                        infowindow.open(_map, cityMarker); //显示内容
                    });
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }
	}
}();

