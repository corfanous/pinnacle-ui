'use strict'
angular.module('pinnacle.ui',
 ['ui.router','formly','formlyBootstrap','xeditable','ui.bootstrap'])


.value('DataObject',businessObject);

var businessObject=function(id,active){
	var self=this;
	self.id=id || 0;
	self.active=active || false;
};
businessObject.prototype={
	isNew:function(){
		return this.id==0;
	},
	isActive:function(){
		return this.active;
	},
	equals:function(object){
		if(typeof object !=typeof this){
			return false;
		}
		if(angular.equals(this.id,object.id) && angular.equals(this.code,object.code)){
			return true;
		}
		return false;
	}
};