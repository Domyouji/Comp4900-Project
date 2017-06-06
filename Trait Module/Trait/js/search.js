$(function(){
	$("#search").on("click",function(){
		$tmp = $("#term").val();
		$name = encodeURIComponent($tmp);
		if($name===""){
			alert("Input is empty!");
			return;
		}
		var	rec_from = "<a href='http://www.cropontology.org' target='_blank'>www.cropontology.org</a>";
		$("#details").css("display", "none");
		$.ajax({
		    type: 'POST',
	        url: './php/RequestAPI.php',
		    datatype: 'json',
		    data:{ 
		    	func : "SearchTerm", 
		    	term : $name,
		    },
		    //if submission is successful 
		    success: function(returnedData){
				var tags = [];
				if(returnedData != "notfound" && returnedData!="[]\n"){ // check returned data is not found/empty
					var obj1 = JSON.parse(returnedData);
					//console.log(obj1);
					tmp_c = 0;
					for (var i = 0, len = obj1.length; i < len; i++) {
						
						try{
							id = obj1[i].id;
						}catch(e){}
						
						try{
							ontology_name = obj1[i].ontology_name;	
						}catch(e){}
						
						try{
							obj1[i].name; 
						}catch(e){}
						
						try{
							name = obj1[i].name.english;
						}catch(e){}		

						if(name != "undefined" && ontology_name != "undefined"){
							result = "<tr>";
							result += "<td>"  + (i+1) + "</td>";
							result += "<td class='s' value='" + id + "'>"+  id +"</td>";
							result += "<td>"+  name +"</td>";
							result += "<td>"+  ontology_name +"</td>";
							result += "</tr>";
		 					//result = "<div class='s' value='" + id + "'>" + id + " " + ontology_name + " " + name + "</div>";
		 					tags.push(result);
		 					tmp_c++;
						}
					}
					tmp_len = (tmp_c > 1) ? " records found - " : " record found - ";
					$("#tbl_len").text("[ " + tmp_c + tmp_len);
					$("#tbl_len").append(rec_from + " ]");
					if(tmp_c > 0)
						$("#result").css("display", "block");
					else
						$("#result").css("display", "none");

					$("#tbl_body").html("");
					$("#tbl_body").append(tags);	
				}else{
					console.log("Term doesn't exist");
					$("#result").css("display", "none");
					$("#tbl_len").text("[ 0 record found ]");										
				}	

				// var uniqueNames = [];
				// $.each(tags, function(i, el){
				//     if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
				// });	
				// $("#tbl_body").append(uniqueNames);
				// $("#result").html("");
				// $("#result").append(uniqueNames);
		    },
		    error: function(){
		        console.log("error occurred");
		    }
		});
	});

	$(document).on('click', '.s', function(){
		$termId = $(this).attr("value");
		$.ajax({
		    type: 'POST',
	        url: './php/RequestAPI.php',
		    datatype: 'json',
		    data:{ 
		    	func : "GetAttributes", 
		    	term : $termId,
		    },
		    //if submission is successful 
		    success: function(returnedData){	
		    	var tags = [];		    
				if(returnedData != "notfound"){				
					var obj1 = JSON.parse(returnedData);
					for (var i = 0, len = obj1.length; i < len; i++) {

						try{
							key = obj1[i].key;
						}catch(e){}

						try{
							value = obj1[i].value;
						}catch(e){}
					
						try{
							tt = JSON.parse(value);
							value = tt.english;
						}catch(e){}

						result = "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
						tags.push(result);
					}
				}else{
					console.log("Term doesn't exist");
					tags.push("<div>Details are not found!</div>");
				}

				$("#details").css("display", "block");
				$("#attributes").html("");
				$("#attributes").append(tags);		
		    },
		    error: function(){
		        console.log("error occurred");
		    }
		});
	});
});

