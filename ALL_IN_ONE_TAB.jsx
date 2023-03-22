function DockableUI(thisObj) {
    var dialog = thisObj instanceof Panel ? thisObj : new Window("palette", "All_In_One", undefined, undefined, {resizeable: false});
    dialog.onResizing = dialog.onResize = function(){
        this.layout.resize();
        };
    return dialog;
    }

function showWindow(myWindow){
    if(myWindow instanceof Window){
        myWindow.center();
        myWindow.show();
        }
    if(myWindow instanceof Panel){
        myWindow.layout.layout(true);
        myWindow.layout.resize();
        }
    }
var mainWindow = DockableUI (this);
var groupOne = mainWindow.add("group",undefined,"groupOne");
groupOne.alignment = "center";
    var tpanel = mainWindow.add("tabbedpanel",undefined);
        var createTab = tpanel.add("tab",undefined,"Create");
        createTab.alignChildren = "fill";
         var diffTab = tpanel.add("tab",undefined,"Difference Check");
        diffTab.alignChildren = "fill";
        // Comp Builder
//========================================================= TAB 1
//File Presets

filetypes = ["1920x1080 (16x9) --23-98fps","1920x1080 (16x9) --25fps","1080x1920 (9x16) --25fps","1080x1080 (1x1) --25fps","1080x1350 (4x5) --25fps","Manual"];
var impfile = Folder("~/Desktop/test/").getFiles();
var importFl;



//Script UI

var createSubTab = createTab.add("panel",undefined,"");
createSubTab.orientation= "column";

//GroupTwo

var groupTwo = createSubTab.add("group",undefined,"groupTwo");
groupTwo.orientation = "row";
groupTwo.alignment = "center";
var staticText = groupTwo.add("StaticText",undefined,"File Name:");
var Filename = groupTwo.add("edittext",undefined,"Paste the File Name Here");
Filename.size = [250,25];
Filename.helpTip = "framerates_AE001 will be added automatically";
groupTwo.add("StaticText",undefined,"_Framerate_AE001");

//GroupThree

var groupThree = createSubTab.add("group",[15,0,400,30],"groupThree");
groupThree.orientation = "row";
groupThree.alignment = "left";
groupThree.add("StaticText",[0,1,50,30],"Presets:");
var compsize = groupThree.add("dropdownlist",[46,0,300,25],filetypes);
compsize.selection = 1;

// Manual button column.

var groupSeven = createSubTab.add("group",undefined,"groupSeven");
groupSeven.orientation = "row";
groupSeven.alignment = "left";
groupSeven.add("statictext",undefined,"Manual:");
groupSeven.add("statictext",undefined,"Width");
var manualWidth = groupSeven.add("edittext",undefined,"");
 manualWidth.size = [50,25];
 manualWidth.enabled = false;
groupSeven.add("statictext",undefined,"Height");
var manualHeight = groupSeven.add("edittext",undefined,"");
manualHeight.size = [50,25];
manualHeight.enabled = false;
groupSeven.add("statictext",undefined,"Fps");
var manualFps = groupSeven.add("edittext",undefined,"");
manualFps.size = [50,25];
manualFps.enabled = false;

//GroupFive

var groupFive = createSubTab.add("panel",undefined,"Folder preset:");
groupFive.orientation = "row";
var groupfivesub1 = groupFive.add("group",undefined,"groupfivesub1");
groupfivesub1.orientation = "column";
var groupfivesub2 = groupFive.add("group",undefined,"groupfivesub2");
groupfivesub2.orientation = "column";
var folder1 = groupfivesub1.add("checkbox",[18,44,150,64],"00_Render_Comps");
folder1.value =1;
var folder2 = groupfivesub1.add("checkbox",[18,64,150,84],"01_Precomps");
folder2.value =1;
var folder3 = groupfivesub1.add("checkbox",[18,84,150,104],"02_Artwork");
folder3.value =1;
var folder4 = groupfivesub1.add("checkbox",[18,104,150,124],"03_Footage");
folder4.value =1;
var folder5 = groupfivesub1.add("checkbox",[18,124,150,144],"04_Reference");
folder5.value =1;
var folder6 = groupfivesub2.add("checkbox",[142,124,290,144],"05_3D_Elements");
folder6.value =1;
var folder7 = groupfivesub2.add("checkbox",[142,144,290,164],"06_Imported_AFX_Projects");
folder7.value =1;
var folder8 = groupfivesub2.add("checkbox",[142,164,290,184],"07_Audio");
folder8.value =1;
var folder9 = groupfivesub2.add("checkbox",[142,204,290,224],"Solids");
folder9.value =1;

//GroupFour

var groupFour = createSubTab.add("group",undefined,"groupFour");
groupFour.alignment = "center";
var createBT = groupFour.add("button",undefined,"Create");
createBT.size = [75,25];

//GroupSix

var groupsix = createSubTab.add("group",undefined,"groupsix");
groupsix.orientation = "column";
groupsix.alignment = "center";
var progress = groupsix.add("progressbar",undefined,"");
progress.size = [165,25];
var progresstext =groupsix.add("statictext",undefined,"Ready!!!");
progresstext.size =[250,25];
progresstext.justify = "center";
progresstext.helpTip ="Script by David Christopher"


//======================================================= UI FOR Difference check


// Difference Check by David Christopher


// global variables

var compArray = [];
var compArrayNames = [];
var VideoArray = [];
var VideoArrayNames = [];
var compFolder = null;
var solidsFolder;


for (var i = 1; i <= app.project.numItems; i++){
     if (app.project.item(i) instanceof FolderItem && app.project.item(i).name =="Solids"){
    solidsFolder = app.project.item(i);
    }
    if (app.project.item(i).hasVideo == true && app.project.item(i).file == null && app.project.item(i).parentFolder != solidsFolder) {
        compArray.push (app.project.item(i));
        compArrayNames.push (app.project.item(i).name);
        }
    if (app.project.item(i).hasVideo == true && app.project.item(i).hasAudio== true) {
        VideoArray.push (app.project.item(i));
        VideoArrayNames.push (app.project.item(i).name);
        }
    }


// ScriptUI

var diffSubTab = diffTab.add("panel",undefined,"Difference Checker");
diffSubTab.orientation= "column";

// Dropdown list

var groupEleven = diffSubTab.add("group",undefined,"groupEleven");
groupEleven.orientation = "row";
groupEleven.alignment = "center";
groupEleven.add("StaticText",undefined,"Main Comp");
var mainDD = groupEleven.add("dropdownlist",undefined,compArrayNames);
mainDD.size = [188,25];


var groupTwelve = diffSubTab.add("group",undefined,"groupTwelve");
groupTwelve.orientation = "row";
groupTwelve.alignment = "center";
groupTwelve.add("StaticText",undefined,"Difference File");
var diffDD = groupTwelve.add("dropdownlist",undefined,VideoArrayNames);
diffDD.size = [175,25];


var groupThirteen = diffSubTab.add("panel",undefined,"Render Setting:");
groupThirteen.orientation = "column";
groupThirteen.alignment = "center";
var renderQueue = groupThirteen.add("checkbox",undefined,"Add to Render Queue");
renderQueue.value = true;
var ameQueue = groupThirteen.add("checkbox",undefined,"Add to Media Encoder");

// Button code

var createButton = diffSubTab.add("group",undefined,"createButton");
createBT.orientation = "row";
var refreshbutton = createButton.add("button",undefined,"Refresh");
var mainbutton = createButton.add("button",undefined,"Create");


showWindow(mainWindow);


// Button Controls

Filename.onActivate = function (){
    Filename.text = "";
    progresstext.text ="Entering File Name";
    }

Filename.onDeactivate = function (){
    if (Filename.text === ""){
        alert("Please enter a File Name");
        }
        else
     {progress.value = 25;
       progresstext.text ="File Name Entered";
    }
}
compsize.onActivate = function(){
     progresstext.text ="File Name captured...Entering Comp Preset";
     }
 
compsize.onDeactivate = function(){
     progress.value = 50;
      progresstext.text ="Comp preset Captured";
     }
compsize.onChange = function(){
    deText();
    }


createBT.onClick = function (){
    if (Filename.text =="Paste the File Name Here"){
        alert("Please enter a File Name");
        } 
    else{
       
     Foldercreate();
      Createcomp();
     importfiles();
     progress.value = 100;
     progresstext.text ="Comp Created";
    }
}

// Main Functions

function Createcomp() {
    progress.value =100;
    var compName = Filename.text;
    if ( compsize.selection.text === "1920x1080 (16x9) --25fps"){
       var open = app.project.items.addComp(compName+"_HD1080_25fps_AE001",1920,1080,1,10,25);
      open.openInViewer();
        }
     if ( compsize.selection.text === "1080x1920 (9x16) --25fps"){
      var open = app.project.items.addComp(compName+"_HD_25fps_AE001",1080,1920,1,10,25);
      open.openInViewer();
        }
    if ( compsize.selection.text === "1080x1080 (1x1) --25fps"){
     var open = app.project.items.addComp(compName+"_HD1080_25fps_AE001",1080,1080,1,10,25);
      open.openInViewer();
        }
      if ( compsize.selection.text === "1080x1350 (4x5) --25fps"){
      var open = app.project.items.addComp(compName+"_HD_25fps_AE001",1080,1350,1,10,25);
      open.openInViewer();
        }
     if ( compsize.selection.text === "1920x1080 (16x9) --23-98fps"){
      var open = app.project.items.addComp(compName+"_HD1080_23-98fps_AE001",1920,1080,1,10,23.976);
      open.openInViewer();
        }
    if ( compsize.selection.text === "Manual"){
        var manWid = parseInt(manualWidth.text);
        var manHei = parseInt(manualHeight.text);
        var manFps = parseInt(manualFps.text);
      var open = app.project.items.addComp(compName+"_"+manualFps.text+"fps_AE001",manWid,manHei,1,10,manFps);
      open.openInViewer();
          }
      }  
function Foldercreate() {
    var read = app.project.items
    if (folder1.value == true ){
       var onefolder = read.addFolder("00_Render_Comps");
        }
     if (folder2.value == true ){
        read.addFolder("01_Precomps");
      
        }
     if (folder3.value == true ){
        read.addFolder("02_Artwork");
        }
     if (folder4.value == true ){
        read.addFolder("03_Footage");
        }
     if (folder5.value == true ){
      var refadd = read.addFolder("04_Reference");
         var refsubAdd = read.addFolder("Cages");
        refsubAdd.parentFolder = refadd;
                for (var i=0; i<impfile.length;i++){
                    importFl = app.project.importFile(new ImportOptions(impfile[i]));
                    importFl.parentFolder = refsubAdd;
                     }
        }
     if (folder6.value == true ){
        read.addFolder("05_3D_Elements");
        }
     if (folder7.value == true ){
        read.addFolder("06_Imported_AFX_Projects");
        }
     if (folder8.value == true ){
        read.addFolder("07_Audio");
        }
     if (folder9.value == true ){
        read.addFolder("Solids");
        }
    }

function deText() {
    if ( compsize.selection.text === "Manual"){
        manualWidth.enabled = true;
        manualHeight.enabled = true;
        manualFps.enabled = true;
        manualWidth.text = "";
        manualHeight.text = "";
        manualFps.text = "";
        }
  else {
       manualWidth.enabled = false;
        manualHeight.enabled = false;
        manualFps.enabled = false;
        if ( compsize.selection.text === "1920x1080 (16x9) --25fps"){
      manualWidth.text = "1920";
      manualHeight.text ="1080";
      manualFps.text = "25";
        }
     if ( compsize.selection.text === "1080x1920 (9x16) --25fps"){
     manualWidth.text = "1080";
      manualHeight.text ="1920";
      manualFps.text = "25";
        }
    if ( compsize.selection.text === "1080x1080 (1x1) --25fps"){
    manualWidth.text = "1080";
      manualHeight.text ="1080";
      manualFps.text = "25";
        }
      if ( compsize.selection.text === "1080x1350 (4x5) --25fps"){
      manualWidth.text = "1080";
      manualHeight.text ="1350";
      manualFps.text = "25";
        }
     if ( compsize.selection.text === "1920x1080 (16x9) --23-98fps"){
      manualWidth.text = "1920";
      manualHeight.text ="1080";
      manualFps.text = "23.98";
        }
    }
}

//============================================================= TAB 2


// Main Code Begins

renderQueue.onClick = function(){
    if (renderQueue.value=true){
    ameQueue.value =false;
        }
    }
ameQueue.onClick = function(){
     if (ameQueue.value =true){
    renderQueue.value =false;
            }
        }
mainbutton.onClick = function(){
    createCP();
    renderQ();
    }

refreshbutton.onClick = function(){
compReset();
videoReset();
}
// Main Function Code

function createCP() {
        var comlayer = compArray[mainDD.selection.index];
        var vidlayer = VideoArray[diffDD.selection.index];
        var getcomp = app.project.items.addComp(compArrayNames[mainDD.selection.index]+"_Difference".toString(),comlayer.width,comlayer.height,1,comlayer.duration,comlayer.frameRate);
        getcomp.openInViewer();
       // createMove ();
        addVideofile(comlayer,getcomp);
        addvideotwofile(vidlayer);
      
    }
function addVideofile(comlayer) {
    app.project.activeItem.layers.add(comlayer);
    }
function addvideotwofile(vidlayer){
   var newlayer = app.project.activeItem.layers.add(vidlayer);
     newlayer.blendingMode = BlendingMode.DIFFERENCE;
    }
function renderQ(){
      var Qcomp =app.project.activeItem;
      if ( renderQueue.value == true){
    app.project.renderQueue.items.add(Qcomp);
        }
     if ( ameQueue.value == true){
         var bt = new BridgeTalk();
         if (!BridgeTalk.isRunning("ame")){
             BridgeTalk.launch("ame","background");
             customAlert();
             }
      app.project.renderQueue.items.add(Qcomp);
   app.project.renderQueue.queueInAME(false);
        }
     }
function compReset(){
    
    compArrayNames = [ ];

for (var i = 1; i <= app.project.numItems; i++){
     if (app.project.item(i) instanceof FolderItem && app.project.item(i).name =="Solids"){
    solidsFolder = app.project.item(i);
    }
    if (app.project.item(i).hasVideo == true && app.project.item(i).file == null && app.project.item(i).parentFolder != solidsFolder) {
        compArray.push (app.project.item(i));
        compArrayNames.push (app.project.item(i).name);
        }
    }

mainDD.removeAll();

for(var i = 0; i<compArrayNames.length; i++){
mainDD.add('item', compArrayNames[i]);
        }
    
    
}

function videoReset(){
    
VideoArrayNames = [ ];

for (var i = 1; i <= app.project.numItems; i++){
    if (app.project.item(i).hasVideo == true && app.project.item(i).hasAudio== true) {
        VideoArray.push (app.project.item(i));
        VideoArrayNames.push (app.project.item(i).name);
        }
    }

diffDD.removeAll();
for(var i = 0; i<VideoArrayNames.length; i++){
diffDD.add("item",VideoArrayNames[i]);
    }
}


function customAlert(){
    customAlert('Media Encoder is Opening in The Background...', 4, 'Just a Moment...')
function customAlert(message, delaySeconds, title){
    title = title || 'Alert';
    var alertWindow = new Window('palette', title);
    var control_text = alertWindow.add('statictext', undefined, message);
    var control_text = alertWindow.add('statictext', undefined, "Your are Almost Done.");
    var control_text = alertWindow.add('statictext', undefined, "Have A Nice Day :-)");
    alertWindow.show();
    alertWindow.update();    
    if(delaySeconds > 0){
        $.sleep(delaySeconds * 1000);    
        alertWindow.hide();
        alertWindow = null;
        }  
    }  
    
}
function createMove(){
            for (var i = 1; i <= app.project.numItems; i++){
            if ((app.project.item(i) instanceof FolderItem) && (app.project.item(i).name == "08_Difference_check")){
                compFolder = app.project.item(i);
                alert(compFolder.name);
                    }
                    else{
                        if (compFolder === null) {
                            var compFolder = app.project.items.addFolder("08_Difference_check");
                    }
               }
        }
    for (var j = 1; j <= app.project.numItems;j++){
if ((app.project.item(j) instanceof CompItem)&& (app.project.item(j).name == getcomp)) {
app.project.item(j).parentFolder = compFolder;
}
    }
}

function imageAlertOne(){
    imageAlertOne(3,'Ready')
    function imageAlertOne(delaySec,titleHead){
        var alertWindowOne = new Window('palette',titleHead);
         var imgCT = alertWindowOne.add('image',undefined,impfile1);
         alertWIndowOne.show();
         AlretWindowOne.update();
          if(delaySeconds > 0){
        $.sleep(delaySeconds * 1000);
        alertWindowOne.hide();
        alertWindowOne = null;
        }  
    }
}