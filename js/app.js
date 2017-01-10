//подключение библиотек
requirejs.config({
	//указываются ссылки на удаленный ресурс, еще тут можно указывать конкретное место нашего модуля и он будет
	// подтягиваться и потом инициализируем его в функции
	path: {
		// 'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'
	},
	//в нем можно менять имена модулей, например устаревших
	shim: {
		// 'jquery': {
		// 	exports: 'jQuery'
		// }
	}
});

require(
	//Список зависимостей которые мы будем подключать
	[
		'model',
		'view',
		'controller'
		// 'jquery'
	],
	//Функция которая будет вызываться после того, как все модули подгрузились(тут будет СТАРТ), 
	// $ пережаем в аргумент если подключаем jquery, как я понял вставляем в аргументы то что возвращаем return-ом
	function (Model, View, Controller) {
		var firstToDoList = ['learn javascript', 'learn html', 'make coffe'];
		var model = new Model(firstToDoList);
		var view = new View(model);
		var controller = new Controller(model, view);
	}

);