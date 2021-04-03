var a = 0;
var b = 0;
var c = 0;
let solutions = [];


function findDiscriminant() {
	//D = b^2 - 4*ac
	var discriminant = Math.pow(b,2) - 4*a*c;
	if (discriminant >= 0){
		return discriminant;
	}
	else return; //need to break all solver;
}

function solveExpression() {
	//x1,x2 = (-b +- D ) / 2a
	var discriminant = findDiscriminant();
	if (discriminant === undefined){
		return "There are no real roots";
	}

	var x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
	var x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
	
	if (x1 == x2) {
		return x1;
	}
	else {
		return [x1, x2];
	}
}

//solveExpression();
function inputAndSolve() {
	a = document.getElementById("id_a").value;
	b = document.getElementById("id_b").value;
	c = document.getElementById("id_c").value;

	if (checkInput()) {
		solutions = solveExpression();
		if (document.getElementsByTagName("table").length == 0) {
			createTable();
		}
		insertNewRow();
		
		deleteNRow();
	}
}

//Обязательное условие A != 0, если не введены B и C, принимать их за 0
//Если A or B or C не число, не производить действий
function checkInput() {
	var out1 = document.getElementById("out1");
	var out = document.getElementById("out");

	if ((isNaN(a)) || (isNaN(b)) || (isNaN(c))) {
		out1.innerHTML = "Incorrect input, check arguments";
		out1.style.color = "red";
		out.innerHTML = "";
		return false;
	}
	if ((a != 0)) {
		if (b == ""){
			b = 0;
		}
		if (c == ""){
			c = 0;
		}
		out1.innerHTML = "Solution:";
		out1.style.color = "black";
		return true;
	}
	else {
		out1.innerHTML = "Incorrect input, check arguments";
		out1.style.color = "red";
		out.innerHTML = "";
		return false;
	}
}



function createTable() {
	var newTable = document.createElement("table");
	newTable.setAttribute("id", "myTable");

	newTable.createCaption().innerHTML = "Operation story";

	var insertPlace = document.getElementById("table_section");

	var tableHeader = newTable.insertRow();
	tableHeader.setAttribute("class", "header");

	var cellCoeffA = tableHeader.insertCell(0);
    cellCoeffA.innerHTML = "A";

    var cellCoeffB = tableHeader.insertCell(1);
    cellCoeffB.innerHTML = "B";

    var cellCoeffC = tableHeader.insertCell(2);
    cellCoeffC.innerHTML = "C";

    var cellSolution = tableHeader.insertCell(3);
    cellSolution.innerHTML = "Solution";

    insertPlace.appendChild(newTable);
}

function insertNewRow() {

	var table = document.getElementById("myTable");
	var row = table.insertRow();
	
	var cellCoeffA = row.insertCell(0);
    cellCoeffA.innerHTML = a;

    var cellCoeffB = row.insertCell(1);
    cellCoeffB.innerHTML = b;

    var cellCoeffC = row.insertCell(2);
    cellCoeffC.innerHTML = c;

    var cellSolution = row.insertCell(3);

	var outRe = document.getElementById("out");
    if (solutions.length == 2) {
    	cellSolution.innerHTML =  solutions[0].toFixed(5) + " and " + solutions[1].toFixed(5);
    	outRe.innerHTML = solutions[0].toFixed(5) + " and " + solutions[1].toFixed(5);
    }
    else {
    	cellSolution.innerHTML = solutions;
    	outRe.innerHTML = solutions;
    }
   	
    updateZebraMod();
}


function deleteNRow() {
	var table = document.getElementById("myTable");

	for(var i = 1; i < table.rows.length; i++) {
		// row cells
		for(var j = 0; j < table.rows[i].cells.length; j++) {
			table.rows[i].cells[j].onclick = function() {
				table.deleteRow(this.parentElement.rowIndex);
				updateZebraMod();
			};
		}
	}

}


function updateZebraMod() {
	var table = document.getElementById('myTable');
	
	for (var i = 1; i < table.rows.length; i++) {
		if (i % 2 == 0) {
			table.rows[i].className = "odd";
		}
		else
			table.rows[i].className = "even";
	}
}