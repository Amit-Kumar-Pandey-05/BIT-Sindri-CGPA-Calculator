const branchSelect = document.getElementById("branch");
const batchSelect = document.getElementById("batch");
const semesterRows = document.getElementById("semesterRows");
const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");
const cgpaValue = document.getElementById("cgpaValue");
const resultMeta = document.getElementById("resultMeta");

const SEMESTERS = 8;

function populateBranches() {
  branchSelect.innerHTML = Object.keys(BRANCH_DATA)
    .map(branch => `<option value="${escapeHtml(branch)}">${escapeHtml(branch)}</option>`)
    .join("");
}

function getCredits() {
  const branch = branchSelect.value;
  // Return the full 8-semester credits array for the selected branch
  return BRANCH_DATA[branch] || [0, 0, 0, 0, 0, 0, 0, 0];
}

function renderSemesters() {
  const credits = getCredits();

  semesterRows.innerHTML = Array.from({ length: SEMESTERS }, (_, i) => {
    const credit = credits[i];
    const creditText = credit == null ? "—" : credit;

    return `
      <tr>
        <td>Semester ${toRoman(i + 1)}</td>
        <td>
          <input
            class="sgpa-input"
            type="number"
            inputmode="decimal"
            min="0"
            max="10"
            step="0.01"
            placeholder="SGPA"
            data-semester="${i + 1}"
            aria-label="SGPA for Semester ${i + 1}"
          />
        </td>
        <td><span class="credit">${creditText}</span></td>
      </tr>
    `;
  }).join("");
}

function calculateCGPA() {
  const credits = getCredits();
  const inputs = [...document.querySelectorAll(".sgpa-input")];

  let weightedSum = 0;
  let totalCredits = 0;
  let completed = 0;

  inputs.forEach((input, index) => {
    const raw = input.value.trim();
    if (raw === "") return;

    const sgpa = Number(raw);
    const credit = credits[index];

    if (!Number.isFinite(sgpa) || sgpa < 0 || sgpa > 10) {
      input.focus();
      input.setCustomValidity("Enter an SGPA between 0 and 10.");
      input.reportValidity();
      return;
    }

    input.setCustomValidity("");

    if (credit == null || credit === 0) return;

    weightedSum += sgpa * credit;
    totalCredits += credit;
    completed++;
  });

  if (completed === 0 || totalCredits === 0) {
    cgpaValue.textContent = "—";
    resultMeta.textContent = "Enter SGPA for one or more completed semesters.";
    return;
  }

  const cgpa = weightedSum / totalCredits;
  cgpaValue.textContent = cgpa.toFixed(3);
  resultMeta.textContent =
    `${completed} semester${completed > 1 ? "s" : ""} included • ${totalCredits} credits`;
}

function clearAll() {
  document.querySelectorAll(".sgpa-input").forEach(input => {
    input.value = "";
    input.setCustomValidity("");
  });
  cgpaValue.textContent = "—";
  resultMeta.textContent = "Enter SGPA for one or more semesters.";
}

function toRoman(number) {
  return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][number - 1];
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

branchSelect.addEventListener("change", () => {
  renderSemesters();
  clearAll();
});

calculateBtn.addEventListener("click", calculateCGPA);
clearBtn.addEventListener("click", clearAll);

populateBranches();
renderSemesters();