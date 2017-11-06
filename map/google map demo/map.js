window.onload = myLoad;

var poly;          //����
var infoWindowPoly;          //������ʾ�Ĵ���
var map;           //��ͼ

function myLoad() {
    lat = 23.14746;              //λ�ù̶�����Ҳ����ͨ�������õ�
    lng = 113.34175376;
    var myLatLng = new google.maps.LatLng(lat, lng);            //��ʼ��һ�����λ��

    var myOptions = {
        zoom: 15,                   //���ţ���ֵԽ���ͼ��ʾ������Խ����
        center: myLatLng,              //��ͼ���ĵ�
        disableDefaultUI: true,              //��ʹ��Ĭ��ͼ��
        navigationControl: true,                 //��ʾ������

        mapTypeControl: true,
        mapTypeControlOptions: {
         style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,               //��ϸ�����ÿɲο���http://blog.sina.com.cn/s/articlelist_1289503967_4_1.html
         position: google.maps.ControlPosition.TOP_LEFT },
        scaleControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP             //��ͼ���ͣ�һ�����֣��ɲο�http://blog.sina.com.cn/s/articlelist_1289503967_4_1.html
    };

    map = new google.maps.Map(document.getElementById("map"), myOptions);        //���option��ʼ����ͼ

    var marker = new google.maps.Marker({              //��ӱ��
        position: myLatLng,
        map: map,
        title: "Hello World!"
    });

    var contentString = '<div id="content">' +                 //�����Ǻ���ʾ�Զ��������
    '<div>' +
    '</div>' +
    '<h1>�ҵı�ǩ</h1>' +
    '<div id="bodyContent">' +
    '<p class = "mapStyle">�ҵ��Ա� <a href="http://ggydggyd.taobao.com">http://ggydggyd.taobao.com</a>' +
    '</div>' +
    '</div>';

    var infowindow = new google.maps.InfoWindow({                //���HTML��ʼ��infowindow
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function () {      //��ӵ���¼�
        infowindow.open(map, marker);
    });


    var image = 'flag.png';                                       //�Զ���marker��ͼ��
    var myLatLng = new google.maps.LatLng(23.149, 113.349);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });

    google.maps.event.addListener(beachMarker, 'click', function () {      //��ӵ���¼�
        infowindow.open(map,beachMarker );
    });


    var flightPlanCoordinates = [                        //���һ����
    new google.maps.LatLng(23.14746, 113.34175376),
    new google.maps.LatLng(23.144, 113.345),
    new google.maps.LatLng(23.149, 113.349),
  ];
    poly = new google.maps.Polyline({                 //�����ߵ���ʽ
        path: flightPlanCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 8
    });

    poly.setMap(map);                 //������ӵ���ͼ

    google.maps.event.addListener(poly, 'click', addLatLng);         //Ϊ����ӵ���¼�

    infoWindowPoly = new google.maps.InfoWindow();              //��ʼ���ߵĵ�����
}

function addLatLng(event) 
{
    var contentString = "<b>�������</b><br />";
    contentString += "���λ��: <br />" + event.latLng.lat() + "," + event.latLng.lng() + "<br />";

    // Replace our Info Window's content and position
    infoWindowPoly.setContent(contentString);
    infoWindowPoly.setPosition(event.latLng);

    infoWindowPoly.open(map);                 //����ߵ�ʱ����ʾ�ߵĵ�����
}
