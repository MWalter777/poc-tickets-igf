const rows = 'ABCDEFGHIJKLMNO'.split('');
const columns = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
/*
este objeto debe tener almenos la sigiuente estructura 
{
	[`${row}-${column}`]: {
		selected: `${row}-${column}`,
		selectedByMe: true, // si la mesa fue seleccionada por el usuario actual
		// cualquier otro dato que se quiera guardar
	},
}
*/
const selectedTables = {
	'A-10': {
		selected: 'A-10',
		selectedByMe: false,
	},
};

const loadTables = (selectedTables = {}) => {
	const chairs = document.getElementById('chairs');
	// append a div for each row
	rows.forEach((row) => {
		const div = document.createElement('div');
		div.className = 'chair-row';
		div.innerText = row;
		chairs.appendChild(div);
		columns.forEach((column) => {
			const chair = document.createElement('div');
			chair.className = 'chair';
			chair.id = `${row}-${column}`;
			if (selectedTables[chair.id] && !selectedTables[chair.id].selectedByMe) {
				chair.classList.add('selected-other-user');
			} else {
				chair.addEventListener('click', () => {
					selectTable(chair.id);
				});
			}
			chairs.appendChild(chair);
		});
	});
};

const selectTable = (table) => {
	const selected = document.getElementById(table);
	if (!selectedTables[table]) {
		selectedTables[table] = {
			selected: table,
			otherData: true,
			selectedByMe: true,
		};
		selected.classList.add('selected');
		return;
	}
	if (selectedTables[table].selectedByMe) {
		selectedTables[table] = undefined;
		selected.classList.remove('selected');
		return;
	}
	console.error('Esta mesa ya fue seleccionada por otro usuario');
};

const saveElements = () => {
	const data = [];
	Object.keys(selectedTables).forEach((key) => {
		if (selectedTables[key]) {
			data.push(selectedTables[key]);
		}
	});
	if (data.length === 0) {
		console.error('No hay mesas seleccionadas');
		return;
	}
	console.log({ data });
};

document.addEventListener('DOMContentLoaded', () => {
	loadTables(selectedTables);
});
