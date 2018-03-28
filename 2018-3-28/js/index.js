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
    //定义所有船，每个船是一个对象
    ships: [{locations:["01","02","03"],hits:["","",""]},{locations:["01","02","03"],hits:["","",""]}],
    //判断击中船没有
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
    //
    hitHander: function(){ 
        var fireBtn = document.getElementById("fireBtn");
        fireBtn.addEventListener("click",function(){ 
            var location = document.getElementById("guessMsg").value; 
        },false)
    }
}
function init(){
    controller.hitHander();
}
window.onload =init;
 