# svg-polyline-rounded-corners
Converts an SVG polyline into a path with rounded corners.

Set the corner radius -- measured in pixels -- by adjusting the 'radius' value on the first line of the file.

Input: all data points from the polyline separated by whitespace (replace commas with spaces)



Output: the contents that get pasted inside 'd='

# Example

###starting polyline
```
<polyline class="classes" id="name"
points="
	  0,608
	 15,608
	 66,668
	232,705
	268,681
	359,698
	370,721
"/>
```

###usage

node round_corner.js 0 608 15 608 66 668 232 705 268 681 359 698 370 721



###output
```
M0,608
L7.0,608.0
Q15.0,608.0 20.2,614.1
L60.8,661.9
Q66.0,668.0 73.8,669.7
L224.2,703.3
Q232.0,705.0 238.7,700.6
L261.3,685.4
Q268.0,681.0 275.9,682.5
L351.1,696.5
Q359.0,698.0 362.5,705.2
```



###end result
```
<polyline class="classes" id="name"
d="
	M0,608
	L7.0,608.0
	Q15.0,608.0 20.2,614.1
	L60.8,661.9
	Q66.0,668.0 73.8,669.7
	L224.2,703.3
	Q232.0,705.0 238.7,700.6
	L261.3,685.4
	Q268.0,681.0 275.9,682.5
	L351.1,696.5
	Q359.0,698.0 362.5,705.2
"/>
```

##Caveat for large border radii

The script works by replacing parts of the line segments with curves: the corner becomes a bezier control point, and the curve endpoints backtrack along the line segments. That means if the line segments are too small for the given border radius, the curve endpoints will be misplaced!
