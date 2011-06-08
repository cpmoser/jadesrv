
	function JadeSrv(config)
	{
		this.srv = require('http').createServer();
		this.jade= require('../../jade/lib/jade');
		
		this.srv.on('request',this.onRequest,this);
	}

	JadeSrv.prototype = 
	{
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
		
		onRequest: function(req,res)
		{
			req.on('data',function(data)
			{
				console.log('data event fired by request');
				
				JadeSrv.routeRequest('',res,JSON.parse(data.toString()));
				
				res.writeHeader(200,
				{
					'Content-Type': 	'text/html'
				});
			},this);
			
			req.on('end',function()
			{
				console.log('end event fired by request');
			});
		},
		
		routeRequest: function(path,res,data)
		{
			this.jade.renderFile('/cygdrive/c/Documents\ and\ Settings/cmoser/Projects/jadesrv/webroot/test.jade',{locals:data,cache:true,filename:'test.jade.js'},function(err,str)
			{
				if (err)
				{
					console.log('Error: ',err);
				}
				else
				{
					console.log('writing: ', str);
				}
				res.end(str);
			});
			return true;
		}
	}
	
	var JadeSrv = module.exports = new JadeSrv();
