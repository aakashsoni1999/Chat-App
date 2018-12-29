let socket=io();
socket.on('connected',()=>{
    console.log("Connected");
})

$(function(){
    let msglist=$('#message');
    let btn=$('#btn');
    let txt=$('#msg');
    let login_page=$('#login_page');
    let chat_page=$('#chat_page');
    let Name=$('#Name');
    let enter=$('#Enter');
    let user='';

    btn.click(function(){
        var d=new Date();
        var min=d.getMinutes();
        var hours=d.getHours();
        var sec=d.getSeconds();
        var data={msg:txt.val(),name:user,m:min,h:hours,s:sec};
        socket.emit('send_msg',data);
        msglist.prepend($('<li><div class="box_me">'+data.name+' : '+data.msg+'<span class="time-right">'+data.h+':'+data.m+':'+data.s+'</span></div></li>'));
        txt.val('');
    })

    enter.click(function(){
        user=Name.val();
        login_page.hide();
        chat_page.show();
    })

    socket.on('recv_msg',function(data){
        msglist.prepend($('<li><div class="box">'+data.name+' : '+data.msg+'<span class="time-right">'+data.h+':'+data.m+':'+data.s+'</span></div></li>'));
        $('html, body').animate({scrollTop: '0px'}, 50);
    })
})