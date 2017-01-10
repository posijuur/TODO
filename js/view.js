define(
    'view',
    ['model'],
     function () {
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
					inputShow: $('.input-t')
				};
				self.renderList(model.data);
			};

			self.renderList = function (data) {
				var $tpl_src = $('#list-template').html();
				var _tpl = _.template($tpl_src);

				self.elements.listContainer.html(_tpl({data}));
			};

			init();

			self.viewComponents = function (elem) {
				elem.hide();
				elem.parent().find('.text').html('');
				elem.parent().find('.input-t').show();
				elem.parent().find('.item-check').show();
			}
		}
		/* ----------------------------- end view ------------------------------ */
		return View;
	}
);