document.addEventListener("DOMContentLoaded", function () {
    fetch("/centros")
        .then(response => response.json())
        .then(data => {
            const tablaCentros = document.getElementById("tabla-centros");
            data.forEach(centro => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${centro.nombre}</td>
                    <td>${centro.direccion}</td>
                `;
                tablaCentros.appendChild(fila);
            });
        })
        .catch(error => console.error("Error cargando los centros:", error));
});
