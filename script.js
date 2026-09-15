const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const department = document.getElementById("department").value;

    const message = document.getElementById("message");

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/appointments",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    date: date,
                    department: department
                })
            }
        );

        const data = await response.json();

        message.textContent = data.message;

        form.reset();

    } catch (error) {

        message.textContent =
            "Unable to connect to the server.";

        console.error(error);
    }

});