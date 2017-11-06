<?php
/**
 * makeDir 创建目录
 * @access public
 * @author Qbin
 * @date 2009-01-05
*/
function makeDir($folder)
{
	$reval = false;
	if (!file_exists($folder))
	{
		/* 如果目录不存在则尝试创建该目录 */
		@umask(0);
		/* 将目录路径拆分成数组 */
		preg_match_all('/([^\/]*)\/?/i', $folder, $atmp);
		/* 如果第一个字符为/则当作物理路径处理 */
		$base = ($atmp[0][0] == '/') ? '/' : '';

		/* 遍历包含路径信息的数组 */
		foreach ($atmp[1] AS $val)
		{
			if ('' != $val)
			{
				$base .= $val;
				if ('..' == $val || '.' == $val)
				{
					$base .= '/';
					continue;
				}
			}
			else
			{
				continue;
			}

			$base .= '/';
			if (!file_exists($base))
			{
				/* 尝试创建目录，如果创建失败则继续循环 */
				if (@mkdir(rtrim($base, '/'), 0777))
				{
					@chmod($base, 0777);
					$reval = true;
				}else{
					return '创建目录失败';
				}
			}
		}
	}
	else
	{
		/* 路径已经存在。返回该路径是不是一个目录 */
		$reval = is_dir($folder);
	}
	return $reval;
}


$path = 'data/'.date('Y').'/'.date('m').date('d').'/';
			 makeDir($path);
?>