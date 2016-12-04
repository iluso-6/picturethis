examples = {
	"example_simple_math": "var calculate1 = 1 + 2 * 4;\n" +
		"var calculate2 = (1 + 2) * 4;\n" +
		"\n" +
		"alert(calculate1);\n" +
		"alert(calculate2);\n",

	"example_fibonacci": "var result = [];\n" +
		"function fibonacci(n, output) {\n" +
		"var a = 1, b = 1, sum;\n" +
		"for (var i = 0; i < n; i++) {\n" +
		"output.push(a);\n" +
		"sum = a + b;\n" +
		"a = b;\n" +
		"b = sum;\n" +
		"}\n" +
		"}\n" +
		"fibonacci(16, result);\n" +
		"alert(result.join(', '));",

	"example_closure_function": "function makeFunc() {\n" +
		"var name = 'myString';\n" +
		"function displayName() {\n" +
		"alert(name);\n" +
		"}\n" +
		"return displayName;\n" +
		"}\n" +
		"\n" +
		"var myFunc = makeFunc();\n" +
		"myFunc();\n",

	"example_return_function": "function toCelsius(f){\n" +
		"return (5/9) * (f-32);}\n" +
		"\n" +
		"var result = toCelsius(78);\n" +
		"\n" +
		"alert(result);",

	"example_object_example": 'var person =\n' +
		'{firstName:"John",\n' +
		'lastName:"Doe", age:50, eyeColor:"blue"};\n' +
		"\n" +
		'alert(person.firstName+" is "+person.age+" years old.");\n',

	"example_sort_array": "var points =\n" +
		"[42, 27, 5, 1, 10];\n" +
		"\n" +
		"function myFunction(){\n" +
		"points.sort(function\n" +
		"(a, b){return a - b});\n" +
		"}\n" +
		"myFunction();\n" +
		"\n" +
		"alert(points);",

	"example_object_method": "var person = {\n" +
		"firstName: 'John',\n" +
		"lastName : 'Doe',\n" +
		"id       : 5566,\n" +
		"fullName : function() {\n" +
		"return this.firstName+\n" +
		'" " + this.lastName;\n' +
		"    }\n" +
		"};\n" +
		"\n" +
		"alert(person.fullName());",

	"example_do_while": "var i = 0;\n" +
		"do {\n" +
		'alert("The number is:"\n' +
		' + i);\n' +
		"i++;\n" +
		"}\n" +
		"while (i < 3);\n" +
		"\n" +
		""
};


var currentExample = "example_return_function";


function setExample( obj ) {
	disable( true );
	preview.setValue( '', -1 );

	$( '.nodeType' ).remove(); //clear out div's from tree list -reset all
	$( '.nodeActive' ).remove();
	nodes_list.length = 0
	last = null;

	var id = obj.id
	var newExample = examples[ id ];

	editor.setValue( newExample, -1 );
	$( "#" + currentExample ).removeClass( "active" );
	$( "#" + id ).addClass( "active" );
	currentExample = id;

}