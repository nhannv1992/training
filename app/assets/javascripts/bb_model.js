$(function() {
	var TodoModel = Backbone.Model.extend({
		urlRoot		: "/todos",
		defaults 	: {
			id		: "-1",
			name 	: "Default name",
			status	: false,
		},
		initialize 	: function() {
			console.log("Model initing");

			this.on("change", function() {
				console.log("attribute value was changed");
			})
		},
		toggleStatus : function() {
			if(this.get("status") === "1") {
				this.set("status","0");
			} else {
				this.set("status","1")
			}

			this.save();
		}
	})


	var TodoView = Backbone.View.extend({
		initialize : function() {
			this.model.on("change", this.render, this);
			this.model.on("destroy", this.remove, this);
			this.model.on("hide", this.remove, this);
		},
		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
		},
		template : _.template("<h3>"
		+ "<input type='checkbox'"
		+'<% if(status === "1") print("checked=\'checked\' class=\'checked\'") %> />'
		+ '<span <% if(status === "1") print("class=\'checked\'") %>><%= name %></span>'
		+ "</h3>"),

		tagName : "li",
		className : "item",
		render : function() {
			var atributes = this.model.toJSON();
			$(this.el).html(this.template(atributes));
		},
		events : {
			"click h3" : "alertStatus",
			"change input" : "toggleStatus"
		},
		alertStatus : function() {

		},
		toggleStatus : function() {
			this.model.toggleStatus();
		},
		remove : function() {
			this.$el.remove();
		}
	})


	var TodoListView = Backbone.View.extend({
		initialize : function() {
			this.collection.on("add", this.addOne, this);
			this.collection.on("reset", this.addAll, this);
		},
		render : function() {
			this.addAll();
		},
		addOne : function(todoItem) {
			var todoView = new TodoView({model : todoItem});
			todoView.render();
			this.$el.append(todoView.el);
		},
		addAll : function() {
			this.collection.forEach(this.addOne, this);
		}
	})


	var TodoList = Backbone.Collection.extend({
		initialize : function() {
			this.on("remove", this.hideModel)
		},
		hideModel : function(model) {
			model.trigger("hide");
		},
		model : TodoModel,
		url : "/list"
	})


	var todoList = new TodoList();

	var todoListView = new TodoListView({collection : todoList});

	todoList.fetch({reset: true});

	$("#showTodo").html(todoListView.el);


	/*
	var todo1 = new TodoModel({id : 1}),
	todo2 = new TodoModel({id : 2}),
	todo3 = new TodoModel({id : 3});


	todoList.add(todo1);
	todoList.add(todo2);
	todoList.add(todo3);



	todoList.forEach(function(todoItem) {
		todoItem.fetch();
	})

	/*var todoView = new TodoView({model : todoList})

	//fetch data from server
	//todoModel.url = "/todos/1";

	todo1.fetch({
		success: function(){
			var todoView = new TodoView({model : todo1})

			//render html element
			todoView.render();

			//append view to targetplace
			$("#showTodo").html(todoView.el);
		}
	});
	*/

	$("#update").click(function() {

	})

	$("#delete").click(function() {
		var lastItem = todoList.models[todoList.models.length - 1];
		console.log(lastItem);
		todoList.remove(lastItem);
	})

	$("#add").click(function() {
		var name = $("#todoName").val(),
		status = $("#todoStatus:checked").length > 0 ? "1" : "0",
		id = todoList.models[todoList.models.length - 1].get("id");

		var todoItem = new TodoModel({id : ++id, name : name, status : status});

		todoList.add(todoItem);
	})

	var Router = Backbone.Router.extend({
		routes : {
			"todos" : 'index',
			"todos/:id" : 'view'
		},
		index : function() {
			console.log("Aaa");
			this.navigate("todos/1",{trigger: true});
		},
		view : function(id) {
			console.log("You are view: "+ id);
			todoList.focusOnTodoItem(id);
		}
		
	})

	var router = new Router();
	Backbone.history.start({pushState : true});


})


