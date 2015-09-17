import Reflux from 'reflux';
import _ from 'lodash';
import TodoActions from '../actions/TodoActions.js';

var todoCount = 0,
		localStorageKey = "todos";

function getItemByKey (list, itemKey) {
	return _.find(list, (item) => {
		return item.key === itemKey;
	});
}

export default Reflux.createStore({

	listenables: [TodoActions],

	onEditItem (itemKey, newLabel) {
		var foundItem = getItemByKey(this.list,itemKey);
		if (!foundItem) {
			return;
		}
		foundItem.label = newLabel;
		this.updateList(this.list);
	},
	onAddItem (label) {
		this.updateList([{
			key: todoCounter++,
			created: new Date(),
			isComplete: false,
			label: label
		}].concat(this.list));
	},
	onRemoveItem (itemKey) {
		this.updateList(_.filter(this.list,(item) => {
			return item.key!==itemKey;
		}));
	},
	onToggleItem (itemKey) {
		var foundItem = getItemByKey(this.list,itemKey);
		if (foundItem) {
			foundItem.isComplete = !foundItem.isComplete;
			this.updateList(this.list);
		}
	},
	onToggleAllItems (checked) {
		this.updateList(_.map(this.list, (item) => {
			item.isComplete = checked;
			return item;
		}));
	},
	onClearCompleted () {
		this.updateList(_.filter(this.list, (item) => {
			return !item.isComplete;
		}));
	},
	updateList (list) {
		localStorage.setItem(localStorageKey, JSON.stringify(list));
		this.list = list;
		this.trigger(list); // sends the updated list to all listening components (TodoApp)
	},
	getDefaultData () {
		var loadedList = localStorage.getItem(localStorageKey);
		if (!loadedList) {
			// If no list is in localstorage, start out with a default one
			this.list = [{
				key: todoCounter++,
				created: new Date(),
				isComplete: false,
				label: 'Rule the web'
			}];
		} else {
			this.list = _.map(JSON.parse(loadedList), (item) => {
				// just resetting the key property for each todo item
				item.key = todoCounter++;
				return item;
			});
		}
		return this.list;
	}

});
