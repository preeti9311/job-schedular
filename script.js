let processes = [];

// Populate algorithms based on selected mode
function updateAlgorithms() {
  const mode = document.getElementById('mode').value;
  const algoSelect = document.getElementById('algorithm');
  algoSelect.innerHTML = '';

  if (mode === "preemptive") {
    algoSelect.innerHTML += `<option value="srjf">Shortest Remaining Job First (SRJF)</option>`;
    algoSelect.innerHTML += `<option value="priority">Priority Scheduling</option>`;
    algoSelect.innerHTML += `<option value="rr">Round Robin</option>`;
  } else if (mode === "non-preemptive") {
    algoSelect.innerHTML += `<option value="fcfs">First Come First Serve (FCFS)</option>`;
    algoSelect.innerHTML += `<option value="sjf">Shortest Job First (SJF)</option>`;
    algoSelect.innerHTML += `<option value="priority">Priority Scheduling</option>`;
  } else {
    algoSelect.innerHTML += `<option value="">--Select Mode First--</option>`;
  }

  // Show/Hide Quantum section on algorithm change
  algoSelect.onchange = function () {
    const algo = algoSelect.value;
    document.getElementById('quantum-section').style.display = (algo === 'rr') ? 'block' : 'none';
  };
}

// Proceed to process input section after validation
function proceedToInput() {
  const mode = document.getElementById('mode').value;
  const algorithm = document.getElementById('algorithm').value;

  if (!mode) {
    alert('Please select a Mode!');
    return;
  }

  if (!algorithm) {
    alert('Please select an Algorithm!');
    return;
  }

  if (algorithm === 'rr') {
    const quantum = document.getElementById('quantum').value;
    if (!quantum || quantum <= 0) {
      alert('Please enter a valid Time Quantum!');
      return;
    }
  }

  document.querySelector('.form-container').style.display = 'none';
  document.getElementById('process-input-section').style.display = 'flex';
  addProcessRow(); // Start with one row
}

// Add a new process input row
function addProcessRow() {
  const tbody = document.getElementById('process-table-body');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="number" name="priority" min="1" required></td>
    <td><input type="text" name="pid" required></td>
    <td><input type="number" name="at" min="0" required></td>
    <td><input type="number" name="bt" min="1" required></td>
    <td><button class="remove-btn" onclick="removeProcessRow(this)">Remove</button></td>
  `;
  tbody.appendChild(row);
}

// Remove a process row
function removeProcessRow(button) {
  button.closest('tr').remove();
}

// Validate process inputs
function validateProcessInputs() {
  const rows = document.querySelectorAll("#process-table-body tr");
  let valid = true;
  const ids = [];

  rows.forEach(row => {
    const pid = row.querySelector('input[name="pid"]').value.trim();
    const at = row.querySelector('input[name="at"]').value.trim();
    const bt = row.querySelector('input[name="bt"]').value.trim();

    if (!pid || at === '' || bt === '') {
      valid = false;
    }

    if (ids.includes(pid)) {
      alert("Duplicate Process ID: " + pid);
      valid = false;
    }
    ids.push(pid);
  });

  if (!valid) {
    alert("Please fill all fields correctly.");
  }

  return valid;
}


// Submit processes after validation
function submitProcesses() {
  if (!validateProcessInputs()) return;

  processes = [];
  const rows = document.querySelectorAll("#process-table-body tr");

  rows.forEach(row => {
    const priorityVal = row.querySelector('input[name="priority"]').value.trim();
    const pidVal = row.querySelector('input[name="pid"]').value.trim();
    const atVal = row.querySelector('input[name="at"]').value.trim();
    const btVal = row.querySelector('input[name="bt"]').value.trim();

    processes.push({
      priority: parseInt(priorityVal) || 0,   // Default 0 if empty (for algorithms like FCFS)
      pid: pidVal,
      arrivalTime: parseInt(atVal),
      burstTime: parseInt(btVal)
    });
  });

  console.log("Processes Submitted: ", processes);

  // Show success message or call your scheduler function here
  alert('Processes submitted successfully! Check console for data.');

  renderGanttChartPlaceholder();  // Optional, replace with your actual render logic
}


// Placeholder for Gantt Chart
function renderGanttChartPlaceholder() {
  const container = document.getElementById('gantt-chart');
  container.innerHTML = '';

  processes.forEach(proc => {
    const block = document.createElement('div');
    block.className = 'gantt-block';
    block.textContent = proc.pid;
    container.appendChild(block);
  });
}
