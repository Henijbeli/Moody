<?php include('../../connect.php'); ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-2.0.5/datatables.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
    <div class="container-fluid">
        <br>
        <h2 class="text-center">Welcome to Users Dashboard</h2>
        <p class="text-center">Users Datatable</p>
        <div class="row">
            <div class="container">
                <div class="col-md-8 offset-md-2">
                    <div class="btnAdd">
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add User
                        </button>
                    </div>
                    <br>
                    <table id="datatable" class="table">
                        <thead>
                            <th>username</th>
                            <th>Name</th>
                            <th>Last_name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Gender</th>
                            <th>Options</th>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Add user modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add User</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="saveUserForm" action="#" method="post">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="Username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="Username" name="username">
                        </div>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col">
                                    <label for="Name" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="Name" name="name">
                                </div>
                                <div class="col">
                                    <label for="Last_name" class="form-label">Last Name</label>
                                    <input type="text" class="form-control" id="Last_name" name="last_name">
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="Email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="Email" name="email" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-8">
                                    <label for="Password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="Password" name="password">
                                </div>
                                <div class="col-4">
                                    <label for="Gender" class="form-label">Gender</label>
                                    <input type="text" class="form-control" id="Gender" name="gender" placeholder="F or H" maxlength="1">
                                </div>
                            </div>
                        </div>
                        <!-- New fields for pdp and last_name -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/v/bs5/jq-3.7.0/dt-2.0.5/datatables.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $('#datatable').DataTable({
                'serverSide': true,
                'processing': true,
                'paging': true,
                'order': [],
                'ajax': {
                    'url': 'fetch_data.php',
                    'type': 'post',
                },
                'columnDefs': [{
                    'targets': [0, 6],
                    'orderable': false,
                }]
            });
        });

        $(document).on('submit', '#saveUserForm', function(event) {
            event.preventDefault();
            var username = $('#Username').val();
            var name = $('#Name').val();
            var last_name = $('#Last_name').val();
            var email = $('#Email').val();
            var pwd = $('#Password').val();
            var gender = $('#Gender').val();
            if (username != '' && name != '' && last_name != '' && email != '' && pwd != '' && gender != '') {
                $.ajax({
                    url: 'adduser.php',
                    data: {
                        username: username,
                        name: name,
                        last_name: last_name,
                        email: email,
                        pwd: pwd,
                        gender: gender,
                    },
                    type: 'post',
                    success: function(data) {
                        var json = JSON.parse(data);
                        alert(json.result);

                        if (json.result == "success") {
                            var table = $('#datatable').DataTable();
                            table.draw();
                            alert('Successfully User added');
                        }
                    }
                });
            } else {
                alert("Please fill all fields.");
            }
        });
        $(document).on('click', '.deleteBtn', function(event) {
    event.preventDefault();
    var id = $(this).data('id');
    console.log($(this).data());
    if (confirm("Are you sure want to delete this User?")) {
        $.ajax({
            url: "deleteuser.php",
            data: {
                username: id
            },
            type: "post",
            success: function(data) {
                var json = JSON.parse(data);
                if (json.result == 'success') {
                    $("#" + id).closest('tr').remove();
                    alert('User deleted successfully');
                } else {
                    alert('Failed to delete user: ' + json.message);
                }
            },
            error: function(xhr, status, error) {
                alert('Error: ' + error);
            }
        });
    }
});
$(document).on('submit', '#updateUser', function(e) {
    e.preventDefault();
    var username = $('#username').val(); // corrected field names
    var name = $('#name').val();
    var last_name = $('#last_name').val();
    var email = $('#email').val();
    var gender = $('#gender').val();
    var pwd = $('#pwd').val();

    if (username != '' && name != '' && last_name != '' && email != '' && gender != '' && pwd != '') {
        $.ajax({
            url: "update.php",
            type: "post",
            data: {
                username: username, // corrected parameter name
                name: name,
                last_name: last_name,
                email: email,
                gender: gender,
                pwd: pwd
            },
            success: function(data) {
                var json = JSON.parse(data);
                var status = json.result; // corrected variable name
                if (status == 'success') {
                    // Update table row if necessary
                    $('#exampleModal').modal('hide');
                } else {
                    alert('Failed to update user: ' + json.message);
                }
            }
        });
    } else {
        alert('Fill all the required fields');
    }
});

$('#example').on('click', '.editbtn', function(event) {
    var id = $(this).data('id');
    alert(id); // log the ID
    $('#exampleModal').modal('show');

    $.ajax({
        url: "afficheruser.php",
        data: {
            username: id // corrected parameter name
        },
        type: 'post',
        success: function(data) {
            var json = JSON.parse(data);
            $('#username').val(json.username);
            $('#name').val(json.name);
            $('#last_name').val(json.last_name);
            $('#email').val(json.email);
            $('#gender').val(json.gender);
            $('#pwd').val(json.pwd);
        }
    });
});



    </script>
     <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="updateUser">
            <input type="hidden" name="id" id="id" value="">
            <input type="hidden" name="trid" id="trid" value="">
            <div class="mb-3 row">
              <label for="nameField" class="col-md-3 form-label">Name</label>
              <div class="col-md-9">
                <input type="text" class="form-control" id="nameField" name="name">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="emailField" class="col-md-3 form-label">Email</label>
              <div class="col-md-9">
                <input type="email" class="form-control" id="emailField" name="email">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="mobileField" class="col-md-3 form-label">Mobile</label>
              <div class="col-md-9">
                <input type="text" class="form-control" id="mobileField" name="mobile">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="cityField" class="col-md-3 form-label">City</label>
              <div class="col-md-9">
                <input type="text" class="form-control" id="cityField" name="City">
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Add user Modal -->
  <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="addUser" action="">
            <div class="mb-3 row">
              <label for="addUserField" class="col-md-3 form-label">Name</label>
              <div class="col-md-9">
                <input type="text" class="form-control" id="addUserField" name="name">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="addEmailField" class="col-md-3 form-label">Email</label>
              <div class="col-md-9">
                <input type="email" class="form-control" id="addEmailField" name="email">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="addMobileField" class="col-md-3 form-label">Mobile</label>
              <div class="col-md-9">
                <input type="text" class="form-control" id="addMobileField" name="mobile">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="addCityField" class="col-md-3 form-label">City</label>
              <div class="col-md-9">
                <input type="text" class="form-control" id="addCityField" name="City">
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</body>
</body>

</html>
