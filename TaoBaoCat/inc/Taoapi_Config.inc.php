<?php
/*
����: �޸ĸ��ļ����뱣��Ϊ��ROMͷ���ļ�,Ҳ����ȥ���ļ�ͷǩ��
���ʹ�ü��±��ĵĻ����ܻ���ֻ�ȡ�������������
*/

//���û�ȡ���ݵı���. ֧��UTF-8 GBK GB2312 
//��Ҫ iconv��mb_convert_encoding ����֧��
//UTF-8 ����д��UTF8
$apiConfig['Charset'] = 'UTF-8';

//�������ݻ���
//true ���Ի��� false ��ʽ����
$apiConfig['TestMode'] = false;

//����appKey��appSecret ֧�ֶ��appKey
$apiConfig['AppKey'] = array(
);

//��appKey��ֻһ��ʱ,API�������޺��Զ�������һ��APPKEY
//false:�ر� true:����
$apiConfig['AppKeyAuto'] = true;

//����API�汾,1 ��ʾ1.0 2��ʾ2.0
$apiConfig['Version'] = 2;

//����sign���ܷ�ʽ,֧�� md5 �� hmac 
//�汾2.0ʱ�ſ���ʹ�� hmac
$apiConfig['SignMode'] = 'md5';

//��ʾ��رմ�����ʾ,
//true:�ر� false:����
$apiConfig['CloseError'] = true;

//������ر�API������־����,��������Բ鿴��ÿ��APPKEY���õĴ����Լ����õ�API
//false:�ر� true:����
$apiConfig['ApiLog'] = false;

//������رմ�����־����
//false:�ر� true:����
$apiConfig['Errorlog'] = false;

//����API��ȡʧ��ʱ���ԵĴ���,�������API���ȶ���,Ĭ��Ϊ3��
$apiConfig['RestNumberic'] = 0;

//�������ݻ����ʱ��,��λ:Сʱ;0��ʾ������
$apiConfig['Cache'] = 0;

//���û��汣���Ŀ¼
$apiConfig['CachePath'] = dirname(dirname(__FILE__)).'/Apicache';

//�Զ�������ڻ����ʱ������
//��ʽ�ǣ�* * * *
//���е�һ������ʾ���ӣ��ڶ�������ʾСʱ������������ʾ���ڣ����ĸ�����ʾ�·�
//���֮������ð�Ƕ��Ÿ���
//ʾ����
//Ҫ��ÿ�����ϵ�8��1��������棬��ʽ�ǣ�1 8 * *
//Ҫ��ÿ���µ�1������12��5��������棬��ʽ�ǣ�5 12 1 *
//Ҫ��ÿ��5���������10��3��������棬��ʽ�ǣ�3 10 1,5,10,15,20,25 *
//�����Ϊ0���ʽ���Խ��������˹���
$apiConfig['ClearCache'] = "1,2,3,4,5 * * *"; //Ĭ��ΪÿСʱ�ĵ�1-5�����Զ��������

//ÿ�ε���API���Զ����ԭ�д������
//false:�ر� true:����
$apiConfig['AutoRestParam'] = true;

return $apiConfig;