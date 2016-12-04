$(document).ready(function(){

loadTree();
initTerminal();
setFavIcon();
jQuery('.toEqualise').equaliseHeights();
});

// Middle Man binding from buttons to tabs
var activeButton;
var lastActiveButton = $('#Buttonpanel1');
lastActiveButton.css("background-color","#86c180");//green

var lastPanel = 'panel1';// current text page tab showing
var lastTab = 'panel1';

	
function open_page(newpanel){
//console.log(newpanel);
	//text pages
	var panel = newpanel || lastPanel;
	
		$('#'+lastPanel).removeClass("show");
		$('#'+lastPanel).addClass("hidden");

		$('#'+panel).removeClass("hidden");	
		$('#'+panel).addClass("show");
		
	// tabs	
		$('a.btn.btn-default' + '.Tab' + lastPanel).removeClass("active");
		$('a.btn.btn-default' + '.Tab' + panel).addClass("active");	

	// main buttons	active style
	$('#'+"Button"+panel).css("background-color","#86c180");
	$('#'+"Button"+lastPanel).css("background-color","#3b7380");
	
		lastPanel = panel;
		jQuery('.toEqualise').equaliseHeights();
		setFavIcon();
}


/* For Server implementation only */
function setFavIcon(){
	
var numberId = lastPanel.substring(5,6);

	var favicon=new Favico({
		type : 'rectangle',
		bgColor : '#5CB85C',	
		animation: 'slide',
	});
	favicon.badge(numberId);
//console.log(numberId);
}