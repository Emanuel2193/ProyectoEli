document.addEventListener('DOMContentLoaded', function() {
    const totalElement = document.getElementById('total');
    const facturaNumero = document.getElementById('numero-factura');
    const clienteInput = document.getElementById('cliente');

    // Generar un número de factura aleatorio para demostrar
    function generateFacturaNumber() {
        return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    }

    // Inicializar el número de factura
    facturaNumero.value = generateFacturaNumber();

    // Referencias a elementos de formulario
    const codigoInput = document.getElementById('codigo');
    const articuloInput = document.getElementById('articulo');
    const cantidadInput = document.getElementById('cantidad');
    const precioInput = document.getElementById('precio');

    // Agregar artículo a la tabla
    document.querySelector('.btn-5').addEventListener('click', function() {
        const codigo = codigoInput.value;
        const articulo = articuloInput.value;
        const cantidad = parseFloat(cantidadInput.value);
        const precio = parseFloat(precioInput.value);

        if (codigo && articulo && !isNaN(cantidad) && !isNaN(precio)) {
            const tabla = document.querySelector('.table tbody');
            const nuevaFila = document.createElement('tr');

            nuevaFila.innerHTML = `
                <th scope="row">${cantidad}</th>
                <td>${articulo}</td>
                <td>${(precio * cantidad).toFixed(2)}</td>
            `;

            tabla.appendChild(nuevaFila);
            actualizarTotal();
        } else {
            alert('Por favor, complete todos los campos correctamente.');
        }
    });

    // Actualizar el total de la factura
    function actualizarTotal() {
        const filas = document.querySelectorAll('.table tbody tr');
        let total = 0;

        filas.forEach(fila => {
            const precioVenta = parseFloat(fila.cells[2].textContent.replace(',', '.'));
            if (!isNaN(precioVenta)) {
                total += precioVenta;
            }
        });

        totalElement.textContent = total.toFixed(2);
    }

    // Botón "Actualizar precios"
    document.querySelector('.btn-1').addEventListener('click', function() {
        actualizarTotal();
    });

    // Botón "Eliminar Producto"
    document.querySelector('.btn-2').addEventListener('click', function() {
        const filas = document.querySelectorAll('.table tbody tr');
        if (filas.length > 0) {
            filas[filas.length - 1].remove();
            actualizarTotal();
        } else {
            alert('No hay productos para eliminar.');
        }
    });

    // Botón "Generar Venta"
    document.querySelector('.btn-3').addEventListener('click', function() {
        if (clienteInput.value.trim() === '') {
            alert('Por favor, ingrese el nombre del cliente.');
        } else {
            alert(`Factura generada para el cliente: ${clienteInput.value}`);
            // Aquí podrías agregar más lógica para guardar la venta o imprimir la factura.
        }
    });

    // Botón "Salir"
    document.querySelector('.btn-4').addEventListener('click', function() {
        window.close(); // Esto intentará cerrar la ventana del navegador
    });
});