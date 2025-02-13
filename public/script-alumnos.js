document.addEventListener("DOMContentLoaded", function () {
    const selectCurso = document.getElementById("curso");
    const tablaAlumnos = document.getElementById("tabla-alumnos");
    
    fetch("/cursos")
        .then(response => response.json())
        .then(data => {
            data.forEach(curso => {
                const option = document.createElement("option");
                option.value = curso.idCurso;
                option.textContent = curso.nombre;
                selectCurso.appendChild(option);
            });
        })
        .catch(error => console.error("Error cargando los cursos:", error));
    
    function cargarAlumnos(cursoId) {
        fetch(`/cursos/${cursoId}/alumnos`)
            .then(response => response.json())
            .then(data => {
                tablaAlumnos.innerHTML = "";
                data.forEach(alumno => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${alumno.nombre}</td>
                        <td>${alumno.estado}</td>
                        <td><button onclick="eliminarAlumno(${alumno.idAlumno})">Eliminar</button></td>
                    `;
                    tablaAlumnos.appendChild(fila);
                });
            })
            .catch(error => console.error("Error cargando los alumnos:", error));
    }
    
    selectCurso.addEventListener("change", function () {
        cargarAlumnos(this.value);
    });
    
    function eliminarAlumno(idAlumno) {
        fetch(`/alumnos/${idAlumno}`, { method: "DELETE" })
            .then(response => response.json())
            .then(() => cargarAlumnos(selectCurso.value))
            .catch(error => console.error("Error eliminando alumno:", error));
    }
});
