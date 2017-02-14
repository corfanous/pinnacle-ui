describe('<%=filterName %> test',function(){
	var $filter;
	//load the pinnacleUi module
	beforeEach(module('pinnacle.ui'));
	//inject dependencies
	beforeEach(inject(function(_$filter_){
		$filter=_$filter_;
	}));
	it('actual test code',function(){
		//load the filter
		var \_<%=filterName %>\=$filter('<%=filterName%>');
		//invoke filter methods
    });
});

