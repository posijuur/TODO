/* ---------------------------- begin model ---------------------------- */
function Model(data) {
	var self = this;

	self.data = data;

	self.sortNumber = function (item) {
		var lengthArr = self.data.length;
		var number = +item - 1;
		var text = self.data[number];
		var arr = [];

		if (item > lengthArr) {
			return self.data;
		} else {
			self.data = [];
			arr.push(text);
			self.data = arr;
			return self.data;
		}
	};

	self.sortText = function (item) {
		var arr = self.data;
		var newArr = [];

		arr.forEach(function(el) {
			var trueOrFalse = el.indexOf(item);
			if (trueOrFalse == 0) {
				newArr.push(el);
			};
		});
		if (newArr.length < 1) {
			alert('Not found');
			return self.data;
		} else {
			self.data = [];
			self.data = newArr;
			console.log(self.data);
			return self.data;
		}
	};

	self.addItem = function (item) {
		if (item.length === 0){
			return;
		}

		self.data.push(item);

		return self.data;
	};

	self.editItem = function (item, value) {
		var index = self.data.indexOf(item);

		if (index === -1){
			return;
		}

		if (value.length === 0){
			return;
		}

		self.data.splice(index, 1, value);

		return self.data;
	}

	self.removeItem = function (item) {
		var index = self.data.indexOf(item);

		if (index === -1){
			return;
		}

		self.data.splice(index, 1);

		return self.data;
	};
}
/* ----------------------------- end model ----------------------------- */
/* ---------------------------- begin view ----------------------------- */
function View(model) {
	var self = this;

	function init() {
		var $tpl_src = $('#wrapper-template').html();
		var _tpl = _.template($tpl_src);

		$('body').append(_tpl);
		self.elements = {
			input: $('.item-value'),
			addBtn: $('.item-add'),
			listContainer: $('.item-list'),
			inputShow: $('.input-t'),
			sort: $('.js-sort')
		};
		self.renderList(model.data);
	};

	self.renderList = function (data) {
		var $tpl_src = $('#list-template').html();
		var _tpl = _.template($tpl_src);

		self.elements.listContainer.html(_tpl({data}));
	};

	init();

	console.log(model.data);

	self.viewComponents = function (elem) {
		elem.hide();
		elem.parent().find('.text').html('');
		elem.parent().find('.input-t').show();
		elem.parent().find('.item-check').show();
	}
}
/* ----------------------------- end view ------------------------------ */
/* -------------------------- begin controller ------------------------- */
function Controller(model, view) {
	var self = this;

	view.elements.addBtn.on('click', addItem);
	view.elements.sort.on('click', sort);
	view.elements.listContainer.on('click', '.item-delete', removeItem);
	view.elements.listContainer.on('click', '.item-edit', editItem);

	function sort() {
		// var newItem = view.elements.input.val();
		var valueLeft = $('.sort-left').val();
		var valueRight = $('.sort-right').val();

		if (valueLeft.length) {
			model.sortNumber(valueLeft);
			view.renderList(model.data);
		} else {
			if (valueRight.length) {
				model.sortText(valueRight);
				view.renderList(model.data);
			} else {
				alert('Empty')
			}
		}
	}

	function addItem() {
		var newItem = view.elements.input.val();

		model.addItem(newItem);
		view.renderList(model.data);
		console.log(model.data);
		view.elements.input.val('');
	}

	function editItem() {
		var elem = $(this);
		var inputEdit = $(this).parent().find('.input-t');

		view.viewComponents(elem);
		inputEdit.trigger('focus');
		inputEdit.blur(function(event) {
			var item = $(this).attr('data-value');
			var value= $(this).val();
			model.editItem(item, value);
			view.renderList(model.data);
			console.log(model.data);
		});
	}

	function removeItem() {
		var item = $(this).attr('data-value');
		model.removeItem(item);
		console.log(model.data);
		view.renderList(model.data);
	}
}
/* --------------------------- end controller -------------------------- */
/* --------------------- anonymous initialize function ----------------- */
$(function () {
	var firstToDoList = ['learn javascript', 'learn html', 'make coffe'];
	var model = new Model(firstToDoList);
	var view = new View(model);
	var controller = new Controller(model, view);
});
/* --------------------- anonymous initialize function ----------------- */