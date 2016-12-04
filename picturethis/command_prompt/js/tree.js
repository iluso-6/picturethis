var currDir = 'USER';
var pathNodes = '';


function loadTree() {


    $('#jstree').jstree({

        "core": {
            'check_callback': true,
            "themes": {
                "name": "default",
                "dots": true,
                "icons": true,
                "variant": "large"
            }
        }

    });

    $('#jstree').jstree('open_all');
}



function getPath(dir) {
    var temp = dir || currDir;
    $('#jstree').jstree('select_node', temp);
    var targetData = $('#jstree').jstree('get_selected', temp);

    var path = $('#jstree').jstree('get_path', temp);
    pathNodes = '';

    for (i = 0; i < path.length; i++) {
        if (path[i].length > 0) {
            path[i] = path[i].trim();
            path[i] = path[i].concat('\\');

            pathNodes = pathNodes.concat(path[i]);

        }
        if (targetData[0].id == 'PC') {
            pathNodes = pathNodes.concat('PC\\');
        }
    }

    return pathNodes;
}



function createFile(nameId) {

    var parent = currDir;
    var node = {
        id: nameId,
        text: nameId,
        icon: "./images/text.png"
    };
    var ref = $('#jstree').jstree('create_node', parent, node, 'last');
}

function createFolder(nameId) {
	var nextInPath = $('#jstree').jstree('get_children_dom', currDir);
		for (i = 0; i < nextInPath.length; i++) {
            var nextId = nextInPath[i].id;
			if(nextId==nameId){
			throw('A SUBDIRECTORY OR FILE ' + nameId + ' ALREADY EXISTS.');
			};
		}
			
    var parent = currDir;
    var node = {
        id: nameId,
        text: nameId,
        icon: "./images/folder.png"
    };
    var ref = $('#jstree').jstree('create_node', parent, node, 'last');
}
function deleteDir(nameId) {
	$('#jstree').jstree('deselect_node', currDir);
    $('#jstree').jstree('select_node', nameId);
    var targetData = $('#jstree').jstree('get_selected', nameId);

	$('#jstree').jstree('delete_node', targetData);


	$('#jstree').jstree('deselect_all');
	$('#jstree').jstree('select_node', currDir);

}

function renameDir(nameId,newNameId) {
	$('#jstree').jstree('deselect_node', currDir);
    $('#jstree').jstree('select_node', nameId);
    var targetData = $('#jstree').jstree('get_selected', nameId);

	$("#jstree").jstree('set_text', nameId , newNameId );
	$("#jstree").jstree('rename_node', '#0' , newNameId );
	//$("#jstree").jstree(true).rename_node(nameId, newNameId);

	$('#jstree').jstree('deselect_all');
	$('#jstree').jstree('select_node', currDir);

}

function moveUpDir() {

    var temp = $('#jstree').jstree('get_parent', currDir);

    $('#jstree').jstree('deselect_node', currDir);

    currDir = temp;

    updateTreePath();
}


function moveIntoDir(Obj) {

    var isCurrentParent = $('#jstree').jstree('is_parent', currDir);
    if (isCurrentParent) {
        var nextInPath = $('#jstree').jstree('get_children_dom', currDir);

        for (i = 0; i < nextInPath.length; i++) {
            var nextId = nextInPath[i].id;

            if (nextId == Obj) {
                $('#jstree').jstree('deselect_node', currDir);
                $('#jstree').jstree('select_node', nextId);
                $('#jstree').jstree('open_node', nextId);

                currDir = nextId;
                updateTreePath();
                break;
            }else{
				console.log('else');
				
			};
        }
    }
}


// DIR or DIR/directory - returns list 
function showDirList(Obj) {

    var target = Obj || currDir;

    $('#jstree').jstree('open_node', target);
    var nextInPath = $('#jstree').jstree('get_children_dom', target);

    print_line('Directory of ' + getPath(target));

    for (i = 0; i < nextInPath.length; i++) {
        var nextId = nextInPath[i].id;
console.log(nextInPath[i]);
        var isGrandParent = $('#jstree').jstree('get_parent', target);
        var isCurrentParent = $('#jstree').jstree('get_parent', nextId);
        if (isCurrentParent == currDir || isGrandParent == currDir) {
            print_line(nextId);

        } else {
            print_line('The system cannot find the path specified.');
            break;

        }

    }
    $('#jstree').jstree('deselect_node', target);
    print_newline();
    updateTreePath();


}