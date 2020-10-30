function dragStart(event) {
    event.dataTransfer.effectAllowed='move';
    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.setDragImage(event.target,0,0);
    return true;
 }
 function dragEnter(event) {
    event.preventDefault();
    return true;
 }
 function dragOver(event) {
    return false;
 }
 function dragDrop(event,i) {
    var src = event.dataTransfer.getData("text");
    item=JSON.parse(localStorage.getItem("food"));
    addItem(item[src],i);
    showTables();
    event.stopPropagation();
    return false;
 }
 var element = document.getElementById('menu'); 

  element.addEventListener("touchstart", function(event) {
    event.dataTransfer.effectAllowed='move';
      event.dataTransfer.setData("text", event.target.id);
      event.dataTransfer.setDragImage(event.target,0,0);
      return true;
}, false);
  element.addEventListener("touchend", function(event,i) {
    var src = event.dataTransfer.getData("text");
    item=JSON.parse(localStorage.getItem("food"));
    addItem(item[src],i);
    showTables();
    event.stopPropagation();
    return false;
 }, false);
  element.addEventListener("touchcancel", function(event){
    return false;
}, false);
  element.addEventListener("touchleave", function(event,i) {
    var src = event.dataTransfer.getData("text");
    item=JSON.parse(localStorage.getItem("food"));
    addItem(item[src],i);
    showTables();
    event.stopPropagation();
    return false;
 }, false);
  element.addEventListener("touchmove", function(event){
    return ;
}, false);

 function addItem(item,i){
     if(!localStorage.getItem('table-'+i+'')){
        var oldItems=[];
        var newItem1={
            "name":item.name,
            "price":item.price,
            "count":1
        }
        oldItems.push(newItem1);
        localStorage.setItem('table-'+i+'',JSON.stringify(oldItems)); 
        var data=JSON.parse(localStorage.getItem("foodItem-"+i+""));
        data[0].count+=1;
        data[0].bill+=parseFloat(item.price);
        localStorage.setItem("foodItem-"+i+"",JSON.stringify(data));

     }
     else{
         var flag=0;
            var oldItems1=(JSON.parse(localStorage.getItem('table-'+i+'')));
            var newItem={
                "name":item.name,
                "price":item.price,
                "count":1
            }; 
          for(j=0;j<oldItems1.length;j++){
              if(item.name==oldItems1[j].name){
                  oldItems1[j].count+=1;
                  flag+=1;
                  break;
              }
            }
            var data=JSON.parse(localStorage.getItem("foodItem-"+i+""));
              if(flag==0){
                oldItems1.push(newItem);
                data[0].count+=1;
              }
            localStorage.removeItem('table-'+i+'');
            localStorage.setItem('table-'+i+'',JSON.stringify(oldItems1));
            data[0].bill+=parseFloat(item.price);
            localStorage.setItem("foodItem-"+i+"",JSON.stringify(data));
     }   
 }