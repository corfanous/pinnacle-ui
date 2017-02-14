'use strict'
/**
 * @name: pPage
 * @description: describe the page and keep track of key page-panels 
 */
angular.module('pinnacle.ui')
.directive('pPage',
         ['$rootScope','pageService',
  function($rootScope,ps){
	return {
		restrict:'A',
		scope:{
		},
		link:function(scope,elem,attr,ctrl,transclude){
			$rootScope.$on('$stateChangeStart',function(e, toState, toParams, fromState, fromParams){
				//if it's a contextChange transistion, broadcast viewContextChange event
				/*if(menuProvider.isContextState(toState)){
					$rootScope.$broadcast('viewContextChange',toState);
				}*/
				//isContextState returns contexts name if it's context state else null
				menuProvider.isContextState(toState,function(contextName){
					if(contextName){
						$rootScope.$broadcast('viewContextChange',contextName);
					}
				})
			})
			/*scope.$on('addPanelEvent',function(e){
				ps.addPanel(e.panel);
			});
			scope.$on('hidePanelEvent',function(e){
				ps.hidePanel(e.panel);
			});
			scope.$on('showPanelEvent',function(e){
				ps.showPanel(e.panel);
			});*/
		}	
	}
}]);
