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
        <h2 class="text-center">Welcome to artistes Dashboard</h2>
        <p class="text-center">artiste Datatable</p>
        <div class="row">
            <div class="container">
                <div class="col-md-8 offset-md-2">
                    <div class="btnAdd">
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add artiste
                        </button>
                    </div>
                    <br>
                    <table id="datatable" class="table">
                        <thead>
                            <th>username</th>
                            <th>nickName</th>
                            <th>nb_abonne</th>
                            <th>nb_song</th>
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
                                    <label for="nickName" class="form-label">nickName</label>
                                    <input type="text" class="form-control" id="nickName" name="nickName">
                                </div>
                                <div class="col">
                                    <label for="nb_abonne" class="form-label">nb_abonne</label>
                                    <input type="text" class="form-control" id="nb_abonne" name="nb_abonne">
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="nb_song" class="form-label">nb_song</label>
                            <input type="email" class="form-control" id="nb_song" name="nb_song" >
                        </div>
                        <div class="mb-3">
                        
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
                    'targets': [0, 4],
                    'orderable': false,
                }]
            });
        });

        $(document).on('submit', '#saveUserForm', function(event) {
            event.preventDefault();
            var username = $('#Username').val();
            var nickname = $('#nickName').val();
            var nb_abonne = $('#nb_abonne').val();
            var nb_song = $('#nb_song').val();
            if (username != '' && nickname != '' && nb_abonne != '' && nb_song != '') {
                $.ajax({
                    url: 'addartiste.php',
                    data: {
                        username: username,
                        nickname: nickname,
                        nb_abonne: nb_abonne,
                        nb_song: email,
                        
                    },
                    type: 'post',
                    success: function(data) {
                        var json = JSON.parse(data);
                        alert(json.result);

                        if (json.result == "success") {
                            var table = $('#datatable').DataTable();
                            table.draw();
                            alert('Successfully artiste added');
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
    if (confirm("Are you sure want to delete this artist?")) {
        $.ajax({
            url: "deleteartiste.php",
            data: {
                username: id
            },
            type: "post",
            success: function(data) {
                console.log("laasba");
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


    </script>

</html>
