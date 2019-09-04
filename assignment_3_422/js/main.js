var viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])
}

showGenericModal= (title,message) =>{
 //empty modal body and title
 $(".modal-title").empty();
 $(".modal-body").empty();
    //append title and message params 
 $(".modal-title").append(title);
 $(".modal-body").append(message);
 //show generic modal using id'genericModal'
 $("#genericModal").modal("show");  
  
}

initializeTeams = () =>{
return new Promise(function(resolve,reject){
    $.ajax({
        url:"https://calm-refuge-91872.herokuapp.com/teams-raw",
        type: "GET",
        contentType: "application/json"
    })
    .then(function(data){
viewModel.teams=ko.mapping.fromJS(data);
resolve(viewModel);
    })
    .catch((err)=>{
     reject("Error loading the team data" + err)   
    });
})

}

initializeEmployees = () =>{
    return new Promise(function(resolve,reject){
        $.ajax({
            url:"https://calm-refuge-91872.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
        .then(function(data){
    viewModel.employees=ko.mapping.fromJS(data);
    resolve(viewModel);
        })
        .catch((err)=>{
         reject("Error loading the employee data" + err)   
        });

    })
}

initializeProjects = () =>{
    return new Promise(function(resolve,reject){
        $.ajax({
            url:"https://calm-refuge-91872.herokuapp.com/projects",
            type: "GET",
            contentType: "application/json"
        })
        .then(function(data){
    viewModel.projects=ko.mapping.fromJS(data);
    resolve(viewModel);
        })
        .catch((err)=>{
         reject("Error loading the projects data" + err)   
        });

    })
}
//=> arrow function shows undefined or makes app crash????
function saveTeam() {
//local variable currentTeam
    let currentTeam= this;

var teamData={
    "Projects": currentTeam.Projects(),
    "Employees": currentTeam.Employees(),
    "TeamLead": currentTeam.TeamLead()
}
$.ajax({
    url:"https://calm-refuge-91872.herokuapp.com/team/"+ currentTeam._id(),
    type: "PUT",
    data: JSON.stringify(teamData),
    contentType: "application/json"        
})
.done(function (data){
    showGenericModal("Success", currentTeam.TeamName() + " Updated Successfully");
})
.fail((err)=>{
showGenericModal("Error","Error updating the team information."+ err);
});
}

$(function() {
    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(function(){
ko.applyBindings(viewModel);
$(".multiple").multipleSelect({filter: true});
$(".single").multipleSelect({single: true, filter: true});

    })
    .catch((err)=>{
        showGenericModal("Error","Wat happened");

    })
})