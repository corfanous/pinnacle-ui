'use strict'

angular.module('pinnacle.ui.sample',['pinnacle.ui'])

.config(function(menuProvider){
	menuProvider.setMenu([
		{
			name:'home',
			label:'home page',
			url:'/',
			uri:{
				isTemplate:false,
				link:'index.html'
			},
			groups:['top.menu','side.menu'],
			viewContext:{
				/*isContextLink:true,*/
				contextToTrigger:'index',
				contexts:['index','inbox']
			},
			isContextLink:function(){
				return viewContext.contextToTrigger !==null
			}
		}
	]);
	menuProvider.buildContext();
})
