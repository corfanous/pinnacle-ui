'use strict'
/**
 * @name: pMenu 
 */
angular.module('pinnacle.ui')
.directive('pMenu',['$rootScope','menuProvider',function($rootScope,menuProvider){
	return {
		restrict:'E',
		replace:true,
		scope:{
			name:'@'
		},
		controller:[function(){
			var self=this;
			self.items=[];
			self.load=function(contextName,menuName){
				self.items=menuProvider.getMenu(contextName,menuName);
			}
		}],
		controllerAs:'menu',
		template:["<ul>",
		              "<li ng-repeat='item in menu.items'>",
		                "<a ui-sref='item.name' ui-sref-active='active-link'>{{item.label}}</a>",
		              "</li>",
		          "</ul>"].join(""),
		/*templateUrl:function(element,attr){
			return attr.templateUrl || 'template/menu.html';
		}*/
		link:function(scope,elem,attr,ctrl,transclude){
			//load the menu
			$rootScope.$on('changeMenuViewContextEvent',function(e){
				if(e.menuViewContextName==menuProvider.getCurrentMenuViewContext().name){
					/*
					 * menu must be loaded based on the context
					 */
					ctrl.load(e.menuViewContextName,scope.name);
				}
			});
		}
	}
}]);
