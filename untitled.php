<?php
/**
 * 产品基础数据接口
 * @author
 */
namespace Basicdata\Controller;

use Basicdata\Base\Controller\BaseYarController as DJYarBase;
use Basicdata\Mongo\FoodMongo;

class FoodController extends DJYarBase {

    public function createFoodRelation($params){
        $foodModel = D('Basicdata/Food','Mongo');
        $data = array(
            'FoodID' => checkIntParam($params['FoodID'],0),
            'RestaurantID' => checkIntParam($params['RestaurantID'],0),
            'FoodSubID' => checkArrayParam($params['FoodSubID'],0),
            'Status' => 1,
            'CreatDate' => date('Y-m-d H:i:s'),
        );
        $result = $foodModel->tansFoodRelation($data);
        return $this->success($ret['data']);
    }

    public function tansFoodRelation($data = array()){
        $result = 0;
        if(!empty($data['FoodID']) && !empty($data['FoodSubID'])){
            // 逻辑删除当前菜品关联子菜
            $subSet = array('Status'=>3,'UpdateDate'=>date('Y-m-d H:i:s'));
            $whereSub = array('FoodID'=>$data['FoodID'],'FoodSubID'=>array('IN',implode(',', $data['FoodSubID'])));
            $subResult = $this->where($whereSub)->save();
            // 重新写入关联子菜
            $set = array();
        }
        return $result;
    }


    public function getFoodList($params){

    }

    public function addFood($params){
        $foodModel = D('Basicdata/Food','Mongo');
        $data = [
            'RestaurantID' => checkIntParam($params['RestaurantID'],0),
            'FoodType' => checkIntParam($params['RestaurantID'],FoodMongo::FOOD_TYPE_MAIN),
            'FoodCategoryID' => checkIntParam($params['FoodCategoryID'],0),
            'FoodSpecsID' => checkArrayParam($params['FoodSpecsID'],[]),
            'FoodAttributeID' => checkArrayParam($params['FoodAttributeID'],[]),
            'CityID' => checkIntParam($params['CityID'],0),
            'Pinyin' => checkStrParam($params['Pinyin'],''),
            'Name' => checkStrParam($params['Name'],''),
            'Picture' => checkStrParam($params['Picture'],''),
            'SellDate' => checkArrayParam($params['SellDate'],[]),
            'Status' => checkIntParam($params['Status'],1),
            'CreatUserID' => checkIntParam($params['CreatUserID'],0),
        ];
        $ret = $foodModel->addFood($data);
        if($ret['errNo']) return $this->error($ret['errNo']);
        return $this->success($ret['data']);
    }

    public function editFoodStock($params){
        $set = array('Stock'=>checkStrParam($params['Stock'],0));
        $where = array(
                'RestaurantID' => checkIntParam($params['RestaurantID'],0),
                'FoodID' => checkIntParam($params['FoodID'],0),
                'FoodSpecsID' => checkIntParam($params['FoodSpecsID'],0)
            );
        $foodModel = D('Basicdata/Food','Mongo');
        $result = $foodModel->updateFoodStock($set,$where);
        return $this->success($result);
    }
    public function updateFoodStock($set=array(), $where=''){
        $result = 0;
        if(!empty($set) && !empty($where)){
            $set['UpdateDate'] = date("Y-m-d H:i:s");
            $result = (array)$this->where($where)->save($set);
        }
        return $result;
    }


}