<?php

function requestAPI($url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HEADER, FALSE);
	$response = curl_exec($ch);
	$retcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	if($retcode != 200){ //if status code is not OK (200)
		echo "notfound";	
	}else{
		//echo json_encode($response);
		echo $response;
	}
	curl_close($ch);
}

if($_SERVER['REQUEST_METHOD'] === 'POST' && $_REQUEST['func'] == "SearchTerm"){
	$url = "http://www.cropontology.org/search?q=" . $_REQUEST['term'];
	requestAPI($url);	

}else if($_SERVER['REQUEST_METHOD'] === 'POST' && $_REQUEST['func'] == "GetAttributes"){
	$url = "http://www.cropontology.org/get-attributes/" . $_REQUEST['term'];
	requestAPI($url);	

}else if($_SERVER['REQUEST_METHOD'] === 'GET' && $_REQUEST['func'] == "GetCategories"){
	$url = "http://www.cropontology.org/get-categories";
	requestAPI($url);	

}else if($_SERVER['REQUEST_METHOD'] === 'POST' && $_REQUEST['func'] == "GetOntologiesByCategory"){
	$url = "http://www.cropontology.org/ontologies?category=" . $_REQUEST['term'];
	requestAPI($url);	

}else if($_SERVER['REQUEST_METHOD'] === 'POST' && $_REQUEST['func'] == "GetOntologiesById"){
	$url = "http://www.cropontology.org/get-ontology/" . $_REQUEST['term'];
	requestAPI($url);	
	
}else{
	echo "notfound";
}