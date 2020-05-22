<?php
date_default_timezone_set("Asia/Shanghai");
header("Content-Type:text/html;charset=utf-8");
session_start();
// include_once( './interface/sina/config.php' );
// include_once( './interface/sina/saetv2.ex.class.php' );

function ttt($n){
    $s = [];
    $sum = 0;
    $ln = 0;
    $rn = 0;
    $fa = 0;
    $f = "";
    for($i=1;$i<$n;$i++){
        if ($i > 1) {
            $r = $l;
        }
        $l = $i*$i;
        if ($i == 1){
            $f = "-";
            $sum += $l;
        }else{
            $f = $i % 2 == 0 ? "-" : "+";
            if ($i % 2 == 0){
                $sum += $l+$r;
            }else{
                $sum += $l-$r;
            }
        }
        $s[] = "($i*$i) $f";
        
        
        
    }
    echo implode($s,"*")."=".$sum;
    return $sum;
}

$m = 5;
ttt($m);

exit;

// $content = file_get_contents('php://input');
$content = date("Y-m-d H:i:s").PHP_EOL;
$json_data .= file_get_contents('php://input');
// $content .= json_decode($_POST,TURE).PHP_EOL;
file_put_contents("/var/tmp/test".date("Ymd").".log",json_decode($json_data,true));
echo json_encode(['code'=>1,"msg"=>"ok","data"=>[]]);



exit; 
class aa{
    public function fun1(){
        return [1,2];
    }
    public function fun2(){
        return [3,4];
    }
}
$a = new aa();
print_r($a->fun1()->fun2());
exit;


$a1=array("a"=>"","b"=>"green","c"=>"blue");
$a2=array("a"=>"red2","c"=>"blue","d"=>"pink");

$result=array_intersect_key($a1,$a2);
print_r($result);



exit;

$n = "24linux"+6;
echo $n;
exit;


$api_json = [                //类型：Array  必有字段  备注：返回数据
    [                //类型：Object  必有字段  备注：网点信息
        "site_id"=>516,                //类型：Number  必有字段  备注：网点id
        "site_name"=>"滦平测试网点",                //类型：String  必有字段  备注：网点名称
        "inspire_end_time"=>1560418762,                //类型：Number  必有字段  备注：反佣优惠截止日期
        "investor"=>[                //类型：Object  必有字段  备注：投资人
            "master_id"=>0,                //类型：Number  必有字段  备注：投资人id
            "role"=>1,                //类型：Number  必有字段  备注：角色：1投资人，2网点负责人，3推广员
            "commission_ratio"=>"0.0",                //类型：String  必有字段  备注：佣金比例
            "bank_account_name"=>"mock",                //类型：String  必有字段  备注：开户人
            "bank_branch_name"=>"mock",                //类型：String  必有字段  备注：开户行
            "bank_account_number"=>"mock"                //类型：String  必有字段  备注：收款帐号
        ],
        "leader"=>[                //类型：Object  必有字段  备注：网点负责人
            "master_id"=>25,                //类型：Number  必有字段  备注：网点负责人id
            "role"=>2,                //类型：Number  必有字段  备注：角色：1投资人，2网点负责人，3推广员
            "commission_ratio"=>"100.0",                //类型：String  必有字段  备注：佣金比例
            "bank_account_name"=>"mock",                //类型：String  必有字段  备注：开户人
            "bank_branch_name"=>"mock",                //类型：String  必有字段  备注：开户行
            "bank_account_number"=>"mock"                //类型：String  必有字段  备注：收款帐号
        ],
        "promoters"=>[                //类型：Array  必有字段  备注：推广员
            [                //类型：Object  必有字段  备注：无
                "master_id"=>27,                //类型：Number  必有字段  备注：推广员id
                "role"=>3,                //类型：Number  必有字段  备注：角色：1投资人，2网点负责人，3推广员
                "commission_ratio"=>"0.0",                //类型：String  必有字段  备注：佣金比例
                "bank_account_name"=>"yaoxin5",                //类型：String  必有字段  备注：开户人
                "bank_branch_name"=>"中国银行股份有限公司珠海夏湾支行",                //类型：String  必有字段  备注：开户行
                "bank_account_number"=>"6225880189880002"                //类型：String  必有字段  备注：收款帐号
            ],
            [                //类型：Object  必有字段  备注：无
                "master_id"=>473,                //类型：Number  必有字段  备注：无
                "role"=>3,                //类型：Number  必有字段  备注：无
                "commission_ratio"=>"0.0",                //类型：String  必有字段  备注：无
                "bank_account_name"=>"mock",                //类型：String  必有字段  备注：无
                "bank_branch_name"=>"mock",                //类型：String  必有字段  备注：无
                "bank_account_number"=>"mock"                //类型：String  必有字段  备注：无
            ]
        ]
    ],
    [                //类型：Object  必有字段  备注：无
        "site_id"=>41,                //类型：Number  必有字段  备注：无
        "site_name"=>"北京市朝阳区东亚望京中心店",                //类型：String  必有字段  备注：无
        "inspire_end_time"=>-62170012800,                //类型：Number  必有字段  备注：无
        "investor"=>[                //类型：Object  必有字段  备注：无
            "master_id"=>0,                //类型：Number  必有字段  备注：无
            "role"=>1,                //类型：Number  必有字段  备注：无
            "commission_ratio"=>"0.0",                //类型：String  必有字段  备注：无
            "bank_account_name"=>"mock",                //类型：String  必有字段  备注：无
            "bank_branch_name"=>"mock",                //类型：String  必有字段  备注：无
            "bank_account_number"=>"mock"                //类型：String  必有字段  备注：无
        ],
        "leader"=>[                //类型：Object  必有字段  备注：无
            "master_id"=>27,                //类型：Number  必有字段  备注：无
            "role"=>2,                //类型：Number  必有字段  备注：无
            "commission_ratio"=>"100.0",                //类型：String  必有字段  备注：无
            "bank_account_name"=>"yaoxin5",                //类型：String  必有字段  备注：无
            "bank_branch_name"=>"中国银行股份有限公司珠海夏湾支行",                //类型：String  必有字段  备注：无
            "bank_account_number"=>"6225880189880002"                //类型：String  必有字段  备注：无
        ],
        "promoters"=>[                //类型：Array  必有字段  备注：无
        ]
    ],
    [                //类型：Object  必有字段  备注：无
        "site_id"=>523,                //类型：Number  必有字段  备注：无
        "site_name"=>"X3发券测试",                //类型：String  必有字段  备注：无
        "inspire_end_time"=>1560355200,                //类型：Number  必有字段  备注：无
        "investor"=>[                //类型：Object  必有字段  备注：无
            "master_id"=>27,                //类型：Number  必有字段  备注：无
            "role"=>1,                //类型：Number  必有字段  备注：无
            "commission_ratio"=>"0.0",                //类型：String  必有字段  备注：无
            "bank_account_name"=>"yaoxin5",                //类型：String  必有字段  备注：无
            "bank_branch_name"=>"中国银行股份有限公司珠海夏湾支行",                //类型：String  必有字段  备注：无
            "bank_account_number"=>"6225880189880002"                //类型：String  必有字段  备注：无
        ],
        "leader"=>[                //类型：Object  必有字段  备注：无
            "master_id"=>11,                //类型：Number  必有字段  备注：无
            "role"=>2,                //类型：Number  必有字段  备注：无
            "commission_ratio"=>"100.0",                //类型：String  必有字段  备注：无
            "bank_account_name"=>"mock",                //类型：String  必有字段  备注：无
            "bank_branch_name"=>"mock",                //类型：String  必有字段  备注：无
            "bank_account_number"=>"mock"                //类型：String  必有字段  备注：无
        ],
        "promoters"=>[                //类型：Array  必有字段  备注：无
        ]
    ],
    [                //类型：Object  必有字段  备注：无
        "site_id"=>524,                //类型：Number  必有字段  备注：无
        "site_name"=>"X3测试网点",                //类型：String  必有字段  备注：无
        "inspire_end_time"=>1560441600,                //类型：Number  必有字段  备注：无
        "investor"=>[                //类型：Object  必有字段  备注：无
            "master_id"=>0,                //类型：Number  必有字段  备注：无
            "role"=>1,                //类型：Number  必有字段  备注：无
            "commission_ratio"=>"0.0",                //类型：String  必有字段  备注：无
            "bank_account_name"=>"mock",                //类型：String  必有字段  备注：无
            "bank_branch_name"=>"mock",                //类型：String  必有字段  备注：无
            "bank_account_number"=>"mock"                //类型：String  必有字段  备注：无
        ],
        "leader"=>[                //类型：Object  必有字段  备注：无
            "master_id"=>27,                //类型：Number  必有字段  备注：无
            "role"=>2,                //类型：Number  必有字段  备注：无
            "commission_ratio"=>"100.0",                //类型：String  必有字段  备注：无
            "bank_account_name"=>"yaoxin5",                //类型：String  必有字段  备注：无
            "bank_branch_name"=>"中国银行股份有限公司珠海夏湾支行",                //类型：String  必有字段  备注：无
            "bank_account_number"=>"6225880189880002"                //类型：String  必有字段  备注：无
        ],
        "promoters"=>[                //类型：Array  必有字段  备注：无
        ]
    ]
];
echo "<pre>";
print_r($api_json);



exit;
$d = '2019-06-05';
echo date('Y-m-d',strtotime('-4 day '.$d));

exit;


echo "<pre>";
$str = '{"callid":"6359f974211de114","ringingtime":"2017-11-01 15:13:43","recordUrl":"","releasecause":"16","starttime":"2017-11-01 15:13:48","telX":"13008166423","calltime":"2017-11-01 15:13:37","telA":"13436956064","subid":"A1183X28X0088359418-00-1-XZYX-GXI","telB":"18810871230","releasetime":"2017-11-01 15:13:48","releasedir":"1","requestId":"450583130","callrecording":"1","calltype":"128","recordMode":"1","uxin":"\"{\\\"u\\\":2705,\\\"c\\\":10822,\\\"s\\\":902,\\\"a\\\":\\\"A1183X28X0088359418-00-1-XZYX-GXI\\\",\\\"t\\\":1}\""}';
echo $str;exit;




$data = json_decode($str,true);
print_r($data);





exit;

function uncertainParam() {

    $numargs = func_num_args();    //获得传入的所有参数的个数
    echo "参数个数: $numargs\n";  

    $args = func_get_args();       //获得传入的所有参数的数组 
    foreach($args as $key=>$value){

        echo '<BR><BR>'.func_get_arg($key);   //获取单个参数的值
echo "<br>";
        // echo '<BR>'.$value;        //单个参数的值
    }
echo "<hr>";
    var_export($args);  
}   


$parm_fir = 'name';

$parm_sec = 'sex';

uncertainParam($parm_fir, $parm_sec);

exit;

$a = array(
    'a','b','c','d','e','f'
    );
$s = 'a,b,c,d,e,f,';

// $arr = explode(',',$s,3);
// print_r($arr);

echo implode('array',array());

exit;

$a=1;
$b=2;
$c='a';
echo $a,$b,$c;
exit;

echo convert_uudecode("+22!L;W9E(%!(4\"$`\n`");
exit;


$str = 'ef3d16ab42580aa5778062ded8c58eacappkeyXZYX_0001callid6359f6eb0c039414callrecording1calltime2017-10-30 17:04:12calltype1record_urlreleasecause16releasedir1releasetime2017-10-30 17:04:19requestId1336269303ringingtime2017-10-30 17:04:13starttime2017-10-30 17:04:19subidA1183X755X0084011118-00-1-XZYX-GXItelA18301662441telB18511400917telX13049801029ts20171030170420230700003';
echo md5($str);

exit;


$b64 = "bcde";
var_dump($b64);
echo "<hr>";
$len = strlen($b64);
    for ($i = 0; $i < $len; $i++) {
        echo $b64{$i}."<br>";
    }

    exit;

$str = "116.34483694 40.07116344";
$point = explode(" ", $str);
var_dump($point);
echo (float)$point[0];
exit;
$str = '"344"';

$n = 1;
// echo strlen(trim($str))."<hr>";
//             // $merchantArea = substr($str,$n,strlen(trim($str))-$n);
//            $merchantArea = str_replace('"', "", $str)
//             $merchantAreaArrs=explode(",", $merchantArea);
//             if ($merchantAreaArrs)
//             {
//                 foreach ($merchantAreaArrs as $val)
//                 {
//                     $merchantAreaArr['coordinates'][]=explode(" ", $val);
//                 }
//             }
//             $merchantAreaArr['type']="Polygon";
//             $data= $merchantAreaArr;

// echo "<pre>";
// print_r($data);

exit;



$a1=array(1,3,4,5,6);
$a2=array(2,4,6,8,10);
$a3=array_merge($a1,$a2);
$a4=array_unique($a3);
print_r($a3);
echo "<br>";
print_r($a4);
exit;

$a =2;
$info['MerchantArea'] = "acb";
 if(is_numeric(stripos($info['MerchantArea'],')(')))
        {
            $a =1;
        }
        echo $a;
        exit;


$str = '"116.34483694 40.07116344,116.34478329 40.06827339,116.33787392 40.06823234,116.33498186 40.06811659,116.33492821 40.06542347,116.33724564 40.0653742,116.33773917 40.06382233,116.33455269 40.06381414,116.33300238 40.06384896,116.33190268 40.06378127,116.33078688 40.06369095,116.32819599 40.0633558,116.32783644 40.06396193,116.32729464 40.06489997,116.32712298 40.06565537,116.32673674 40.06716615,116.32647925 40.06762595,116.32631228 40.06815171,116.3259589 40.07057971,116.3257336 40.07092454,116.32305138 40.07107234,116.31720887 40.0709884,116.31526224 40.07346968,116.31288044 40.0767864,116.31600266 40.07915151,116.31442539 40.08230298,116.31283753 40.08540585,116.31603472 40.08671919,116.31873839 40.08731019,116.33680575 40.08924731,116.33631562 40.09274825,116.34262418 40.09301269,116.34369074 40.08657565,116.34626859 40.08659605,116.348468 40.08662888,116.34909576 40.08657293,116.35013566 40.07556544,116.34498045 40.07559827,116.34486911 40.07413291,116.34483156 40.07215841,116.34483694 40.07116344"';
$str = str_replace('"', '', $str);
// $str = substr($str,1,strlen($str)-1);
// $arr['type'] = array("Polygon");
// $arr['coordinates'][] = explode(')(', $str);
echo $str;exit;
echo "<pre>";
print_r($arr);
echo "<br>";
echo json_encode($arr);
exit;

echo "<pre>";
print_r(json_decode('{"397":{"RestaurantID":397,"AreaID":244,"Name":"\u7c73\u65af\u7279\u6bd4\u8428","Code":""
,"CatagoryID":45,"Address":"\u5317\u4eac\u5e02\u671d\u9633\u5317\u8def101\u53f76F-06","Ph
one":"85519110","Linkman1":"","Linkman1Phone":"","Linkman2":"","Linkman2Phone":"","URL":"
http:\/\/www.dianping.com\/shop\/4119819","Status":0,"CityID":1,"Remark":"10:30-21:00 \u5
97d\u68d2\u7cfb\u5217\u6bd4\u7ecf\u5178\u7cfb\u5217\u7684\u62ab\u8428\uff0c\u5916\u8fb9\u
591a\u4e00\u5708\u829d\u58eb\u300214\u5bf8\u7684\u6bd4\u8428\u662f\u5207\u5f00\u7684","Ow
nedBySelf":0,"ApplyArea":"244","PerCapitaConsumption":"\u00a576","RecommendedDishes":"\u8
1ea\u52a9\u6c99\u62c9 \u91d1\u724c\u571f\u8c46 \u91d1\u724c\u571f\u8c46\u62ab\u8428 \u91d
1\u724c\u6d77\u9c9c \u7c73\u65af\u7279\u7279\u8272\u6279\u8428 \u6d77\u9c9c\u5c9b \u6d77\
u9c9c\u62ab\u8428","CreationDate":1286888400,"Label":null,"OnSite":1,"PackagingCostPolicy
":0,"MinConsumption":"0.00","PackagingCostRate":"0.00","SupportInvoice":1,"InvoiceRemark"
:0,"AMStartTime":1030,"PMStartTime":1600,"SupportComplexFood":0,"IsDefaultServiceTime":0,
"ChannelID":1,"LastUpdateTime":1490241470,"Longitude":"116.52751000004","Latitude":"39.92
9586075881","AMEndTime":1600,"PMEndTime":2100,"OfficeCode":"","Logo":"\/group1\/M00\/16\/
63\/CgEEN1XSloCALBO6AAAaKQoBE-Y496.jpg","ShopFrontPhoto":"\/group1\/M00\/16\/7C\/CgEEN1XS
l1qATpyvAAGI66kRb2U089.jpg","AdministrativeUnitID":1,"Delayeds":0,"DefalutDelayeds":60,"E
arlyWarin":4,"EarlyWarinStatus":0,"PausePrompt":"","BassinessNum":"","CateringServiceNum"
:"","BassinessImg":"","CateringServiceImg":"","InventRestaurant":0,"ComboSort":999,"Combo
ListSort":999,"ComboStatus":0,"SalesVolume":0,"SaleEndTime":2359,"ReservationParameter":1
,"IntervalDayNum":1,"SupportReservation":0,"Grade":null,"PaymentMode":255,"DrinkIsShow":1
,"ServiceStationDistribution":"0","MerchantBySelf":"0","MerchantArea":null,"ThirdMerchant
ID":null,"RelSalesVolume":0,"WithAudit":"0","CheckoutLater":"0","ProfitRate":"0.00","Rest
aurantGroupID":"0","ServiceTime":{"AT0":{"AtTime":0,"AMStartTime":1130,"AMEndTime":1600,"
PMStartTime":1600,"PMEndTime":2200},"AT1":{"AtTime":1,"AMStartTime":1130,"AMEndTime":1600
,"PMStartTime":1600,"PMEndTime":2200},"AT2":{"AtTime":2,"AMStartTime":1130,"AMEndTime":16
00,"PMStartTime":1600,"PMEndTime":2200},"AT3":{"AtTime":3,"AMStartTime":1130,"AMEndTime":
1600,"PMStartTime":1600,"PMEndTime":2200},"AT4":{"AtTime":4,"AMStartTime":1130,"AMEndTime
":1600,"PMStartTime":1600,"PMEndTime":2200},"AT5":{"AtTime":5,"AMStartTime":1130,"AMEndTi
me":1600,"PMStartTime":1600,"PMEndTime":2200},"AT6":{"AtTime":6,"AMStartTime":1130,"AMEnd
Time":1600,"PMStartTime":1600,"PMEndTime":2200}},"AreaInfo":{"Status":0,"Delay":5,"IsVirt
ual":0,"IsOpening":1,"Belong":"1"},"CityInfo":{"Status":0,"IsOpening":1},"ActionList":[],
"AreaShopInfo":{"AreaRestaurantID":835,"CityID":1,"AreaID":244,"RestaurantID":397,"OnSite
":1,"Label":"\u6bd4\u8428 \u897f\u9910","Position":12,"Remark":"","SupportOrdering":1,"Su
pportHotFoods":1,"AppraisalPersons":8,"OnWap":1,"Collaboration":31,"PraiseTotal":65,"Crit
icismTotal":40,"OnLicence":"1","CommentTotal":143,"ToTop":0,"BrandMatch":10,"LinkUrl":"",
"LinkEnable":null,"Stars":9,"StarsWeight":"1.00","StarScore":"4.7092","DefStars":"1","Rec
ommendFood":{"58547":"\u9165\u9999\u6d0b\u8471\u5708","58543":"\u9999\u849c\u9762\u5305",
"3442411":"\u8089\u9999\u56db\u76ca\u6bd4\u8428\uff08\u9ec4\u91d1\uff09","3442575":"\u693
0\u4e1d\u867e\u6c99\u62c9","998349":"\u539f\u5473\u70e4\u7fc5"},"ShowComment":"1","StarLe
vel":9,"COMPOSE_EarlyWarin":1,"COMPOSE_STATUS":1,"COMPOSE_ALL":1,"AtTimeX":[0,1,2,3,4,5,6
],"SortBusy":100478746227,"SortMid":33369882227,"SortFree":33369882227,"MarketScore":"0",
"Belong":"1"},"Delay":5,"ApplyAreaEnables":["244"]}}',true));
exit;

file_put_contents("/data/logs/basesoa/search.log",$this->getLastSql(),FILE_APPEND);
exit;

$arr = array_map(function($r){return $r==3 ? '' : $r;},array(1,3,4));
var_dump($arr);
exit;

echo json_encode(array('shopid'=>5,'areaids'=>1,'regions'=>array(array('lng'=>'116.462438','lat'=>'40.021971'))));

exit;

echo 1;
try{
    throw new Exception("Error Processing Request", 1);
    
}catch (Exception $e){
    echo 2;
}
echo 3;

exit;

$arr = array(1,3,4);
foreach($arr as $key=>$val){
    echo "A-{$val}<br>";
    if($val > 1){
        for($i=0;$i<5;$i++){
            echo "B-{$i}<br>";
            if($i == 0){
                break;
            }
        }
    }
    echo "<hr>";
}
exit;

$arr = explode(",",'1,');
$arr = array_filter($arr);
print_r($arr);
exit;

$f = 0.58;
echo (intval($f * 100));
exit;

$arr[] = array(
    'FoodID' => 1,
    'RestaurantID' => 100,
    'FoodSubID' => array(11,12,13,14)
);

echo json_encode($arr);
exit;

echo implode(',',(array)array('a'));

exit;
echo current("a");
exit;
echo count(array(1));
echo "<br>";
echo count('ab');
exit;
return array(1,2,3);

echo 4;
exit;


$arr = array(
    'FoodSpecsID' => 1,
    'RestaurantID' => 100,
    'FoodID' => 2,
    'PlatformID' => 333,
    'Name' => '12寸大饼',
    'Unti' => '张',
    'MinNumber' => -1,
    'IsDecimal' => 2,
     'Status' => 1,
     'Stock' => 100,
     'Price' => 5,
     'CreatUserID' => 1,
     'UpdateDate'=> date('Y-m-d H:i:s',strtotime('+1 day')),
     'CreatDate' => date('Y-m-d H:i:s')
    );
echo json_encode($arr);
exit;

$arr = array(
    'FoodID'=>1,
    'FoodAttributeID'=>3,
    'RestaurantID'=>100,
    'Status'=>1,
    'Name'=>'形状',
    'Tag'=>array('圆','方','三角'),
    'CreatUserID'=>1,
    );
echo json_encode($arr);
exit;


$str = "{RestaurantID:100,Name:'test 001',MaxNumber:'-1',Description:'默认',IsRequired:1,IsMulti:'-1',FoodType:1,RelationCategoryID:{1,2,34}}";

$set = array('RestaurantID'=>100,'Name'=>'test 001','MaxNumber'=>'-1','Description'=>'默认','IsRequired'=>1,'IsMulti'=>-1,'FoodType'=>1,'RelationCategoryID'=>array(1,2,3,45,5));
echo json_encode($set);
echo "<hr>";

print_r($set);
exit;
/**
     * 获取自增ID (重写TP中的getMongoNextID方法，建议使用这个方法)
     * @access public
     * @param string $pk 字段名 默认为主键
     * @param string $tableName 表名
     * @return mixed
     */
     function getMyMongoNextId($pk,$tableName=''){
        $command = array('findAndModify' => 'counter',
            'query'=>array('collection' =>$tableName,'field'=>$pk),
            'update'=>array('$inc'=>array('seq'=>1)),
            'new'=>'true',
            'upsert'=>'true');

        $id = $this->command($command);

        return $id['value']['seq'];
    }

exit;

function get_hash_table($userid) {
 $str = crc32($userid);
 if($str<0){
  $hash = "0".substr(abs($str), 0, 1);
 }else{
  $hash = substr($str, 0, 2);
 }
 return $hash;
}   

for($i=0;$i<10000;$i++){
    $data[get_hash_table($i)][] = $i;
}
foreach ($data as $key => $value) {
    # code...
    $data[$key]['v'] = implode(',', $value);
    $data[$key]['count'] = count($value);
}

// echo get_hash_table('message' , 'user18991');     //结果为message_10
// echo get_hash_table('message' , 'user34523');    //结果为message_13

echo count($data).":<hr>";
echo "<pre>";
print_r($data);
exit;

$data = array();
for($i=0;$i<10000;$i++){
    $m = $i % 9;
    $data[$m]['v'][] = $i;
}
foreach ($data as $key => $value) {
    # code...
    $data[$key]['v'] = implode(',', $value['v']);
    $data[$key]['count'] = count($value['v']);
}
echo count($data).":<hr>";
echo "<pre>";
print_r($data);
exit;

$category_id = 331371;
$where['FoodCatagoryID'] = (int)$category_id;
print_r($where);
exit;

echo (2 << 52);
echo "<br>";
echo ((2<<52)>>52);
exit;

$args ['DelayType'] = 'a';

isset($args ['DelayType']) && $args ['DelayType'] = ( int ) $args ['DelayType'];

print_r($args);
exit;

$j = array(
    'url'=>'http://dev.ejx.base.daojia.com.cn/index.php/Demo/index',
    'params' => array()
    );
echo json_encode($j);
exit;

$url = 'http://dev.ejx.base.daojia.com.cn/index.php/Demo/index';
$arr = parse_url($url);
echo "<pre>";
print_r($arr);
exit;

var_dump($_POST);
exit;
echo floor(10/100*50);
exit;

echo 2200/1000;
echo "<br>";
echo 5500/1000;
exit;
echo (2000/1999);
echo "<br>";
echo (2200/1999);
echo "<br>";
echo (2500/2299);
echo "<br>";
exit;
echo floor(34167/15167);
exit;
echo date('ymdHis');
exit;

echo date('YmdH',strtotime('-5 hour'));
exit;

$speDate = date('Y-m-d H',time());
//                    $stopDate = strtotime('+1 day '.date('Y-m-d'));
//                    $notice_date = strtotime('+5 hour '.$speDate) < $stopDate ? date('Y-m-d H',strtotime('+5 hour '.$speDate)).':00:00' : date('Y-m-d').' 23:59:00';
                    $notice_date = date('Y-m-d H',strtotime('+4 hour')).':00:00';
                    echo $notice_date;
exit;

if(!in_array(20, array(21, 22)))  //不是cpd打包任务和cpc广场任务
        {
            echo 1;
        }else{
            echo 2;
        }
        exit;

echo date('Y-m-d h:i:s',strtotime('-4 hour 2017-03-07 03:00:01'));
exit;

$speDate = date('Y-m-d H:i',time());
                    $notice_date = date('Y-m-d H',strtotime('+5 hour '.$speDate)).':00:00';

$stopDate = strtotime('+1 day '.date('Y-m-d'));
echo $stopDate;
echo "<br>{$notice_date}";
exit;

$speDate = date('Y-m-d H:i',time());
                    $notice_date = date('Y-m-d H',strtotime('+5 hour '.$speDate)).':00:00';
                    echo $notice_date;

exit;
echo 3 & 16;

exit;
echo "<pre>";
$token = '';
$tokenArr = @json_decode('{"client":{"token":"2.00G5vDMBL_R6MCabeb893563GGxCgE","expire":"1480100487","refresh":"2.00G5vDMBL_R6MCa3dc7599c9fF5RfD"},"weiq":{"token":"2.00G5vDMB__dAmB7656bf09eauIzNLC","expire":1480186799}}',true);
function resettingTokenExpire(){
    echo "4<br>";
}
if(is_array($tokenArr))
		    	{
                    echo "1<br>";
			    	//验证token是否有效
			    	$saeTClient = new SaeTClientV2('1625548073','','');
			    	foreach(array('wrw','weiq','client') as $key)
			    	{
                        echo "$key:<br>";
			    		if(isset($tokenArr[$key]) && isset($tokenArr[$key]['token']))
			    		{
                            echo "3<br>";
			    			$tokenInfo = $saeTClient->getTokeninfo($tokenArr[$key]['token']);
                            echo "<pre>";
                            print_r($tokenInfo);
                            if(isset($tokenInfo['error']) || $tokenInfo['expire_in']<2)  //token无效或即将过期
							{
                                resettingTokenExpire();		// 重置TOKEN过期时间
			    				continue;
                            }	
			    			$token = $tokenArr[$key]['token'];
                            echo $token;
			    			break;
			    		}
			    	}
			    	/* if(!$token && isset($tokenArr[Model_MediaUser::SYS_TYPE_WRW]['token']))  //所有token都过期则用wrw的
			    	{
			    		$token = $tokenArr[Model_MediaUser::SYS_TYPE_WRW]['token'];
			    	} */
		    	}


echo "<pre>result:<br>";
print_r($token);
exit;

echo intval('11005ee21d9efa783dd63f217b2004f1');
exit;
echo substr_count('abcd4712k;iu',"47");
exit;
include('index.php');
exit;

$push_total = 0;
$push_count = array(array('system'=>'ios','snum'=>18),array('system'=>'','snum'=>1));
            foreach($push_count as $pkey => $pvalue){
                if($pvalue['system'] == "ios"){
                    $push_total += $pvalue['snum'];
                }else{
                    $push_total += ceil(    $pvalue['snum']/1000);
                }
            }
echo $push_total;
exit;

$url = 'http://shop.m.taobao.com/shop/shop_index.htm?cpp=1&amp;user_id=1819196661&amp;sourceType=shop&amp;_navigation_params=%7B%22needdismiss%22%3A1%7D';
echo urldecode($url);
echo "<br>";
$url ='http://shop.m.taobao.com/shop/shop_index.htm?cpp=1&user_id=1819196661&sourceType=shop&_navigation_params=%7B%22needdismiss%22%3A1%7D';
echo urldecode($url);
echo "<br>";
$url = 'http://shop.m.taobao.com/shop/shop_index.htm?cpp=1&user_id=1819196661&sourceType=shop&_navigation_params=%7B%22needdismiss%22%3A1%7D';
echo urldecode($url);
echo "<br>";
exit;

$str = '这是好朋友家的蜂蜜。他父母养了一辈子蜂，因为没有好的销路，蜜从来都是卖给收购商转给工厂加工勾兑浓缩。每次听到他说，他父母把蜂蜜卖给贩子时一脸惋惜又无奈表情我都很心酸[失望]蜂蜜质量保证，不忘初心，不纯不好不收钱！有关蜂蜜知识也可以向朋友咨询@养蜂人小毅';
echo mb_strlen($str);
exit;

abstract class base {
    public static function main(){
        return new self();
    }
}
//class a extends base{
//    public static function main(){
//        return new a();
//    }
//}
//class b extends base{
//    public static function main(){
//        return new b();
//    }
//}

var_dump(a::main());
var_dump(b::main());

exit;



$str = "asdfg";
// $arr = str_split($str);
$arr = explode('',$str);
echo "<pre>";
print_r($arr);
exit;
$vips = array(0,10,20);

$v = in_array(120, $vips);
var_dump($v);
exit;
echo date('Y-m-d',time()-24*3600);
exit;

function encode_trans3($text,$table_file='gb2big5') {  
    // $fp = fopen($table_file.'.table', "r");  
    // $str = fread($fp,strlen($table_file.'.table')); 
    // fclose($fp); 
    $max=strlen($text)-1;  
    for($i=0;$i<$max;$i++) {  
        $h=ord($text[$i]); 
        if($h>=160) {  
            $l=ord($text[$i+1]);  
            if($h==161 && $l==64) {  
                $text[$i]=' '; 
                $text[++$i]=' '; 
            }else{  
                $pos = ($h-160)*510+($l-1)*2; 
                $text[$i]=$str[$pos];  
                $text[++$i]=$str[$pos+1];  
            }  
        }  
    } 
    return $text; 
} 


// $csv = iconv("utf-8","gbk","\xEF\xBB\xBF美國純棉t");
file_put_contents("bak/".time().".csv",encode_trans3('美國純棉t'));
exit;

echo '{"error_code":0,"msg":"\u5b8c\u6210\u7eed\u8d39","tid":0,"is_ample":0,"is_agent":0}';
exit;
print_r(json_decode('{"err":29001,"msg":"\u5fae\u535a\u95f4\u9694\u4e0d\u8db310\u5206\u949f"}',true));
exit;

function tt(){
    return 123;
}
if(empty(tt())){
//     echo 1;
// }else{
//     echo 2;
}
exit;

$deviceKey = md5("adshow".date('Ymd'));
$_COOKIE[$deviceKey] = 1;
$deviceIdentifying = empty($_COOKIE[$deviceKey]) ? '' : intval($_COOKIE[$deviceKey]);   // 获取种子
if(!empty($deviceIdentifying)){
    $mc = new Memcache;
    $mcKey = 'device_identifying_'.$deviceIdentifying.'_'.$deviceKey;   // 记录设备点击数
    if($mc->connect('localhost', 11211)){
        $deviceNumber = $mc->get($mcKey) === false ? 0 : $mc->get($mcKey);
        $deviceNumber ++;
        $mc->set($mcKey,$deviceNumber,0,strtotime(date('Y-m-d')." 23:59:59")-time());
    }
    // 设备点击大于100,不在记录点击信息
    if(!empty($deviceNumber) && $deviceNumber > 100){
        exit;
    }
}
echo "<hr>";
echo $mc->get($mcKey);
exit;

echo array_search(1, array(2));

exit;
class BaseClass {
    
   function BaseClass() {
       print "In BaseClass constructor\n";
   }
}
$o = new BaseClass();
exit;

$string = "April 15, 2003";
$pattern = "/(\w+) (\d+), (\d+)/i";
$replacement = "\${1}1,\$3";
print preg_replace($pattern, $replacement, $string);
exit;

$string = "beautiful";
$time = "winter";

$str = 'This is a $string $time morning!';
echo $str. "<br />";

eval("\$str = \"$str\";");
echo $str;
exit;

class BaseClass {
   function __construct() {
       print "In BaseClass constructor\n";
   }
}

class SubClass extends BaseClass {
   function __construct() {
       parent::__construct();
       print "In SubClass constructor\n";
   }
}

exit;

class A {public function __construct() {}}
class B extends A {
    function test(){
        echo 'func test.';
    }
}

$cls = 'A';
$ref = new ReflectionClass($cls);
            $inst = $ref->newInstance($req);
            $act = new ReflectionMethod($cls, $method);

exit;

$array1 = array('blue'  => 1, 'red'  => 2, 'green'  => 3, 'purple' => 4);
$array2 = array('green' => 5, 'blue' => 6, 'yellow' => 7, 'cyan'   => 8);

print_r(array_intersect_key($array1, $array2));

exit;

$string = "April 15, 2003";
$pattern = "/(\w+) (\d+), (\d+)/i";
$replacement = "\${1}1,\$3";
print preg_replace($pattern, $replacement, $string);

echo 111;
exit;

/**
* 
*/
class test
{
    private $_v = 'abc';
    function __construct($p)
    {
        if(!empty($p)){
            $this->_v = $p;
        }
    }
    function main(){
        echo $this->_v;
    }
}

$o  = new test();
echo $o->main();
exit;


$array1 = array('blue'  => 1, 'red'  => 2, 'green'  => 3, 'purple' => 4);
$array2 = array('green' => 5, 'blue' => 6, 'yellow' => 7, 'cyan'   => 8);

var_dump(array_diff_key($array1, $array2));
http://weiq.com/weiq/?c=user.platformweixin&uid=313317
exit;

$a = 5;
$c = 0;
$b = $a<6?0:$c<0?1:-1;
var_dump($b);
exit;

$s = 'SELECT %s FROM %s WHERE %s ';
echo sprintf($s,1,2,3,4);
exit;

echo strtotime('-12 hour '.date('Y-m-d H:i:s'));
echo "<br>";
echo date('Y-m-d H:i:s',1431892236);
echo "<br>";
echo time();
exit;

$str = '{"method":"POST","uri":"https://api.jpush.cn/v3/push","headers":{"User-Agent":"JPush-API-PHP-Client","Connection":"Keep-Alive","Charset":"UTF-8","Content-Type":"application/json"},"body":"{\"platform\":\"all\",\"audience\":{\"registration_id\":[\"021a6e5a294\",\"021a6e5a294\",\"021a6e5a294\",\"090ef8ccf3b\"]},\"notification\":{\"alert\":\"\\u3010\\u8d26\\u53f7\\u63d0\\u9192\\u3011\\u60a8\\u7684\\u5fae\\u535a\\u8d26\\u53f7\\u6388\\u6743\\u5373\\u5c06\\u5230\\u671f\\uff0c\\u8bf7\\u767b\\u5f55WEIQ\\u6388\\u6743\\uff01\",\"android\":{\"alert\":\"\\u3010\\u8d26\\u53f7\\u63d0\\u9192\\u3011\\u60a8\\u7684\\u5fae\\u535a\\u8d26\\u53f7\\u6388\\u6743\\u5373\\u5c06\\u5230\\u671f\\uff0c\\u8bf7\\u767b\\u5f55WEIQ\\u6388\\u6743\\uff01\",\"title\":\"\\u8d26\\u53f7\\u63d0\\u9192\",\"extras\":{\"linkpage\":12}},\"ios\":{\"alert\":\"\\u3010\\u8d26\\u53f7\\u63d0\\u9192\\u3011\\u60a8\\u7684\\u5fae\\u535a\\u8d26\\u53f7\\u6388\\u6743\\u5373\\u5c06\\u5230\\u671f\\uff0c\\u8bf7\\u767b\\u5f55WEIQ\\u6388\\u6743\\uff01\",\"sound\":\"happy\",\"badge\":1,\"content-available\":1,\"extras\":{\"linkpage\":12}}},\"options\":{\"sendno\":1000,\"apns_production\":true}}"}';
$arr = json_decode($str,true);
echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
echo "<pre>";
print_r($arr);

exit;


echo strtotime('+1 day ');
exit;

function t($d){
    $ts = strtotime($d);
    $is = explode('.', date("i.s", $ts));
    $gap = (intval($is[0])%10)*60 + intval($is[1]);
    return ($ts - $gap)/100;
}
// $s_ts = strtotime('-10 minute '.'2015-05-10 23:00:00');
// echo $s_ts;exit;

echo intval(t('2015-05-10 23:00:00'))-6;
echo "<br>";
echo t('2015-05-10 23:00:00');
echo "<br>";
echo intval(t('2015-05-10 23:00:00'))+6;
echo "<br>";

echo t('2015-05-10 22:50:00');
echo "<br>";



exit;

echo date('Y-m-d H:i:s',1431416100);
echo "<br>";
echo date('Y-m-d H:i:s',1431443400);
exit;

phpinfo();

exit;
$b = 4;
test();
function test(){
    $p = 123;
    $fun = function($a){
        global $b;
        echo $b;
        echo $a;
    };
    $fun($p);
}

exit;

$a = $b = '2';
echo $a+$b;
exit;

echo hash('md5',1234467);
exit;

list($usec, $sec) = explode(" ", microtime());
        echo  ((float)$usec + (float)$sec);
        exit;

echo 2.5+10/4;
exit;

$str = '12345678';

$newstr = substr_replace($str, '****', 2,4);

echo $newstr;exit;

try{
                throw new Exception(123);
            }catch (Exception $e){
                    print_r($e->getMessage());
            }


            exit;

$date = date('Y-m-d').' 01:00:01';

echo $date;
echo "<br>";
echo date('Y-m-d',strtotime('-1 day '.$date));
exit;

$arr = array(1,2,3,4,5,6,7,8,9);
for($i=0;$i<count($arr);$i+=2){
    echo $i;
    $newArr = array_slice($arr,$i,2);
    print_r($newArr);
    echo "<br>";
}
exit;

echo ceil(30/0.7) * 100;
exit;

echo intval('a4bc');
exit;

echo "5a"+1;
exit;


if(!'a'){
    $t = 1;
}else{
    $t = 2;
}
echo $t;
exit;

$t=0=='a'?1:2;echo $t;
exit;
echo time();exit();


echo intval(3795380);

exit;

$r = 'http://wrw.ppe.appinside.com/taskv2/';
echo substr_count($r, '?'); // 2
exit;


$_SESSION['test']['id'] = array('a','b');
unset($_SESSION['test']['id'][1]);
print_R($_SESSION);
exit;
phpinfo();
echo strtotime('2015-01-18');
echo "<br>";
echo date('Y-m-d H:i:s',strtotime('2015-01-18'));
echo "<br>";
echo strtotime('2015-01-19');
exit;

phpinfo();
if(is_int(0)){
echo 1;
}else{
    echo 2;
}
exit;

echo "<pre>";
print_r($_GET);
exit;
$r = '/((^http)|(^https)|(^ftp)):\/\/(\S)+\.(\w)+/';
if(preg_match($r,'//php.net/manual/zh/function.preg-match.php')){
    echo 111;
}else{
    echo 222;
}

exit;
echo 1111111;
exit;
$arr = array('a'=>123);
echo key($arr);
exit;

echo md5(1234567);
exit;

$json = '{"data":"insert into weiq_task_order (createtime,accepttime,plat_orderid,plat_taskid,payeeuid,status,type,content,paytype,pic,pic_id,plattype,starttime,payeeid,taskid,taskname,payerid) values (1417513693,1417513693,423953,205062,2190431727,2,1,\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5 http:\/\/t.cn\/RziyXDA,10,\'images\/dsd.gif\',\'test_12345\',0,1419523200,12979,618,\'\u5e7f\u573a\u4efb\u52a1\u518c\u518c\u518c\u518c\',73)"}';
echo "<pre>";
print_r(json_decode($json,true));
exit;


$pp=round( 100/100 * 100 , 2) . "%";
echo $pp;
exit;

$arr = array(1,10,20,50);
$count = 0;
foreach($arr as $v){
    calculate($v);
}
function calculate(&$v){
    $sum = $v;
    if($sum == 100){

    }
}



header("Content-type: text/html; charset=utf-8");
wash_card();
function wash_card(){
    $tmp = $arr = array(
        0=>'<img src="poke/54.jpg" width="63" height="80">',1=>'<img src="poke/53.jpg" width="63" height="80">',
        2=>'<img src="poke/49.jpg" width="63" height="80">',3=>'<img src="poke/50.jpg" width="63" height="80">',4=>'<img src="poke/51.jpg" width="63" height="80">',5=>'<img src="poke/52.jpg" width="63" height="80">',
        6=>'<img src="poke/45.jpg" width="63" height="80">',7=>'<img src="poke/46.jpg" width="63" height="80">',8=>'<img src="poke/47.jpg" width="63" height="80">',9=>'<img src="poke/48.jpg" width="63" height="80">',
        10=>'<img src="poke/41.jpg" width="63" height="80">',11=>'<img src="poke/42.jpg" width="63" height="80">',12=>'<img src="poke/43.jpg" width="63" height="80">',13=>'<img src="poke/44.jpg" width="63" height="80">',
        14=>'<img src="poke/37.jpg" width="63" height="80">',15=>'<img src="poke/38.jpg" width="63" height="80">',16=>'<img src="poke/39.jpg" width="63" height="80">',17=>'<img src="poke/40.jpg" width="63" height="80">',
        18=>'<img src="poke/33.jpg" width="63" height="80">',19=>'<img src="poke/34.jpg" width="63" height="80">',20=>'<img src="poke/35.jpg" width="63" height="80">',21=>'<img src="poke/36.jpg" width="63" height="80">',
        22=>'<img src="poke/29.jpg" width="63" height="80">',23=>'<img src="poke/30.jpg" width="63" height="80">',24=>'<img src="poke/31.jpg" width="63" height="80">',25=>'<img src="poke/32.jpg" width="63" height="80">',
        26=>'<img src="poke/25.jpg" width="63" height="80">',27=>'<img src="poke/26.jpg" width="63" height="80">',28=>'<img src="poke/27.jpg" width="63" height="80">',29=>'<img src="poke/28.jpg" width="63" height="80">',
        30=>'<img src="poke/21.jpg" width="63" height="80">',31=>'<img src="poke/22.jpg" width="63" height="80">',32=>'<img src="poke/23.jpg" width="63" height="80">',33=>'<img src="poke/24.jpg" width="63" height="80">',
        34=>'<img src="poke/17.jpg" width="63" height="80">',35=>'<img src="poke/18.jpg" width="63" height="80">',36=>'<img src="poke/19.jpg" width="63" height="80">',37=>'<img src="poke/20.jpg" width="63" height="80">',
        38=>'<img src="poke/13.jpg" width="63" height="80">',39=>'<img src="poke/14.jpg" width="63" height="80">',40=>'<img src="poke/15.jpg" width="63" height="80">',41=>'<img src="poke/16.jpg" width="63" height="80">',
        42=>'<img src="poke/9.jpg" width="63" height="80">',43=>'<img src="poke/10.jpg" width="63" height="80">',44=>'<img src="poke/11.jpg" width="63" height="80">',45=>'<img src="poke/12.jpg" width="63" height="80">',
        46=>'<img src="poke/5.jpg" width="63" height="80">',47=>'<img src="poke/6.jpg" width="63" height="80">',48=>'<img src="poke/7.jpg" width="63" height="80">',49=>'<img src="poke/8.jpg" width="63" height="80">',
        50=>'<img src="poke/1.jpg" width="63" height="80">',51=>'<img src="poke/2.jpg" width="63" height="80">',52=>'<img src="poke/3.jpg" width="63" height="80">',53=>'<img src="poke/4.jpg" width="63" height="80">',
    );

    foreach($arr as $k=>$v){
        $index = rand(0,54 - $k -1);
        $key = array_search($tmp[$index], $arr);
        $cards[$key] = $tmp[$index];
        unset($tmp[$index]);
        $tmp = array_values($tmp);
    }

    $card['user1']['cards'] = array_slice($cards, 3, 17, true);
    ksort($card['user1']['cards']);
    echo  '玩家A:</br>  '.implode('  ',$card['user1']['cards']).'<br >';

    $card['user2']['cards'] =array_slice($cards, 20, 17, true);
    ksort($card['user2']['cards']);
    echo  '玩家B:</br>  '.implode('  ',$card['user2']['cards']).'<br >';


    $card['user3']['cards'] = array_slice($cards, 37, 17, true);
    ksort($card['user3']['cards']);
    echo  '玩家C:</br>  '.implode('  ',$card['user3']['cards']).'<br >';

    $card['landwehr']['cards'] = array_slice($cards, 0, 3, true);
    ksort($card['landwehr']['cards']);
    echo  '底牌:</br>  '.implode('  ',$card['landwehr']['cards']).'<br >';
}


$nCount = 0;
$nComCount = 0;
for($a=0; $a<=100; $a++) {
    for($b=0; $b<=(100-$a*1)/2; $b++) {
        for($c=0; $c<=(100-$a*1-$b*2)/5; $c++) {
            for($d=0; $d<=(100-$a*1-$b*2-$c*5)/10; $d++) {
                for($e=0;$e<=(100-$a*1-$b*2-$c*5-$d*10)/20; $e++) {
                    for($f=0;$f<=(100-$a*1-$b*2-$c*5-$d*10-$e*20)/50; $f++) {
                        $nComCount++;
                        if($a*1+$b*2+$c*5+$d*10+$e*20+$f*50 == 100) {
                            $nCount++;
                            printf("%d+%d+%d+%d+%d+%d = 100\n",($a*1),($b*2),($c*5),($d*10),($e*20),($f*50));
                            echo "</br>";
                        }
                    }
                }
            }
        }
    }
}
printf("count:%d    nComCount:%d",$nCount,$nComCount);