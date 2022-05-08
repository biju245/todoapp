let todocount = 0;

function getloginvalidated(checklogin){
   var uname = document.getElementById('username');
   var upass = document.getElementById('userpass');
   
   if(uname.value.trim()=="")
   {
       uname.style.border = "2px solid red";
       alert("Username cannot be empty");       
   }
   else if(upass.value.trim()=="")
   {
       upass.style.border = "2px solid red";
       alert("Password cannot be empty");       
   }
   else{
       checklogin(uname.value,upass.value);
   }  
}
function logincheck(uname,upass){
    //Creating an XHR object
    var xhttp = new XMLHttpRequest() ;
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200)
        {
            var response = JSON.parse(this.responseText);
            //console.log(response);
            var login = response.login;
            if(uname==login[0].user && upass==login[0].pass)
            {
                window.location = "main.html";
            }
            else
            {
                alert("Invalid Login");
            }            
        }
    }
    xhttp.open("GET","user.json",true);
    xhttp.send();
}

function logout()
{
    window.location = "index.html";
}

function setmytodolist()
{
   let dfbox = document.getElementById("welcomebox");
   let dftxt = document.getElementById("welcometxt");
   let listbox = document.getElementById("listtable");
   
    var dispbox = document.getElementById("mylist");
    //Creating an XHR object
    var xhttp = new XMLHttpRequest() ;
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200)
        {
            dfbox.style.display = "none";
            dftxt.innerHTML = "";
            listbox.style.display = "";
            var response = JSON.parse(this.responseText);           
            var output = "";
            for(var i=0;i<response.length;i++)
            {
               statdisplay = getstatdisplay(response[i].completed);
               output += '<tr><th scope="row">'+response[i].id+'</th><td>'+response[i].userId+'</td><td>'+response[i].title+'</td><td>'+statdisplay+'</td></tr>';
            }
           // console.log(output);
            dispbox.innerHTML=output;
        }
    }
    xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true);
    xhttp.send();    
}

function getstatdisplay(todostat)
{
    let statset;
    if(todostat==true)
    {
        statset =   '<input type="checkbox" checked disabled>';
    }
    else if(todostat==false)
    {
        statset =   '<input type="checkbox" onchange="todostatreset(this.checked)">';
    }
    return statset;
}

function checkTodocompletion(todonum)
{
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            if(todonum>=5){
                resolve(`Congrats. ${todonum} Tasks have been Successfully Completed`);
            }
            else{
                reject();
            }
        },500);        
    });
}

function todostatreset(checkstat)
{
    //alert(checkstat);
    if(checkstat==true)
    {
        todocount++;
    }
    else if(checkstat==false)
    {
        todocount--;
    }
    checkTodocompletion(todocount)
    .then(function(success){
        alert(success);
    })
    .catch()     
}


function clearstyle(fldid)
{
	var fldval	 	=	document.getElementById(fldid);
	if(fldval.value!='')
	{
        fldval.style.border = "1px solid #cccccc";
	}	
}