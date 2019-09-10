<?php
session_start();
date_default_timezone_set("Asia/Shanghai");
header("Content-Type:text/html;charset=utf-8");

##################################################################################
echo "<pre>";


$time = strtotime('-4 day');
        $_date = [
            'start' => date('Y-m-d',$time).' 00:00:00',
            'end' => date('Y-m-d',$time). ' 23:59:59'
        ];
print_r($_date);

    exit;

echo date('Y-m-d H:i:s',strtotime('30 day'));
exit;
echo strtotime(date('Y-m-d ')."24:00:00");
exit;

$p = ['a'=>1,'b'=>2];
function f(&$p){
    $s = 3;
    return $s;
}
$data = f($p);
print_r($data);
exit;

phpinfo();

exit;

class c0826 {
    private $_n = 0;
    public function fun1(){
        $this->_n++;
        // return $this;
    }
    public function fun2(){
        $this->_n++;
        return $this->_n;
    }
    public function fun3(){
        return $this->fun1()->fun2();
    }
}
$o = new c0826();
echo $o->fun3();
exit;

$time = strtotime('-4 day');
        $_date = [
            'start' => date('Y-m-d',$time).' 01:00:00',
            'end' => date('Y-m-d',$time). ' 23:59:59'
        ];
        print_r($_date);
        exit;
$ncData['leader']['commission_ratio'] = 0;
echo $ncData['leader']['commission_ratio'] / 100;

exit;

echo md5(503605);
exit;

$m = '\xC8\xAB\xB2\xBF';
// echo mb_convert_encoding('\xC8\xAB\xB2\xBF', "utf-8");
// echo base_convert(bin2hex(iconv('UTF-8',"UCS-4",$m)),16,10);


$name = str_replace("\\\\u","\u",$m);
    $json = '{"str":"'.$name.'"}';
    $arr = json_decode($json,true);
    var_dump($arr['str']);


exit;

$get = $_GET;
echo "<pre>";
var_dump($get);
exit;


$str = 'ef3d16ab42580aa5778062ded8c58eacappkeyXZYX_0001callid6359f6e3f00c9e14callrecording1calltime2017-10-30 16:33:52calltype1releasecause16releasedir1releasetime2017-10-30 16:34:03requestId435409867ringingtime2017-10-30 16:33:57starttime2017-10-30 16:34:03subidA1183X755X0084011118-00-1-XZYX-GXItelA18301662441telB18511400917telX13049801029ts20171030163404284700003';
echo md5($str);
exit;




$car['carname'] = '奥迪 A6L 2015款 2.8 自动 35FSI技术型四驱';
// $car['carname'] = '奥迪';

$n = substr_count($car['carname'],' ',4);

$s = substr($car['carname'],$n);

echo $s;

exit;

$cnamearr = array_splice(explode('',$car['carname']),4);

print_r($cnamearr);
// echo $cname;
                exit;

function arrayToString($arr,&$str){
        foreach($arr as $k=>$v){
            if(is_array($v)){
                $str .= arrayToString($v,$str);
            }else{
                if(strval($v) != '' ) {
                    $str .= $k.$v;
                }
            }
        }
    }

$str = '{"callid":"6359f6c3c8212714","ringingtime":"2017-10-30 14:16:44","recordUrl":"","releasecause":"31","starttime":"2017-10-30 14:17:14","telX":"13049801029","calltime":"2017-10-30 14:16:40","telA":"18301662441","subid":"A1183X755X0084011118-00-1-XZYX-GXI","telB":"18511400917","releasetime":"2017-10-30 14:17:14","releasedir":"2","requestId":"1928129955","callrecording":"1","calltype":"128","recordMode":"1","":""}';
$arr = json_decode($str,true);

$msgdgt = '37C286FC0484957D2105F69031FA0A39';
$ts = '20171030142322146';
$appkey = 'XZYX_0001';
$compid = '700003';
$secretkey = 'ef3d16ab42580aa5778062ded8c58eac';
$h = array(
    // 'HTTP_MSGDGT' => $msgdgt,
    // 'HTTP_COMPID' => $compid,
    'appkey' => $appkey,
    'ts' => $ts,
    );

// $arr = array(
//     'telA' => 18301662441,
//     'telB' => 18511400917,
//     'telX' => 13049801029
//     );

// ksort($arr);
//         $ver_str     = urldecode(http_build_query($arr)) . '&appkey=XIN@APT_20141017';
//         $sign_create = md5($ver_str);


$param = array_merge($arr,$h);

ksort($param);
        $sign_str = '';
        arrayToString($param,$sign_str);
        $sign_create = strtoupper(md5($secretkey.$sign_str.$compid));
        
        print_r($param);
        echo "<br>";
        echo $secretkey.$sign_str.$compid."<br>";
//         // exit;
echo $sign_create."<br>";
echo $msgdgt;
exit;



print_r($arr);
exit;

$a = array('b'=>1,'a'=>2,'c'=>0,'d'=>array('e'=>3,'f'=>4,'h'=>array('i'=>5,'j'=>6)));
function s($a,&$str){
    foreach($a as $k=>$v){
        if(is_array($v)){
            $str .= s($v,$str);
        }else{
            $str .= $k.$v;
        }
    }
}

$str = '';
s($a,$str);
echo $str;
exit;

function test($param){
    foreach($param as $val){
        echo $val."<br>";
    }
}
$r = test($a=1,$b=2,$c=4);
print_r($r);
exit;

$str = '{"id":1760329,"requestId":"838141208","telA":"18301662441","telX":"13049801029","telB":"18511400917","subid":"A1183X755X0081496923-00-0-XZYX-GXI","calltype":"128","calltime":"2017-10-26 11:53:35","ringingtime":"2017-10-26 11:53:41","starttime":"2017-10-26 11:54:22","releasetime":"2017-10-26 11:54:22","callid":"6359f15c3f20f414","releasedir":"1","releasecause":"31","callrecording":"0","recordUrl":"","recordMode":"1"}';

$arr = json_decode($str,true);
print_r($arr);
exit;



$app_key = 'XIN@APT_20141017';
$data = array(
            'requestId' => "1508482920",  // 业务ID
            'telA' => '18301662441',       // 真实号码
            'telX' => '13049801029',   // 小号号码
            'telB' => '18511400917',   // 对端号码
            'subid' => "A1183X755X0081496923-00-0-XZYX-GXI",  // 绑定ID
            'calltype' => 1,   // 呼号类型
            'calltime' => '2017-10-23 11:00:00',   // 通话时间
            'callid' => 'abcd123',     // 通话标识
            'callrecording' => 0,  // 录音控制
            'ts' => 1,
            'ringingtime' => '2017-10-22 11:00:00',    // 振铃开始时间
            'starttime' => '2017-10-21 11:00:00',      // 通话开始时间
            'releasetime' => '2017-10-20 11:00:00',    // 通话结束时间
            'releasedir' => 1, // 释放方向
            'releasecause' => 16, // 释放原因
            'record_url' => "http://static.laravelacademy.org/wp-content/uploads/2016/04/qiniu-409x220.png",  // 录音地址
            // 'recordMode' => 0  // 录音模式
        );



ksort($data);
        $ver_str     = urldecode(http_build_query($data)) . '&appkey=' . $app_key;
        $sign_create = md5($ver_str);
      print_r($data);  
echo $sign_create;


exit;


$a = -1;
echo intval($a);
exit;

function qiniuFetch($url){
    $encodedURL = str_replace(array('+', '/'), array('-', '_'), base64_encode($url));
    $encodedEntryURI = str_replace(array('+', '/'), array('-', '_'), base64_encode(C('QINIU_BUCKET')));
    $url = '/fetch/' . $encodedURL . '/to/' . $encodedEntryURI;
    $sign = hash_hmac('sha1', $url . "\n", C('QINIU_SK'), true);
    $token = C('QINIU_AK') . ':' . str_replace(array('+', '/'), array('-', '_'), base64_encode($sign));
    $header = array('Host: iovip.qbox.me', 'Content-Type:application/x-www-form-urlencoded', 'Authorization: QBox ' . $token);
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, trim('http://iovip.qbox.me' . $url, '\n'));
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, "");
    $result = json_decode(curl_exec($curl), true);
    curl_close($curl);
    return $result['key'] ? C('QINIU_HOST') . $result['key'] : false;
}




exit;

echo "qiniu sign:".md5('phonerecord1508758318427f560616c6bcf4');

exit;
echo time();
exit;

$app_key = 'XIN@APT_20141017';
$data = array(
            'requestId' => "1508482920",  // 业务ID
            'telA' => '18301662441',       // 真实号码
            'telX' => '13049801029',   // 小号号码
            'telB' => '18511400917',   // 对端号码
            'subid' => "A1183X755X0081496923-00-0-XZYX-GXI",  // 绑定ID
            'calltype' => 1,   // 呼号类型
            'calltime' => '2017-10-23 11:00:00',   // 通话时间
            'callid' => 'abcd123',     // 通话标识
            'callrecording' => 0,  // 录音控制
            'ts' => 1,
            'ringingtime' => '2017-10-22 11:00:00',    // 振铃开始时间
            'starttime' => '2017-10-21 11:00:00',      // 通话开始时间
            'releasetime' => '2017-10-20 11:00:00',    // 通话结束时间
            'releasedir' => 1, // 释放方向
            'releasecause' => 16, // 释放原因
            'record_url' => "http://test/",  // 录音地址
            // 'recordMode' => 0  // 录音模式
        );



ksort($data);
        $ver_str     = urldecode(http_build_query($data)) . '&appkey=' . $app_key;
        $sign_create = md5($ver_str);
      print_r($data);  
echo $sign_create;exit;


echo time();
exit;

$arr = array('a'=>1,'b'=>2,'C'=>4,'UF'=>'PON');
echo urldecode(http_build_query($arr)).PHP_EOL;
exit;

$date = date('YmdHisu');
echo $date;
echo "<br>";
echo substr($date,0,-3);
echo "<br>";
echo microtime($date);
exit;
$micT = microtime();
// echo $micT;
echo date("Y-m-d H:i:s:u");
exit;
// print_r(get_extension_funcs('PDO')); #看一下该扩展中提供了那些函数
//print_r(get_declared_classes()); #看一下预定义类中是否有你需要（或相似）的类名

$dsn = 'mysql:dbname=weiq;host=127.0.0.1';
$user = 'root';
$password = '';

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

exit;
echo "<pre>";
for($i=0;$i<15;$i++){
    $data[$i]=$i+1;
}
$data[] = 15;
print_r($data);
echo "<br>";
foreach($data as $k=>$v){
    $newkey = $v%15;
    $newdata[$newkey][] = $v;
}
print_r($newdata);
exit;
$a = 3;
$b = &$a;
$b--;
echo $a."=".$b;
exit;


$a = array(
    6=>array(
        4=>array(2=>array(),5=>array())
    ),
    14=>array(
        10=>array(8=>array(),12=>array()),
        18=>array(16=>array(),"20,22"=>array())
    )
);
echo "<pre>";
//echo count($a);
//print_r($a);
function b_search($a,&$r=array()){
    return $r;
}
$new_arr = b_search($a);

var_export($new_arr);
exit;
$number = 2;
echo number_format($number,2);
echo "<br>";
$txt = sprintf("%.9f",$number);
echo $txt;

exit;
$s = 12.6/3;
echo $s.'%';
exit;
var_export($_SESSION);
var_export($_COOKIE);
exit;
function b64dec($b64) { //64进制转换成10进制
    $map = array(
        '0'=>0,'1'=>1,'2'=>2,'3'=>3,'4'=>4,'5'=>5,'6'=>6,'7'=>7,'8'=>8,'9'=>9,
        'A'=>10,'B'=>11,'C'=>12,'D'=>13,'E'=>14,'F'=>15,'G'=>16,'H'=>17,'I'=>18,'J'=>19,
        'K'=>20,'L'=>21,'M'=>22,'N'=>23,'O'=>24,'P'=>25,'Q'=>26,'R'=>27,'S'=>28,'T'=>29,
        'U'=>30,'V'=>31,'W'=>32,'X'=>33,'Y'=>34,'Z'=>35,'a'=>36,'b'=>37,'c'=>38,'d'=>39,
        'e'=>40,'f'=>41,'g'=>42,'h'=>43,'i'=>44,'j'=>45,'k'=>46,'l'=>47,'m'=>48,'n'=>49,
        'o'=>50,'p'=>51,'q'=>52,'r'=>53,'s'=>54,'t'=>55,'u'=>56,'v'=>57,'w'=>58,'x'=>59,
        'y'=>60,'z'=>61,'_'=>62,'='=>63
    );
    $dec = 0;
    $len = strlen($b64);
    for ($i = 0; $i < $len; $i++) {
        $b = $map[$b64{$i}];
        if ($b === NULL) {
            return FALSE;
        }
        $j = $len - $i - 1;
        $dec += ($j == 0 ? $b : (2 << (6 * $j - 1)) * $b);
    }
    return $dec;
}

echo b64dec(20);
echo "<br>";

function decb64($dec) { //10进制转换成64进制
    if ($dec < 0) {
        return FALSE;
    }
    $map = array(
        0=>'0',1=>'1',2=>'2',3=>'3',4=>'4',5=>'5',6=>'6',7=>'7',8=>'8',9=>'9',
        10=>'A',11=>'B',12=>'C',13=>'D',14=>'E',15=>'F',16=>'G',17=>'H',18=>'I',19=>'J',
        20=>'K',21=>'L',22=>'M',23=>'N',24=>'O',25=>'P',26=>'Q',27=>'R',28=>'S',29=>'T',
        30=>'U',31=>'V',32=>'W',33=>'X',34=>'Y',35=>'Z',36=>'a',37=>'b',38=>'c',39=>'d',
        40=>'e',41=>'f',42=>'g',43=>'h',44=>'i',45=>'j',46=>'k',47=>'l',48=>'m',49=>'n',
        50=>'o',51=>'p',52=>'q',53=>'r',54=>'s',55=>'t',56=>'u',57=>'v',58=>'w',59=>'x',
        60=>'y',61=>'z',62=>'_',63=>'=',
    );
    $b64 = '';
    do {
        echo $dec."<br>";
        $b64 = $map[($dec % 64)] . $b64;
        $dec /= 64;
    } while ($dec >= 1);
    return $b64;
}

echo decb64(128);

exit;


$a = "abc";
for($i=0;$i<strlen($a);$i){
    echo $a[$i];

}
exit;

$n = 15552000;
$r = $n / 24 / 60 /60;
echo $r;

exit;

$a = 1;
var_dump(!empty($a));
exit;

class a{
    static $aa = 1;
    public static function aa(){
        self::$aa += 1;
        echo self::$aa;
    }
}
class b{
    public function bb(){
        a::aa();
    }
}
class c{
    public function cc(){
        a::aa();
    }
}
$bbb = new b();
$ccc = new c();
$bbb->bb();
echo '*******************';
$ccc->cc();

exit;

echo implode(",",(array)"abc");
exit;

$c = array(1,0,false,-1);
print_r(array_values($c));
exit;

$a = array("a"=>array(1,2,3),"b"=>array("4,5,6"));
$b = array("a"=>array(11,22,33),"b"=>array("a","b","c"));
$arr = array_merge($a,$b);
$array = array_merge_recursive($a,$b);
echo "<pre>";
print_r($arr);
print_r($array);
exit;

$info = array(
    "MerchantArea"=>
        array(
        "coordinates" => array(
                array(
                        array(121.52681484702, 
                    31.329225645774),
                        array(121.532140241, 
                    31.333244787004),
                    )
            )
            )
    );





// 地域坐标未封闭
            if(!empty($info['MerchantArea']['coordinates'][0])){
                $firstPoint = md5(implode(",",$info['MerchantArea']['coordinates'][0][0]));
                $tailPoint = md5(implode(",",$info['MerchantArea']['coordinates'][0][count($info['MerchantArea']['coordinates'][0])-1]));
                if($firstPoint != $tailPoint){
                    $info['MerchantArea']['coordinates'][0][] = $info['MerchantArea']['coordinates'][0][0];
                }
            }
print_r($info);
            exit;

$arr = array("测试");
echo json_encode($arr);
exit;

$arr = array(1,2,3,4,5,6);
print_r(array_splice($arr, 0,3));
print_r(array_splice($arr, 2,3));

$a = array(1,2);
$b = array(3,4);
foreach($a as $v){
    foreach($b as $val){
        echo $v."-".$val.PHP_EOL;
    }
}
exit;

$arr = [[[121.50208951148,31.09138017079],[121.50219111761,31.091381313056],[121.50355533152,31.091753074687],[121.50359292819,31.091771346106],[121.50400102436,31.091889677103],[121.5047741169,31.09207177682],[121.50652911175,31.092488273017],[121.50800979915,31.092879842976],[121.50986533543,31.0934723318],[121.51145203475,31.093979577306],[121.51386841658,31.094779718355],[121.51454978362,31.090603244251],[121.5159978773,31.082784790628],[121.51646642212,31.080362618152],[121.51939527278,31.081129564771],[121.52101473315,31.081605805165],[121.52215078846,31.081915724527],[121.52304007589,31.082158739441],[121.52330186685,31.08223369943],[121.52389705979,31.082405666615],[121.52809512535,31.083611794511],[121.52903895443,31.083884507845],[121.52914848798,31.083916457912],[121.52928054624,31.083582345713],[121.53011473941,31.081329290176],[121.53024984028,31.080954701267],[121.5304826199,31.08030934457],[121.53071327402,31.079521425244],[121.53077276759,31.079285520564],[121.53125588924,31.077373417121],[121.53154150981,31.076243736858],[121.53154264067,31.076239526925],[121.52836370561,31.076247729086],[121.52669727281,31.076210084],[121.52367328267,31.076171324516],[121.5208723743,31.076122833186],[121.51838028282,31.076120285659],[121.51769546105,31.076039354467],[121.51705342328,31.076041962092],[121.51532987377,31.075713538727],[121.51389496414,31.075582838921],[121.51398970997,31.07366246501],[121.51399920122,31.072136702144],[121.51400725843,31.070877066563],[121.51179109598,31.070275490665],[121.50829595818,31.069371861496],[121.5082433869,31.069484582074],[121.50802569754,31.072465846907],[121.50792788719,31.073148948727],[121.50784723159,31.073660059473],[121.50773353906,31.074226702252],[121.50768844655,31.07445670084],[121.50765189767,31.07462225697],[121.50764781111,31.074636695751],[121.50762288791,31.074718637388],[121.50758848032,31.074815843477],[121.50755555102,31.07488832685],[121.50749478052,31.075021358958],[121.50740992294,31.075163816858],[121.50735561478,31.075256564124],[121.50730962037,31.075367394393],[121.50726197067,31.075529057091],[121.50703396453,31.076161301781],[121.50392377596,31.07535899409],[121.50368887876,31.076004510261],[121.50335334963,31.076928247398],[121.50334027466,31.076967468728],[121.50271455936,31.078842911904],[121.50257232441,31.079269123456],[121.50235632278,31.079916007454],[121.50182898251,31.081505696973],[121.50158990436,31.082225925053],[121.50135031878,31.082948712982],[121.50121784386,31.083348670241],[121.50099151896,31.084030351499],[121.50087341087,31.084386382559],[121.50063648714,31.085100989799],[121.50061851327,31.085153328877],[121.50035633818,31.085870088375],[121.50013909434,31.086463815564],[121.49996898661,31.086928916733],[121.4999165486,31.087076516667],[121.49976454503,31.087525137946],[121.49876614045,31.090451352495],[121.49993940372,31.090695375774],[121.50208951148,31.09138017079]]];




echo "<pre>";
print_r($arr);

exit;


file_put_contents("/data/logs/basesoa/search.log",PHP_EOL.date('Y-m-d H:i:s')."categorysql->#".$this->getLastSql().PHP_EOL,FILE_APPEND);
exit;

$text = '';

$arr = array("MerchantArea" => array(
        "coordinates" => array( 
                array(
                    116.62517541, 
                    39.92390123
                ),
                array(
                    116.62517541, 
                    39.92390123
                )
                )
                )
                );

foreach($arr['MerchantArea']['coordinates'] as $key=>$val){
    $text .= "(".implode(",", $val).")";
}

echo "<pre>";
print_r($text);
exit;

$arr = array(2,3,4,5);
array_unshift($arr, 1);
print_R($arr);

exit;

$file = file_get_contents('20170524_Monitor.log');
// file_put_contents('test_'.date('YmdHis').'.log', gzcompress($file));
// $gzunfile = json_decode(gzuncompress(file_get_contents('test_20170524150928.log')),true);
if(gzuncompress(file_get_contents('test_201705241509283.log'))){
    echo 1;
}else{
    echo 2;
}
echo "<pre>";
// print_r($gzunfile);
exit;

$a=0;
$b=0;
if($a=3 && $b=3){
    $a++;
    $b++;
}

echo $a.' # '.$b;
exit;

$str = '1 and 1=b and c=1 and test=123';
// echo str_replace("1 and","","1 and 1=b and c=1 and test=123",1); 
$newstr = substr($str,5,strlen($str)); 
echo $newstr;
exit;

if(!is_numeric(0)){
    echo 1;
}else{
    echo 2;
}
exit;

echo date('G');
exit;

$taskInfo['balance'] = 1500;
$taskInfo['balance'] -= 50;
            $taskInfo['cost_'] = 250;
print_r($taskInfo);
            exit;

echo 4169-2504;
exit;
// echo 552+
exit;
echo 4169-1666;
exit;
echo 2504*60/4169;

exit;
echo 4169-1666;
exit;

echo ceil((41940-33120)/60);
exit;
echo -100/2;
exit;

echo 2&~1;
exit;

foreach(self::$wbClass as $k=>$v)
            if( $num>0 && $num&$k ){
                $num &= ~$k;
                $ret[$k] = $v;
            }
        return $ret;

$values = array(0, 1, 2, 4, 8);
$test = 1 + 4;

echo "\n Bitwise AND \n";
foreach ($values as $value) {
    $result = $value & $test;
    echo $result;
    // printf($format, $result, $value, '&', $test);
}

exit;

for($i=0;$i<10;$i++){
    echo $i;
    if($i == 5){
        echo " continue<br>";
        continue;
    }
    if($i == 7){
        echo " break<br>";
        break;
    }
    echo "-><br>";
}

exit;

$data = system('tail -n 1 test.php');

var_dump($data);
exit;

$date = date('Y-m-d H:i:s',1479118331);
echo $date."<br>";
$date = '2016-11-15 19:00:00';
echo strtotime('-27 hour '.$date)."-><br>";
echo date('Y-m-d H:i:s',strtotime('-27 hour '.$date));
echo "<br>";
echo strtotime('-24 hour '.$date)."-><br>";
echo date('Y-m-d H:i:s',strtotime('-24 hour '.$date));
# nohup php /svr/www.weiq.com/manageglht/cron_test/weiq_cpc_specially_trace_order.php >> /var/tmp/weiq_cpc_orderincome/weiq_cpc_specially_trace_order.log 2>&1 &
exit;

echo intval(2257121);
echo "<br>";
echo intval('2257121');
exit;

/**
1 7-1+2=6 
*/
// $w = empty(date('w')) ? 7 : date('w');
// $r = 7-$w+2;
// echo 
for($i=0;$i<7;$i++){
    $r = $i<2 ? $i+7-2:$i-2;
    echo "week={$i}->day={$r}->date=".date('Y-m-d',strtotime("-{$r} day"))."<br>";
}
exit;
//$url = 'http://weibo.com/5786712330/DCFwkhUtv';
$url = 'http://m.weibo.cn/1877916515/3992177698271407/weixin';
//$regx = '/http:\/\/(e.|www.)?weibo.com\/([0-9]+)\/([0-9A-Za-z]+)/is'; //,$str,$m);
$regx = '/http:\/\/(m.|e.|www.)?weibo(.com|.cn)\/([0-9]+)\/([0-9A-Za-z]+)/is'; //,$str,$m);

preg_match_all($regx, $url, $arr);
echo "<pre>";
print_r($arr);
exit;

// preg_match_all("|<[^>]+>(.*)</[^>]+>|U",
//     "<b>example: </b><div align=left>this is a test</div>",
//     $out, PREG_PATTERN_ORDER);
// echo $out[0][0] . ", " . $out[0][1] . "\n";
// echo $out[1][0] . ", " . $out[1][1] . "\n";
// exit;

$url = 'http://m.weibo.cn/1877916515/3992177698271407/weixin';
echo "{$url}<hr>";
// $url = 'http://weibo.com/5786712330/DCFwkhUtv';
// $regx = '/http:\/\/(e.|www.)?weibo.com\/(*.+)/is';
$regx = '/((^http)|(^https):\/\/(\S)+\.(\w)+/';
preg_match_all($regx, $url, $arr, PREG_PATTERN_ORDER);
var_dump($_arr);
exit;
$a = 'a';
$b = 'b';
unset($a,$b);
// echo $a;
echo $b;
exit;


print_r(json_decode('{"errNo":"0","content": [{"type":"baiduvip","webid":"311644","msgId":"sns_311644","name":"百度VIP","title":"","wholeTitle":"","url": "","titleUrl": "http%3A//vip.baidu.com/%3Fvip_frm%3Dsuper_msg","curEpisode": "","curEpisodeUrl": "","trendUrl": "","review": [],"snsDetail": [{"snsName": "个新的返利订单","snsNum": "1","snsUrl": "http%3A//vip.baidu.com/pcui/show/ucenterindex%3Fvip_frm%3Dsuper_msg"},{"snsName": "元返利到帐","snsNum": "30","snsUrl": "http%3A//vip.baidu.com/pcui/show/ucenterindex%3Fvip_frm%3Dsuper_msg"}],"orangeNumber": "","blueNumber": "","sourceName": "百度VIP","sourceUrl": "http%3A//vip.baidu.com/%3Fvip_frm%3Dsuper_msg","time": "刚刚","createTime": "","isSns":"1","isMis":"","jumpUrl":""}]}'));
exit;
echo "<pre>";
print_r(json_decode('{"content":"\u6d4b\u8bd5 "}'));
exit;
echo mb_strlen('一二三四aa','utf8');
exit;

function f0427($a=9){
    echo $a;

}
f0427(0);
exit;

//$str = 'a一';
$str = '一二三四aa';

function cutstr($string, $length) {
    preg_match_all("/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|\xe0[\xa0-\xbf][\x80-\xbf]|[\xe1-\xef][\x80-\xbf][\x80-\xbf]|\xf0[\x90-\xbf][\x80-\xbf][\x80-\xbf]|[\xf1-\xf7][\x80-\xbf][\x80-\xbf][\x80-\xbf]/", $string, $info);
    for($i=0; $i<count($info[0]); $i++) {
        $wordscut .= $info[0][$i];
        $j = ord($info[0][$i]) > 127 ? $j + 2 : $j + 1;
        if ($j > $length - 3) {
            return $wordscut." ...";
        }
    }
    return join('', $info[0]);
}

echo cutstr($str,8);
exit;

/**
 * 字符串截取
 * @param string $string 
 * @param number $length 
 */
function cutOutString($string='', $start=0, $length=10, $encoding = "UTF-8"){
    $result = $string;
    if(!empty($string)){
        mb_internal_encoding($encoding);
        $len = mb_strlen($string);
        if($len > $length){
            $result = mb_substr($string, $start, $length).'...';
        }
    }
    return $result;
}

function msubstr($str, $start, $len) {
    $tmpstr = "";
    $strlen = $start + $len;
    for($i = 0; $i < $strlen; $i++) {
        if(ord(substr($str, $i, 1)) > 0xa0) {
            $tmpstr .= substr($str, $i, 2);
            $i++;
        } else
            $tmpstr .= substr($str, $i, 1);
    }
    return $tmpstr;
}
function utf_substr($str,$len)
{
    for($i=0;$i<$len;$i++)
    {
        $temp_str=substr($str,0,1);
        if(ord($temp_str) > 127)
            {
            $i++;
            if($i<$len)
            {
            $new_str[]=substr($str,0,3);
            $str=substr($str,3);
            }
    }
    else
    {
        $new_str[]=substr($str,0,1);
        $str=substr($str,1);
}
}
return $new_str;
}
echo cutOutString($str,0,8,'gb2312');
exit;
function e2c_strlen($str)
{
    $length = 0;
    if(!empty($str))
    {
        $step = strtoupper(mb_detect_encoding($str)) == 'UTF-8' ? 3 : 2;
        for($i=0;$i<strlen($str);)
        {
            if(ord($str{$i})>127)
            {
                $length++;
                $i += $step;
            }
            else
            {
                $length += 0.5;
                $i++;
            }
            echo $str{$i}."<br>";
        }
    }
    return floor($length);
}
echo e2c_strlen($str);
exit;

echo mb_strlen($str,'utf8') ." -> ".strlen($str);
exit;

echo "<pre>";
print_r($_SERVER);
exit;

function getMIdFromWeiboUrl($Url) {
        $regx = '/http:\/\/(e.|www.)?weibo.com\/([0-9]+)\/([0-9A-Za-z]+)/is'; //,$str,$m);
        preg_match_all($regx, $Url, $arr);
        if ($arr[3]) {
            if ($arr[3][0]) {
                return $arr[3][0];
            } else {
                return -2;
            }
        } else {
            return -1;
        }
    }

        echo getMIdFromWeiboUrl('http://weibo.com/2141334915/DrxhIjVwo');

    exit;

echo count(array(0,1));
exit;
echo mb_strlen('abc一二三123',gb2312);
exit();
echo is_numeric('12');
exit;
echo count('abc一二三123');
exit;

echo date('Y-m-d H:i:s',strtotime('2016-03-31'));
exit;

$str = 'ab在中人123@#￥%k 驾照艺术硕士脊顶起；暗示法束带结发苦';

echo count(explode(',','2013,2014,2059,2180,2179,2178,2088,2181,2060,2064,2061,2062,2063,2164,2165,2182,2184,2183,2185,2186,2188,2187,2065,2192,2068,2069,2194,2189,2190,2191,2193,2080,2084,2083,2082,2081,2085,2090,2086,2094,2093,2092,2091,2087,2089,2095,2103,2101,2100,2099,2098,2097,2096,2195,2232,2233,2231,2196,2199,2208,2211,2217,2216,2215,2214,2209,2210,2213,2212,2156,2155,2154,2229,2230,2204,2203,2202,2206,2207,2200,2198,2197,2201,2205,2261,2264,2263,2262,2265,2267,2266,159,616,615,614,613,612,611,617,618,619,620,621,622,610,92,94,95,96,98,85,84,83,77,78,79,80,81,82,100,101,128,129,130,131,118,117,116,103,104,107,108,109,110,111,113,114,115,19,20,21,22,23,24,25,26,27,28,29,30,31,32,18,17,16,3,4,5,6,7,8,9,10,11,12,13,14,15,33,34,52,53,54,55,56,57,58,59,60,61,62,63,64,65,51,50,35,36,37,38,39,40,46,47,66,134,544,562,563,564,565,566,567,568,569,570,571,572,573,561,560,559,545,546,547,548,549,557,558,576,598,599,602,603,604,607,608,594,593,592,582,583,584,609,135,153,154,155,156,158,502,152,151,150,136,137,138,140,141,142,143,144,145,146,147,148,149,509,510,528,529,532,533,534,535,536,537,538,540,527,526,511,516,517,518,519,520,521,522,523,524'));
echo "<br>";
echo strlen('2013,2014,2059,2180,2179,2178,2088,2181,2060,2064,2061,2062,2063,2164,2165,2182,2184,2183,2185,2186,2188,2187,2065,2192,2068,2069,2194,2189,2190,2191,2193,2080,2084,2083,2082,2081,2085,2090,2086,2094,2093,2092,2091,2087,2089,2095,2103,2101,2100,2099,2098,2097,2096,2195,2232,2233,2231,2196,2199,2208,2211,2217,2216,2215,2214,2209,2210,2213,2212,2156,2155,2154,2229,2230,2204,2203,2202,2206,2207,2200,2198,2197,2201,2205,2261,2264,2263,2262,2265,2267,2266,159,616,615,614,613,612,611,617,618,619,620,621,622,610,92,94,95,96,98,85,84,83,77,78,79,80,81,82,100,101,128,129,130,131,118,117,116,103,104,107,108,109,110,111,113,114,115,19,20,21,22,23,24,25,26,27,28,29,30,31,32,18,17,16,3,4,5,6,7,8,9,10,11,12,13,14,15,33,34,52,53,54,55,56,57,58,59,60,61,62,63,64,65,51,50,35,36,37,38,39,40,46,47,66,134,544,562,563,564,565,566,567,568,569,570,571,572,573,561,560,559,545,546,547,548,549,557,558,576,598,599,602,603,604,607,608,594,593,592,582,583,584,609,135,153,154,155,156,158,502,152,151,150,136,137,138,140,141,142,143,144,145,146,147,148,149,509,510,528,529,532,533,534,535,536,537,538,540,527,526,511,516,517,518,519,520,521,522,523,524');
exit;
if(mb_strlen($str) > 15){
                    echo mb_substr($str,0,15,'utf-8');
                }

exit;

class a0218 extends b0218{
    private $_p1="123";
    
    public function test($p1=0,$p2="",$p3){
        $this->_p1 = 'test';
        echo $this->_p1;
        return parent::test2();
    }
}
class b0218{
    public function test2(){
        return 123;
    }
}
$o = new a0218();
$o->test();
exit;

$t = 'test';

// echo {$t}dd;
exit;


$str = '3541933403710257,3533331876501524,3533331561577431,3532536179653793,3531522927734002,3531521568374071,3531521073664234,3531520532547034,3531410113275153,3531409509236933,3531408884581097,3531053794330677,3531053572299999,3531053219917423,3531052993689773,3531052637138687,3531052091538304,3531051621730080,3530712340315079,3528989421383378';
echo count(explode(',',$str));
exit;



echo mb_strlen('2013,2014,2059,2178,2180,2179,2061,2062,2063,2064,2060,2088,2181,2164,2165,2182,2184,2183,2185,2186,2188,2187,2065,2192,2189,2190,2069,2068,2191,2193,2194,2080,2085,2084,2083,2082,2081,2090,2092,2089,2091,2094,2093,2086,2087,2095,2103,2101,2099,2098,2096,2097,2100,2195,2199,2231,2196,2232,2233,2205,2207,2203,2206,2202,2201,2200,2197,2198,2204,2208,2217,2216,2214,2213,2210,2215,2212,2211,2209,2155,2154,2156,2229,2230,604,607,608,609,603,602,599,598,610,611,63,622,621,620,619,618,617,616,615,614,613,612,594,64,81,82,83,84,85,92,80,79,78,65,66,77,94,95,113,114,115,116,117,118,111,110,109,96,98,100,101,103,104,107,108,18,19,20,21,22,23,24,25,26,27,28,29,30,17,16,15,3,4,5,6,7,8,9,10,11,12,13,14,31,32,50,51,52,53,54,55,56,57,58,59,60,61,47,46,33,34,35,36,37,38,39,40,62,532,549,557,558,559,560,561,548,547,546,533,534,535,536,537,538,540,544,545,562,563,582,583,584,592,564,565,566,567,568,569,570,571,572,573,576,593,144,145,146,147,148,149,150,151,152,153,154,155,156,143,142,141,128,129,130,13');

exit;

$str = '[{"type":0,"starttime":1441900800,"endtime":1451491200,"income":200,"title":"\u6ce8\u518c\u6709\u793c","comment":"\u4f7f\u7528WEIQ\u5ba2\u6237\u7aef\u6210\u529f\u6ce8\u518c","pic":"http:\/\/www.weiq.com\/wap\/images\/reg-banner.jpg","linkpage":11,"weburl":"","wapurl":"http:\/\/www.weiq.com\/wap\/index.php?c=Activity.ActivityDetial&type=0","notice":"\u60a8\u5df2\u83b7\u5f97\u65b0\u7528\u6237\u6ce8\u518c\uffe52\u5143\u5956\u52b1\uff0c\u67e5\u770b\u8be6\u60c5\uff01","status":0,"temp":"activity\/reg.html"},{"type":1,"starttime":1440518400,"endtime":0,"income":500,"title":"\u9996\u5355\u6709\u793c","comment":"1.\u4f7f\u7528WEIQ\u5ba2\u6237\u7aef\uff0c\u7b2c\u4e00\u6b21\u5728\u4efb\u52a1\u5e7f\u573a\u4e2d\u63a5\u5355\uff0c\u5e76\u4e14\u6210\u529f\u53d1\u5e03\u30022.\u63a5\u5355\u65f6\u5fc5\u987b\u9009\u62e9\u7acb\u5373\u53d1\u9001\u624d\u89c6\u4e3a\u6210\u529f\u63a5\u5355","pic":"http:\/\/www.weiq.com\/wap\/images\/olduser-banner.jpg","linkpage":13,"weburl":"","wapurl":"http:\/\/www.weiq.com\/wap\/index.php?c=Activity.ActivityDetial&type=1","notice":"\u60a8\u5df2\u83b7\u5f97\u9996\u6b21\u63a5\u5355\uffe55\u5143\u5956\u52b1\uff0c\u67e5\u770b\u8be6\u60c5\uff01","status":1,"temp":"activity\/first.html"},{"type":2,"starttime":1452589125,"endtime":0,"income":0,"title":"\u52a0\u94b1\u5de5\u5177","comment":"\u52a0\u94b1\u5de5\u5177","pic":"","linkpage":0,"weburl":"","wapurl":"","notice":"\u52a0\u94b1\u5de5\u5177","status":0,"temp":""}]';
echo "<pre>";
print_r(json_decode($str,true));
exit;
$result['expire_in'] = null;

if(array() <= 0){
echo 1;
}else{
    echo 3;
}
exit;
$str = 'http://img.weiq.com/taskpic/201512/14513744091259688743.jpg';

$taskPicArr = explode(',',$str);
                foreach($taskPicArr as $key=>$val){
                    $orderPic[$key]['bmiddle']     = $val;
                    $thumbnail = preg_replace('/(\/taskpic\/(\d)+)/','$1/thumbnail',$val);
                    $orderPic[$key]['thumbnail']   = $thumbnail;
                }
print_r($orderPic);
exit;
$arr = explode('', '我是一个学生');
foreach($arr as $v){
    echo $v."<br>";
}

exit;
echo date('Y-m-d',strtotime('+280 day '.date('2015-11-20')));
exit;

$key = md5("adshow".date('Ymd'));
if(empty($key)){
    setcookie($key, time(), strtotime(date('Y-m-d')." 23:59:59"));
}
exit;
echo sha1(123456);
exit;

echo "<pre>";
print_R($_SERVER);
exit;

function getRealIp(){
   $ip = '';
   $unknown = 'unknown';
   if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])
       && $_SERVER['HTTP_X_FORWARDED_FOR']
       && strcasecmp($_SERVER['HTTP_X_FORWARDED_FOR'],$unknown))
   {
       $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
   }
   elseif(isset($_SERVER['REMOTE_ADDR'])
          && $_SERVER['REMOTE_ADDR'] 
          && strcasecmp($_SERVER['REMOTE_ADDR'],$unknown))
   {
       $ip = $_SERVER['REMOTE_ADDR'];
   }
   return $ip;
}

echo getRealIp();
exit;
 
 echo file_get_contents('http://www.weiq.com/weiq/upload/weiq/upload/person/weixin/1428469347188542461.png');
exit;

$str = "upload/weiq/upload/person/weixin/1428464666535279769.jpg";

$str2 = "/weiq/upload/201506/1435647461567148061.png";

$r = preg_replace('/^(\/weiq\/)*.+/', '$1', $str2);
if(empty($r)){
    echo "is null";
}else{
    echo "is weiq";
}
exit;

$str = "http://www.weiq.com//weiq/upload/201506/1435647461567148061.png";

$strArr = explode("/", $str);
print_r($strArr);

$url  = implode("/", array_unique($strArr));
echo $url;
exit;
$str = "/weiq/upload/201506/1435647461567148061.png";
$str2 = "weiq/upload/201506/1435647461567148061.png";

echo preg_replace('/(\/)(*.+)/', '${1}', $str);
echo "<br>";
// echo preg_replace('/^\/(*.)+/', '${1}', $str2);
exit;

echo file_get_contents('http://www.weiq.com//weiq/upload/201506/1435647461567148061.png');

exit;
$str = "a,3dfasdf";
if(substr_count($str, "3d")){
echo 1;
}else{
    echo 2;
}

exit;

$str = 'taskpic/86/1449575189.jpg,taskpic/12/adsfas;dfj.jpg';
$orderPic = array();
                $taskPicArr = explode(',',$str);
                foreach($taskPicArr as $key=>$val){
                   $orderPic[$key]['bmiddle']     = $val;
                    $orderPic[$key]['thumbnail']   = preg_replace('/(taskpic\/(\d)+)/','${1}/thumbnail',$val);
                }
echo "<pre>";
print_r($orderPic);
exit;
echo realpath('../../');
echo "<br>";
echo dirname(__FILE__);
exit;

$str = '{s:2:"id";s:4:"5558";s:8:"taskname";s:28:"Blue Nile HK 黑五特卖！";s:7:"paytype";s:2:"10";s:9:"starttime";s:10:"1448467200";s:7:"endtime";s:1:"0";s:10:"createtime";s:10:"1448508587";s:9:"audittime";s:10:"1448508786";s:10:"canceltime";s:1:"0";s:7:"deltime";s:1:"0";s:8:"timespan";s:1:"0";s:6:"status";s:1:"2";s:11:"plat_taskid";s:1:"0";s:7:"payerid";s:5:"30852";s:4:"type";s:1:"1";s:8:"plattype";s:1:"0";s:3:"url";s:0:"";s:3:"pic";s:66:"http://ww4.sinaimg.cn/bmiddle/a66d0169jw1eye688d76tj207j07haar.jpg";s:6:"pic_id";s:32:"a66d0169jw1eye688d76tj207j07haar";s:7:"content";N;s:8:"descript";s:56:"钻石恒久远！精选独家钻石饰品 5折特卖！";s:4:"isec";s:1:"0";s:9:"forwardid";s:1:"0";s:9:"managerid";s:1:"0";s:6:"reason";s:48:"请帮助企业提出修改建议，简明扼要";s:7:"wxtitle";s:0:"";s:6:"wxtype";s:1:"0";s:5:"agent";s:5:"11105";s:6:"source";s:1:"0";s:7:"linkurl";s:0:"";s:15:"resource_status";s:1:"0";s:8:"plantime";s:1:"0";s:8:"category";s:1:"0";s:9:"feestatus";s:1:"0";s:7:"tradeno";s:0:"";s:8:"ismanual";s:1:"0";s:6:"taskid";s:4:"5558";s:3:"fee";s:6:"250000";s:7:"balance";i:212600;s:5:"click";s:4:"5000";s:10:"clickprice";s:2:"50";s:6:"ishide";s:1:"0";s:11:"url_isvalid";s:1:"0";s:5:"iptsf";s:1:"0";s:15:"cost_2015-11-26";i:37400;}';
echo "<pre>";
print_r(json_decode($str,true));
exit;

$tag = '"111"';
$new = htmlspecialchars("<a href='test'>{$tag}Test</a>", ENT_QUOTES);
echo $new; // &lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;
exit;

$str = '1042015:tagCategory_020|';
$r = '(\d.+)\:(.+)\_(\d.+)\|*.+';


exit;

echo date('Y-m-d H:i:s',strtotime('-1 day '.date('Y-m-d')));
echo "<br>";
echo date('Y-m-d H:i:s',strtotime('+1 day '.date('Y-m-d')));

exit;
echo time();
echo "<br>";

echo date('G',strtotime('2015-11-24 24:00:00'));

exit;
$a = '♬音乐阿健♬';

echo nl2br($a);
echo "<br>";
echo iconv('utf-8','gbk',$a);
exit;


$accesstoken = '{"client":{"token":"2.00vI41oBL_R6MCb570e16b20CiohoB","expire":"0"},"wrw":{"token":"2.00vI41oB0RhPYC2f4d868e05qO8ENE","refresh_token":"2.00vI41oB0RhPYCa5a17ee3e4JXtSDD","expire":"1450206001"},"weiq":{"token":"2.00vI41oB__dAmB70a219060eYDuZWE","refresh":"","expire":1449774070}}';
$accesstokenArr = json_decode($accesstoken,true);
foreach($accesstokenArr as $key=>$val){
            if(!empty($val['token']) && !empty($val['expire']) &&$val['expire'] > time()){
                $tk = $val['token'];
                break;
            }
        }
echo $tk;


exit;
$str = 'liuchunmei@inmyshow.com,ejianxin@inmyshow.com';
$mailArr = explode(',',$str);
                            foreach($mailArr as $val){
                                echo $val."<br>";
                            }
exit;

$status = 5;
$taskStatus = 7;
$tCanceltime = 1447140325;
$twid = '';

$result = 0;
        if(!empty($status)){
            switch ($status){
                case 2: // 待发布
                    $result = 1; break;
                case 3: // 有效订单
                    $toTime = strtotime('-7 day');
                    if($toTime > $sTime){  // 大于七天算完成订单
                        $result = 3;    // 操过七天的订单计为已结束
                    }else{
                        $result = 2;
                    }
                    break;
                case 4: // 已结束
                    $result = 3; break;
                case 5: // 已结束
                    $result = 3;    // 发布后取消
                    if(empty($twid)) {
                        $result = 5;    // 发布前取消
                    }elseif($taskStatus == 7 && !empty($tCanceltime)){
                        $cancelHour = date('H',$tCanceltime);
                        if($cancelHour < 12 && date('Ymd',$tCanceltime) == date('Ymd')){  // 当天十二点取消的任务当天算有效订单
                            $result = 2;
                        }elseif($cancelHour > 12 && (date('Ymd',$tCanceltime) == date('Ymd') || date('Ymd',strtotime('1 day '.$tCanceltime)) == date('Ymd'))){  // 当天十二点后取消的任务，当天和每二天都算有效点击
                            $result = 2;
                        }
                    }
                    break;
                case 6: // 已结束
                    $result = 3; break;
                case 10: // 发布失败
                    $result = 4; break;
            }
        }
echo $result;

        exit;

$n = 0;
if(isset($n)){
echo 1;
}else{
    echo 2;
}
exit;

$str = '{"method":"POST","uri":"https://api.jpush.cn/v3/push","headers":{"User-Agent":"JPush-API-PHP-Client","Connection":"Keep-Alive","Charset":"UTF-8","Content-Type":"application/json"},"body":"{\"platform\":\"all\",\"audience\":{\"registration_id\":[\"090ef8ccf3b\"]},\"notification\":{\"alert\":\"\\u9a6c\\u4e0a\\u6ce8\\u518cWEIQ\\u7ed1\\u5b9a\\u81ea\\u5a92\\u4f53\\u5e76\\u6210\\u529f\\u63a5\\u5355\\uff0c\\u5373\\u53ef\\u83b7\\u5f977\\u5143\\u73b0\\u91d1\\u5956\\u52b1\\uff01\",\"android\":{\"alert\":\"\\u9a6c\\u4e0a\\u6ce8\\u518cWEIQ\\u7ed1\\u5b9a\\u81ea\\u5a92\\u4f53\\u5e76\\u6210\\u529f\\u63a5\\u5355\\uff0c\\u5373\\u53ef\\u83b7\\u5f977\\u5143\\u73b0\\u91d1\\u5956\\u52b1\\uff01\",\"title\":\"\\u8d26\\u53f7\\u63d0\\u9192\",\"extras\":{\"linkpage\":12}},\"ios\":{\"alert\":\"\\u9a6c\\u4e0a\\u6ce8\\u518cWEIQ\\u7ed1\\u5b9a\\u81ea\\u5a92\\u4f53\\u5e76\\u6210\\u529f\\u63a5\\u5355\\uff0c\\u5373\\u53ef\\u83b7\\u5f977\\u5143\\u73b0\\u91d1\\u5956\\u52b1\\uff01\",\"sound\":\"happy\",\"badge\":1,\"content-available\":1,\"extras\":{\"linkpage\":12}}},\"options\":{\"sendno\":1000,\"apns_production\":true}}"}';


$arr = json_decode($str,true);
print_r($arr);
exit;


echo strtotime(date('Y-m-d').' 23:59:59').PHP_EOL;
echo time().PHP_EOL;

$mcExpire = strtotime(date('Y-m-d').' 23:59:59')-time();
echo $mcExpire;
exit;

$str = '什么？你还没有减肥成功吗？还在因为肥胖有苦恼[抓狂]吗？别着急，琳琳减肥达人来帮你制定属于你的减肥之法[心]让你一次性减肥成功 http://t.cn/RyS73Vd';
$pattern = '/^.+(http:\/\/t.cn\/.+)/';
preg_match($pattern, $str, $arr);

print_R($arr);
exit;

if(10 / 100 <= 0.1 || 600 <= 600){
    echo 1111;
}
exit;

function payPush($successTradeNo,$failTradeNo){
        $sendMessage = function($tradeNo=array(), $textKey=1, $pageSize=1000){ // 获取设备号
            $mcObj = new Memcache;
            $mcObj->connect('127.0.0.1', 11211);
            $mcKey = 'payee_device_'.date('Ymd');
            $mcExpire = strtotime(date('Y-m-d'.' 23:59:59')) - time();
            $deviceArr = $mcObj->get($mcKey);
            if(!empty($deviceArr)){
                $tradeNo = array_diff($tradeNo, $deviceArr);  // 过滤重复设备
                $mergeDeviceArr = array_merge($tradeNo, $deviceArr);    // 合并数组
            }else{
                $mergeDeviceArr = $tradeNo;
            }
            echo "<pre>";
            print_r($mergeDeviceArr);
        };
        if(!empty($successTradeNo)){
            $sendMessage($successTradeNo,1); // 支付成功
        }
        if(!empty($failTradeNo)){
            $sendMessage($failTradeNo,2);   // 支付失败
        }
    }
    payPush(array(1,23),array());


exit;


echo strtotime(date('Y-m-d'.' 23:59:59')) - time();

exit;

echo "<pre>";
$j = json_decode('{"data":[{"sendtype":"3","content":"您已获得新用户注册￥2元奖励，查看详情！","wapurl":"","id":"101","createtime":"1441870944","weburl":"","isread":"1","linkpage":"11","type":"1"}],"status":"success"}');
$j->data[0]->is_href='123';
print_r($j);
exit;

$jsonArr = explode(',', '000eba398c7,021c6b2a490,011376d5e0b,061aa580640,04113308980,00045e79b43,0400c6995b2,0206eb99ac5,080ba860248,050b73614db,080414408a2,00039c393ef,080cbcb078e,04129f3967e,000b35d8d57,080cbcb078e,070eec5ff4d,0a1cd6c98d0,000b1c49744,011a37b6cfc,00184c2904e,02185e79606,03174a35453,050b73614db,031f44f4ef3,090b1dce344,0914dfae591,001c10b95fa,090e243e41c,00087048f93,021c6b2a490,080414408a2,030076753ba,070070fc366,0400c6995b2,031f44f4ef3,03174a35453,00087048f93,0911701fa4f,080414408a2,001c10b95fa,050b73614db,021c6b2a490,080305b0491,080ba860248,041aeec8dc9,0907ddaefd6,090b52de32b,00087048f93,080c34b0503,050b73614db,001c10b95fa,090b1dce344,04040b68dc7,020755680c8,0914dfae591,090b52de32b,0400c6995b2,080414408a2,0911701fa4f,03174a35453,020b7b6819e,060594c3eb6,0201ed99912,090b52de32b,00130f598bd,080414408a2,0400c6995b2,050b73614db,001f58a8d78,021c6b2a490,0602aae38fb,031b2bb5777,0101edb59bb,090d7dfe28b,001c10b95fa,0911701fa4f,071be31ceda,00184c2904e,031f44f4ef3,031f44f4ef3,04129f3967e,021e5619ce2,0911701fa4f,0400c6995b2,0706e50e5fe,021c6b2a490,080414408a2,071a732faa1,090b52de32b,070070fc366,090b1dce344,050b73614db,00087048f93,031fbed50ac,0206eb99ac5,000eba398c7,00087048f93,060594c3eb6,080414408a2,090b1dce344,050b73614db,001c10b95fa,021c6b2a490,090b52de32b');
echo "<h1>".count($jsonArr)."</h1><br>";
$jsonArr = array_flip($jsonArr);
echo "<h1>".count($jsonArr)."</h1><br>";
$jsonArr = array_flip($jsonArr);
echo "<h1>".count($jsonArr)."</h1><br>";
exit;

$json = '{"err":3,"msg":"\u63a5\u53e3\u8fd4\u56de\u7a7a"}';

echo "<pre>";
print_r(json_decode($json));
exit;

echo date('Y-m-d H:i:s',strtotime('-1 day 2015-08-18 24:00:00'));
exit;
echo time();
exit;

echo date('Y-m-d H:i:s',1439520741);
exit;

$n = floor((time() - strtotime('2015-08-09 11:08:00')) / 86400);
echo $n;
exit;

$str = 'begin to handle order#5145830#1439192460...
order#5145830 real click api response#1439192460:{"clicks_total":0,"clicks_unique_uid":0,"clicks_unique_ip":0,"clicks_billing":0,"clicks_20150810":0}
jump no click order#5145830#1439192460#0
jump caogen order#5145871';
$orderId = 51458712;
if (preg_match("/jump caogen order#{$orderId}/",$str)) {
    echo 1;
}else{
    echo 2;
}

exit;
define('NOW', time());
define('T_DATE', date('Y-m-d'));
define('T_DATE_', date('Ymd'));
define('Y_DATE', date('Y-m-d',NOW-24*3600));
define('Y_DATE_', date('Ymd',NOW-24*3600));
echo Y_DATE_;
exit;


echo strtotime('-2 hour ');
echo "<br>";
echo date('Y-m-d H:i:s',strtotime('-2 hour'));
exit;

$jsonArr = explode(',', '000eba398c7,021c6b2a490,011376d5e0b,061aa580640,04113308980,00045e79b43,0400c6995b2,0206eb99ac5,080ba860248,050b73614db,080414408a2,00039c393ef,080cbcb078e,04129f3967e,000b35d8d57,080cbcb078e,070eec5ff4d,0a1cd6c98d0,000b1c49744,011a37b6cfc,00184c2904e,02185e79606,03174a35453,050b73614db,031f44f4ef3,090b1dce344,0914dfae591,001c10b95fa,090e243e41c,00087048f93,021c6b2a490,080414408a2,030076753ba,070070fc366,0400c6995b2,031f44f4ef3,03174a35453,00087048f93,0911701fa4f,080414408a2,001c10b95fa,050b73614db,021c6b2a490,080305b0491,080ba860248,041aeec8dc9,0907ddaefd6,090b52de32b,00087048f93,080c34b0503,050b73614db,001c10b95fa,090b1dce344,04040b68dc7,020755680c8,0914dfae591,090b52de32b,0400c6995b2,080414408a2,0911701fa4f,03174a35453,020b7b6819e,060594c3eb6,0201ed99912,090b52de32b,00130f598bd,080414408a2,0400c6995b2,050b73614db,001f58a8d78,021c6b2a490,0602aae38fb,031b2bb5777,0101edb59bb,090d7dfe28b,001c10b95fa,0911701fa4f,071be31ceda,00184c2904e,031f44f4ef3,031f44f4ef3,04129f3967e,021e5619ce2,0911701fa4f,0400c6995b2,0706e50e5fe,021c6b2a490,080414408a2,071a732faa1,090b52de32b,070070fc366,090b1dce344,050b73614db,00087048f93,031fbed50ac,0206eb99ac5,000eba398c7,00087048f93,060594c3eb6,080414408a2,090b1dce344,050b73614db,001c10b95fa,021c6b2a490,090b52de32b');
echo "<h1>".count($jsonArr)."</h1><br>";
$jsonArr = array_flip($jsonArr);
$jsonArr = array_flip($jsonArr);
echo implode(',', $jsonArr);
echo "<pre>";
print_r($jsonArr);
exit;

if(file_exists('test.php')){
echo 1;
}else{
    echo 2;
}
exit;


for($i=0;$i<5;$i++){
    echo $i."<br>";
    if($i){
if($i==2){
        break;
    }
    }
}

exit;
echo strtotime('yesterday');
echo "<br>";
echo date('Y-m-d H:i:s',strtotime('yesterday'));
exit;



echo count(explode(',','30,5,32,53,60,38,39,63,56,57,64,48,50,3,26,45,44,33,35,54,61,42,41,47,59,52,51,58,40,46,28,1,34,36,2'));
exit;

echo "1) ".basename("/etc/sudoers.d", ".d").PHP_EOL;
echo "2) ".basename("/etc/sudoers.d").PHP_EOL;
echo "3) ".basename("/etc/passwd").PHP_EOL;
echo "4) ".basename("/etc/").PHP_EOL;
echo "5) ".basename(".").PHP_EOL;
echo "6) ".basename("/");

$str = 'a,b;c';

// $arr = explode('(,)|(;)',$str); 
$arr = preg_split ("/,|;/", $str);


print_r($arr);
exit;

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    echo 'a';
} else {
    echo 'b';
}
exit;

$n = '12.5a';
if(is_numeric($n)){
    echo 1;
}else{
    echo 2;
}
exit;

$str = '{"psot":{"mobile":"18970920325","type":"register"},"verify":"()|()","err_font":"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801"}';
echo "<pre>";
print_r(json_decode($str,true));
exit;

$str = 'a';
print_r(explode(',', $str));
exit;

$st = strtotime(date('Y-m-d').' 23:59:59');
echo date('Y-m-d H:i:s',$st)."<br>";
echo $st;
exit;

$n = 2;
$k=4;
echo bindec(10);
echo "<br>";
echo decbin(2);
echo "<br>";
echo decbin(4);
echo "<br>";
echo $n &= ~$k;
echo "<br>";
echo $k &= ~$k;

if( $n>0 && $n&$k ){
                $n &= ~$k;
            }
echo $n;
exit;

echo time();
echo "<br>";
echo strtotime('-12 hour');
echo "<br>";
echo date('Y-m-d H:i:s',1435431598.538);

exit;

for($i=0;$i<10001;$i++){
    echo rand(5,9);
    echo rand(10000,90000);
    echo "<br>";
}
exit;


$ts = time();
$is = explode('.', date("i.s", $ts));
$gap = (intval($is[0])%10)*60 + intval($is[1]);
$r = ($ts - $gap)/100;
echo date('Y-m-d H:i:s',$r);
exit;

/**
 * Created by PhpStorm.
 * User: root
 * Date: 2015/2/10
 * Time: 17:42
 */
function getRequestValue($request) {
    if (empty ( $request )) {
        $result = false;
    } else {
        if (is_array ( $request )) {
            $newArr = array ();
            foreach ( $request as $key => $val ) {
                if (is_array ( $val )) {
                    foreach ( $request as $k => $v ) {
                        if (! get_magic_quotes_gpc ())                      // 判断magic_quotes_gpc是否打开
                        {
                            $newArr [$key] [$k] = addslashes ( trim($v) ); // 进行过滤
                        }
                    }
                } else {
                    if (! get_magic_quotes_gpc ())                  // 判断magic_quotes_gpc是否打开
                    {
                        $newArr [$key] = addslashes ( trim($val) ); // 进行过滤
                    }
                }
            }
            $request = empty ( $newArr ) ? $request : $newArr;
        } else {
            if (! get_magic_quotes_gpc ()) {         // 判断magic_quotes_gpc是否打开
                $request = addslashes ( trim($request) ); // 进行过滤
            }
        }
    }
    return $request;
}

echo intval($_GET['p']);
exit;


$a = array('a'=>array('b',1));
$b = json_encode($a);
echo $b;
print_R(json_decode($b,true));



echo "<pre>";
print_R($_GET);






