function enviarWhatsapp() {
    /* numero de telefono */

    const celular = "51947373693"

    /* capturar valores del form */
    const nombre = document.getElementById("name").value;
    const correo = document.getElementById("email").value;
    const tipoNegocio = document.getElementById("negocio").value;
    const telefono = document.getElementById("tel").value;


    /* validar los campos que no este vacio */
    if (!nombre || !correo || !telefono) {
        alert("Por favor, complete todos los campos")
        return;
    }

    /* armar el texto */
    const mensaje = `Hola, mi nombre es ${nombre}
    Mi correo es: ${correo}
    Mi tipo de negocio es: ${tipoNegocio}
    Mi telefono es: ${telefono}`;

    /* codificar del texto para una urls */
    const urlCodificada = encodeURIComponent(mensaje);

    /* crear el link de whatsapp */
    const urlWhatsapp = `https://wa.me/${celular}?text=${urlCodificada}`;

    /* redirigir a whatsapp */
    window.open(urlWhatsapp, "_blank");

    /* limpiar campos del formulario */
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("negocio").value = "";
    document.getElementById("tel").value = "";
}