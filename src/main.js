var button = document.getElementById("getUserData");
button.onclick = function (){
 
 //Create request   
  var request = new XMLHttpRequest();
  
  //Action to be performed after request is made
  request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE)
      {
          if(request.status === 200)
          {
            document.getElementById('getUserData').style.visibility = 'hidden';
            var obj = JSON.parse(request.responseText)
            users = obj.users;
            posts = obj.posts;
             

           var outputTbl = document.getElementById('UserTable');

           var tableContent = "";

           tableContent = "<thead><tr><th>Name</th><th>Website</th><th>Post</th></tr></thead>";

          for (index = 0; index < posts.length; index++) {
            var count =  posts[index].userId - 1 ;
            tableContent += "<tr><td>" + users[count].name + "</td>"

            + "<td>" + users[count].website + "</td>"

             + "<td>" + posts[index].title + "</td></tr>";
          }
          outputTbl.innerHTML = tableContent;
        }
      }
      
  };
  
  // Make a request
  request.open("GET","http://localhost:8080/userPosts", true);
  request.send(null);
    
     
};
