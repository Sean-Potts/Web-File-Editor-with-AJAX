/*   FILE          : startPage.aspx.cs
*    PROJECT       : A-07: JQUERY AND JSON BASED TEXT EDITOR
*    PROGRAMMERS   : Sean Potts, Jacob Psutka
*    FIRST VERSION : 2022-12-09
*    DESCRIPTION   : code behide for the startpage
*/


using System;
using System.Web;
using System.Web.Services;
using System.IO;
using Newtonsoft.Json;

namespace WDD_A_07
{
    public partial class startPage : System.Web.UI.Page
    {
        [WebMethod]
        // METHOD:          OpenFile()
        // DESCRIPTION:     opens the file for reading or writing
        // PARAMETERS:      string: 
        // RETURNS:
        public static new string OpenFile(string fileToLoad)
        {
            string returnData;
            string fileStatus;
            string fileContents;
            string filepath;

            try
            {
                // get file path
                filepath = HttpContext.Current.Server.MapPath("MyFiles");
                filepath = filepath + @"\" + fileToLoad;

                // check if filepath exists
                if (File.Exists(filepath))
                {
                    fileStatus = "Success";
                    fileContents = File.ReadAllText(filepath);
                }
                else
                {
                    fileStatus = "Failure";
                    fileContents = "File doesn't exist";
                }
            }
            catch (Exception e)
            {
                // exception string
                fileStatus = "Exception";
                fileContents = "Something bad happened : " + e.ToString();
            }
            //return data
            returnData = JsonConvert.SerializeObject(new { status = fileStatus, description = fileContents });
            return returnData;
        }


        [WebMethod]
        // METHOD:          SaveFile()
        // DESCRIPTION:     saves the text from within the text box
        // PARAMETERS:      string: file to save and the content of the textbox
        // RETURNS:         string: data
        public static new string SaveFile(string fileToSave, string fileTextContent)
        {
            string returnData;
            string fileStatus;
            string fileContents;
            string filepath;


            try
            {
                // find file path
                filepath = HttpContext.Current.Server.MapPath("MyFiles");
                filepath = filepath + @"\" + fileToSave;

                if (File.Exists(filepath))
                {
                    // file found successfuly
                    fileStatus = "Success";
                    File.WriteAllText(filepath, fileTextContent); // write to the file
                    fileContents = File.ReadAllText(filepath);
                }
                else
                {
                    // file doesnt exist
                    fileStatus = "Failure";
                    fileContents = "File doesn't exist" + fileToSave + "\n" + fileTextContent;
                }
            }
            catch (Exception e)
            {
                // Exception error
                fileStatus = "Exception";
                fileContents = "Error: " + e.ToString();
            }

            // return data
            returnData = JsonConvert.SerializeObject(new { status = fileStatus, description = fileContents });
            return returnData;
        }


        [WebMethod]
        // METHOD:          GetFiles()
        // DESCRIPTION:     gets the file in the specified directory
        // PARAMETERS:      string: file to get
        // RETURNS:         string: return data
        public static new string GetFiles()
        {
            string returnData;
            string fileStatus;
            string fileContents;
            string filepath;
            string[] filesInPath;

            try
            {
                // get the filepath
                filepath = HttpContext.Current.Server.MapPath("MyFiles");

                // get the files in the file path
                filesInPath = Directory.GetFiles(filepath);

                // return just the files
                for (int i = 0; i < filesInPath.Length; i++)
                {
                    filesInPath[i] = Path.GetFileName(filesInPath[i]);
                }

                if (filesInPath.Length > 0)
                {
                    // files found
                    fileStatus = "Success: Files found in directory";
                    fileContents = "Files in path";
                }
                else
                {
                    // no file in directory err
                    fileStatus = "Error: No Files in directory";
                    fileContents = "File doesn't exist";
                }
            }
            catch (Exception e)
            {
                // Exception string
                fileStatus = "Exception";
                fileContents = "Error: " + e.ToString();
                filesInPath = null;
            }

            // return data
            returnData = JsonConvert.SerializeObject(new { status = fileStatus, description = fileContents, fileReturn = filesInPath });
            return returnData;
        }
    }
}