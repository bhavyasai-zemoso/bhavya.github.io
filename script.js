function openPage(pageName,element){
    var i,tabcontent,tablinks;
    tabcontent=document.getElementsByClassName("tabcontent");
    for(i=0;i<tabcontent.length;i++){
        tabcontent[i].style.display="none";
    }
    tablinks=document.getElementsByClassName("tablink");
    for(i=0;i<tablinks.length;i++){
        tablinks[i].style.backgroundColor="lightgreen";
        tablinks[i].style.color="black";
        tablinks[i].style.borderStyle="solid";
        tablinks[i].style.borderColor="black";
        tablinks[i].style.outline="none";


    }
    document.getElementById(pageName).style.display="block";
    element.style.backgroundColor= "white";
    element.style.color="black";
    element.style.outline="none";
}


function alertFunction() {
    var name=document.getElementById('fname').value;
  alert("Dear "+name+" your details are saved");
  form.reset();
}

function validateForm()                                    
{ 
    var name = document.forms["contactForm"]["fullName"];               
    var email = document.forms["contactForm"]["emailAddress"];    
    var mobile = document.forms["contactForm"]["mobile"];  
     
   
    if (fullName.value == "" || fullName.value == null)                                  
    { 
        window.alert("Please enter your name."); 
        name.focus(); 
        return false; 
    } 
   
    if (emailAddress.value == "")                               
    { 
        window.alert("Please enter your address."); 
        email.focus(); 
        return false; 
    } 
       
    if (mobile.value == "")                                   
    { 
        window.alert("Please enter a valid e-mail address."); 
        mobile.focus(); 
        return false; 
    } 
   
    return true; 
}
