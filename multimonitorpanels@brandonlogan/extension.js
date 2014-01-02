const Main = imports.ui.main;
const AppletManager = imports.ui.appletManager;
const St = imports.gi.St;
const Lang = imports.lang;
const Panel = imports.ui.panel;
const Mainloop = imports.mainloop;

var DEBUG = true;

/*Main.layoutManager._processPanelSettings = function() {
    _log("info", "IN PROCESS PANEL SETTINGS");
    if (this._processPanelSettingsTimeout) {
        Mainloop.source_remove(this._processPanelSettingsTimeout);
    }
    // delay this action somewhat, to let others do their thing before us
    this._processPanelSettingsTimeout = Mainloop.timeout_add(0, Lang.bind(this, function() {
        this._processPanelSettingsTimeout = 0;
        this._updateBoxes();
        this._chrome.modifyActorParams(this.panelBox, { affectsStruts: Main.panel && !Main.panel.isHideable() });
        this._chrome.modifyActorParams(this.panelBox2, { affectsStruts: Main.panel2 && !Main.panel2.isHideable() });
        this._chrome.modifyActorParams(this.panelBox3, { affectsStruts: Main.panel3 && !Main.panel3.isHideable() });
    }));
}

Main.layoutManager._updateBoxes = function() {
    _log("info", "IN UPDATE BOXES");
    this._updateHotCorners();

    let getPanelHeight = function(panel) {
        let panelHeight = 0;
        if (panel) {
            panelHeight = panel.actor.get_height();
        }
        return panelHeight;
    };

    let p1height = getPanelHeight(Main.panel);

    if (Main.desktop_layout == Main.LAYOUT_TRADITIONAL) {
        this.panelBox.set_size(this.bottomMonitor.width, p1height);
        this.panelBox.set_position(this.bottomMonitor.x, this.bottomMonitor.y + this.bottomMonitor.height - p1height);
    }
    else if (Main.desktop_layout == Main.LAYOUT_FLIPPED) {
        this.panelBox.set_size(this.primaryMonitor.width, p1height);
        this.panelBox.set_position(this.primaryMonitor.x, this.primaryMonitor.y);
    }
    else if (Main.desktop_layout == Main.LAYOUT_CLASSIC) { 
        let p2height = getPanelHeight(Main.panel2);
        let p3height = getPanelHeight(Main.panel3);

        this.panelBox.set_size(this.primaryMonitor.width, p1height);
        this.panelBox.set_position(this.primaryMonitor.x, this.primaryMonitor.y);

        this.panelBox2.set_size(this.bottomMonitor.width, p2height);
        this.panelBox2.set_position(this.bottomMonitor.x, this.bottomMonitor.y + this.bottomMonitor.height - p2height);
        this.panelBox3.set_size(this.primaryMonitor.width, p3height);
        //this.panelBox3.set_position( Main.layoutManager.bottomMonitor.x + Main.layoutManager.bottomMonitor.width, Main.layoutManager.primaryMonitor.y);
    }

    this.keyboardBox.set_position(this.bottomMonitor.x,
                                  this.bottomMonitor.y + this.bottomMonitor.height);
    this.keyboardBox.set_size(this.bottomMonitor.width, -1);
    this._chrome._queueUpdateRegions();
}

Main.layoutManager._updatePanelBarriers = function(panelBox) {
    _log("info", "IN UPDATE PANEL BARRIERS");
    let leftPanelBarrier;
    let rightPanelBarrier;
    if (panelBox==this.panelBox){
        leftPanelBarrier = this._leftPanelBarrier;
        rightPanelBarrier = this._rightPanelBarrier;
    }else{
        leftPanelBarrier = this._leftPanelBarrier2;
        rightPanelBarrier = this._rightPanelBarrier2;
    }
    if (leftPanelBarrier)
        global.destroy_pointer_barrier(leftPanelBarrier);
    if (rightPanelBarrier)
        global.destroy_pointer_barrier(rightPanelBarrier);

    if (panelBox.height) {                        
        if ((Main.desktop_layout == Main.LAYOUT_TRADITIONAL && panelBox==this.panelBox) || (Main.desktop_layout == Main.LAYOUT_CLASSIC && (panelBox==this.panelBox2 || panelBox==this.panelBox3) ) {
            let monitor = this.bottomMonitor;
            leftPanelBarrier = global.create_pointer_barrier(monitor.x, monitor.y + monitor.height - panelBox.height,
                                                             monitor.x, monitor.y + monitor.height,
                                                             1 );
            rightPanelBarrier = global.create_pointer_barrier(monitor.x + monitor.width, monitor.y + monitor.height - panelBox.height,
                                                              monitor.x + monitor.width, monitor.y + monitor.height,
                                                              4 );
        }
        else {
            let primary = this.primaryMonitor;
            leftPanelBarrier = global.create_pointer_barrier(primary.x, primary.y,
                                                             primary.x, primary.y + panelBox.height,
                                                             1 );
            rightPanelBarrier = global.create_pointer_barrier(primary.x + primary.width, primary.y,
                                                              primary.x + primary.width, primary.y + panelBox.height,
                                                              4 );
        }
    } else {
        leftPanelBarrier = 0;
        rightPanelBarrier = 0;
    }
    if (panelBox==this.panelBox){
        this._leftPanelBarrier = leftPanelBarrier;
        this._rightPanelBarrier = rightPanelBarrier;
    }else{
        this._leftPanelBarrier2 = leftPanelBarrier;
        this._rightPanelBarrier2 = rightPanelBarrier;
    }
}*/

function enable(){
    
    var panels = [new Panel.Panel(true, false)];
    var pb = new St.BoxLayout({ name: 'panelBox', vertical: true });
    var pb_x = Main.layoutManager.bottomMonitor.x + Main.layoutManager.bottomMonitor.width;
    var pb_y = Main.layoutManager.primaryMonitor.y;
    _log("info", "pb_x: " + pb_x + ", pb_y: " + pb_y);
    Main.layoutManager.panelBox2.set_position(1950, 200);
    //pb.set_position(pb_x - 100, pb_y + 5);
    //Main.panel3 = panels[0];
    //panels[0].actor.add_style_class_name('panel-top')
    //pb.add(panels[0].actor);
    _log("warning", "HELLLOOOOOOOOOOOOO");
    //Main.layoutManager.panelBox3 = pb;
    Main.layoutManager.addChrome(pb, { addToWindowgroup: false });
    pb.connect('allocation-changed', Lang.bind(Main.layoutManager, Main.layoutManager._updatePanelBarriers));
    Main.layoutManager._updateBoxes();
    //Main.layoutManager.init()
    setTimeout(after, 1000);
}

function after(){
    _log("info", "AFTER");
}

function disable(){

}

function init(){

}

function _log(type, msg){
    if (DEBUG){
        Main._log(type, msg);
    }
}
