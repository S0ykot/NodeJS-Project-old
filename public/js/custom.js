$(document).ready(function(){
	$('.goHome').on('click',function goHome(){
     	window.location='http://localhost:1000/home';
    });

    $('#apply').on('click',function applyTopic(){
     	window.location='http://localhost:1000/topics';
    });

    $('.details').on('click',function applyTopic(){
     	window.location='http://localhost:1000/topics/topicDetails/'+$('.details').val();
    });
});

function goTo(value){
	window.location='http://localhost:1000/topics/topicDetails/'+value;
}