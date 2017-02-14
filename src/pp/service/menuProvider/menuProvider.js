'use strict'
/**
 * @name: menuProvider 
 */
angular.module('pinnacle.ui')
 .provider('menuProvider',['$stateProvider',function($stateProvider){
    var menuStore=[];
    var contextStore=[];
    var currentMenuViewContext=null;
    var _createRouteFromItem=function(item){
		var _route={
			   name:item.name,
			   url:item.url
			}
			if(item.uri.isTemplate()){
				_route.template=item.uri.link;
			}else{
				_route.templateUrl=item.uri.link;
			}
			
		return _route;
    }
	var menu={
		setMenu:function(items){
			angular.forEach(items,function(item){
			    $stateProvider.state(_createRouteFromItem(item));
			    menuStore.push(item);
			    //track context names
			    angular.extend(contextStore,item.viewContext.contexts);//
			});
			
		},
		buildContext:function(){
			//extract information from 
		},
		$get:function(){
			/**
			 * @param {String} contextName
			 * @param {String} groupName
			 */
			function _getMenu(contextName,groupName){
				//get context for this contextName
				var _items=null;
				angular.forEach(contextStore,function(_contextName){
					if(_contextName==contextName){
						
					}
				});
			}
			function _addItem(item){
				$stateProvider.state(_createRouteFromItem(item));
				menuStore.push(item)
				
			}
			function _getItem(name){
				
			}
			function _getCurrentMenuViewContext(){
				return currentMenuViewContext;
			}
			/**
			 * @param {String} stateName equivalent to item.name
			 */
			function _isContextState(stateName,callback){
				//does this item represents a viewContext link?
			    var _item=_getItem(stateName);
			    var _isCL=_item.isContextLink();
			    if(_isCL && callback){
			    	callback.apply(_item.viewContext.contextToTrigger) //true and callback defined
			    }else if(!_isCL && callback){ //false and callback defined
			    	callback.apply(null)
			    }else{
			    	return !_isCL || _item.viewContext.contextToTrigger;//if false return false else return contextName
			    }
			}
		    return {
			   getMenu:_getMenu,
			   addItem:_addItem,
			   getItem:_getItem,
			   getCurrentMenuViewContext:_getCurrentMenuViewContext
		    };
		}
	}
	return menu;
}])
