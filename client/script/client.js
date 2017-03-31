$(document).ready(function(){
  init();
  console.log("Test");
  console.log("Same Stuff");
});

function init(){
  eventListeners(true);
  getEmployees();
}

function eventListeners(value){
  if(value){
    $(".submitEmployee").on("click", clickSubmit);
    $(".employeeContainer").on("click", ".delete-btn", clickDelete);
    $(".employeeContainer").on("click", ".update-btn", clickUpdate);
  } else {
    $(".submitEmployee").off("click", clickSubmit);
    $(".employeeContainer").off("click", ".delete-btn", clickDelete);
    $(".employeeContainer").on("click", ".update-btn", clickUpdate);
  }
}

// EVENT HANDLERS //

function clickSubmit(){
  var employee = {};
  employee.name = $("#empName").val();
  employee.position = $("#empPosition").val();
  employee.salary = $("#empSalary").val();
  $("#empName").val("");
  $("#empPosition").val("");
  $("#empSalary").val("");
  postEmployee(employee);
}

function clickDelete(){
  var data = { "id" : $(this).data("id") };
  deleteEmployee(data);
}

function clickUpdate(){
  var data = {
    "id" : $(this).data("id"),
    "status": $(this).data("status")
  };
  updateEmployee(data);
}

// DOM METHODS //

function appendEmployees(employees){
  $(".employeeContainer").empty();
  for(var i = 0; i < employees.length; i++){
    var employee = employees[i];
    appendEmployee(employee);
  }
}

function appendEmployee(employee){
  $(".employeeContainer").append("<div class='well col-md-3'></div>");
  var $el = $(".employeeContainer").children().last();
  $el.append("<p>" + employee.name + "</p>");
  $el.append("<p>" + employee.position + "</p>");
  $el.append("<p>$" + employee.salary + "</p>");
  if(employee.status){
    $el.append("<p>Status: Current Employee");
  } else {
    $el.append("<p>Status: Past Employee");
  }
  $el.append("<button data-id=" + employee._id +
             " data-status=" + employee.status +
             " class='update-btn btn btn-info'>Update Employee</button>");

  $el.append("<button data-id=" + employee._id +
             " class='delete-btn btn btn-danger'>Delete Employee</button>");
}

// REST INTERFACE //
function getEmployees(){
  $.ajax({
    type: "GET",
    url: "/employees",
    success: function(response){
      appendEmployees(response);
    }
  });
}

function postEmployee(data){
  $.ajax({
    type: "POST",
    url: "/employees",
    data: data,
    success: function(response){
      getEmployees(response);
    }
  });
}

function deleteEmployee(data){
  $.ajax({
    type: "DELETE",
    url: "/employees",
    data: data,
    success: function(response){
      getEmployees();
    }
  });
}

function updateEmployee(data){
  $.ajax({
    type: "PUT",
    url: "/employees",
    data: data,
    success: function(response){
      getEmployees(response);
    }
  });
}
