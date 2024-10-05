const socket = io(); // Conectar al servidor WebSocket

// Recibir la lista actualizada de productos
socket.on('updateProducts', (products) => {
	const productList = document.getElementById('productList');
	productList.innerHTML = ''; // Limpiar la lista actual

	// Agregar productos a la lista
	products.forEach((product) => {
		const card = document.createElement('div');
		card.className = 'product-card'; // Añadir la clase para los estilos

		card.innerHTML = `
            <h2>${product.title}</h2>
            <p>Descripción: ${product.description}</p>
            <p>Precio: $${product.price}</p>
            <img src="${product.img}" alt="${product.title}">
            <p>Código: ${product.code}</p>
            <p>Stock: ${product.stock}</p>
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
        `;
		productList.appendChild(card);
	});
});

// Agregar un producto
document.getElementById('productForm').addEventListener('submit', (event) => {
	event.preventDefault(); // Prevenir el envío del formulario
	const form = event.target;
	const newProduct = {
		title: form.title.value,
		description: form.description.value,
		price: parseFloat(form.price.value),
		img: form.img.value,
		code: form.code.value,
		stock: parseInt(form.stock.value),
	};

	socket.emit('addProduct', newProduct); // Emitir el nuevo producto
	form.reset(); // Resetear el formulario
});

// Función para eliminar un producto
function deleteProduct(id) {
	socket.emit('deleteProduct', id); // Emitir el id del producto a eliminar
}
