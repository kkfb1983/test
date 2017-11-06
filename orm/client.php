<?php

/**
 * 数据库配置文件
 *
 */
define('BACKEND_DBHOST', 'localhost');
define('BACKEND_DBUSER', 'root');
define('BACKEND_DBPW', '');
define('BACKEND_DBNAME', 'test');
define('BACKEND_DBCHARSET', 'utf-8');

//sql  
/* 
CREATE TABLE IF NOT EXISTS `user` ( 
  `uid` int(11) NOT NULL AUTO_INCREMENT, 
  `username` varchar(64) NOT NULL, 
  `level` int(11) NOT NULL DEFAULT '0', 
  `exp` int(11) NOT NULL DEFAULT '0', 
  `ctime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00', 
  `mtime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00', 
  PRIMARY KEY (`uid`), 
  KEY `username` (`username`) 
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ; 
*/

class client{
    static function main(){
        $userMapper = new UserMapper();
        $user = new UserTable();
        //插入  
        //$user->setUserName('guisu');  
        //$user->setLevel(1);  
        //$user->setExp(10);  
        //  
        //$userMapper = new UserMapper();  
        //$r = $userMapper->save($user);  

        //查找  
        $user->setUid(10);
        $user = $userMapper->find($user);
        var_dump($user);
        //更新  
        $user->setUserName('guisu2');
        $r = $userMapper->update($user);
        var_dump($r);
    }

}  