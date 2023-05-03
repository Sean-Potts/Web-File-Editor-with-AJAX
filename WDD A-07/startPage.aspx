<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="startPage.aspx.cs" Inherits="WDD_A_07.startPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

    <head runat="server">
        <title>Assignment 07</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script type = "text/javascript" src = "jQuery.js"></script>
        <link href="~/CSS.css" rel="stylesheet" type="text/css" />
    </head>

    <body runat="server" class="style">
        <div runat="server">
         
            <div>
                <h2>WDD Assignment 07</h2>
            </div>

            <div>
                <select name ="fileOptions" id = "fileOptions"></select>
            </div>

            <div>
                <textarea id="textContentArea" rows="15" cols="60" onclick="clearSaveAsError()"></textarea>
            </div>

            <div class="notification">
                <p id="statusMessage"></p>
            </div>

            <div>
                <button id="Save">Save</button>
                <button id="Load">Load</button>
            </div>

        </div>
    </body>
</html>