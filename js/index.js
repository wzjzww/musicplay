
var musicList = []
var currentIndex =0
var audio = new Audio()
audio.autoplay = false
getMusicList(function(list){
	musicList = list
	loadMusic(list[currentIndex])
	generateList(list)
})
audio.ontimeupdate = function(){
	$('.process>.r').style.width = (this.currentTime/this.duration)*100 + '%'
}
audio.onplay = function(){
	clock = setInterval(function(){
		var min = Math.floor(audio.currentTime/60)
		var sec = Math.floor(audio.currentTime)%60 + ''
		sec = sec.length == 2? sec : '0 '+sec
		$('.time').innerText = min + ':' +sec
	},1000)
}
audio.onpause = function(){
	clearInterval(clock)
}
audio.onended = function(){

	currentIndex = (musicList.length + (--currentIndex))%musicList.length
	loadMusic(musicList[currentIndex])
}
var play = document.querySelector(".icon-play")
var stop = document.querySelector(".icon-stop")
play.onclick = function(){
	audio.play()
	if(play.style.display="inline-block"){
		play.style.display="none"
		stop.style.display="inline-block"
	}else{
		stop.style.display="none"
		play.style.display="inline-block"
	}
}
stop.onclick = function(){
	audio.pause()
	if(stop.style.display="inline-block"){
		stop.style.display="none"
		play.style.display="inline-block"
		
	}else{
		play.style.display="none"
		stop.style.display="inline-block"
	}
}
var trans = document.querySelectorAll("ul>li")
var li0 = document.querySelectorAll("ul>li")[0]
var li1 = document.querySelectorAll("ul>li")[1]
var li2 = document.querySelectorAll("ul>li")[2]
var forword = document.querySelector(".icon-forword")
var back = document.querySelector(".icon-back")

li0.onclick = function(){
	li0.classList.add("active")
	li1.classList.remove("active")
	li2.classList.remove("active")
	loadMusic(musicList[0])
	if(play.style.display="inline-block"){
	}else{
		stop.style.display="none"
		play.style.display="inline-block"
	}
	if(stop.style.display="inline-block"){
		stop.style.display="none"
		play.style.display="inline-block"
		
	}
}
li1.onclick = function(){
	li1.classList.add("active")
	li0.classList.remove("active")
	li2.classList.remove("active")
	loadMusic(musicList[1])
	if(play.style.display="inline-block"){
	}else{
		stop.style.display="none"
		play.style.display="inline-block"
	}
	if(stop.style.display="inline-block"){
		stop.style.display="none"
		play.style.display="inline-block"
		
	}
}
li2.onclick = function(){
	li2.classList.add("active")
	li1.classList.remove("active")
	li0.classList.remove("active")
	loadMusic(musicList[2])
	if(play.style.display="inline-block"){
	}else{
		stop.style.display="none"
		play.style.display="inline-block"
	}
	if(stop.style.display="inline-block"){
		stop.style.display="none"
		play.style.display="inline-block"
		
	}
}
back.onclick = function(){
	currentIndex = (musicList.length + (--currentIndex))%musicList.length
	console.log(currentIndex)
	loadMusic(musicList[currentIndex])
	if(play.style.display="inline-block"){
	}else{
		stop.style.display="none"
		play.style.display="inline-block"
	}
	if(stop.style.display="inline-block"){
		stop.style.display="none"
		play.style.display="inline-block"
		
	}
}
forword.onclick = function(){
	currentIndex = (++currentIndex)%musicList.length
	console.log(currentIndex)
	loadMusic(musicList[currentIndex])
	if(play.style.display="inline-block"){
	}else{
		stop.style.display="none"
		play.style.display="inline-block"
	}
	if(stop.style.display="inline-block"){
		stop.style.display="none"
		play.style.display="inline-block"
		
	}
}

$('.process').onclick = function(e){
	console.log(e)
	var percent = e.offsetX / parseInt(getComputedStyle(this).width)
	console.log(percent)
	audio.currentTime = audio.duration * percent
}
function $(selector){
	return document.querySelector(selector)
}

function getMusicList(callback){
	var xml = new XMLHttpRequest()
	xml.open('GET','http://localhost:8080/music.json',true)
	xml.onload = function(){
		if((xml.status >=200 && xml.status <300)||xml.status ==304){
			callback(JSON.parse(this.responseText))
		}else{
			console.log("获取数据失败")
		}
	}
	xml.onerror = function(){
		console.log('网络异常')
	}
	xml.send()
}

function loadMusic(musicObj){
	console.log('begin play',musicObj)
	$('.title').innerText = musicObj.title
	$('.auther').innerText = musicObj.auther
	$('.cover').style.background = 'url(' + musicObj.img + ')'
	$('.cover').style.backgroundRepeat = 'no-repeat';
	$('.cover').style.backgroundSize = '100% 100%';
	audio.src = musicObj.src
}
function generateList(list){

}