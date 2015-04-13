// YOUR CODE HERE:
// https://api.parse.com/1/classes/chatterbox
// https://api.parse.com
var app = {};
app.init = function(){};
app.server = 'http://127.0.0.1:3000';

app.send = function(message){
  $.ajax({
    // always use this url
    url: 'http://127.0.0.1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function () {
      console.log('chatterbox: Message sent');
    },
    error: function () {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};
var fetched;
app.fetch = function(){
  //variables of stuff fetched
  $.ajax({
    // always use this url
    url: 'http://127.0.0.1/classes/chatterbox',
    type: 'GET',
    data:{order: "-updatedAt", limit: 100 },
    success: function (data) {
      _.each(data.results, app.addMessage);
    },
    error: function () {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send Messagessage');
    }
  });
  return fetched;
};

app.addFriend = function(friend){
  // app.friendList[friend]=true;
  console.log(friend.innerHTML);
  var chatCollection = $('.chats');
  for (var i = 0; i < chatCollection.length; i++){
    if (chatCollection[i].children[0].children[0].children[0].innerHTML === friend.innerHTML){
      chatCollection[i].children[0].children[0].children[0].style.fontStyle='italic';
    }
  }

  // console.log("THIS IS A TEST",friend.style);
  // $(friend).addClass('friend');
  // friend.style.fontStyle = 'italic';

};

app.friendList = {};

app.clearMessages = function(){
  $(".chats").remove();
};

app.addMessage = function(message){
  message.text = _.escape(message.text);
  message.username = _.escape(message.username);
  message.roomname = _.escape(message.roomname);

  $('#main').append('<table class = "chats" id = "chats"> <tr> <td id = "username" onclick = "app.addFriend(this);">'+message.username+'</td> <td id = "message send" class="submit">'+message.text+'</td> <td class = "room" onclick="roomClick(this);">'+message.roomname+'</td> </tr> </table>');
  $('.username').click(function(){
    app.addFriend();
  });
};

app.addRoom = function(room){
  $('#roomSelect').append('<div id = '+room+'>  </div>');
};

app.handleSubmit = function(){
  var messageContents = $("#messageField").val();
  var userName = $("#userName").val();
  var room = $("#room").val();

  var message = {
    'username': userName,
    'text': messageContents,
    'roomname': room
  };
  app.send(message);
  event.preventDefault();
};

var roomClick = function(event){
  var roomName = (event.innerHTML);
  // var filtered = _.filter($(".chats"),function(element){ if (element..children[0].children[0].children[2].innerHTML === roomName) return element});
  var chatCollection = $('.chats');
  var filtered = [];
  for (var i = 0; i < chatCollection.length; i++){
    if (chatCollection[i].children[0].children[0].children[2].innerHTML === roomName){
      filtered.push(chatCollection[i]);
    }
  }
  // console.log(filtered);
  $('.chats').remove();
  $('#main').append(filtered);

};

$( document ).ready(function() {
    $('#send').click(function(){
      event.preventDefault();
      app.handleSubmit();
    });
    console.log('gets here');
    app.fetch();
});

