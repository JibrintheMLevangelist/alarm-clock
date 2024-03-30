document.addEventListener('DOMContentLoaded', () => {

	const currentTime=document.querySelector("h1");
	const content=document.querySelector(".content");
	const hourSelect=document.getElementById("hour");
	const minuteSelect=document.getElementById("minute");
	const secondSelect=document.getElementById("second");
	const ampmSelect=document.getElementById("ampm");
	const setAlarmBtn=document.querySelector("button"); 
	const alarmTimeDisplay = document.getElementById('alarmTimeDisplay');

	let alarmTime, isAlarmSet=false,
	ringtone=new Audio("ringtone.mp3");

	for(let i=1; i<=12; i++)
	{
		let formattedHour = i<10? `0${i}` :i;
		hourSelect.innerHTML += `<option value="${formattedHour}">${formattedHour}</option>`;
	}
	for(let i=1; i<=59; i++)
	{
		let formattedMinute = i<10? `0${i}` :i;  
		minuteSelect.innerHTML += `<option value="${formattedMinute}">${formattedMinute}</option>`;
	}
	
	["AM" , "PM"].forEach(ampm =>
	{
		ampmSelect.innerHTML += `<option value="${ampm}">${ampm}</option>`;
	});
	
	setInterval(()=>
	{
		let date=new Date(),
		h = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds(),
		ampm= h >=12? 'PM' : 'AM';

		h=h%12;
		h=h? h:12;
		h=h<10?"0"+h:h;
		m=m<10?"0"+m:m;
		s=s<10?"0"+s:s;
		
		const timestring=`${h}:${m}:${s} ${ampm}`;
		currentTime.innerText=timestring;
		if(alarmTime==timestring && isAlarmSet && !ringtone.loop)
			{
				ringtone.play();
				ringtone.loop=true;
			}
			},1000);
	function setAlarm()
	{
		let hourSelectValue = hourSelect.value;
		let minuteSelectValue = minuteSelect.value;
		let ampmSelectValue = ampmSelect.value;
		

		if(isAlarmSet){
			alarmTime="";
			ringtone.pause();
			ringtone.loop = false;
			content.classList.remove("disable");
			setAlarmBtn.innerText="Set Alarm";
			alarmTimeDisplay.innerText="Alarm not set";
			isAlarmSet=false;
		}
		else
		{
			let time=`${hourSelect.value}:${minuteSelect.value} ${ampmSelect.value}`
			if(!hourSelectValue||!minuteSelectValue || !ampmSelectValue)
			{
				alert("Select a valid time to set the alarm!");
				return;
			}
			alarmTime=time;
			isAlarmSet=true;
			content.classList.add("disable");
			setAlarmBtn.innerText="Clear Alarm";
			alarmTimeDisplay.innerText = `Alarm Set For: ${alarmTime} `;
		}
	}
		setAlarmBtn.addEventListener("click",setAlarm);
		
});	

