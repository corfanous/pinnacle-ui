'use strict'
/**
 * @name: <%=directiveName%> 
 */
angular.module('pinnacle.ui')
.directive('<%=directiveName%>',[function(){
	return {
		templateUrl:function(element,attr){
			return attr.templateUrl || 'template/<%=templateName%>';
		}
	}
}]);
