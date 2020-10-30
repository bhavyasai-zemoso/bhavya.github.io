$(document).ready(function(){
    if(!localStorage.getItem('food')){
      for(i=1;i<n+1;i++){
        localStorage.setItem("foodItem-"+i+"",JSON.stringify([{count: 0, bill: 0}]));
      }
    $.getJSON('data.json', function(data) {
        localStorage.setItem('food',JSON.stringify(data));
        
    }) ; 
}
var htm="";
    JSON.parse(localStorage.getItem("food")).forEach(function(val,index){
        htm+='<div id="'+''+index+''+'" draggable="true" ondragstart="return dragStart(event)"> <p>'+''+val.name+' '+'</p><p>'+''+val.price+' '+'</p><p><img src=\"'+val.url+'\" /></p></div>';
        document.getElementById("menu").innerHTML=htm;
     });
     showTables();
});
function showTables(){
    for(i=1;i<4;i++){
        if(!localStorage.getItem('table-'+i+'')){
                var htm1="";
                   htm1+='<span>Rs.0 | Totalitems:0</span>';
                   document.getElementById('table-'+i+'').innerHTML=htm1;
                }
        else{
            var data=JSON.parse(localStorage.getItem("foodItem-"+i+""));
            var htm1="";
            /*var finalBill=data[0]+bill;
            if(finalBill<0)
            finalBill=0;*/
                   htm1+='<span>Rs.'+data[0].bill+' | Totalitems:'+data[0].count+'</span>';
                   document.getElementById("table-"+i+"").innerHTML=htm1;
        }
        }
}

 /*function getOrderDiv(){
  htm='Table-'+i+'|Order Details';
  document.getElementById("modal-title").innerHTML=htm;
  htm1='<table style="width:100%"><tr><th style="text-align: left;width:50px">S.No</th><th style="text-align: center;width:150px">Item</th><th style="text-align: left">Price</th><th style="text-align: left"></th><th style="text-align: left"></th></tr>';

 }*/
 function tabDivColor(i){
  document.getElementById('target'+i+'').style.backgroundColor="white";
}
 function order(i){
     var items=JSON.parse(localStorage.getItem("table-"+i+""));
     document.getElementById('clos').innerHTML=`<button type="button" class="close" onclick="tabDivColor(`+i+`)" data-dismiss="modal">&times;</button><h4 class="modal-title" id="modal-title"></h4>`;
     //document.getElementById('target'+i+'').style.backgroundColor="yellow";
     if(items!=null){
         var total=0;     
         //getOrderDiv();
         htm='Table-'+i+'|Order Details';
         document.getElementById("modal-title").innerHTML=htm;
         htm1='<table style="width:100%"><tr><th style="text-align: left;width:50px">S.No</th><th style="text-align: center;width:150px">Item</th><th style="text-align: left">Price</th><th style="text-align: left"></th><th style="text-align: left"></th></tr>';
       
         for(j=0;j<items.length;j++){
        htm1+='<tr><td>'+(j+1)+'</td><td>'+items[j].name+'</td><td>'+items[j].price+'</td><td><input type="number" id="'+j+'" value='+items[j].count+' onchange="return updateValue('+i+','+j+',this.value)" name="quantity"></td><td><span class="glyphicon glyphicon-trash" onclick="deleteItem('+i+','+j+')"></span></td></tr>';
        total+=items[j].price*items[j].count;
        if(total<0)
        total=0;
    }
    htm1+='<tr><td></td><td>Total:</td><td>'+total+'</td>';
}
    else{
      //getOrderDiv();  
      htm='Table-'+i+'|Order Details';
      document.getElementById("modal-title").innerHTML=htm;
      htm1='<table style="width:100%"><tr><th style="text-align: left;width:50px">S.No</th><th style="text-align: center;width:150px">Item</th><th style="text-align: left">Price</th><th style="text-align: left"></th><th style="text-align: left"></th></tr>';
    
      htm1+='<tr><td> </td></tr><tr><td> </td></tr><tr><td></td><td>Total:</td><td>0</td>';
    }
    document.getElementById("modal-body").innerHTML=htm1;
}

function actionDiv(items,data){
  localStorage.removeItem("table-"+i+"");
    localStorage.removeItem("foodItem-"+i+"");
    localStorage.setItem("table-"+i+"",JSON.stringify(items));
    localStorage.setItem("foodItem-"+i+"",JSON.stringify(data));
    order(i);
    showTables();
}
function updateValue(i,j,val){
    var items=JSON.parse(localStorage.getItem("table-"+i+""));
    var data=JSON.parse(localStorage.getItem("foodItem-"+i+""));
    data[0].bill-=items[j].price*items[j].count;
    items[j].count=parseInt(val);
    data[0].bill+=items[j].price*items[j].count;
    localStorage.removeItem("table-"+i+"");
    localStorage.removeItem("foodItem-"+i+"");
    localStorage.setItem("table-"+i+"",JSON.stringify(items));
    localStorage.setItem("foodItem-"+i+"",JSON.stringify(data));
    order(i);
    showTables();

}
function deleteItem(i,j){
    var items=JSON.parse(localStorage.getItem("table-"+i+""));
    var data=JSON.parse(localStorage.getItem("foodItem-"+i+""));
    data[0].count=data[0].count-1;
    data[0].bill=parseFloat(data[0].bill)-(parseInt(items[j].count)*parseInt(items[j].price));
    items.splice(j,1);
    localStorage.removeItem("table-"+i+"");
    localStorage.removeItem("foodItem-"+i+"");
    localStorage.setItem("table-"+i+"",JSON.stringify(items));
    localStorage.setItem("foodItem-"+i+"",JSON.stringify(data));
    order(i);
    showTables();
}

function generateBill(){
  var at=document.getElementById("modal-title").innerHTML;
  console.log(at);
  localStorage.removeItem('table-'+at[6]+'');
  localStorage.setItem(""+at[6]+"-data",JSON.stringify([{count: 0, bill: 0}]));
  order(parseInt(at[6]));
  showTables();
 // document.getElementById('target'+at[6]+'').style.backgroundColor="white";

}
function searchTables() {
    var input, filter,tableValue;
    input = document.getElementById("searchTable");
    filter = input.value.toUpperCase();
    for (i = 1; i < 4; i++) {
      var tr=document.getElementById('target'+i+'');
    var input, filter,tableValue;
      tableValue = 'table-'+i+'';
        if (tableValue.toUpperCase().indexOf(filter) > -1) {
          tr.style.display = "";
        } else {
          tr.style.display = "none";
        }          
    }
  }
  function searchItems() {
    var input, filter, itemValue;
    input = document.getElementById("searchMenu");
    filter = input.value.toUpperCase();
   var items=JSON.parse(localStorage.getItem("food"));
    for (i = 0; i < items.length; i++) {
      var tr=document.getElementById(''+i+'');
        itemValue = items[i].name;
        if (itemValue.toUpperCase().indexOf(filter) > -1) {
          tr.style.display = "";
        } else {
          tr.style.display = "none";
        }          
    }
  }
  
  var n=3;