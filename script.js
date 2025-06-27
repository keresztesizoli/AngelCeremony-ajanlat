function calculateFee() {
  const distance = parseFloat(document.getElementById("distance").value) || 0;
  const kmdij = parseFloat(document.getElementById("kmdij").value) || 0;
  const fee = Math.ceil(distance * 2 * kmdij / 1000) * 1000;
  document.getElementById("kiszalldij").value = fee;
}

function toggleForeignFields() {
  const isHungarian = document.getElementById("hungarian").value === "igen";
  document.getElementById("foreignOptions").classList.toggle("hidden", isHungarian);
  toggleCustomTextVisibility();
}

function toggleCustomTextVisibility() {
  const displayOption = document.getElementById("displayOption");
  const customTextField = displayOption ? document.querySelector("input[name='customText']").parentElement : null;
  if (customTextField) {
    customTextField.classList.toggle("hidden", displayOption.value !== "custom");
  }
}

document.getElementById("distance").addEventListener("input", calculateFee);
document.getElementById("kmdij").addEventListener("input", calculateFee);
document.getElementById("hungarian").addEventListener("change", toggleForeignFields);
document.addEventListener("DOMContentLoaded", () => {
  const displayOption = document.getElementById("displayOption");
  if (displayOption) {
    displayOption.addEventListener("change", toggleCustomTextVisibility);
  }
});

function generatePDF() {
  const form = document.getElementById("offerForm");
  const data = new FormData(form);

  const menyasszony = data.get("bride");
  const volegeny = data.get("groom");
  const datum = data.get("date");
  const ora = data.get("hour");
  const perc = data.get("minute");
  const helyszin = data.get("location");
  const tavolsag = data.get("distance");
  const magyar = data.get("hungarian");
  const vendeg = data.get("guests");
  const csomag = data.get("selectedPackage");
  const kmdij = data.get("kmdij");
  const kiszallas = data.get("kiszalldij");
  const customText = data.get("customText");
  const displayOption = data.get("displayOption");

  let kijelzettDij = "";
  if (magyar === "igen") {
    kijelzettDij = `Kiszállási díj: ${kiszallas} Ft`;
  } else {
    if (displayOption === "km") {
      kijelzettDij = `Kiszállási díj: ${kiszallas} Ft`;
    } else {
      kijelzettDij = customText;
    }
  }

  const pdfContent = `
    <div style="padding: 20px; font-family: 'Segoe UI', sans-serif;">
      <img src="logo.png" style="height: 60px; margin-bottom: 20px;">
      <h2>Kedves ${menyasszony} & ${volegeny}!</h2>
      <p>Örömmel küldöm el szertartásvezetői ajánlatomat a magyar nyelvű esküvőtökhöz. Az Angel Ceremony által megálmodott 30 perc varázslat lesz – egy felejthetetlen élmény, ami megalapozza az egész nap ünnepi hangulatát.</p>
      <h3>Az esküvő részletei</h3>
      <table style="width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="vertical-align: top; width: 60%;">
            <ul>
              <li>Dátum: ${datum}</li>
              <li>Időpont: ${ora}:${perc}</li>
              <li>Helyszín: ${helyszin}</li>
              <li>Távolság: ${tavolsag} km</li>
              <li>Vendégek száma: ${vendeg}</li>
              <li>Csomag: ${csomag}</li>
              <li>${kijelzettDij}</li>
            </ul>
          </td>
          <td style="text-align: right; width: 40%;">
            <img src="Anita.png" style="width: 150px;">
          </td>
        </tr>
      </table>
      <h3>Személyre szabott ceremónia</h3>
      <p>Az esküvőtök napja egy életre szóló közös emlék lesz – és minden egyes pillanata rólatok fog szólni...</p>
    </div>
  `;

  const element = document.getElementById("pdfContent");
  element.innerHTML = pdfContent;
  html2pdf().from(element).save();
}