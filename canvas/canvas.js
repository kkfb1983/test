/**
 * canvas object
 */
var canvas = function(id){
    this.canvas = document.getElementById(id);
    this.cxt = this.canvas.getContext('2d');
}
/**
 * 画线
 * @param moveX 起点横坐标
 * @param moveY 起点纵坐标
 * @param lineX 结束点横坐标
 * @param lineY 结束点纵坐标
 * @param width 宽度
 * @param color 颜色
 */
canvas.prototype.line = function(moveX, moveY, lineX, lineY, width, color){
    this.cxt.beginPath();
    this.cxt.lineWidth = width;
    this.cxt.strokeStyle = color;
    this.cxt.moveTo(moveX,moveY);
    this.cxt.lineTo(lineX,lineY);
    this.cxt.stroke();
    this.cxt.closePath();
}
/**
 * 创建弧/曲线
 * @param x 横坐标
 * @param y 纵坐标
 * @param radius 半径
 * @param startAngle    起始角度，以弧度计。（弧的圆形的三点钟位置是 0 度）。
 * @param endAngle      结束角度，以弧度计。
 * @param width 宽度
 * @param color 颜色
 * @param counterclockwise  可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
 */
canvas.prototype.curve = function(x, y, radius, startAngle, endAngle, width, color, counterclockwise){
    this.cxt.beginPath();
    this.cxt.lineWidth = width;
    this.cxt.strokeStyle = color;
    this.cxt.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    this.cxt.stroke();
    this.cxt.closePath();
}
/**
 * 实芯圆
 * @param x 横坐标
 * @param y 纵坐标
 * @param radius 半径
 * @param startAngle    起始角度，以弧度计。（弧的圆形的三点钟位置是 0 度）。
 * @param endAngle      结束角度，以弧度计。
 * @param width 宽度
 * @param strokeColor 边框颜色
 * @param fillColor   填弃颜色
 */
canvas.prototype.circle = function(x, y, radius, startAngle, endAngle, width, strokeColor, fillColor){
    this.cxt.beginPath();
    this.cxt.lineWidth = width;
    this.cxt.strokeStyle = strokeColor;
    this.cxt.fillStyle = fillColor;
    this.cxt.arc(x, y, radius, startAngle, endAngle);
    this.cxt.fill();
    this.cxt.stroke();
    this.cxt.closePath();
}
/**
 * 矩型
 * @param x 横坐标
 * @param y 纵坐标
 * @param width 宽
 * @param height 高
 */
canvas.prototype.rectangle = function(x,y,width,height,strokeColor,fillColor){
    this.cxt.beginPath();
    this.cxt.rect(x,y,width,height);
    if(strokeColor){
        this.cxt.strokeStyle = strokeColor;
    }
    if(fillColor){
        this.cxt.fillStyle = fillColor;
    }
    this.cxt.stroke();
    if(fillColor){
        this.cxt.fill();
    }
    this.cxt.closePath();
}




window.onload = function (){
    var o = new canvas('canvas');
    // 线实例
    o.line(100,5,100,145,2,'#00ff00');
    o.line(30,75,170,75,2,'#00ff00');
    // 典线实例
    o.curve(100,75,50,0,1.5*Math.PI,5,'yellow',false);
    o.curve(100,75,30,0,1.5*Math.PI,2,'green',true);
    o.curve(100,75,5,0,2*Math.PI,2,'red',true);
    // 实心圆
    o.circle(230,75,50,0,2*Math.PI,2,'#000',"red");
    // 矩型
    o.rectangle(75,160,50,50);
    o.rectangle(145,160,80,50,'#fff',"rgb(255,0,0)");
}