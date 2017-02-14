describe('pageService test',function(){
	var _pageService,Panel;
	var panel1,panel2;
	//load the module
	beforeEach(module('pinnacle.ui'));
	//inject the service
	beforeEach(inject(function(_pageService_,_Panel_){
		_pageService=_pageService_;
		Panel=_Panel_;
		
		panel1=new Panel();
		panel1.name='top',
		panel1.visible=true;
		panel1.panelClass='';
		//
		panel2=new Panel();
		panel2.name='side',
		panel2.visible=true;
		panel2.panelClass='';
		
		spyOn(_pageService,'togglePanel').and.callThrough();
	}));
	
	it('addPanel test',function(){
		
		_pageService.addPanel(panel1)
		expect(_pageService.panels.length).toBe(1)
		
	});
	it('hidePanel',function(){
		_pageService.addPanel(panel1)
		_pageService.addPanel(panel2)
		expect(_pageService.panels.length).toBe(2)
		//
		_pageService.hidePanel(panel2.name); //
		expect(panel1.visible).toBe(true)
		expect(panel2.visible).toBe(false) //hide
	});
	it('showPanel',function(){
		_pageService.addPanel(panel1)
		_pageService.addPanel(panel2) //
		expect(_pageService.panels.length).toBe(2)
		//
		_pageService.showPanel(panel2.name);
		expect(panel1.visible).toBe(true)
		expect(panel2.visible).toBe(true) //show
	});
	
	it('togglePanel',function(){
		_pageService.addPanel(panel1);
		//
		_pageService.togglePanel(panel1.name);
		expect(_pageService.togglePanel).toHaveBeenCalled()
		expect(panel1.visible).toBe(false)
	});
	it('selectPanel',function(){
		_pageService.addPanel(panel1)
		_pageService.addPanel(panel2) 
		//
		expect(_pageService.selectPanel('xxx')).toBeNull()
		expect(_pageService.selectPanel(panel2.name)).not.toBeNull()
	});
});
