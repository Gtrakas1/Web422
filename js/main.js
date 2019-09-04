/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: George Trakas Student ID: 108459173 Date: Friday,September 14th, 2018
*
*
********************************************************************************/ 
let employeesModel= [];

function initializeEmployeeModel(){
    
    $.ajax({
        url: "https://calm-refuge-91872.herokuapp.com/employees",
        type: "GET",
        contentType: "application/json"

    })
        .done(function (data) {
            employeesModel=data;
            refreshEmployeeRows(employeesModel)
        })
        .fail(function (err) {
            showGenericModal('Error', 'Unable to get Employees');
        });

};

function showGenericModal(title,message){
//append title and message params 
    $(".modal-title").append(title);
  $(".modal-body").append(message);
  //show generic modal using id'genericModal'
  $("#genericModal").modal("show");  
};

function refreshEmployeeRows(employees){
    //lodash "escape " and "evaluate " template
    let emptemplate=_.template(
        "<% _.forEach(employees,function (employee) { %>"+
        //get empid
        "<div class='row body-row' data-id='" +
        "<%- employee._id%>"+"'>"+
        //get FirstName
        "<div class='col-xs-4 body-column'>"+
        "<%- employee.FirstName %>"+"</div>"+
        //get LastName
        "<div class='col-xs-4 body-column'>"+
        "<%- employee.LastName%>"+"</div>"+
        //getPosition
        "<div class='col-xs-4 body-column'>"+
        "<%- employee.Position.PositionName %>"+"</div>"+
        //close div
        "</div>"+
        //close forEach
        "<% }); %>"
        

    )
$("#employees-table").empty().append(emptemplate({'employees' : employees})
);
}

function getFilteredEmployeesModal(filterString){
let filter= _.filter(employeesModel,function(employees){
    if(employees.FirstName.toLowerCase().includes(filterString) ||
employees.LastName.toLowerCase().includes(filterString) ||
employees.Position.PositionName.toLowerCase().includes(filterString) ||
employees.FirstName.toUpperCase().includes(filterString) ||
employees.LastName.toUpperCase().includes(filterString) ||
employees.Position.PositionName.toUpperCase().includes(filterString))
{
    return employees;
}

});
return filter;
}

getEmployeeModelById = (id) =>{
    return _.find(employeesModel, { '_id' : id });
} 

$(function () {
    // populate data
    initializeEmployeeModel();
    //Wire up the key event
    $("#employee-search").keyup(function(){
        refreshEmployeeRows(getFilteredEmployeesModal($(this).val()));
    })
    //wire up click event
    $("#employees-table").on("click",'.row.body-row',function(){
        let emp=getEmployeeModelById($(this).attr('data-id'));
        //use moment for date format
        let hired=emp.HireDate;
        let date=moment(hired);
        date=date.format('MMMM Do, YYYY');
        //use "escape" lodash template for modal string
        let empTemp=_.template(
        '<strong> Address: </strong>'
        +'<%- emp.AddressStreet %>'
        +'<%- emp.AdressCity%>'+'<%- emp.AddressState %>'
        +'<%- emp.AddressZip %>' + '<br>'
        +'<strong> Phone Number: </strong>'+'<%- emp.PhoneNum %>'
        +'ext: '+'<%- emp.Extension %>'+'<br>'
        +'<strong> Hire Date: </strong>'
        +'<%- date %>'
    )
        showGenericModal(emp.FirstName + " "+emp.LastName, empTemp({'emp': emp,date}));
    })
    // clear modal 
    $('.modal').on('hidden.bs.modal', function (e) {
        $('.modal-title').empty();
        $('.modal-body').empty();
      })
});