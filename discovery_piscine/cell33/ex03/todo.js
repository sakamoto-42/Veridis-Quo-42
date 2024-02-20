const newBtn = document.getElementById("new_btn");	
const ftList = document.getElementById("ft_list");	
let todoList = [];					

newBtn.addEventListener("click", function() {		
	let todoText = prompt("Fill a new TO DO");	

	if (todoText !== null && todoText.trim().length > 0) {	
		let newContent = todoText.trim();
		addTodo(newContent);		
	}
});

function addTodo(content) {					
	let todoDiv = document.createElement("div");		
	todoDiv.classList.add("todo_div");			
	todoDiv.textContent = content;					

	ftList.insertBefore(todoDiv, ftList.firstChild);	

	todoDiv.addEventListener("click", function() {		
		if (window.confirm("Do you want to remove that TO DO ?"))
			todoDiv.remove();						
	});
}

window.addEventListener("beforeunload", function() {					
	let todoDivs = document.getElementsByClassName("todo_div");			
	let JSONString;
	let encodedTodoList;

	Array.from(todoDivs).forEach(function(todoDiv) {				
			todoList.unshift(todoDiv.textContent);				
	});

	JSONString = JSON.stringify(todoList);						
											
	encodedTodoList = encodeURIComponent(JSONString);				

	setCookie("TODO", encodedTodoList, 7);						
});

function setCookie(name, value, days) {	
	let expires = "";		

	if (days) {			
		let date = new Date();	
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/" + "; SameSite=Strict";	
}

window.addEventListener("load", function() {					
	let todoCookie = getCookie("TODO");					

	if (todoCookie) {							
		let decodedTodoList = decodeURIComponent(todoCookie);		
		let JSONTodoList;						

		try {						
			JSONTodoList = JSON.parse(decodedTodoList);		
			JSONTodoList.forEach(addTodo);				
		}
		catch(e) {							
			console.error("Cookie decode error", e);		
		}
	}
});

function getCookie(name) {
	let cookies = document.cookie.split(";");	

	for (let i = 0 ; i < cookies.length ; i++) {
		let cookie = cookies[i].trim();		
		
		if (cookie.startsWith(name + '='))	
			return cookie.substring(name.length + 1);	
	}
	return null;					
}