$(function(){
	var rec_from = "<a href='http://www.cropontology.org' target='_blank'>www.cropontology.org</a>";
	$(document).on('click', '.cat_list', function(){
		$tmp = $(this).text(); 
		$("#dropdown_category").text($tmp+'')
		.append(' <span class="caret"></span>');		

		$cat_clicked = encodeURIComponent($tmp);
		$.ajax({
		    type: 'POST',
	        url: './php/RequestAPI.php',
		    datatype: 'json',
		    data:{ 
		    	func : "GetOntologiesByCategory", 
		    	term : $cat_clicked,
		    },
		    //if submission is successful 
		    success: function(returnedData){		   
		    	var ontology_list = [];
				if(returnedData != "notfound"){				
					var obj = JSON.parse(returnedData);

					result = "<thead><tr>";
					result += 	"<th>#   </th>";
					result += 	"<th>ontology id</th>";
					result += 	"<th>ontology summary</th>";
					//result += 	"<th>username</th>";
					result += "</thead></tr>";
					result += "<tbody>";

					for (var i = 0, len = obj.length; i < len; i++) {
						//cd ->category details
						result += "<tr>";
							result += "<td>"+ (i + 1)+"</td>";
							result += "<td class='cd' value='" + obj[i].ontology_id + "'>";
							result  += obj[i].ontology_id
							result += "</td>";							
							result += "<td>" + obj[i].ontology_summary + "</td>";
							//result += "<li>userid: " + obj[i].userid + "</li>";
							//result += "<td>" + obj[i].username + "</td>";
						result += "</tr>";
						//ontology_list.push(result);	
					}
					result += "</tbody>";					
				}else{
					console.log("term doesn't exist");
					ontology_list.push("<div>Details are not found!</div>");
				}
				tmp_len = (obj.length > 1) ? " records found - " : " record found - ";
				$("#ad_len").text("[ " + obj.length + tmp_len);
				$("#ad_len").append(rec_from +" ]");

				$("#details").css("display", "block");
				$("#attributes").html("");

				$("#attributes").append(result);	
				
				$("#id_details_title").css("display", "none");
				$("#id_details").css("display", "none");

		    },
		    error: function(){
		        console.log("error occurred");
		    }
		});
	});

	$(document).on('click', '.cd', function(){
		$("#id_details").css("display", "none");
		$("#id_details_title").css("display", "block");
		$(".loader").css("display", "block");
		$id_clicked = $(this).attr("value");		

		$.ajax({
		    type: 'POST',
	        url: './php/RequestAPI.php',
		    datatype: 'json',
		    data:{ 
		    	func : "GetOntologiesById", 
		    	term : $id_clicked,
		    },		    
		    //if submission is successful 
		    success: function(returnedData){
		    	var id_list = [];		    	
		    	k = 0;
				if(returnedData != "notfound"){		
					var obj1 = JSON.parse(returnedData);
					//console.log(obj1);

					for(var i in obj1){
						++k;
						//console.log("i :" +i);
						if(k < 10)
							dot = "&nbsp;&nbsp;";
						else
							dot = "";
						result = "<div class='idd' value='" + i + "'>" + dot + k + ". "+ i +"</div>";
						
						id_list.push(result);	
					}
				}else{
					console.log("Term doesn't exist");
					id_list.push("<div>Details are not found!</div>");
				}
				
				tmp_len = (k > 1) ? " records found - " : " record found - ";
				$("#id_len").text("[ " + k + tmp_len);
				$("#id_len").append(rec_from +" ]");

				$(".loader").css("display", "none");
				$("#id_details").css("display", "block");
				$("#ontology_list").html("");
				$("#ontology_list").append(id_list);		

				$(".idd_2").hide();
		    },
		    error: function(){
		        console.log("error occurred");
		    }
		});
	});

	// $(document).on('click', '.idd', function(){
	// 	$(this).find('table').slideToggle();
	// });

	$(document).on('click', '.idd', function(){
		$termId = $(this).attr("value");
		var element = $(this);
		tb = element.find("table");
		if(tb.length){
			tb.slideToggle();
			return;
		}

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

					result = "<table class='tbl_details'>";
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

						result += "<tr><td style='width:250px;'>" + key + "</td><td style='width:250px;'>" + value + "</td></tr>";
					}
					result += "</table>";
					tags.push(result);
				}else{
					console.log("Term doesn't exist");
					tags.push("<div>Details are not found!</div>");
				}
				// $("#details2").css("display", "block");
				// $("#attributes2").html("");
				// $("#attributes2").append(tags);		
				element.append(tags);					
		    },
		    error: function(){
		        console.log("error occurred");
		    }
		});
    });		
});