/*
	@license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt
	
	Copyright (C) 2017 SabineWren
	https://github.com/SabineWren
	
	GNU AFFERO GENERAL PUBLIC LICENSE Version 3, 19 November 2007
	https://www.gnu.org/licenses/agpl-3.0.html
	
	@license-end
*/
var radius = 8;

var lineToVector = function (p1, p2) {
	var vector = {
		x: p2.x - p1.x,
		y: p2.y - p1.y
	};
	return vector;
}

var vectorToUnitVector = function (v) {
	var magnitude = v.x * v.x + v.y * v.y;
	var magnitude = Math.sqrt(magnitude);
	var unitVector = {
		x: v.x / magnitude,
		y: v.y / magnitude
	};
	return unitVector;
}

var roundOneCorner = function (p1, corner, p2) {
	var corner_to_p1 = lineToVector(corner, p1);
	var corner_to_p2 = lineToVector(corner, p2);
	var corner_to_p1_unit = vectorToUnitVector(corner_to_p1);
	var corner_to_p2_unit = vectorToUnitVector(corner_to_p2);
	
	var curve_p1 = {
		x: corner.x + corner_to_p1_unit.x * radius,
		y: corner.y + corner_to_p1_unit.y * radius
	};
	var curve_p2 = {
		x: corner.x + corner_to_p2_unit.x * radius,
		y: corner.y + corner_to_p2_unit.y * radius
	};
	var path = {
		line_end: curve_p1,
		curve_control: corner,
		curve_end: curve_p2
	};
	return path;
}

var printPath = function (path) {
	console.log("L" + path.line_end.x.toFixed(1)      + "," + path.line_end.y.toFixed(1));
	console.log("Q" + path.curve_control.x.toFixed(1) + "," + path.curve_control.y.toFixed(1)
			+" "+ path.curve_end.x.toFixed(1)     + "," + path.curve_end.y.toFixed(1));
}

//check input
if(process.argv.length <= 2){
	console.log("enter at least one point");
	process.exit();
}
if(process.argv.length % 2 !== 0){
	console.log("you entered " + (process.argv.length - 2) + " numbers, but each point should have two numbers");
	process.exit();
}
if(process.argv.length < 8){
	console.log("need at least 3 points");
	process.exit();
}

//main
console.log("M"+process.argv[2]+","+process.argv[3]);
for (var i = 2; i + 5 < process.argv.length; i += 2) {
	
	var p1 = {
		x:  parseInt(process.argv[i]),
		y:  parseInt(process.argv[i+1])
	}
	var p2 = {
		x:  parseInt(process.argv[i+2]),
		y:  parseInt(process.argv[i+3])
	}
	var p3 = {
		x:  parseInt(process.argv[i+4]),
		y:  parseInt(process.argv[i+5])
	}
	var path = roundOneCorner(p1, p2, p3);
	printPath(path);
}
