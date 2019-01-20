$(()=>{
    $('#searchUser').on('keyup', function(e){
         var userName = e.target.value;

         //getting GitHub API
         $.ajax({
             url: 'https://api.github.com/users/' + userName,
             data:{
                 client_id: 'be8b31f0258b289c9886',
                 client_secret: '9b5fc3db8dc254d401b3268480ef6551391e4bab',
             }
         }).done((user)=>{

           $.ajax({
            url: 'https://api.github.com/users/' + userName + '/repos',
            data:{
                client_id: 'be8b31f0258b289c9886',
                client_secret: '9b5fc3db8dc254d401b3268480ef6551391e4bab',
                sort: 'created: asc',
                per_page: 10,
            }
           
           }).done((repos)=>{
               $.each(repos, (index, val)=>{
                $('#repos').append(`
                
                  <div class="well">
                    <div class="row">
                        <div class="col-sm-5">
                         <b>${val.name}</b>
                        </div>
                        <div class="col-sm-4">
                        <span class="label label-warning">Stars: ${val.stargazers_count}</span>
                        <span class="label label-primary">Watchers: ${val.watchers_count}</span>
                        <span class="label label-danger">Language: ${val.language}</span>
                        <span class="label label-default">Created at: ${val.created_at}</span>
                        </div>
                        <div class="col-sm-1"></div>
                        <div class="col-sm-2">
                             <a href="${val.html_url}" class="btn btn-success" target="#_blank">See repository</a>
                        </div>

                    </div>
                  </div>
                
                `)
               
               
           })
        });  

             var company = 'Incomplete';
             var bio = 'Incomplete';
             var blog = 'Incomplete';
             var location = 'Incomplete';
             var hireable = 'No';
             var name = 'No name mentoned';

            if(user.name != null)
            {
                name = user.name;
            }
            if(user.company != null)
            {
                 company = user.company;             
            }
            if(user.bio !== null)
            {
                 bio = user.bio;             
            }
            if(user.blog !== '')
            {
                 blog = user.blog;             
            }
            if(user.location !== null)
            {
                 location = user.location;             
            }
            if(user.hireable != null)
            {
                hireable = user.hireable;
            }
            $('#profileInfo').html(`
            <div class="panel panel-primary">
            <div class="panel-heading">
             <h3 style="display:inline-block" class="panel-title"><b>Name:</b> ${name}</h3> &nbsp;&nbsp;&nbsp; <h5 style="display:inline-block"> <b> Login Name:</b> ${user.login}</h5>
            </div>
            <div class="panel-body">

               <div class="row">

                    <div class="col-sm-3">
                    <img class="thumbnail profilePhoto" src="${user.avatar_url}">
                    <a target="_blank" href="${user.html_url}" class="btn btn-success btn-block">Visit Profile</a>
                    </div>

                <div class="col-sm-9">
                  <span class="label label-default">Repositories:${user.public_repos}</span>
                  <span class="label label-primary">Gists:${user.public_gists}</span>
                  <span class="label label-success">Followers:${user.followers}</span>
                  <span class="label label-warning">Following:${user.following}</span>
                  <br><br>
                  <ul class="list-group">
                     <li class="list-group-item list-group-item-success"><b>Company:</b> ${company}</li>
                     <li class="list-group-item list-group-item-primary"><b>Website:</b> ${blog}</li>
                     <li class="list-group-item list-group-item-info"><b>About:</b> ${bio}</li>
                     <li class="list-group-item list-group-item-warning"><b>Location: </b>${location}</li>
                     <li class="list-group-item list-group-item-primary"><b>Member Since: </b>${user.created_at}</li>
                     <li class="list-group-item list-group-item-danger"><b>Hierable: </b>${hireable}</li>
                 </ul>    
                </div>
               </div>
            </div>
          </div>
         <h3 class="page-header">Latest Repositories</h3><hr>
         <div id="repos"></div>
            
            `)
             
         })
    })
});