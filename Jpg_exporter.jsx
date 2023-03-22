//searches for comps with a keyword and renders the middle and end of the comp to a folder of your choice as jpg

// by David christopher
//21/03/2023

var mainWindow = new Window("palette", "JPEG Exporter", undefined);
mainWindow.orientation = "column";

var groupOne = mainWindow.add("panel", undefined, "Search Keyword");
groupOne.orientation = "Column";
groupOne.alignment = "center";

groupOne.add("statictext", undefined, "Keyword for Search");
var keyWord = groupOne.add("edittext", undefined, " Type the Keyword");
keyWord.size = [250, 25];

groupOne.add("statictext", undefined, "Select the Output Folder");
var fileLoc = groupOne.add("edittext", undefined, "Select the Output Folder");
fileLoc.size = [250, 25];

var getFileButton = groupOne.add("button", undefined, "Select Folder");
getFileButton.helpTip = "Select the Collect Folder";

var collectButton = groupOne.add("button", undefined, "Collect");

mainWindow.center();
mainWindow.show();

//variables

var comp = app.project.activeItem;
var frame = comp.time;
var keywordText = keyWord.text;
var outFile = new Folder();

// Button Functions

getFileButton.onClick = function () {
  csvFile = outFile.selectDlg("Select the Collect Folder");
  fileLoc.text = csvFile.fsName;
};

function codeexecute() {
  var renderQueue = app.project.renderQueue;
  renderQueue.render();
}

function renderLocation() {
  var renderQueue = app.project.renderQueue;
  //loop through all items in render queue
  for (var i = 1; i <= renderQueue.numItems; i++) {
    var renderQueueItem = renderQueue.item(i);
    //loop through all output modules in render queue item
    for (var j = 1; j <= renderQueueItem.numOutputModules; j++) {
      var outputModule = renderQueueItem.outputModule(j);
      var outputname = outputModule.file.name;
      //set output module file
      outputModule.file = new File(fileLoc.text + "/" + outputname);
    }
  }
}
//change the file path in the render queue

collectButton.onClick = function () {
  for (var i = 1; i <= app.project.numItems; i++) {
    var items = app.project.item(i);
    if (items instanceof CompItem && items.name.indexOf(keywordText) != -1) {
      items.openInViewer();
      app.project.activeItem.time = app.project.activeItem.duration / 2;
      app.executeCommand(2104);
      items.openInViewer();
      app.project.activeItem.time = 2;
      app.executeCommand(2104);
    }
  }
  renderLocation();
  codeexecute();
};
