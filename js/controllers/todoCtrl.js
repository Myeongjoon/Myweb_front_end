/**
 * @license
 * Everything in this repo is MIT License unless otherwise specified.
 *
 * Copyright (c) Addy Osmani, Sindre Sorhus, Pascal Hartig, Stephen  Sawchuk, Google, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('todoCtrl', ['$scope', '$filter', 'todoStorage', function ($scope, $filter, todoStorage) {
		$scope.todos = {};
		todoStorage.get().success(function(data) {
			$scope.todos = data;
		});

		$scope.newTodo = '';
		$scope.editedTodo = null;

		$scope.$watch('todos', function (newValue, oldValue) {
			$scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
			$scope.completedCount = $scope.todos.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		$scope.addTodo = function () {
			if (!$scope.newTodo.trim().length) {
				return;
			}
			var newTodo = {
				title: $scope.newTodo.trim(),
				completed: false
			};
			todoStorage.post(newTodo).success(function(data) {
				$scope.newTodo = '';
				$scope.todos = data;
			});
		};

		$scope.editTodo = function (todo) {
			$scope.editedTodo = todo;
			// Clone the original todo to restore it on demand.
			$scope.originalTodo = angular.extend({}, todo);

		};

		$scope.toggleTodo = function(todo) {
			todo.completed = !todo.completed;
			todoStorage.put(todo._id, todo);
		};

		$scope.doneEditing = function (todo) {
			$scope.editedTodo = null;
			todo.title = todo.title.trim();
			if (!todo.title) {
				$scope.removeTodo(todo);
			} else {
				var newTodo = {
					title: todo.title,
					completed: todo.completed
				};
				todoStorage.put(todo._id, newTodo);
			}
		};

		$scope.revertEditing = function (todo) {
			todos[todos.indexOf(todo)] = $scope.originalTodo;
			$scope.doneEditing($scope.originalTodo);
		};

		$scope.removeTodo = function (todo) {
			todoStorage.delete(todo).success(function(data) {
				$scope.todos = data; // assign our new list of todos
			});
		};

		$scope.clearCompletedTodos = function () {
			$scope.todos.forEach(function(todo) {
				if (todo.completed) {
					$scope.removeTodo(todo);
				}
			});
		};

		$scope.markAll = function (completed) {
			$scope.todos.forEach(function (todo) {
				todo.completed = !completed;
				todoStorage.put(todo._id, 
					{title: todo.title, completed: todo.completed});
			});
			todoStorage.get().success(function(data) {
				$scope.todos = data;
			});

		};
	}]);

angular.module('TB_LolCombinationOfChampionmvc')
	.controller('TB_LolCombinationOfChampionCtrl', ['$scope', '$filter', 'TB_LolCombinationOfChampionStorage', function ($scope, $filter, TB_LolCombinationOfChampionStorage) {
		$scope.TB_LolCombinationOfChampions = {};
		TB_LolCombinationOfChampionStorage.get().success(function(data) {
			$scope.TB_LolCombinationOfChampions = data;
		});

		$scope.newTB_LolCombinationOfChampion = '';
		$scope.editedTB_LolCombinationOfChampion = null;

		$scope.$watch('TB_LolCombinationOfChampions', function (newValue, oldValue) {
			$scope.remainingCount = $filter('filter')($scope.TB_LolCombinationOfChampions, { completed: false }).length;
			$scope.completedCount = $scope.TB_LolCombinationOfChampions.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		$scope.addTB_LolCombinationOfChampion = function () {
			if (!$scope.newTB_LolCombinationOfChampion.trim().length) {
				return;
			}
			var newTB_LolCombinationOfChampion = {
				title: $scope.newTB_LolCombinationOfChampion.trim(),
				completed: false
			};
			TB_LolCombinationOfChampionStorage.post(newTB_LolCombinationOfChampion).success(function(data) {
				$scope.newTB_LolCombinationOfChampion = '';
				$scope.TB_LolCombinationOfChampions = data;
			});
		};

		$scope.editTB_LolCombinationOfChampion = function (TB_LolCombinationOfChampion) {
			$scope.editedTB_LolCombinationOfChampion = TB_LolCombinationOfChampion;
			// Clone the original TB_LolCombinationOfChampion to restore it on demand.
			$scope.originalTB_LolCombinationOfChampion = angular.extend({}, TB_LolCombinationOfChampion);

		};

		$scope.toggleTB_LolCombinationOfChampion = function(TB_LolCombinationOfChampion) {
			TB_LolCombinationOfChampion.completed = !TB_LolCombinationOfChampion.completed;
			TB_LolCombinationOfChampionStorage.put(TB_LolCombinationOfChampion._id, TB_LolCombinationOfChampion);
		};

		$scope.doneEditing = function (TB_LolCombinationOfChampion) {
			$scope.editedTB_LolCombinationOfChampion = null;
			TB_LolCombinationOfChampion.title = TB_LolCombinationOfChampion.title.trim();
			if (!TB_LolCombinationOfChampion.title) {
				$scope.removeTB_LolCombinationOfChampion(TB_LolCombinationOfChampion);
			} else {
				var newTB_LolCombinationOfChampion = {
					title: TB_LolCombinationOfChampion.title,
					completed: TB_LolCombinationOfChampion.completed
				};
				TB_LolCombinationOfChampionStorage.put(TB_LolCombinationOfChampion._id, newTB_LolCombinationOfChampion);
			}
		};

		$scope.revertEditing = function (TB_LolCombinationOfChampion) {
			TB_LolCombinationOfChampions[TB_LolCombinationOfChampions.indexOf(TB_LolCombinationOfChampion)] = $scope.originalTB_LolCombinationOfChampion;
			$scope.doneEditing($scope.originalTB_LolCombinationOfChampion);
		};

		$scope.removeTB_LolCombinationOfChampion = function (TB_LolCombinationOfChampion) {
			TB_LolCombinationOfChampionStorage.delete(TB_LolCombinationOfChampion).success(function(data) {
				$scope.TB_LolCombinationOfChampions = data; // assign our new list of TB_LolCombinationOfChampions
			});
		};

		$scope.clearCompletedTB_LolCombinationOfChampions = function () {
			$scope.TB_LolCombinationOfChampions.forEach(function(TB_LolCombinationOfChampion) {
				if (TB_LolCombinationOfChampion.completed) {
					$scope.removeTB_LolCombinationOfChampion(TB_LolCombinationOfChampion);
				}
			});
		};

		$scope.markAll = function (completed) {
			$scope.TB_LolCombinationOfChampions.forEach(function (TB_LolCombinationOfChampion) {
				TB_LolCombinationOfChampion.completed = !completed;
				TB_LolCombinationOfChampionStorage.put(TB_LolCombinationOfChampion._id, 
					{title: TB_LolCombinationOfChampion.title, completed: TB_LolCombinationOfChampion.completed});
			});
			TB_LolCombinationOfChampionStorage.get().success(function(data) {
				$scope.TB_LolCombinationOfChampions = data;
			});

		};
	}]);


