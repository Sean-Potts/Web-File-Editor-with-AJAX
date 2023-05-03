/*   FILE          : jQuery.js
*    PROJECT       : A-07: JQUERY AND JSON BASED TEXT EDITOR
*    PROGRAMMERS   : Sean Potts, Jacob Psutka
*    FIRST VERSION : 2022-12-09
*    DESCRIPTION   : This file provides javascript with jQuery and ajax calls to startPage.aspx.cs methods. This js file populates the drop-down menu with file names
*		     on page startup. This js script also creates the .click for both the save and load button as well. 
*/

// global variable - for use in jQuery (AJAX) calls
var jQueryXMLHttpRequest;


// get the file list on document ready and enables the buttons to be clicked
$(document).ready(function () {
    getFilesInPath();
    buttonReadySave();
    buttonReadyLoad();
});

// readys the save button to call saveTextToFile when clicked
function buttonReadySave() {
    $("#Save").click(saveTextToFile);
}

// readys the load button to call openAndReadFileContents when clicked
function buttonReadyLoad() {
    $("#Load").click(openAndReadFileContents);
}


/*
* FUNCTION :        openAndReadFileContents()
* DESCRIPTION :	This function when called loads text from the text file selected in the drop-down menu. this function calls OpenFile in the code behind.
* RETURNS :
*/
function openAndReadFileContents() {

    var openFileData = document.querySelector('#fileOptions').value;                  // variable to hold the file's contents (if opened)

    //build the outgoing JSON parameter being passed in the C# (code behind) entry point
    var jsonData = { fileToLoad: openFileData };
    var jsonString = JSON.stringify(jsonData);

    jQueryXMLHttpRequest = $.ajax({
        type: "POST",
        url: "startPage.aspx/OpenFile",
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.d != null) {
                var response;

                //we need to parse it to JSON - this code is used if the file is found and also if the file is not found
                response = $.parseJSON(data.d);

                document.getElementById("statusMessage").innerHTML = "File loading status : <b>" + response.status + "</b>";
                document.getElementById("textContentArea").value = response.description;
            }
        },
        fail: function () {
            document.getElementById("statusMessage").innerHTML = "The call to the WebMethod failed!";
        }

    });
}


/*
* FUNCTION :        SaveToFile()
* DESCRIPTION : This function when called saves text from the text area to the selected element in the drop-down menu. this function calls SaveFile in the code behind.
* RETURNS :
*/
function saveTextToFile() {
    openfileData = "mySampleFile.txt";      // name of file to open
    var openFileData = document.querySelector('#fileOptions').value;                  // variable to hold the file's contents (if opened)
    var textContent = document.getElementById("textContentArea").value

    // build the outgoing JSON parameter
    var jsonData = { fileToSave: openFileData, fileTextContent: textContent };
    var jsonString = JSON.stringify(jsonData);


    jQueryXMLHttpRequest = $.ajax({
        type: "POST",
        url: "startPage.aspx/SaveFile",
        data: jsonString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.d != null) {
                var response;

                // parse it to JSON
                response = $.parseJSON(data.d);

                document.getElementById("statusMessage").innerHTML = "File saving status : <b>" + response.status + "</b>";
            }
        },
        fail: function () {
            document.getElementById("statusMessage").innerHTML = "The call to the WebMethod failed!";
        }

    });

}



/*
* FUNCTION :        getFilesInPath()
* DESCRIPTION :	This function is called when the pages loads to create options in the drop-down menu with file names that are acquired from the 
* 		call to GetFiles in the code behind. 
* RETURNS :
*/
function getFilesInPath() {

    jQueryXMLHttpRequest = $.ajax({
        type: "POST",
        url: "startPage.aspx/GetFiles",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.d != null) {
                var response;

                // parse it to JSON
                response = $.parseJSON(data.d);

                document.getElementById("statusMessage").innerHTML = "File saving status : <b>" + response.status + "</b>";

                var dropdown = document.getElementById("fileOptions");
                for (var i = 0; i < response.fileReturn.length; i++) {
                    var option = document.createElement("option");
                    option.value = response.fileReturn[i];
                    option.text = response.fileReturn[i];
                    dropdown.appendChild(option)
                }
            }
        },
        fail: function () {
            document.getElementById("statusMessage").innerHTML = "The call to the WebMethod failed!";
        }

    });
}