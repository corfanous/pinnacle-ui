/**
 * @name: <%=valueName%> 
 */
(function(){
	'use strict';
	
	var _<%=valueName%>=function(){
		var self=this;
	}
	
	_<%=valueName%>.prototype={
		
	}
	angular.module('pinnacle.ui').value('<%=valueName%>',_<%=valueName%>);
})();
