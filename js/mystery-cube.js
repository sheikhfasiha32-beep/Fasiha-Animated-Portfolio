
/* =========================================
   MYSTERY CUBE - BUTTON CONTROLS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cube = document.getElementById("mysteryCube");

    if (!cube) return;

    let rotateX = -22;
    let rotateY = -35;

    function updateCube() {

        cube.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    }

    document.getElementById("cubeUp").addEventListener("click", () => {
        rotateX -= 45;
        updateCube();
    });

    document.getElementById("cubeDown").addEventListener("click", () => {
        rotateX += 45;
        updateCube();
    });

    document.getElementById("cubeLeft").addEventListener("click", () => {
        rotateY -= 45;
        updateCube();
    });

    document.getElementById("cubeRight").addEventListener("click", () => {
        rotateY += 45;
        updateCube();
    });

    document.getElementById("cubeReset").addEventListener("click", () => {
        rotateX = -22;
        rotateY = -35;
        updateCube();
    });

    updateCube();

});
