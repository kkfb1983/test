<?php
session_start();
class Authnum
{
	private $im;//图片
	private $im_width;//图片高度
	private $im_height;//图片宽度
	private $len;//验证码长度

	private $randnum;//随机字符串
	private $y;//y轴
	private $randcolor;//随机颜色

	public $ext_num_type = '';//验证码类型
	public $ext_pixel = false;//干扰点
	public $ext_line = false;//干扰线
	public $ext_rand_y = true;//y轴随机

	function __construct($len = 4 , $img_width = '' , $img_height = 25)
	{
		$this->len = $len;
		$img_width = $len * 15;
		$this->img_height = $img_height;
		$this->im = imagecreate($img_width , $img_height);
	}

	//set bg color
	function set_bgcolor()
	{
		imagecolorallocate($this->im , rand(0,255) , rand(0,255) , rand(0,255));
	}

	//get the rand element
	function get_randnum()
	{
		$an1 = 'abcdefghijklmnopqrstuvwxyz';
		$an2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$an3 = '0123456789';

		if($ext_num_type == '')
			$str = $an1.$an2.$an3;
		if($ext_num_type == '1')
			$str = $an1;
		if($ext_num_type == '2')
			$str = $an2;
		if($ext_num_type == '3')
			$str = $an3;

		for($i = 0; $i < $this->len; $i++)
		{
			$start = rand(1 , strlen($str) - 1);
			$randnum .= substr($str , $start , 1);
		}

		$this->randnum = $randnum;
		$_SESSION['an'] = $this->randnum;
	}

	//set y
	function get_y()
	{
		if($this->ext_rand_y)
			$this->y = rand(5 , $this->im_height / 5);
		else
			$this->y = $this->im_height / 4;
	}

	//get the rand color
	function get_randcolor()
	{
		$this->randcolor = imagecolorallocate($this->im , rand(0,255) , rand(0,255) , rand(0,255));
	}

	//add pixels
	function set_ext_pixel()
	{
		if($this->ext_pixel)
		{
			for($i = 0; $i < 100; $i++)
			{
				$this->get_randcolor();
				imagesetpixel($this->im , rand()%100 , rand()%100 , $this->randcolor);
			}
		}
	}

	//add lines
	function set_ext_line()
	{
		if($this->ext_line)
		{
			for($j = 0; $j < 5; $j++)
			{
				$rand_x = rand(2 , $this->im_width);
				$rand_y = rand(2 , $this->im_height);
				$rand_x2 = rand(2 , $this->im_width);
				$rand_y2 = rand(2 , $this->im_height);
				$this->get_randcolor();
				imageline($this->im , $rand_x , $rand_y , $rand_x2 , $rand_y2 , $this->randcolor);
			}
		}
	}

	//create code
	function create()
	{
		$this->set_bgcolor();
		$this->get_randnum();
		for($i = 0; $i < $this->len; $i++)
		{
			$font = rand(4 , 6);
			$x = $i * 15 + rand(1,$this->len);
			$this->get_y();
			$this->get_randcolor();
			imagestring($this->im , $font , $x , $this->y , substr($this->randnum , $i , 1) , $this->randcolor);
		}

		$this->set_ext_pixel();
		$this->set_ext_line();
		header("content-type:image/png");
		imagepng($this->im);
		imagedestroy($this->im);
	}
}
?>