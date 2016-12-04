// editor

var editor = ace.edit( "editor" );
editor.setTheme( "ace/theme/solarized_light" );
editor.session.setMode( "ace/mode/javascript" );
editor.getSession().setUseWrapMode( true );
editor.setOptions( {
	highlightActiveLine: false,
	highlightGutterLine: false
} )
editor.$blockScrolling = Infinity;

    editor.renderer.on('afterRender', function(e) { 
       $('.ace_selection').css("background-color","rgba(231,213,130,0.4)"); 
	   $('.ace_selected-word').css("border","none");
    })

var preview = ace.edit( "interpreter" );
preview.setTheme( "ace/theme/solarized_light" );
preview.session.setMode( "ace/mode/javascript" );
preview.getSession().setUseWrapMode( true );
preview.setOptions( {
	readOnly: true,
	highlightActiveLine: false,
	highlightGutterLine: false
} )
preview.$blockScrolling = Infinity;



var myInterpreter;
var code;
var enabled = false;



function initAlert( interpreter, scope ) {

	var wrapper = function( text ) {
		text = text ? text.toString() : '';
		interpreter.locations = true;
		return interpreter.createPrimitive( alert( text ) );
	};
	interpreter.setProperty( scope, 'alert',
		interpreter.createNativeFunction( wrapper ) );
};



function parseButton() {
	code = editor.getValue();

	var ast = acorn.parse( code, {

		ranges: true,
		// collect comments in Esprima's format 
		locations: true


	} );
	myInterpreter = new Interpreter( ast, initAlert );
	disable( false );
}

function stepButton() {
	if ( enabled ) {
		if ( myInterpreter.stateStack[ 0 ] ) {
			var node = myInterpreter.stateStack[ 0 ].node;
			// console.log(node.kind);

			var start = node.start;
			var end = node.end;
		} else {
			var start = 0;
			var end = 0;
		}
		createSelection( start, end, node );

		try {
			var ok = myInterpreter.step();
			console.log('after ok' +node.type);
		} catch ( err ) {
			alert( 'Error found: ' + err );
		} finally {
			if ( !ok ) {
				disable( true );
			}
		}
	}
}

function runButton() {
	if ( enabled ) {
		console.log( 'run' );
		myInterpreter.run();
		disable( true );
	}
}


function disable( disabled ) {
	if ( disabled ) {
		enabled = false;
		$( "#btnStep" ).addClass( "disabled" ).removeClass( "enabled" );
		$( "#btnRun" ).addClass( "disabled" ).removeClass( "enabled" );
	} else {
		enabled = true;
		$( "#btnStep" ).removeClass( "disabled" ).addClass( "enabled" );
		$( "#btnRun" ).removeClass( "disabled" ).addClass( "enabled" );
	}

}
/****************************Tree nodes************************************/

var treeWrap = document.getElementById( 'treeWrap' );
var nodes_list = [];
var last = null;

function createNodeBalloon( node ) {
	var newNode = node.type;

	if ( last != null ) {
		var removeLastActive = document.getElementById( last );
		removeLastActive.setAttribute( "class", "nodeType" );
	}

	function containsObject( obj, list ) {
		var i;
		for ( i = 0; i < list.length; i++ ) {
			if ( list[ i ] === obj ) {
				//console.log(list[i]);
				return true;
			}
		}

		return false;
	}

	var nodeExists = containsObject( newNode, nodes_list );


	if ( nodeExists ) {
		var prev = document.getElementById( newNode );
		prev.setAttribute( "class", "nodeActive" );
		last = newNode;
		$(prev).addClass('animated jello');
	} else {
		if ( node.type ) {
			var ele = document.createElement( "div" );
			ele.setAttribute( "id", node.type );
			ele.setAttribute( "class", "nodeActive" );
			ele.innerHTML = node.type;
			treeWrap.appendChild( ele );
			nodes_list.push( node.type );
			last = node.type;
			$('#'+last).addClass('animated bounceInLeft');
		}
	}

}

/***********************   END   **************************************/
function createSelection( start, end, node ) {



	var currentSelected = code.slice( start, end );

	preview.setValue( currentSelected, -1 ); // cursor to start to prevent selection
	editor.setValue( code, -1 );

	if ( node.loc.start !== undefined ) {

		var startRow = ( node.loc.start.line ) - 1;
		var startColumn = node.loc.start.column;
		var endRow = ( node.loc.end.line ) - 1;
		var endColumn = node.loc.end.column;


		editor.selection.setSelectionRange( {
			start: {
				row: startRow,
				column: startColumn
			},
			end: {
				row: endRow,
				column: endColumn
			}
		} );

	}
			createNodeBalloon( node );
}
/*dont allow commands
editor.commands.on("exec", function(e) {
    e.preventDefault();
});
//no fold widgets
editor.session.setFoldStyle('manual');
 //console.log(node.loc.start);

}
*/