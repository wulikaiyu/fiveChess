/**
 * Created by Administrator on 2016/5/7.
 */
var myWin = [];
var comWin = [];//这里定义的是落子的个数
var count =0;
for (var i = 0; i < count; i++) {
    myWin[i] = 0;//人赢的第i种方法，对应的落子的个数。
    comWin[i] = 0;//电脑赢的第i种方法，对应的落子的个数。
}
//电脑的策略算法函数
//这里是对每个落子点进行记分，人分越高越需要堵，电脑的分越高，越需要五子连珠。
var comAI = function(){
    var myScore = [];//人的子的总分，联系下文，你能了解它是二维数组。
    var max = 0;//初始化分的最大值
    var u = 0, v = 0;//初始化得分最大时，对应的落子坐标。
    var computerScore = [];//电脑的总分

    //下面这个for循环，主要是初始化每个落子点的初始分值
    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        for(var j = 0; j < 15; j++){
            if (chessBoard[i][j] == 0) {//判断该落子点是否为空，即，没有被占用
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {//点击的坐标，对应的可以五子连珠的所有可能
                        if (myWin[k] == 1) {//落子数为1，对应的分值
                            myScore[i][j] += 200;
                        }
                        else if (myWin[k] == 2) {//落子数为2，对应的分值
                            myScore[i][j] += 400;
                        }
                        else if (myWin[k] == 3) {//落子数为3，对应的分值
                            myScore[i][j] += 1000;
                        }
                        else if (myWin[k] == 4) {//落子数为4，对应的分值
                            myScore[i][j] += 10000;
                        }
                        if (comWin[k] == 1) {//下面这些是对应的计算机的得分
                            computerScore[i][j] += 220;
                        }
                        else if (comWin[k] == 2) {
                            computerScore[i][j] += 420;
                        }
                        else if (comWin[k] == 3) {
                            computerScore[i][j] += 2200;
                        }
                        else if (comWin[k] == 4) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }
            }
            //注意，这里的max是myScore和computerScore共有的最大的值
            if (myScore[i][j] > max) {//表示只要myScore大于最大值
                max = myScore[i][j];
                u = i;
                v = j;
            }
            else if(myScore[i][j] == max){
                if (computerScore[i][j] > computerScore[u][v]) {
                    u = i;
                    v = j;
                }
            }
            if (computerScore[i][j] > max) {
                max = computerScore[i][j];
                u = i;
                v = j;
            }
            else if(computerScore[i][j] == max){
                if (myScore[i][j] > myScore[u][v]) {
                    u = i;
                    v = j;
                }
            }
        }
    }
    oneStep(u,v,false);
    chessBoard[u][v] = 2;//这个数字只要不是0就行，主要为了占位
    for(var k=0;k<count;k++){
        if (wins[u][v][k]) {
            comWin[k]++;
            myWin[k] = 6;//随意的大于5 的数就行
            if (comWin[k] == 5) {
                window.alert("计算机赢了！");
                over = true;
            }
        }
    }
    if (!over) {
        me = !me;//将下棋权限交给人
    }
}