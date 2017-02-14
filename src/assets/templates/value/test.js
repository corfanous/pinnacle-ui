describe('<%=valueName %> test',function(){
	var _<%=valueName %>;
	//load the module
	beforeEach(module('pinnacle.ui'));
	//inject the service
	beforeEach(inject(function(_<%=valueName %>_){
		_<%=valueName %>=_<%=valueName %>_;
	}));
	
	it('test code ',function(){
		
	});
});
