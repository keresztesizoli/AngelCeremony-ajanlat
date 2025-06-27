
function calculateDeliveryFee() {
    const distance = parseFloat(document.getElementById('distance').value);
    const kmPrice = parseFloat(document.getElementById('kmPrice').value);
    if (!isNaN(distance) && !isNaN(kmPrice)) {
        const fee = Math.round(distance * 2 * kmPrice / 1000) * 1000;
        document.getElementById('deliveryFee').value = fee;
    }
}

document.querySelectorAll('input[name="isHungary"]').forEach(el => {
    el.addEventListener('change', () => {
        const isHungary = document.querySelector('input[name="isHungary"]:checked').value;
        const foreignOptions = document.getElementById('foreignOptions');
        foreignOptions.style.display = (isHungary === 'no') ? 'block' : 'none';
    });
});

document.querySelectorAll('input[name="foreignDisplay"]').forEach(el => {
    el.addEventListener('change', () => {
        const selected = document.querySelector('input[name="foreignDisplay"]:checked').value;
        const textLabel = document.getElementById('customTextLabel');
        const textInput = document.getElementById('customText');
        const show = selected === 'text';
        textLabel.style.display = show ? 'block' : 'none';
        textInput.style.display = show ? 'block' : 'none';
    });
});

function generatePDF() {
    const form = document.getElementById("offerForm");
    const data = {};
    [...form.elements].forEach(e => {
        if (e.name) {
            if (e.type === "radio" && !e.checked) return;
            data[e.name] = e.value;
        }
    });

    fetch("https://angelceremony-ajanlat-backend.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ajanlat.pdf";
        a.click();
    })
    .catch(err => alert("Hiba a PDF generálásakor: " + err.message));
}
