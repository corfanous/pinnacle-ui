'use strict'
/**
 * @name: pPanel 
 */
angular.module('pinnacle.ui')
.directive('pPanel',['$parse','pageService','Panel',function($parse,ps,Panel){
	return {
		restrict:'A',
		replace:true,
		scope:{
			name:'@',
			visible:'@',
			panelClass:'@',
			onShow:'&',
			onClose:'&'
		},
		controllerAs:'panel',
		controller:['$scope',function($scope){
			//
			var self=this;
			self.visible=false;
			self.panelClass='';
			
			self.addToPage=function(){
				var panel=new Panel($scope.name,$scope.visible,$scope.panelClass);
				ps.addPanel(panel);
				//reset the view panel
				_setViewPanel(panel.visible,panel.panelClass);
			}
			self.hide=function(){
				var panel=ps.hidePanel($scope.name);
				if(panel){
					_setViewPanel(panel.visible,'');
				}
				
			}
			self.show=function(){
				var panel=ps.showPanel($scope.name);
				if(panel){
					_setViewPanel(panel.visible,panel.panelClass);
				}
			}
			var _setViewPanel=function(visibility,panelClass){
				self.visible=visibility;
				self.panelClass=panelClass;
			}
		}],
		compile:function(tElem,tAttrs){
			//reconstruct the dom
			//eg if element: <div ng-hide='panel.visible' class='panel-class'></div>
			//determine if used as attribute configure appropriately
			//case 1: used as an attribute
			if(!tAttrs.name){
				angular.element(tElem).attr('name','$p'+Math.random()+'pl')
			}
			if(!tAttrs.ngClass){
				angular.element(tElem).attr('ng-class','\{\'panel-default\':panel\.visible\}')
			}
			if(!tAttrs.ngHide){
				angular.element(tElem).attr('ng-hide','panel.visible');	
			}
			return {
				pre:function(scope,elem,attrs,ctrl){
					//$scope.name,$scope.visible,$scope.panelClass
					/*scope.name=attrs.name || '$p'+Math.random()+'pl';
					scope.visible=attrs.visible || true;
					scope.panelClass=attrs.panelClass || 'panel-default';*/
					//
					var _watchExpression=$parse(attrs.pPanel,function(val){
						//update the values{name,panelClass}
						angular.forEach(val,function(value,key){
							//evaluate only if there's value
							if(value){
								if(key.trim()=='visible'){
									scope.visible=value;
								}
							    if(key.trim()=='name'){
								    //update the name attribute on the element and update the on the scope
								    attrs.name=value;// || attrs.name;
								    scope.name=attrs.name;
							    }
							    if(key.trim()=='panelClass'){
								    //update ng-class and the scope
								    //attrs.ngClass="{"+value+':'+'{{panel.visible}}'+'}";
								    elem.addClass(value);
								    scope.panelClass=value;
							    }
							}
						});
						//
						//update the value for visible
						scope.visible=attrs.visible || true;// the default value
						scope.name=attrs.name || '$p'+Math.random()+'pl';
						scope.panelClass=attrs.panelClass || 'panel-default';
						
						//console.log('END OF WATCH EXPRESSION ITEREATION')
						
					});
					scope.$watch(_watchExpression,function(val){
						//console.log('BEORE ADD TO PAGE IS INVOKED is ' +scope.name)
						//add to the global panel store (pageService)
						ctrl.addToPage();
					},false);
					
				},
				post:function(scope,elem,attrs,ctrl,transclude){
					scope.$on('closePanel',function(e){
						if(e.panel.name===scope.name){
							ctrl.hide();
						}
					});
					scope.$on('openPanel',function(e){
						if(e.panel.name===scope.name){
							ctrl.show();
						}
					});
				}
			}
		}
	}
}]);
