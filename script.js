let name   = document.querySelector('#name');
    price  = document.querySelector('#price');
    amount = document.querySelector('#amount');
    add    = document.querySelector('#add');
    table  = document.querySelector('#table');
    total  = document.querySelector('#total');


function createCell(tr, value, product) {
    let td = document.createElement('td');
    td.textContent = value;
    td.classList.add(product);
    tr.appendChild(td);

    return td;
}

function allowEdit(td) {
	td.addEventListener('click', function() {
        let edit = document.createElement('input');
        edit.value = this.textContent;
        this.textContent = '';
		td.appendChild(edit);
        edit.focus();
        edit.addEventListener('keypress', function(event) {
            if (event.key == 'Enter') {
                td.textContent = edit.value;
                edit.remove();

                if (td.classList.contains('price') || td.classList.contains('amount')) {
                    td.parentNode.querySelector('.cost').textContent = td.parentNode.querySelector('.price').textContent * td.parentNode.querySelector('.amount').textContent;
                    recountTotal();
                }
            }

            
        })
	});
}

function recountTotal() {
	let costs = table.querySelectorAll('.cost');
    let totalSum = 0;
	
	if (costs) {
		// находим сумму и записываем ее в #total
        for (cost of costs) {
            totalSum += +cost.textContent;
        }
	}

    total.textContent = totalSum;
}

add.addEventListener('click', function() {
    let tr = document.createElement('tr');
    
    allowEdit(createCell(tr, name.value, 'name'))
	allowEdit(createCell(tr, price.value, 'price'));
	allowEdit(createCell(tr, amount.value, 'amount'));
	createCell(tr, price.value * amount.value, 'cost');
	createCell(tr, 'удалить', 'remove').addEventListener('click', function() {
        this.parentNode.remove();
        recountTotal();
    })
    
    table.appendChild(tr);
    recountTotal();
});

