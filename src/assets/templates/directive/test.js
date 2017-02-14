describe('<%=directiveName %> test',function(){
	var scope,$compile,$templateCache,$controller;
	//load the pinnacleUi module
	beforeEach(module('pinnacle.ui'));
	//load the template
	beforeEach(module('test/<%= templateName %>'));
	//inject dependencies
	beforeEach(inject(function(_$rootScope_, _$compile_, _$templateCache_, _$controller_){
		scope=_$rootScope_;
		$compile=_$compile_;
		$templateCache=_$templateCache_;
		$controller=_$controller_;
	}));
	describe('<%=directiveName %> controller test',function(){
		it('actual test code',function(){
			
		});
	});
	describe('<%=directiveName %> template test',function(){
    	it('actual test code',function(){
    		
    	});
	});
});

