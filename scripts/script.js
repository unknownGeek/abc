window.onload = function () {
	drawPieChart();
	drawLineChart();
}

	

function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();
}


function drawPieChart() {

	var dps = [];

	var chart = new CanvasJS.Chart("pieChartContainer", {
		exportEnabled: true,
		animationEnabled: true,
		title:{
			text: "State Operating Funds"
		},
		legend:{
			cursor: "pointer",
			itemclick: explodePie
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: "{name}: <strong>{y}%</strong>",
			indexLabel: "{name} - {y}%",
			dataPoints: dps
		}]
	});

	//Invoke API
	var apiResponse = [
		{ 
			y: 26, 
			name: "School Aid", 
			exploded: true 
		},
		{
			y: 20, 
			name: "Medical Aid" 
		},
		{ 
			y: 5, 
			name: "Debt/Capital" 
		},
		{ 
			y: 3, 
			name: "Elected Officials" 
		},
		{ 
			y: 7, 
			name: "University" 
		},
		{ 
			y: 17, 
			name: "Executive" 
		},
		{ 
			y: 22, 
			name: "Other Local Assistance"
		}
	];

	if(!apiResponse || apiResponse.length == 0) {
		return;
	}

	for(dataPoint of apiResponse) {
		dps.push(dataPoint);
	}
	chart.render();
}

function drawLineChart() {

	var dps = [];

	var chart = new CanvasJS.Chart("lineChartContainer", {
		animationEnabled: true,  
		title:{
			text: "Music Album Sales by Year"
		},
		axisY: {
			title: "Units Sold",
			valueFormatString: "#0,,.",
			suffix: "mn",
			stripLines: [{
				value: 3366500,
				label: "Average"
			}]
		},
		data: [{
			yValueFormatString: "#,### Units",
			xValueFormatString: "YYYY",
			type: "spline",
			dataPoints: dps
		}]
	});


	var apiResponse = [
		{x: new Date(2002, 0), y: 2506000},
		{x: new Date(2003, 0), y: 2798000},
		{x: new Date(2004, 0), y: 3386000},
		{x: new Date(2005, 0), y: 6944000},
		{x: new Date(2006, 0), y: 6026000},
		{x: new Date(2007, 0), y: 2394000},
		{x: new Date(2008, 0), y: 1872000},
		{x: new Date(2009, 0), y: 2140000},
		{x: new Date(2010, 0), y: 7289000},
		{x: new Date(2011, 0), y: 4830000},
		{x: new Date(2012, 0), y: 2009000},
		{x: new Date(2013, 0), y: 2840000},
		{x: new Date(2014, 0), y: 2396000},
		{x: new Date(2015, 0), y: 1613000},
		{x: new Date(2016, 0), y: 2821000},
		{x: new Date(2017, 0), y: 2000000}
	];


	if(!apiResponse || apiResponse.length == 0) {
		return;
	}

	for(dataPoint of apiResponse) {
		dps.push(dataPoint);
	}

	chart.render();
}

// Demo for async fetch API

// document.getElementById('sayHello').addEventListener('click', sayHello);

// function sayHello() {
// 	var name = document.getElementById('fname').value;

// 	if(!name || name.length == 0) {
// 		alert('Please Type Your Name!');
// 		return;
// 	}

// 	const url = 'http://localhost:8080/RestFulWebApis_war/services/v1/sayHello?name='+ name;

// 	// const url = 'http://localhost:8081/ticketservices_war/services/v1/sayHello/'+ name;


// 	// const url = 'http://localhost:8080/RestFulWebApis_war/services/v1/sayHello?name=Hemant';

// 	// const url = 'https://reqres.in/api/users';

// 	console.log('Invoking API...');

// 	try{
// 		fetch(url, {
// 		  method: 'GET',
// 		  headers: {
// 		    Accept: 'application/json',
// 		    'Content-Type': 'application/json'
// 		  }
// 		}).then(function(response){
// 		    console.log(response);
// 		    if (response.status === 200) {
// 		    	response.json()
// 		    	.then(function(data){
// 		    		let payload = data.payload;
// 		    		console.log(payload.message);
// 		    		document.getElementById('para').innerHTML=(payload.message);
// 		    	});
// 			} else {
// 		      console.log('Error during API call!');
// 		  }
// 		});
// 		console.log('API Call Finished!');	
// 	} catch(error) {
// 	    console.log('Oops' + JSON.stringify(error));
// 	}
// }







//Demo for async await fetch API
document.getElementById('sayHello').addEventListener('click', sayHello);

async function sayHello() {
	var name = document.getElementById('fname').value;

	if(!name || name.length == 0) {
		alert('Please Type Your Name!');
		return;
	}

	const url = 'http://localhost:8080/RestFulWebApis_war/services/v1/sayHello?name='+ name;

	// const url = 'http://localhost:8081/ticketservices_war/services/v1/sayHello/'+ name;


	// const url = 'http://localhost:8080/RestFulWebApis_war/services/v1/sayHello?name=Hemant';

	// const url = 'https://reqres.in/api/users';

	console.log('Invoking API...');

	var payload = await getJsonPayload(url);

	console.log('API Response -> ');

	console.log(payload.message);

	document.getElementById('para').innerHTML=(payload.message);

	console.log('API FINISHED!');
}

async function getJsonPayload(url) {
	var payload = {};
	try {
		const response = fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
			});
		
		console.log('API fetched promise -> ');
		console.log(response);


		if (response.status === 200) {
			console.log('API Response Status is 200');
			const data = await response.json();
			console.log('API Response Data -> ');
			console.log(data);
			payload = await data.payload;
			console.log('API Response Data Payload -> ');
			console.log(payload);
		} else {
			console.log('Error during API call!');
		}

	} catch(err) {
	    console.log('Oops! Error -> ' + JSON.stringify(err));
	}
	
	console.log('API returning Payload -> ');
	console.log(payload);
	return payload; 
}