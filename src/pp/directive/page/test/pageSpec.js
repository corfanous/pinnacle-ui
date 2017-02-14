describe('pPage test',function(){
	var elem,scope,$compile,$templateCache,$controller;
	//load the pinnacleUi module
	beforeEach(module('pinnacle.ui'));
	//load the template
	//beforeEach(module('test/page.html'));
	//inject dependencies
	beforeEach(inject(function(_$rootScope_, _$compile_, _$templateCache_, _$controller_){
		var rootScope=_$rootScope_;
		scope=rootScope.$new();
		$compile=_$compile_;
		$templateCache=_$templateCache_;
		$controller=_$controller_;
		//create a live directive element
		elem=$compile(angular.element("<div p-page age=10></div>"))(scope)
		scope.$digest();
	}));
	describe('pPage template test',function(){
		it('template is defined',function(){
			var _age=elem.attr('age');
			expect(_age).toBe('10')
		});
	});
	xdescribe('pPage restrict,scope,controller,link,require,replace,transclude,watchers,events etc',function(){
    	it('actual test code',function(){
    		
    	});
	});
});

