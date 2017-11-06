/**
 * canvas object
 */
var canvas = function(id){
    this.canvas = document.getElementById(id);
    this.cxt = this.canvas.getContext('2d');
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