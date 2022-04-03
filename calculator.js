let on = false, lastprinted = "", currentfunc ="", memory; 
let buttons = document.querySelectorAll('input');
document.calculator.display.value=""

for (let button of buttons) {
    button.addEventListener('click', function (e) {
        let myInput = e.target.value;
        let myid = e.target.id;
        
        if (myInput == '00') {

            number(myInput);
        } else if (myInput == '0') {
            number(myInput);
        } else if (myInput == '1') {
            number(myInput);
        }  else if (myInput == '2') {
            number(myInput);
        } else if (myInput == '3') {
            number(myInput)
        }
        else if (myInput == '4') {
            number(myInput)
        }
        else if (myInput == '5') {
            number(myInput)
        }
        else if (myInput == '6') {
            number(myInput)
        }
        else if (myInput == '7') {
            number(myInput)
        }
        else if (myInput == '8') {
            number(myInput)
        }
        else if (myInput == '9') {
            number(myInput)
        }
         else if (myInput == '-') {
             
            func(myid.substring(4, 5))
        }
        else if (myInput == '/') {
            func(myid.substring(4, 5))
        }
        else if (myInput == 'x') {
            func(myid.substring(4, 5))
        }
        else if (myInput == '+') {
            func(myid.substring(4, 5))
        }
        else if (myInput == '%') {
            result(myid)
        }
        else if (myInput == '=') {
            result(myid)
        }
        else if (myInput == '.') {
            point()
        }
        else if (myInput == '+/-') {
            negative()
        }
        else if (myInput == 'on/c') {
            turn(myid);
        }
        else if (myInput == 'off') {
            turn(myid);
        }
        else if (myInput == 'ce') {
            turn(myid);
        }
        

    })
};



function testoverflow() {
    let overflowflag;
    if (memory >= 1000000000000) {
        turn("error");
        overflowflag = true;
    } else
        overflowflag = false;
    return overflowflag;
}

function findmaxlength(location) {
    let maxlength = 12;
    if (location.indexOf("-", 0) != -1) maxlength++;
    if (location.indexOf(".", 0) != -1) maxlength++;
    return maxlength;
}

function showresult(lg, hf) {
    memory = memory.toString();
    memory = parseFloat(memory.substring(0,findmaxlength(memory)));
    document.calculator.display.value = memory;
    lastprinted = lg;
    currentfunc = hf;
}

function turn(onoff) {
    if (onoff == "ce") {
        if (on) {
            document.calculator.display.value="0";
        }
    } else {
        switch (onoff) {
            case "onc":
                document.calculator.display.value="0";
                on = true;
                break;
            case "error":
                document.calculator.display.value = "ERROR";
                break;
            case "off":
                document.calculator.display.value="";
                on = false;
                break;
        } 
        currentfunc = "";
        memory = null;
    }
    lastprinted = "";
}

function number(input) {
    if (on) {
        if ((document.calculator.display.value.length < findmaxlength(document.calculator.display.value)) || (lastprinted != "number")) {
            if (!((document.calculator.display.value == "0") && ((input == "00") || (input == "0")))) {
                if ((lastprinted == "number")&&(document.calculator.display.value != "0")) {
                    document.calculator.display.value += input;
                    lastprinted = "number";
                } else if (input != "00") {
                    document.calculator.display.value = input;
                    lastprinted = "number";
                }
            }
        }
    }
}

function func(symbool) {
    if ((on) && (document.calculator.display.value != "ERROR")) {
        if (memory == null) {
            memory = parseFloat(document.calculator.display.value);
            lastprinted = "func";
            currentfunc = symbool;
        } else if ((document.calculator.display.value == "0") && (currentfunc == "/")) {
            turn("error");
        } else {
            eval("memory = " + memory + currentfunc + "(" + document.calculator.display.value +");");
            if (! testoverflow()) showresult("func", symbool);
        }
    }
}

function result(idname) {
    var value;
    if ((on) && (document.calculator.display.value != "ERROR")) { 
            if (memory != null) {
                value = document.calculator.display.value;
                eval("memory = " + memory + currentfunc + "(" + value +");");
                if (! testoverflow()) {
                    showresult("idname", "");
                    memory = null;
                }		
            }
    
    }
}

function point() {
    let maxlength = 12;
    if ((on) && (document.calculator.display.value != "ERROR")) {
        if (document.calculator.display.value.indexOf("-", 0) != -1) maxlength++;
        if (((lastprinted == "number") || (document.calculator.display.value="0")) && !(document.calculator.display.value.length >= maxlength) && (document.calculator.display.value.indexOf(".", 0) == -1)) {
            document.calculator.display.value += ".";
            lastprinted = "number";
        }
    }
}

function negative() {
    if ((on) && (lastprinted == "number") && (document.calculator.display.value != "ERROR")) {
        if (document.calculator.display.value.indexOf("-", 0) == -1) document.calculator.display.value = "-" + document.calculator.display.value;
        else document.calculator.display.value = document.calculator.display.value.substring(1,14);
    }
}