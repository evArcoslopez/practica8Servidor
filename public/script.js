document.addEventListener("DOMContentLoaded", function () {
    fetch("/cursos")
        .then(response => response.json())
        .then(data => {
            const tablaCursos = document.getElementById("tabla-cursos");
            data.forEach(curso => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${curso.nombre}</td>
                    <td>${curso.fechaImportacion}</td>
                    <td>${curso.nivel}</td>
                    <td>${curso.descripcion}</td>
                    <td>${curso.lugar}</td>
                `;
                tablaCursos.appendChild(fila);
            });
        })
        .catch(error => console.log("Error cargando los cursos:", error));
});
