
	function JadeSrv(config)
	{
		this.srv = require('http').createServer();
		this.jade= require('../../jade/lib/jade');
		
		this.srv.on('request',this.onRequest.bind(this));
	}

	JadeSrv.prototype = 
	{
		count: 0,
		
		start: function()
		{
			this.srv.listen(8000,'127.0.0.1');
			return this;
		},
		
		stop: function()
		{
			this.srv.close();
			return this;
		},
		
		onRequest: function(request,response)
		{
			var buffer = '';
			
			request.on('data',function(data)
			{
				buffer += data.toString();
			});
			
			request.on('end',function()
			{
				if (!buffer.length)
				{
					response.end();
				}
				else
				{
					try 
					{
						var locals = JSON.parse(buffer);
					}
					catch (e)
					{
						response.end('bad request');
					}
					this.routeRequest('',response,locals);
				}
			}.bind(this));
		},
		
		routeRequest: function(path,res,locals)
		{
			var 
				file = '/cygdrive/c/Documents\ and\ Settings/cmoser/Projects/jadesrv/webroot/test.jade',
				p = 
				{
					locals:	locals,
					filename:'test.jade.js',
					cache:	true
				};
			
			this.jade.renderFile(file,p,function(err,str)
			{
				if (err)
				{
					console.log('Error: ',err);
				}
				else
				{
				//	console.log('writing: ', str);
				}
				
				res.end(str);
			});
			return true;
		}
	}
	
	var JadeSrv = module.exports = new JadeSrv();
