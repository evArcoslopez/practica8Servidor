document.addEventListener("DOMContentLoaded", function () {
    const selectCurso = document.getElementById("curso");
    const formularioCurso = document.getElementById("formulario-curso");
    
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
    
    function cargarDatosCurso(cursoId) {
        fetch(`/cursos/${cursoId}`)
            .then(response => response.json())
            .then(curso => {
                document.getElementById("nombre").value = curso.nombre;
                document.getElementById("fechaImportacion").value = curso.fechaImportacion;
                document.getElementById("nivel").value = curso.nivel;
                document.getElementById("descripcion").value = curso.descripcion;
                document.getElementById("lugar").value = curso.lugar;
            })
            .catch(error => console.error("Error cargando datos del curso:", error));
    }
    
    selectCurso.addEventListener("change", function () {
        cargarDatosCurso(this.value);
    });
    
    formularioCurso.addEventListener("submit", function (event) {
        event.preventDefault();
        const cursoId = selectCurso.value;
        const datosActualizados = {
            nombre: document.getElementById("nombre").value,
            fechaImportacion: document.getElementById("fechaImportacion").value,
            nivel: document.getElementById("nivel").value,
            descripcion: document.getElementById("descripcion").value,
            lugar: document.getElementById("lugar").value
        };
        
        fetch(`/cursos/${cursoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosActualizados)
        })
        .then(response => response.json())
        .then(() => alert("Curso actualizado correctamente"))
        .catch(error => console.error("Error actualizando el curso:", error));
    });
});
