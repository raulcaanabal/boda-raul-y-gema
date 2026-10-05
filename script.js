/* =========================================
   CUENTA ATRÁS
========================================= */

const weddingDate =
    new Date("April 3, 2027 13:00:00").getTime();


function updateCountdown() {

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    // Si no estamos en la página principal,
    // no hacemos nada.
    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }


    const now = new Date().getTime();

    const difference =
        weddingDate - now;


    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );


    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );


    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   MODAL DE LA PÁGINA PRINCIPAL
========================================= */

const abrirFormulario =
    document.getElementById("abrir-formulario");

const cerrarFormulario =
    document.getElementById("cerrar-formulario");

const formularioModal =
    document.getElementById("formulario-modal");


if (
    abrirFormulario &&
    cerrarFormulario &&
    formularioModal
) {

    abrirFormulario.addEventListener(
        "click",
        function () {

            formularioModal.classList.add(
                "active"
            );

        }
    );


    cerrarFormulario.addEventListener(
        "click",
        function () {

            formularioModal.classList.remove(
                "active"
            );

        }
    );

}


/* =========================================
   FORMULARIO POR PASOS
========================================= */

const steps =
    document.querySelectorAll(".form-step");


if (steps.length > 0) {

    let currentStep = 0;


    /* =========================================
       MOSTRAR PASO
    ========================================== */

    function showStep(index) {

        steps.forEach(function (step, i) {

            step.classList.toggle(
                "active",
                i === index
            );

        });


    }


    /* =========================================
       BOTONES SIGUIENTE
    ========================================== */

    const nextButtons =
        document.querySelectorAll(".form-next");


    nextButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {


                /* -----------------------------
                   PASO 1 · NOMBRE
                ----------------------------- */

                if (currentStep === 0) {

                    const nombre =
                        document.getElementById(
                            "nombre"
                        );


                    if (
                        !nombre ||
                        nombre.value.trim() === ""
                    ) {

                        if (nombre) {
                            nombre.focus();
                        }

                        return;
                    }

                }


                /* -----------------------------
                   PASO 2 · ASISTENCIA
                ----------------------------- */

                if (currentStep === 1) {

                    const asistencia =
                        document.querySelector(
                            'input[name="asistencia"]:checked'
                        );


                    if (!asistencia) {

                        alert(
                            "Por favor, indícanos si podrás asistir."
                        );

                        return;
                    }


                    // Si NO asiste,
                    // vamos directamente al final.

                    if (
                        asistencia.value === "no"
                    ) {

                        currentStep = 7;

                        showStep(currentStep);

                        return;
                    }

                }


                /* -----------------------------
                   PASO 3 · ACOMPAÑANTE
                ----------------------------- */

                if (currentStep === 2) {

                    const acompanante =
                        document.querySelector(
                            'input[name="acompanante"]:checked'
                        );


                    if (!acompanante) {

                        alert(
                            "Por favor, indícanos si vendrás acompañado/a."
                        );

                        return;
                    }


                    // Si no lleva acompañante,
                    // saltamos el paso 4.

                    if (
                        acompanante.value === "no"
                    ) {

                        currentStep = 4;

                        showStep(currentStep);

                        return;
                    }

                }


                /* -----------------------------
                   PASO 4 · NOMBRE ACOMPAÑANTE
                ----------------------------- */

                if (currentStep === 3) {

                    const nombreAcompanante =
                        document.getElementById(
                            "nombre-acompanante"
                        );


                    if (
                        !nombreAcompanante ||
                        nombreAcompanante.value.trim() === ""
                    ) {

                        if (nombreAcompanante) {
                            nombreAcompanante.focus();
                        }

                        return;
                    }

                }

                /* -----------------------------
   PASO 5 · ALIMENTACIÓN
----------------------------- */

if (currentStep === 4) {

    const alergia =
        document.querySelector(
            'input[name="alergia"]:checked'
        );


    // Es obligatorio indicar si tiene alergias

    if (!alergia) {

        alert(
            "Por favor, indícanos si tienes alguna alergia o intolerancia."
        );

        return;
    }


    // Si tiene alergia, es obligatorio especificarla

    if (alergia.value === "si") {

        const detalleAlergia =
            document.getElementById(
                "detalle-alergia"
            );


        if (
            !detalleAlergia ||
            detalleAlergia.value.trim() === ""
        ) {

            if (detalleAlergia) {
                detalleAlergia.focus();
            }

            alert(
                "Por favor, especifica qué alergia o intolerancia debemos tener en cuenta."
            );

            return;
        }

    }


    // Si lleva acompañante, también comprobamos su alergia

    const acompanante =
        document.querySelector(
            'input[name="acompanante"]:checked'
        );


    if (
        acompanante &&
        acompanante.value === "si"
    ) {

        const alergiaAcompanante =
            document.querySelector(
                'input[name="alergia-acompanante"]:checked'
            );


        if (!alergiaAcompanante) {

            alert(
                "Por favor, indícanos si tu acompañante tiene alguna alergia o intolerancia."
            );

            return;
        }


        // Si tiene alergia, es obligatorio especificarla

        if (
            alergiaAcompanante.value === "si"
        ) {

            const detalleAlergiaAcompanante =
                document.getElementById(
                    "detalle-alergia-acompanante"
                );


            if (
                !detalleAlergiaAcompanante ||
                detalleAlergiaAcompanante.value.trim() === ""
            ) {

                if (detalleAlergiaAcompanante) {
                    detalleAlergiaAcompanante.focus();
                }

                alert(
                    "Por favor, especifica qué alergia o intolerancia tiene tu acompañante."
                );

                return;
            }

        }

    }

}/* -----------------------------
   PASO 6 · AUTOBÚS
----------------------------- */

if (currentStep === 5) {

    const autobus =
        document.querySelector(
            'input[name="autobus"]:checked'
        );


    // Es obligatorio indicar si necesita autobús

    if (!autobus) {

        alert(
            "Por favor, indícanos si necesitas utilizar el autobús."
        );

        return;
    }


    // Si necesita autobús,
    // todos sus datos son obligatorios.

    if (autobus.value === "si") {

        const plazas =
            document.getElementById("plazas");

        const origen =
            document.getElementById("origen");

        const trayecto =
            document.querySelector(
                'input[name="trayecto"]:checked'
            );


        if (
            !plazas ||
            plazas.value.trim() === ""
        ) {

            if (plazas) {
                plazas.focus();
            }

            alert(
                "Por favor, indica cuántas plazas necesitáis."
            );

            return;
        }


        if (
            !origen ||
            origen.value === ""
        ) {

            if (origen) {
                origen.focus();
            }

            alert(
                "Por favor, indica desde dónde cogeréis el autobús."
            );

            return;
        }


        if (!trayecto) {

            alert(
                "Por favor, indica qué trayecto necesitáis."
            );

            return;
        }

    }

}


                /* -----------------------------
                   SIGUIENTE PASO
                ----------------------------- */

                if (
                    currentStep <
                    steps.length - 1
                ) {

                    currentStep++;

                    showStep(currentStep);

                }

            }
        );

    });


    /* =========================================
       BOTONES ANTERIOR
    ========================================== */

    const backButtons =
    document.querySelectorAll(
        ".form-back"
    );


backButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            if (currentStep <= 0) {
                return;
            }


            // Si estamos en la pantalla de NO ASISTENCIA,
            // volvemos directamente a la pregunta de asistencia.

            if (currentStep === 7) {

                currentStep = 1;

                showStep(currentStep);

                return;
            }


            // Si estamos en ALIMENTACIÓN y no lleva acompañante,
            // volvemos directamente a la pregunta de acompañante.

            if (currentStep === 4) {

                const acompanante =
                    document.querySelector(
                        'input[name="acompanante"]:checked'
                    );


                if (
                    acompanante &&
                    acompanante.value === "no"
                ) {

                    currentStep = 2;

                    showStep(currentStep);

                    return;
                }

            }


            // En el resto de casos,
            // retrocedemos normalmente.

            currentStep--;

            showStep(currentStep);

        }
    );

});


    /* =========================================
       ALERGIAS DEL INVITADO
    ========================================== */

    const alergiaInputs =
        document.querySelectorAll(
            'input[name="alergia"]'
        );


    const detalleAlergia =
        document.getElementById(
            "detalle-alergia-container"
        );


    alergiaInputs.forEach(function (input) {

        input.addEventListener(
            "change",
            function () {

                if (!detalleAlergia) {
                    return;
                }


                detalleAlergia.classList.toggle(
                    "active",
                    this.value === "si"
                );

            }
        );

    });


    /* =========================================
       ALERGIAS DEL ACOMPAÑANTE
    ========================================== */

    const alergiaAcompananteInputs =
        document.querySelectorAll(
            'input[name="alergia-acompanante"]'
        );


    const detalleAlergiaAcompanante =
        document.getElementById(
            "detalle-alergia-acompanante-container"
        );


    alergiaAcompananteInputs.forEach(
        function (input) {

            input.addEventListener(
                "change",
                function () {

                    if (
                        !detalleAlergiaAcompanante
                    ) {
                        return;
                    }


                    detalleAlergiaAcompanante
                        .classList
                        .toggle(
                            "active",
                            this.value === "si"
                        );

                }
            );

        }
    );


    /* =========================================
       ACOMPAÑANTE
    ========================================== */

    const acompananteInputs =
        document.querySelectorAll(
            'input[name="acompanante"]'
        );


    const companionFood =
        document.querySelectorAll(
            ".companion-food"
        );


    acompananteInputs.forEach(
        function (input) {

            input.addEventListener(
                "change",
                function () {

                    companionFood.forEach(
                        function (element) {

                            element.style.display =
                                input.value === "si"
                                    ? ""
                                    : "none";

                        }
                    );

                }
            );

        }
    );


    /* =========================================
       AUTOBÚS
    ========================================== */

    const autobusInputs =
        document.querySelectorAll(
            'input[name="autobus"]'
        );


    const datosAutobus =
        document.getElementById(
            "datos-autobus"
        );


    autobusInputs.forEach(
        function (input) {

            input.addEventListener(
                "change",
                function () {

                    if (!datosAutobus) {
                        return;
                    }


                    datosAutobus.classList.toggle(
                        "active",
                        input.value === "si"
                    );

                }
            );

        }
    );


    /* =========================================
       BOTÓN FINAL
    ========================================== */

    const submitButton =
        document.querySelector(
            ".form-submit"
        );


    if (submitButton) {

        submitButton.addEventListener(
            "click",
            function () {

                alert(
                    "¡Gracias! Tu confirmación ha sido registrada."
                );

            }
        );

    }
}

/* =========================================
   ENVÍO DEL FORMULARIO A GOOGLE SHEETS
========================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzHRNOcCyNBC-8VFEjKpq9d7EZiJ7-VwxJkOWTEnv3JPx-srSlMtI4Ls9OgBlS6EXWWcg/exec";

const rsvpForm = document.getElementById("rsvp-form");

if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const submitButton =
            rsvpForm.querySelector(".form-submit");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML =
                "Enviando... <span>♥</span>";
        }

        const datos = new FormData(rsvpForm);

        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: datos,
            mode: "no-cors"
        })
        .then(function () {

            rsvpForm.innerHTML = `
                <div class="confirmation-message">
                    <h2>¡Gracias!</h2>
                    <p>
                        Hemos recibido tu confirmación
                        correctamente.
                    </p>
                    <p>
                        Nos hace muchísima ilusión
                        compartir este día contigo.
                    </p>
                    <a href="index.html" class="form-submit">
                        Volver a la web
                    </a>
                </div>
            `;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
        .catch(function (error) {

            console.error(
                "Error al enviar el formulario:",
                error
            );

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML =
                    "Confirmar asistencia <span>♥</span>";
            }

            alert(
                "Ha ocurrido un problema al enviar la confirmación. Por favor, inténtalo de nuevo."
            );
        });
    });
}