'use strict'
/**
 * @name: Panel 
 */
var _panel=function(name,visible,panelClass){
	var self=this;
	self.name=name || null;
	self.visible=visible || false;
	self.panelClass=panelClass || "";
}
_panel.prototype.constructor=_panel;


angular.module('pinnacle.ui').value('Panel',_panel);
