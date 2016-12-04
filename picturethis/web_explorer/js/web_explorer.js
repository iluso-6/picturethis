// htmlEditor

ace.require("ace/ext/language_tools");


var htmlEditor = ace.edit( "htmlEditor" );
htmlEditor.setTheme( "ace/theme/solarized_light" );
htmlEditor.session.setMode( "ace/mode/html" );
htmlEditor.getSession().setUseWrapMode( true );
htmlEditor.setOptions( {
	highlightActiveLine: false,
	highlightGutterLine: false
} )
htmlEditor.$blockScrolling = Infinity;

ace.require("ace/ext/language_tools");   
var jsEditor = ace.edit( "jsEditor" );
jsEditor.setTheme( "ace/theme/monokai" );
jsEditor.session.setMode( "ace/mode/javascript" );
jsEditor.getSession().setUseWrapMode( true );
jsEditor.setOptions( {
	enableBasicAutocompletion: true,
	enableSnippets: true,
//	enableLiveAutocompletion: true,
	highlightActiveLine: false,
	highlightGutterLine: false
} )

jsEditor.$blockScrolling = Infinity;


var cssEditor = ace.edit( "cssEditor" );
cssEditor.setTheme( "ace/theme/solarized_light" );
cssEditor.session.setMode( "ace/mode/css" );
cssEditor.getSession().setUseWrapMode( true );
cssEditor.setOptions( {
	highlightActiveLine: false,
	highlightGutterLine: false
} )
cssEditor.$blockScrolling = Infinity;


/*******************  Accordion  **********************/
    $( "#accordion" ).accordion({
        fillSpace: true,
		animate: 600
        });
$( "#accordion" ).accordion({
    activate: function(event, ui) {
		var content =  jsEditor.getValue();
		setTimeout(function(){
        jsEditor.getSession().setValue(content);
		jsEditor.focus();
					}, 100);
    }

});
	


/*******************  END **********************/

function preloadHTML(){
	
	var htmlString = 
"<!DOCTYPE html>\n"+
"<html>\n"+
"	<head>\n"+
"		<title>my Title</title>\n"+
"	</head>\n"+
"<body>\n"+
'<div id="myDiv">This is a test div</div>\n'+
"</body>\n"+
"</html>";
	htmlEditor.getSession().setValue(htmlString);
	
	var cssString = 
"#myDiv{\n"+
"    color:white;\n"+
"    background-color:teal;\n"+
"    width:20%;\n"+
"    padding:5px;\n"+
"    text-align:center;\n"+
"}\n"
	cssEditor.getSession().setValue(cssString);	
	
	var jsString = 
'document.getElementById("myDiv").innerHTML="This text is from a JavaScript file located below the CSS window";'

	jsEditor.getSession().setValue(jsString);		
	//$('#cssEditor').resize();
}
var $ =jQuery.noConflict();
var myInterpreter;

var iframe = document.getElementById('myiframe');
var debugging = false;

var prevCode = '';


function refreshPage(){

	var css = '<style type="text/css">' + cssEditor.getValue() + '</style>';
	var html = htmlEditor.getValue();
	var js = '<script type="text/javascript">' + ( evalJavaScript() ) + '</script>';
	
	iframe.src = 'data:text/html;charset=utf-8 ,' + encodeURIComponent(html) + encodeURIComponent(css) + encodeURIComponent(js);

}


function toggleDebugging(obj){
	var state = obj.className;
	if(state=='active'){
		$(obj).removeClass("active");
		debugging = false;
	//console.log("removVactive "); 		
	}else{
		$(obj).addClass("active"); 
		debugging = true;
		prevCode = jsEditor.getValue();
		refreshPage();		
	}
}  

function evalJavaScript(){
	var code = jsEditor.getValue();

window.onerror = function(error) {

  try{
	  
	  alert('try');
  } catch(e){
	  alert(e);
	  
  }
};
	
	if(debugging){ 
	
	return code;
	}else{
	
		return prevCode;
		}
}


htmlEditor.getSession().on('change', function () {
	refreshPage();
   });
   
cssEditor.getSession().on('change', function () {
	refreshPage();
   });
   
jsEditor.getSession().on('change', function () {
//	switchDebugging(false);//stop debug
	refreshPage();
   });  


