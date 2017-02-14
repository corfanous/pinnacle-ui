describe('<%=controllerName %> test',function(){
	var $controller,scope;
	//load the pinnacleUi module
	beforeEach(module('pinnacle.ui'));
	//inject dependencies
	beforeEach(inject(function(_$controller_){
		$controller=_$controller_;
	}));
	beforeEach(function(){
		scope={}
		//setup the controller for the test
		$controller('<%=controllerName %>',{$scope:scope});
	});
	it('actual test code',function(){
		//invoke scope properties for the test
    });
});

