 						var term;
 						var input;
 						var textWidth = 70

 						var workingDir = '';
 						var path = [];

 						var print = function(text) {

 						    var rest = "";
 						    if (text.length > textWidth) {
 						        // Wrap!
 						        rest = text.substr(textWidth + 1);
 						        text = text.substr(0, textWidth);
 						    }
 						    term.insertBefore(document.createTextNode(text), input);
 						    input.scrollIntoView(false);
 						    if (rest.length > 0) {
 						        // Recurse for next line
 						        print_newline();
 						        print(rest);
 						    }
 						}

 						 // Drop down to a new line
 						var print_newline = function(text) {
 						    term.insertBefore(document.createElement("br"), input);
 						    input.focus();
 						}

 						 // Print a whole line
 						var print_line = function(line) {
 						    print(line);
 						    print_newline();
 						}

 						var print_dir = function(text) {
 						    term.insertBefore(document.createTextNode(text), input);
 						    input.focus();
 						}

 						 ///////////// path setting from tree to the terminal		

 						function updateTreePath() {
 						    workingDir = '';
 						    var temp = getPath();
 						    //	console.log(temp);

 						    workingDir = temp;
 						    print_line(workingDir);
 						}

 						 ////////////////////

 					var	initTerminal = function() {


 						    term = document.getElementById("term");
 						    input = document.getElementById("input");


 						    print_line("Microsoft Windows [Version 10.0.14393]");
 						    updateTreePath();
							


 						    var handler = function(event) {


 						        if (input.value === null) {
 						            return;
 						        }

 						        if (input === document.activeElement) {
 						            var selection = window.getSelection();
 						            var selection_start = selection.anchor_offset;
 						        }

 						        input.value = input.value.toUpperCase();

 						        // Get any typed lines
 						        while (input.value.indexOf("\n") != -1) {
 						            var newline = input.value.indexOf("\n");

 						            if (newline != -1) {
 						                var command = input.value.substr(0, newline);
 						                input.value = input.value.substr(newline);
 						                selection_start -= newline;
 						                //console.log(command);
 						                while (input.value.length > 0 && input.value[0] ==
 						                    "\n") {
 						                    // Get rid of all the newlines in a row.
 						                    input.value = input.value.substr(1);
 						                    selection_start--;
 						                }

 						                print(command);
 						                print_newline();
 						                try {
 						                    interpret(command);
 						                    //	print_line(workingDir);	
 						                } catch (error) {
 						                    print("ERROR: ".concat(error));
 						                    print_newline();

 						                }

 						            }

 						        }

 						        return true;
 						    };

 						    input.addEventListener("input", handler);
 						    input.addEventListener("keydown", function(event) {
 						        if (event.which == 13) { // CR carriage return from stack overflow
 						            // Handle enter even when no text is there.
 						            input.innerText = input.innerText.concat("\n");
 						            handler(event);
 						        }
 						    });
							//try to prevent schrolling behaviour 
 						    document.addEventListener("keyup", function(event) {
 						      /*  input.onfocus = function () {
								window.scrollTo(0, 0);
								document.body.scrollTop = 0;
							} */
 						    });	
 						    document.addEventListener("keydown", function(event) {
 						        if (event.keyCode == 27) {
 						            // Got an escape
 						            running = false;
 						        }
 						    });

 						    document.addEventListener("click", function(event) {
 						        input.focus();
							//	window.scrollTo(0, 0);
							//	document.body.scrollTop = 0;
 						    });

							

 						};