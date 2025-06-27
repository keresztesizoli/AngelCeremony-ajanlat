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

  const isHungarian = document.getElementById("hungarian").value === "igen";
  document.getElementById("foreignOptions").classList.toggle("hidden", isHungarian);
}

document.getElementById("kmdij").addEventListener("input", calculateFee);
document.getElementById("distance").addEventListener("input", calculateFee);

function calculateFee() {
  const km = parseFloat(document.getElementById("distance").value);
  const fee = parseFloat(document.getElementById("kmdij").value);
  if (!isNaN(km) && !isNaN(fee)) {
    const total = Math.round(km * 2 * fee / 1000) * 1000;
    document.getElementById("kiszalldij").value = total;
  }
}

function generatePDF() {
  const form = document.getElementById("offerForm");
  const data = Object.fromEntries(new FormData(form).entries());
  const displayOption = data.hungarian === "nem" ? data.displayOption : "km";
  const kiszalldij = displayOption === "custom" ? data.customText : `${data.kiszalldij} Ft`;

  const pdfContent = `
    <div style="font-family: Arial, sans-serif; padding: 2rem; max-width: 800px;">
      <img src="logo.png" style="width: 150px; margin-bottom: 1rem;" />
      <h2>Kedves ${data.bride} & ${data.groom}!</h2>
      <p>Örömmel küldöm el szertartásvezetői ajánlatomat a magyar nyelvű esküvőtökhöz.
      Az Angel Ceremony által megálmodott 30 perc varázslat lesz – egy felejthetetlen élmény,
      ami megalapozza az egész nap ünnepi hangulatát.</p>
      <h3>Az esküvő részletei</h3>
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <ul>
          <li>Dátum: ${data.date}</li>
          <li>Időpont: ${data.hour}:${data.minute}</li>
          <li>Helyszín: ${data.location}</li>
          <li>Vendégek száma: ${data.guests}</li>
          <li>Csomag: ${data.selectedPackage}</li>
          <li>${data.hungarian === "igen" ? "Magyarországi helyszín" : "Külföldi helyszín"}</li>
          <li>${data.hungarian === "igen" || data.displayOption === "km" ? "Kiszállási díj: " + kiszalldij : kiszalldij}</li>
        </ul>
        <img src="Anita.png" style="width: 200px; margin-left: 2rem; align-self: flex-start;" />
      </div>
      <h3>Személyre szabott ceremónia</h3>
      <p>Az esküvőtök napja egy életre szóló közös emlék lesz – és minden egyes pillanata rólatok fog szólni.
      Általam vezetett szertartás mindig teljesen személyre szabott, ezért nincs két egyforma esketés.</p>
      <p>Az első egyeztetés során (személyesen vagy online) átbeszéljük az elképzeléseiteket, átnézzük a szerződést
      és tisztázzuk a részleteket. Ezt követően mindketten írtok nekem egy e-mailt, amiben megosztjátok a
      megismerkedésetek történetét, fontos momentumokat, és minden olyan információt, ami egy igazán bensőséges
      szertartáshoz szükséges – beleértve a fogadalmat, közös momentumot vagy szülőköszöntőt is.</p>
      <p>A szertartásotok forgatókönyvét, zenei koreográfiáját is közösen alakítjuk ki – úgy, hogy az valóban
      a ti történeteteket mesélje el.</p>
      <p><strong>Fontos tudnivaló:</strong> Szertartásvezetőként szimbolikus esketést tartok, amelyhez szükséges,
      hogy az anyakönyvi házasságkötés már korábban megtörténjen, legalább 30 nappal előtte jelezve a házasságkötési
      szándékot az illetékes hivatalnál. A hivatalos anyakönyvi kivonatot kérlek, küldjétek el e-mailben lefotózva
      legkésőbb az esküvő előtt 5 nappal (szükség esetén akár az esküvő napján is elfogadom).</p>
    </div>
  `;

  const opt = {
    margin: 0,
    filename: 'ajanlat.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  document.getElementById("pdfContent").innerHTML = pdfContent;
  html2pdf().from(document.getElementById("pdfContent")).set(opt).save();
}
document.getElementById("displayOption").addEventListener("change", toggleCustomTextVisibility);