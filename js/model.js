define(
    'model',
    [],
    //function - ето обертка, в нее обязательно обертывать наш модуль
    function () {
    	/* ---------------------------- begin model ---------------------------- */
		function Model(data) {
			var self = this;

			self.data = data;

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
		return Model;
    }
);