    var LETTERS = /[a-z]/i;
    var NUMBERS = /[0-9]/;
    var echoState = true;

    var interpret = function(command) {
        command = command.trim();
		console.log(command);
        parts = scan_token(command);
        token = parts[0];

        command = parts[1];

        if (token === null) {
            throw "NO COMMAND";
        }

        if (!command_functions.hasOwnProperty(token)) {
            throw "UNKNOWN COMMAND \"".concat(token, "\"");
        }

        command_functions[token].do(command);
    }

    // return an array of the first token (or null if there is none) and the rest of the input.
    var scan_token = function(input) {
        input = input.trim();

        var in_quotes = false;

        for (var i = 0; i < input.length; i++) {
            if (input[i] == "\"") {
                // Quotes make us ignore everything
                in_quotes = !in_quotes;
            }
            if (!in_quotes) {
                if (input[i] == " ") {
                    // We found the end of the first token
                    break;
                }

                if (input[i] == ".") {

                    if (i === 0) {
                        // Read the fullstop
                        i++;
                        break;
                    } else {
						
                        break;
                    }
                }
            }
        }

        if (in_quotes) {
            // Complain!
            throw "UNTERMINATED STRING LITERAL";
        }

        var token;
        if (input.length === 0) {
            token = null;
        } else {
            token = input.substr(0, i);
            input = input.substr(i).trim();
        }

        return [token, input];
    };



    var command_functions = {		
        "CD": {
            "help": "DISPLAYS THE NAME OF OR CHANGES THE CURRENT DIRECTORY.",
            "do": function(args) {
                if (args == "..") {
                    moveUpDir();
                } else {

                    while (args.length > 0) {
                        parts = scan_token(args);
                        token = parts[0];
                        args = parts[1];

                        if ((token)) {
                            moveIntoDir(token);
                        }

                    }

                }
            }
        },
        "CLS": {
            "help": "CLEARS THE SCREEN.",
            "do": function(args) {
                // Clear the screen, by removing all the children before the input box.
                while (term.firstChild && term.firstChild != input) {
                    term.removeChild(term.firstChild);
                }
                updateTreePath();
            }
        },
        "COPY": {
            "help": "COPIES ONE OR MORE FILES TO ANOTHER LOCATION.",
            "do": function(args) {
                // Clear the screen, by removing all the children before the input box.
                while (term.firstChild && term.firstChild != input) {
                    term.removeChild(term.firstChild);
                }
                updateTreePath();
            }
        },	
        "DEL": {
            "help": "DELETES ONE OR MORE FILES.",
            "do": function(args) {
				   parts = scan_token(args);

                    token = parts[0];
                    args = parts[1];
				//alert(token);
                deleteDir(token);

            }
        },	
        "DIR": {
            "help": "DISPLAYS A LIST OF FILES AND SUBDIRECTORIES IN A DIRECTORY.",
            "do": function(args) {
                showDirList(args);
                //('DIR list commands');
            }
        },		
        "EXIT": {
            "help": "QUITS THE CMD.EXE PROGRAM (COMMAND INTERPRETER).",
            "do": function(args) {
                // Clear the screen, by removing all the children before the input box.
                while (term.firstChild && term.firstChild != input) {
                    term.removeChild(term.firstChild);
                }
                updateTreePath();
				print_line("The terminal would now be closed.");
            }
        },		
        "ECHO": {
            "help": "DISPLAYS MESSAGES, OR TURNS COMMAND ECHOING ON OR OFF.",
            "do": function(args) {
                // Print out the given tokens
                var to_print = "";
                if (!args) { // Only ECHO entered
                    var printEchoState = (echoState ? "on." : "off.");
                    print_line('Echo is ' + printEchoState);
                    return;
                }
                while (args.length > 0) {
                    parts = scan_token(args);

                    token = parts[0];
                    args = parts[1];

                    to_print = to_print.concat(token + " ");
                    if (token == ">") { // make a text file with args

                        createFile(args);
                        return;
                    }
                }

                // Actually print
                print(to_print);
                print_newline();
            }
        },
        "HELP": {
            "help": "PROVIDES HELP INFORMATION FOR WINDOWS COMMANDS.",
            "do": function(args) {
                parts = scan_token(args);
                token = parts[0];
                args = parts[1];

                if (token === null) {

                    for (var prop in command_functions) {
                        print_line(prop + ": " + command_functions[prop]
                            ["help"]);
                        //print_line( command_functions[prop]["help"]);
                    }

                } else {
                    if (command_functions.hasOwnProperty(token)) {
                        // Document a command
                        print(command_functions[token].help);
                        print_newline();
                    } else {
                        // No idea what this is.
                        throw "UNKNOWN HELP TOPIC";
                    }
                }
            }
        },	
        "MD": {
            "help": "CREATES A DIRECTORY.",
            "do": function(args) {
                // Print out the given tokens
                var temp = [];
                if (!args) { // Only ECHO entered
					throw "NO FOLDER NAME PROPERTY";
                    return;
                }
                while (args.length > 0) {
                    parts = scan_token(args);

                    token = parts[0];
                    args = parts[1];

					if (LETTERS.test(token)) {
						temp[temp.length] = token;
					console.log(token);
							}else{
							throw "INVALID NAME PROPERTY" + " \"" + token + "\"";	
								
							} 
				
                }
				     // make folder or folders
						 for ( i=0; i<temp.length ;i++ ) {
							createFolder(temp[i])
                     //   createFolder(args);
						}
                        return;
                    

            }
        },		
        "MKDIR": {
            "help": "CREATES A DIRECTORY.",
            "do": function(args) {
                // Print out the given tokens
                var temp = [];
                if (!args) { // Only ECHO entered
					throw "NO FOLDER NAME PROPERTY";
                    return;
                }
                while (args.length > 0) {
                    parts = scan_token(args);

                    token = parts[0];
                    args = parts[1];

					if (LETTERS.test(token)) {
						temp[temp.length] = token;
					console.log(token);
							}else{
							throw "INVALID NAME PROPERTY" + " \"" + token + "\"";	
								
							} 
				
                }
				     // make folder or folders
						 for ( i=0; i<temp.length ;i++ ) {
							createFolder(temp[i])
                     //   createFolder(args);
						}
                        return;
                    

            }
        },		
        "REN": {
            "help": "RENAMES A FILE OR FILES.",
            "do": function(args) {
				   parts = scan_token(args);

                    token = parts[0];
                    args = parts[1];
				
                renameDir(token,args);

            }
        }		
		
    };