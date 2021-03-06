var view = {                 
    //显示消息
    showMsg:function(msg){
        var msgBox = document.getElementById("message");
        msgBox.innerHTML = msg;
    },
    //显示Miss
    displayMiss: function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class","hit");
    },
    //显示ship
    displayShip: function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class","ship");
    } 
}
var model = {
    //定义每艘船的长度
    shipLength: 3,
    //击沉的船的数量
    sunkShip: 0,
    //定义船的数量
    shipNum:3,
    //定义所有船，每个船是一个对象
    ships: [{locations:["01","02","03"],hits:["","",""]},{locations:["01","02","03"],hits:["","",""]}],
    //击船
    fireBoat: function(location){ 
        for(var i=0;i<this.ships.length;i++){
            var ship = this.ships[i]; 
            var index = ship.locations.indexOf(location);
            if(index >=0){
                //击中 
                view.displayShip(location);
                ship.hits[index]="hit";  
                view.showMsg("Hit!");
                //再判断被击中的船有没有被击沉
                if(this.isSunk(ship)){
                    //被击沉 
                    this.sunkShip++; 
                    view.showMsg("You sunk my battleShip!");
                } 
                return true;
            } 
           
        }
        //未击中
        view.displayMiss(location);
        view.showMsg("Miss!");
        return false;
    },
    //判断船沉没没有
    isSunk: function(ship){
        for(var i=0;i<this.shipLength;i++){
            if(ship.hits[i].indexOf("hit")==-1){
                //如果返回-1，就是没有“hit”,即没有被击沉, ship.hits[i]!=="hit";
                return false;
            }
        }
        return true;
    }
}
var controller = {
    //定义猜测次数
    guesses:0,
    //定义面板的长度和宽度
    boardSize:7,
    //解析传入的A0,B0
    parseGuess: function(location){
        var alphabet = ["A","B","C","D","E","F"];
        if(location === "" || location.length >2){
            alert("Please input a letter and a number on the board.")
        }else{
            var firstChar = location.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var column = location.charAt(1);
            if(isNaN(row) || isNaN(column)){
                alert("Ops, that's isn't on the board!")
            }else if(row<0 || row > this.boardSize || column <0 || column >this.boardSize){
                alert("Ops, that's off the board!")
            }else{
                return row + column;
            }
        }
        return null; //null就是假值
    },
    //判断猜测次数并且判断游戏是否结束
    processGuess:function(guess){
        var location = this.parseGuess(guess); 
        if(location){
            //只要location不为null,就是位置是有效的,猜测就是成功的，所以增加猜测次数
            this.guesses ++;
            //判断是否击沉了所有的船，是否游戏结束
            var hit  =  model.fireBoat(location);
            //只要击中，hit就是ture
            if(hit && model.sunkShip === model.shipNum){
                view.showMsg("You sunk all my battleships, in" + this.guesses + "guesses");
            }
        }
    }
} 
function hitHander(){ 
    var guessInput = document.getElementById("guessMsg"); 
    var location = guessInput.value;
    controller.processGuess(location); 
    guessInput.value = "";
}
function handleKeyPress(e){
    var fireBtn = document.getElementById("fireBtn");
    if(e.keyCode ===13){
        fireBtn.click(); 
        return false; //不做提交
    }
}
function init(){ 
    var fireBtn = document.getElementById("fireBtn");
    fireBtn.onclick= hitHander;

    var guessInput = document.getElementById("guessMsg");
    guessInput.onkeypress = handleKeyPress;
     
}
window.onload = init;
 