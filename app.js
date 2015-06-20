var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var user_count = 0;

//��s���ϥΪ̳s���i�Ӫ��ɭ�
io.on('connection', function(socket){

	//�suser
	socket.on('add user',function(msg){
		socket.username = msg;
		console.log("new user:"+msg+" logged.");
		io.emit('add user',{
			username: socket.username
		});
	});

	//��ť�s�T���ƥ�
	socket.on('chat message', function(msg){

		console.log(socket.username+":"+msg);

  		//�o�G�s�T��
		io.emit('chat message', {
			username:socket.username,
			msg:msg
		});
	});

	//left
	socket.on('disconnect',function(){
		console.log(socket.username+" left.");
		io.emit('user left',{
			username:socket.username
		});
	});


});

//���wport
http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});