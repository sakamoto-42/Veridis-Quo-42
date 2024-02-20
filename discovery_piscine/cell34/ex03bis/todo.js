const newBtn = $("#new_btn");
const ftList = $("#ft_list");
let todoList = [];

newBtn.on("click", function() {						
	let todoText = prompt("Fill a new TO DO");

	if (todoText !== null && todoText.trim().length > 0) {
		let newContent = todoText.trim();

		addTodo(newContent);
	}
});

function addTodo(content) {
	let todoDiv = $("<div>", {					
		"class": "todo_div",					
		"text": content						
	});
	ftList.prepend(todoDiv);
	todoDiv.on("click", function() {
		if (window.confirm("Do you want to remove that TO DO ?")) {
			todoDiv.remove();
		}
	});
}

$(window).on("beforeunload", function() {				
	let todoDivs = $(".todo_div");
	let JSONString;
	let encodedTodoList;

	todoDivs.each(function() {	
		todoList.unshift($(this).text());
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


$(window).on("load", function() {
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