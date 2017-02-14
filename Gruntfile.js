module.exports=function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		filename:'<%=pkg.name%>',
		dist:'build/dist',
		dev:'build/dev',
		meta:{
			srcFolder:'./src',
			moduleSrcFolder:'./src/pp',
			/*srcTempateFolder:'./src/assets/templates',*/
			srcTempateFolder:'<%=meta.srcFolder%>/assets/templates',
			srcFiles:['src/pp/*.js','src/pp/*/*/*.js'],
			objecType:['service','controller','directive','filter']
		},
		concat:{
			dist:{
				src:'<%= meta.srcFiles %>',
				dest:'<%= dist %>/<%= filename %>-<%= pkg.version %>.js'
			},
			dev:{
				src:'<%= meta.srcFiles %>',
				dest:'<%= dev %>/<%= filename %>.dev.js'
			}
		},
		karma:{
			unit: {
				configFile: 'karma.conf.js'
			}
		}
	});
	require('load-grunt-tasks')(grunt);//loads grunt- based task included as plugin
	//grunt.loadNpmTasks('grunt-karma')
	grunt.registerTask('add-directive',function(name){
		grunt.log.writeln('adding new directive '+escape(name));
		
		/*if(!isValidDirectiveName(name)){
			grunt.log.error('invalid directive name: only characters[a-zA-Z] valid')
		}*/
		//add the directory
		addObjectDirectory('directive',name);
		//add the default file
		addObjectFiles('directive',name);
	});
	grunt.registerTask('add-service',function(name){
		grunt.log.writeln('adding new service '+escape(name));
		//add the directory
		addObjectDirectory('service',name);
		//add the object files
		addObjectFiles('service',name);
	});
	grunt.registerTask('add-value',function(name){
		grunt.log.writeln('adding new value '+escape(name));
		//add the directory
		addObjectDirectory('value',name);
		//add the object files
		addObjectFiles('value',name);
	});
	/**
	 * Merges all all 
	 */
	grunt.registerTask('merge-scripts',function(){
		var _scriptFiles=grunt.file.expand(grunt.config.get('src.srcFiles'));
		//grunt.log.writeln(_scriptFiles.join("\n"))
		_scriptFiles.forEach(function(file){
			grunt.log.writeln(file+'\n');
		});
	});
	grunt.registerTask('merge-templates',function(){
		
	});
	//
	var addObjectDirectory=function(type,name){
		//set the path
		var _path=_getFolderPath(type,name);
		//create the main folder
		grunt.file.mkdir(_path);
		//create the test subfolder
		grunt.file.mkdir(_path+'/test');
		if(type==='directive'){
			//create the template subfolder
			grunt.file.mkdir(_path+'/template');
		}
	}
	var addObjectFiles=function(type,name){
		
		var _path=_getFolderPath(type,name);
		var _srcFile,_destFile;
		if(type==='directive'){
			//set template object
			var tempObject={
				directiveName:name,
				templateName:name+'.html'
			};
			tempObject.directiveName=_makeDirectiveName(name);
			//add base module file
			_srcFile=grunt.config.get('meta.srcTempateFolder')+'/directive/main.js';
			_destFile=_path+'/'+name+'.js';
			_copyAndProcess(_srcFile,_destFile,tempObject);
			//add test file
			_srcFile=grunt.config.get('meta.srcTempateFolder')+'/directive/test.js';
			_destFile=_path+'/test/'+name+'Spec.js';
			_copyAndProcess(_srcFile,_destFile,tempObject);
			//add template file
			_srcFile=grunt.config.get('meta.srcTempateFolder')+'/directive/index.html';
			_destFile=_path+'/template/'+name+'.html';
			_copyAndProcess(_srcFile,_destFile,tempObject);
		}
		if(type==='service'){
			var tempObject={
				serviceName:name
			}
			//add base module file
			_srcFile=grunt.config.get('meta.srcTempateFolder')+'/service/main.js';
			_destFile=_path+'/'+name+'.js';
			_copyAndProcess(_srcFile,_destFile,tempObject);
			//add test file
			_srcFile=grunt.config.get('meta.srcTempateFolder')+'/service/test.js';
			_destFile=_path+'/test/'+name+'Spec.js';
			_copyAndProcess(_srcFile,_destFile,tempObject);
		}
		if(type==='value'){
			var tempObject={
				valueName:name
			}
			//add base module file
			_srcFile=grunt.config.get('meta.srcTempateFolder')+'/value/main.js';
			_destFile=_path+'/'+name+'.js';
			_copyAndProcess(_srcFile,_destFile,tempObject);
			//add test file
			_srcFile=grunt.config.get('meta.srcTempateFolder')+'/value/test.js';
			_destFile=_path+'/test/'+name+'Spec.js';
			_copyAndProcess(_srcFile,_destFile,tempObject);
		}
		
	}
	var addObjectTemplateFile=function(type,name){
		
	}
	function isValidDirectiveName(name){
		var _char=name.charAt(0);
		grunt.log.writeln(_char)
		grunt.log.writeln(name)
		var rexp=new RegExp('[^a-zA-Z]')
		grunt.log.writeln(name.match(rexp))
		//first char is a-z,A-Z
	    if(_char===name.match('\[^a-zA-Z]+\\')){
	    	return true;
	    }else{
	    	return false;
	    }
	}
	var _makeDirectiveName=function(name){
		var _prefix='p';
		//var regex='[^a-zA-Z]'
		var _firstChar=name.charAt(0).toUpperCase();
		return _prefix+_firstChar+name.substr(1);
		
	}
	var _copyAndProcess=function(srcfile,destpath,templateObject){
		if(templateObject!==null){
			grunt.file.copy(srcfile,destpath,{
				process:function(srccontent,srcpath){
					return grunt.template.process(srccontent,{data:templateObject});
				}
		    });
		}else{
			grunt.file.copy(srcfile,destpath);
		}
	}
	var _getFolderPath=function(type,name){
		//
		var _folder_path;
		switch(type){
			case 'directive':
			  _folder_path=grunt.config.get('meta.moduleSrcFolder')+'/directive'+'/'+escape(name);
			  break;
			case 'filter':
			  _folder_path=grunt.config.get('meta.moduleSrcFolder')+'/filter'+'/'+escape(name);
			  break;
			case 'controller':
			  _folder_path=grunt.config.get('meta.moduleSrcFolder')+'/controller'+'/'+escape(name);
			  break;
			case 'value':
			  _folder_path=grunt.config.get('meta.moduleSrcFolder')+'/value'+'/'+escape(name);
			  break;
			default:
			  _folder_path=grunt.config.get('meta.moduleSrcFolder')+'/service'+'/'+escape(name);
		}
		return _folder_path;
	}
}