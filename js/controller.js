define(
    'controller',
    ['module', 'view'],
     function () {
		/* -------------------------- begin controller ------------------------- */
		function Controller(model, view) {
			var self = this;

			view.elements.addBtn.on('click', addItem);
			view.elements.listContainer.on('click', '.item-delete', removeItem);
			view.elements.listContainer.on('click', '.item-edit', editItem);

			function addItem() {
				var newItem = view.elements.input.val();

				model.addItem(newItem);
				view.renderList(model.data);
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
				});
			}

			function removeItem() {
				var item = $(this).attr('data-value');

				model.removeItem(item);
				view.renderList(model.data);
			}
		}
		/* --------------------------- end controller -------------------------- */
			return Controller;
	}
);