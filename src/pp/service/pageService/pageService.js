'use strict'
/**
 * @name: pageService 
 */
angular.module('pinnacle.ui')
.factory('pageService',[function(){
	var _panels=[];
	var _addPanel=function(panel){
		if(isValidPanel(panel)){
			if(!_selectPanel(panel.name)){
				_panels.push(panel);
			}else{
				throw new Error('Panel already exists');
			}
		}else{
			throw new Error('Invalid panel name '+panel.name)
		}
		return panel;
	}
	var _selectPanel=function(name){
		var _panel=null;
		if(!name){
			return _panel;
		}
		angular.forEach(_panels,function(_panel_){
			if(name===_panel_.name){
				_panel=_panel_;
				return;
			}
		});
		return _panel;
	}
	var _hidePanel=function(name){
		//_panels[name].visible=false;
		return _togglePanel(name,false)
	}
	var _showPanel=function(name){
		return _togglePanel(name,true);
	}
	var _togglePanel=function(name,visibility){
		if(name){
			if(angular.isDefined(visibility)){
				angular.forEach(_panels,function(_panel_){
				  if(name===_panel_.name){
					  _panel_.visible=visibility;
					  
					  return _panel_;
				  }
			    });	
			}else{
				angular.forEach(_panels,function(_panel_){
				  if(name===_panel_.name){
					  _panel_.visible=!_panel_.visible;
					  
					  return _panel_;
				  }
			    });
			}
			//_panels[name].visible=!_panels[name].visible;
		}
		return false;
	}
	function isValidPanel(panel){
		if(!panel){
			return false;
		}
		if(!panel.name){
			return false;
		}
		return true;
	}
	return {
		addPanel:_addPanel,
		hidePanel:_hidePanel,
		showPanel:_showPanel,
		selectPanel:_selectPanel,
		panels:_panels,
		togglePanel:_togglePanel
	}
}])
