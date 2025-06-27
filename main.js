
document.getElementById('isHungary').addEventListener('change', function() {
  const foreignOptions = document.getElementById('foreignOptions');
  foreignOptions.style.display = this.value === "false" ? "block" : "none";
  updateDisplayOption();
});

document.getElementById('displayOption').addEventListener('change', updateDisplayOption);

function updateDisplayOption() {
  const option = document.getElementById('displayOption').value;
  const label = document.getElementById('customTextLabel');
  label.style.display = option === 'custom' ? 'block' : 'none';
}

function calculateDistance() {
  const d = parseFloat(document.getElementById('distance').value || 0);
  const k = parseFloat(document.getElementById('kmdij').value || 0);
  const total = Math.round((d * 2 * k) / 1000) * 1000;
  document.getElementById('kiszalldij').value = total;
}

document.getElementById('offerForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(this).entries());

  try {
    const res = await fetch('https://angelceremony-ajanlat-backend.onrender.com/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!res.ok) throw new Error('Hiba a PDF generálásban');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ajanlat.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    alert("Hiba történt: " + err.message);
  }
});
