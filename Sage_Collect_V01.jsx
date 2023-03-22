//date:08-03-2023
//by:David christopher

// This script will collect the png and render the project

var csvFile = new Folder();
var check = 0;
var csvFileData = [];

var mainWindow = new Window("palette", "Sage Collect", undefined);
mainWindow.orientation = "column";

var groupOne = mainWindow.add("panel", undefined, "File Settings");
groupOne.orientation = "Column";
groupOne.alignment = "center";

groupOne.add("statictext", undefined, "Select the Collect Folder");
var fileLoc = groupOne.add("edittext", undefined, "Select the Collect Folder");
fileLoc.size = [250, 25];

groupOne.add("statictext", undefined, "Select the Timecode for screen shot");
var timeSet = groupOne.add(
  "edittext",
  undefined,
  "select the Timecode for screen shot"
);
timeSet.size = [50, 25];
timeSet.text = "1";

var getFileButton = groupOne.add("button", undefined, "Select Folder");
getFileButton.helpTip = "Select the Collect Folder";
var collectButton = groupOne.add("button", undefined, "Collect");

mainWindow.center();
mainWindow.show();

// Button Functions
getFileButton.onClick = function () {
  csvFile = csvFile.selectDlg("Select the Collect Folder");
  fileLoc.text = csvFile.fsName;
  csvFileData = [];
  csvFileData.push(csvFile.fsName);
};

collectButton.onClick = function () {
  pngProject();
  renderproject();
  reduceProject();
  closeProject();
};

// Functions

function pngProject() {
  var items = app.project.activeItem;

  alert(csvFileData);
  var collectPngName = csvFileData[0] + "/" + items.name + ".png";
  var numcConvert = parseInt(timeSet.text);
  app.project.activeItem.saveFrameToPng(numcConvert, File(collectPngName));
  alert("PNG Saved");
}
function renderproject() {
  var Qcomp = app.project.activeItem;
  var bt = new BridgeTalk();
  if (!BridgeTalk.isRunning("ame")) {
    BridgeTalk.launch("ame", "background");
  }
  var renderAdded = app.project.renderQueue.items.add(Qcomp);
  var outPath = renderAdded.outputModule(1);
  outPath.file = File(csvFileData[0] + "/" + Qcomp.name);
  app.project.renderQueue.queueInAME(false);
}
function reduceProject() {
  var items = app.project.activeItem;
  app.project.reduceProject(items);
  app.beginSuppressDialogs();
  app.executeCommand(2482);
}
function closeProject() {
  app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
}
