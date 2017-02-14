describe('<%=serviceName %> test',function(){
	var _<%=serviceName %>;
	//load the module
	beforeEach(module('pinnacle.ui'));
	//inject the service
	beforeEach(inject(function(_<%=serviceName %>_){
		_<%=serviceName %>=_<%=serviceName %>_;
	}));
	
	it('test code ',function(){
		
	});
});
