describe('pPanel test',function(){
	var scope,$compile,$templateCache,$controller,elem;
	//load the pinnacleUi module
	beforeEach(module('pinnacle.ui'));
	//load the template
	//beforeEach(module('test/panel.html'));
	//inject dependencies
	beforeEach(inject(function(_$rootScope_, _$compile_, _$templateCache_, _$controller_){
		scope=_$rootScope_;
		$compile=_$compile_;
		$templateCache=_$templateCache_;
		$controller=_$controller_;
	}));
    xdescribe('pPanel without value',function(){
		beforeEach(inject(function(){
			elem=$compile(angular.element("<div p-panel></div>"))(scope)
			scope.$digest()
		}))
		it('test default scope values',function(){
			
			var _scope=elem.isolateScope();
			
			expect(_scope.name).not.toBeNull()
			expect(_scope.visible).toBe(true)
			expect(_scope.panelClass).toBe('panel-default')
			delete elem;
		});
		/*it('scope data parsed as object',function(){
			//elem=$compile(angular.element("<div p-panel=\"\{\ {\{'name':top,'panelClass':'default-panel'\}\} \}\"></div>"))(scope)
			elem=$compile("<div p-panel='data'></div>")(scope);
			scope.data={
			   name:'top',panelClass:'default-panel'
			}
			scope.$digest();
			var _scope=elem.isolateScope();
			   
			expect(_scope.name).toBe('top')
		})*/
		it('test template elements',function(){
			//expect(elem.hasClass('panel-class')).toBe(true)
			expect(elem.attr('ng-hide')).toBe('panel.visible')
			//expect(elem.).toHaveClass('panel-class')
		})
	});
	describe('pPanel test with value',function(){
		beforeEach(inject(function(){
			elem=$compile('<div p-panel="\{\'name\':\'top\',\'panelClass\':\'panel-default\'\}"></div>')(scope)
			//elem=$compile('<div p-panel="data"></div>')(scope);
			//scope.data={name:'top',panelClass:'panel-class'}
			scope.$digest();
			
		}))
		it('properties test',function(){
			var _scope=elem.isolateScope();
			expect(_scope.name).toBe('top')
			expect(_scope.panelClass).toBe('panel-default')
			expect(_scope.visible).toBe(true)
			
			delete elem;
		})
		it('test template attributes',function(){
			expect(elem.hasClass('panel-default')).toBe(true)
		})
	})
});

