document.addEventListener("DOMContentLoaded", function () {
    fetch("/estadisticas")
        .then(response => response.json())
        .then(data => {
            const nombresCursos = data.map(curso => curso.nombre);
            const aprobados = data.map(curso => curso.aprobados);
            const total = data.map(curso => curso.total);

            const ctx = document.getElementById("graficoAprobados").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: nombresCursos,
                    datasets: [{
                        label: "Alumnos Aprobados",
                        data: aprobados,
                        backgroundColor: "rgba(75, 192, 192, 0.6)"
                    }, {
                        label: "Total Matriculados",
                        data: total,
                        backgroundColor: "rgba(255, 99, 132, 0.6)"
                    }]
                },
                options: {
                    responsive: true,
                    aspectRatio: 1.4,  // Ajustado para un tamaño más grande
                    plugins: {
                        legend: { position: "top" }
                    },
                    layout: {
                        padding: 30  // Espaciado adicional
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
});
