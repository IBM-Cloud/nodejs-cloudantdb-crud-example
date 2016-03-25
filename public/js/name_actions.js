$(document).ready(function(){

	$.ajax({
		url: "/fill_remove_update_names_dropdown",
		type: "GET",
		dataType: "json",
		data:{allnames: ""},
		contentType: "application/json",
		cache: true,
		timeout: 5000,
		complete: function() {
		  //called when complete
		  console.log('process complete');
		},
		success: function(data) {
			if(!data.hasOwnProperty("added")) //added key contains "DB read error" as returned from app.js
			{
				var name_drop_down;
				for(var i = 0; i<data.length; i++)
				{
					//var name_option = '<option style=\"font-family: montserrat, arial, verdana\">' + data[i].name + '</option>'; //Need to check style
          			var name_option = '<option>' + data[i].name + '</option>';
					name_drop_down += name_option;
				}
				//Populate update
				document.getElementById("names_to_be_removed").innerHTML = name_drop_down;
				document.getElementById("name_list").innerHTML = name_drop_down;
				console.log(name_drop_down);
			}
			else
				document.getElementById("db_read_error").style.display="block";
		},
		error: function() {
		    console.log('process error');
		},
	});

	$("#view_name").click(function(e){
		e.preventDefault();
		console.log("Before $.ajax");
		$.ajax({
			url: "/view_names",
			type: "GET",
			dataType: "json",
			data:{allnames: ""},
			contentType: "application/json",
			cache: true,
			timeout: 5000,
			complete: function() {
			  //called when complete
			  console.log('process complete');
			},
			success: function(data) {
				//back end(app.js) sends back either added: DB read error or a list of names. Check for that before taking necessary action
				if(!data.hasOwnProperty("added"))
				{
					console.log("Received info from back end");
					document.getElementById("add_new_name_form").style.display="none";
					document.getElementById("remove_name_form").style.display="none";
					document.getElementById("show_all_names").style.display="block";
					document.getElementById("added_name").style.display="none";
					document.getElementById("removed_name").style.display="none";
					document.getElementById("duplicate_name").style.display="none";
					document.getElementById("db_insert_error").style.display="none";
					document.getElementById("could_not_remove").style.display="none";
					document.getElementById("db_read_error").style.display="none";
					document.getElementById("updated_name").style.display="none";
					document.getElementById("could_not_update").style.display="none";
					document.getElementById("update_name_form").style.display="none";
					document.getElementById("empty_database").style.display="none";

          			//Bootstrap for table-stripped


          			var names_table = "<table class=\"table table-striped table-hover\">";
          			names_table += "<thead><th> Names in Database </th><th>";
          			names_table += "<form class=\"form-horizontal\" action=\"/download_csv\" method=\"GET\" id=\"download_data\"> <fieldset><input type=\"hidden\" class=\"form-control\" id=\"csvdata\" value=\"csvdata\"/><button id=\"download_csv\" class=\"btn btn-danger crud\" type=\"submit\" style=\"float:right; text-align: center; padding: 0px\"> Download CSV </button></fieldset></form>";
          			names_table += "</th></thead>";
          			names_table += "<tbody>";
          			for(var i = 0; i < data.length; i++)
            			names_table += "<tr class=\"info\"><td colspan=\"2\">" + data[i].name + "</td></tr>";
          			names_table += "</tbody></table>";
          			document.getElementById("show_all_names").innerHTML = names_table;

/*
					var names_table = "<font size=\"4\" > Names </font> <br><br> <table border=\"1\">";
					for(var i = 0; i < data.length; i++)
						names_table += "<tr><td>" + data[i].name + "</td></tr>";
					names_table += "</table>";
*/
				}
				else
					document.getElementById("db_read_error").style.display="block";
			},

			error: function() {
			  console.log('process error');
			},
		});
	});


	$("#add_name_button").click(function(e){
			e.preventDefault();
			//In 'data' parameter, send new name to be added to 'url', to be received by back end for further processing

			$.ajax({
				url: "/add_name",
				type: "GET",
				dataType: "json",
				data:{new_name: $("#newname").val()},
				contentType: "application/json",
				cache: true,
				timeout: 5000,
				complete: function() {
				  //called when complete
				  console.log('process complete');
				},
				success: function(data) {
					//console.log("Received : " + data + "value = " + JSON.stringify(data));
					document.getElementById("add_new_name_form").style.display="none";
					document.getElementById("remove_name_form").style.display="none";
					document.getElementById("show_all_names").style.display="none";
					document.getElementById("removed_name").style.display="none";
					document.getElementById("could_not_remove").style.display="none";
					document.getElementById("updated_name").style.display="none";
					document.getElementById("could_not_update").style.display="none";
					document.getElementById("update_name_form").style.display="none";
					document.getElementById("empty_database").style.display="none";

					//Based on what's received from back end(app.js), show appropriate message.
					if(data.added === "Yes")
					{
						document.getElementById("added_name").style.display="block";
						document.getElementById("duplicate_name").style.display="none";
						document.getElementById("db_insert_error").style.display="none";
						document.getElementById("db_read_error").style.display="none";
					}
					else if(data.added === "No")
					{
						document.getElementById("added_name").style.display="none";
						document.getElementById("duplicate_name").style.display="block";
						document.getElementById("db_insert_error").style.display="none";
						document.getElementById("db_read_error").style.display="none";
					}
					else if(data.added === "DB insert error")
					{
						document.getElementById("added_name").style.display="none";
						document.getElementById("duplicate_name").style.display="none";
						document.getElementById("db_insert_error").style.display="block";
						document.getElementById("db_read_error").style.display="none";
					}
					else if(data.added === "DB read error")
					{
						document.getElementById("added_name").style.display="none";
						document.getElementById("duplicate_name").style.display="none";
						document.getElementById("db_insert_error").style.display="none";
						document.getElementById("db_read_error").style.display="block";
					}
		   			$("#newname").val("");
		    		$("#newname").attr("placeholder", "Enter Name");
				},
				error: function() {
				  console.log('process error');
				},
			});
	});

	$("#update_name_button").click(function(e){
		e.preventDefault();
		console.log("Before ajax in update_name_button form");
		console.log("Updating after choosing from drop down");
	    //In the 'data' parameter, pass selected current name and updated name to 'url', to be received by back end for further processing
		$.ajax({
				url: "/update_name",
				type: "GET",
				dataType: "json",
				data: {name_list:$("#name_list option:selected").text(), updated_new_name: $("#updated_new_name").val()},
				contentType: "application/json",
				cache: true,
				timeout: 5000,
				complete: function() {
				  //called when complete
				  console.log('process complete');
				},
				success: function(data) {
					console.log("Returned from Update.....");
					document.getElementById("add_new_name_form").style.display="none";
					document.getElementById("remove_name_form").style.display="none";
					document.getElementById("update_name_form").style.display="none";
					document.getElementById("show_all_names").style.display="none";
					document.getElementById("added_name").style.display="none";
					document.getElementById("duplicate_name").style.display="none";
					document.getElementById("db_insert_error").style.display="none";
					document.getElementById("removed_name").style.display="none";
					document.getElementById("could_not_remove").style.display="none";

					//Based on what's received from back end(app.js) end, show appropriate message.
					if(data.updated === "updated")
					{
						console.log("Front end JS updated.....");
						document.getElementById("updated_name").style.display="block";
						document.getElementById("could_not_update").style.display="none";
						document.getElementById("db_read_error").style.display="none";
						document.getElementById("duplicate_name").style.display="none";
						document.getElementById("empty_database").style.display="none";
					}
					else if(data.updated === "could not update")
					{
						console.log("Front end JS updated.....");
						document.getElementById("updated_name").style.display="none";
						document.getElementById("could_not_update").style.display="block";
						document.getElementById("db_read_error").style.display="none";
						document.getElementById("duplicate_name").style.display="none";
						document.getElementById("empty_database").style.display="none";
					}
					else if(data.updated === "DB read error")
					{
						console.log("Front end JS DB read error.....");
						document.getElementById("updated_name").style.display="none";
						document.getElementById("could_not_update").style.display="none";
						document.getElementById("db_read_error").style.display="block";
						document.getElementById("duplicate_name").style.display="none";
						document.getElementById("empty_database").style.display="none";
					}
					else if(data.updated === "No")
					{
						document.getElementById("updated_name").style.display="none";
						document.getElementById("could_not_update").style.display="none";
						document.getElementById("db_read_error").style.display="none";
						document.getElementById("duplicate_name").style.display="block";
						document.getElementById("empty_database").style.display="none";
					}
					else if(data.updated === "empty database")
					{
						document.getElementById("updated_name").style.display="none";
						document.getElementById("could_not_update").style.display="none";
						document.getElementById("db_read_error").style.display="none";
						document.getElementById("duplicate_name").style.display="none";
						document.getElementById("empty_database").style.display="block";
					}
					$("#updated_new_name").val("");
					$("#updated_new_name").attr("placeholder", "Enter Name");

				},
				error: function() {
				  console.log('process error');
				}
		});
	});

	$("#remove_name_button").click(function(e){
		e.preventDefault();
		//In 'data' parameter, send name chosen in drop down to be removed, to 'url', to be received by back end for further processing
		$.ajax({
				url: "/remove_name",
				type: "GET",
				dataType: "json",
				data:{name_to_remove: $("#names_to_be_removed option:selected").text()},
				contentType: "application/json",
				cache: true,
				timeout: 5000,
				complete: function() {
				  //called when complete
				  console.log('process complete');
				},
				success: function(data) {
					document.getElementById("add_new_name_form").style.display="none";
					document.getElementById("remove_name_form").style.display="none";
					document.getElementById("show_all_names").style.display="none";
					document.getElementById("added_name").style.display="none";
					document.getElementById("duplicate_name").style.display="none";
					document.getElementById("db_insert_error").style.display="none";
					document.getElementById("updated_name").style.display="none";
					document.getElementById("could_not_update").style.display="none";
					document.getElementById("update_name_form").style.display="none";

					//Based on what's received from back end(app.js) end, show appropriate message.
					if(data.removed === "removed")
					{
						document.getElementById("removed_name").style.display="block";
						document.getElementById("could_not_remove").style.display="none";
						document.getElementById("db_read_error").style.display="none";
						document.getElementById("empty_database").style.display="none";
					}
					else if(data.removed === "could not remove")
					{
						document.getElementById("removed_name").style.display="none";
						document.getElementById("could_not_remove").style.display="block";
						document.getElementById("db_read_error").style.display="none";
						document.getElementById("empty_database").style.display="none";
					}
					else if(data.removed === "DB read error")
					{
						document.getElementById("removed_name").style.display="none";
						document.getElementById("could_not_remove").style.display="none";
						document.getElementById("db_read_error").style.display="block";
						document.getElementById("empty_database").style.display="none";
					}
					else if(data.removed === "empty database")
					{
						document.getElementById("removed_name").style.display="none";
						document.getElementById("could_not_remove").style.display="none";
						document.getElementById("db_read_error").style.display="none";
						document.getElementById("empty_database").style.display="block";
					}
				},
				error: function() {
				  console.log('process error');
				},
			});
	});
});