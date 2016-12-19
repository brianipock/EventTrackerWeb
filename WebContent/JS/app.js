var editListener = function(e) {
	var id = e.target.id;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/api/vr/" + id);
	
	xhr.onreadystatechange = function() {
		
	}
	
	xhr.send(null);
}

var deleteListener = function(e) {
	var xhr3 = new XMLHttpRequest();
	xhr3.open('DELETE', 'api/vr/' + e.target.id, true);

	xhr3.onreadystatechange = function() {
		if (xhr3.readyState === 4 && xhr3.status < 400) {
			console.log(xhr3.responseText);
			var vr = JSON.parse(xhr2.responseText);
			console.log(vr);
			e.target.parentElement.textContent = vr["title"];
		}
	}
	xhr3.send(null);

};

var viewListener = function(e) {
	var xhr2 = new XMLHttpRequest();
	xhr2.open('GET', 'api/vr/' + e.target.id, true);

	xhr2.onreadystatechange = function() {
		if (xhr2.readyState === 4 && xhr2.status < 400) {
			console.log(xhr2.responseText);
			var vr = JSON.parse(xhr2.responseText);
			console.log(vr);
			e.target.parentElement.textContent = vr["title"];
		}
	};
	xhr2.send(null);

	
	var button2 = document.createElement('button');
	button2.setAttribute("id", data[i].id);
	button2.textContent = "Delete";
	button2.addEventListener('click', function(e) {
		deleteListener(e);
	});
	

	row.appendChild(button);
	table.appendChild(row);
	row.appendChild(button2);
	table.appendChild(row);

};

var loadEvent = function() {
	console.log('LOADED');

	var table = document.createElement('table');
	table.id = "myTable";
	var div = document.getElementById("VRtable");
	div.appendChild(table);

	var tb = document.getElementById("myTable");
	var col0 = document.createElement('th');
	col0.textContent = "ID";
	tb.appendChild(col0);
	var col1 = document.createElement('th');
	col1.textContent = "VR TITLE";
	tb.appendChild(col1);
	var col2 = document.createElement('th');
	col2.textContent = "Time Played(min)";
	col2.id = "viewCol";
	tb.appendChild(col2);
	var col3 = document.createElement('th');
	col3.textContent = "REVIEW";
	tb.appendChild(col3);
	var col4 = document.createElement('th');
	col4.textContent = "CRASH";
	table.appendChild(col4);
	var col5 = document.createElement('th');
	col5.textContent = "";
	table.appendChild(col5);
	
	console.log(div);

	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/vr', true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			console.log(data);

			for (i = 0; i < data.length; i++) {
				console.log(data[i]);

				var row = document.createElement('tr');
				var td = document.createElement('td');
				td.textContent = data[i].id;
				row.appendChild(td);
				var td2 = document.createElement('td');
				td2.textContent = data[i].title;
				row.appendChild(td2);
				var td3 = document.createElement('td');
				td3.textContent = data[i].timePlayed;
				row.appendChild(td3);
				var td4 = document.createElement('td');
				td4.textContent = data[i].review;
				row.appendChild(td4);
				var td5 = document.createElement('td');
				td5.textContent = data[i].crash;
				row.appendChild(td5);
				
				var button = document.createElement('button');
				button.setAttribute("id", data[i].id);
				button.textContent = "View";
				button.addEventListener('click', function(e) {
					viewListener(e);
				});
				
				var editBtn = document.createElement('button');
				editBtn.setAttribute("edit-id", data[i].id);
			}
		}
		

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	}

	xhr.send(null);

	
};

/**
 * 
 */
window.addEventListener('load', loadEvent);