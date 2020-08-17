document.getElementById('the-form').onsubmit = function(e){
  e.preventDefault();
  var input = this.firstElementChild;
  var inputVal  = input.value;

  if(inputVal != ""){
    var msgErr = document.getElementsByClassName('no-data')[0];
    if(msgErr !== undefined){
        msgErr.remove();
    }

      var ajax = new XMLHttpRequest();
      ajax.onload = function(){
        if(this.status === 200){
          var repos = JSON.parse(this.responseText);
          var githubRepos = document.querySelector('.github-repos');
          githubRepos.innerHTML = "";
          input.value = "";
          for(var index in repos){
              githubRepos.innerHTML += '<div class="repo"><span>'+repos[index].name+'</span><div class="actions"><span>'+repos[index].stargazers_count+' stars</span><a href="'+repos[index].svn_url+'" target="_blank">Visit</a></div></div>';
          }
        }
      }
      ajax.open("GET","https://api.github.com/users/"+inputVal+"/repos",true);
      ajax.send();

  }
};
