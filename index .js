let employees = [];
let editingEmployee = null;

function openModal(employee = null) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  const form = document.getElementById("employeeForm");

  form.reset();
  editingEmployee = null;

  if (employee) {
    document.getElementById("modalTitle").innerText = "Edit Employee";
    document.getElementById("name").value = employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("position").value = employee.position;
    document.getElementById("phone").value = employee.phone;
    editingEmployee = employee;
  } else {
    document.getElementById("modalTitle").innerText = "Add Employee";
  }

  modal.style.display = "block";
  overlay.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function closeViewModal() {
  document.getElementById("viewModal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function saveEmployee(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const position = document.getElementById("position").value;
  const phone = document.getElementById("phone").value;

  if (editingEmployee) {
    editingEmployee.name = name;
    editingEmployee.email = email;
    editingEmployee.position = position;
    editingEmployee.phone = phone;
  } else {
    employees.push({ name, email, position, phone });
  }

  renderTable();
  closeModal();
}

function renderTable() {
  const tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = "";

  employees.forEach((employee, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${employee.position}</td>
      <td>${employee.phone}</td>
      <td>
        <button class="btn btn-primary" onclick="openModal(employees[${index}])">Edit</button>
        <button class="btn btn-danger" onclick="deleteEmployee(${index})">Delete</button>
        <button class="btn btn-secondary" onclick="viewEmployee(employees[${index}])">View</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  renderTable();
}

function viewEmployee(employee) {
  const viewContent = document.getElementById("viewContent");
  const overlay = document.getElementById("overlay");
  const viewModal = document.getElementById("viewModal");

  viewContent.innerHTML = `
    <p><strong>Name:</strong> ${employee.name}</p>
    <p><strong>Email:</strong> ${employee.email}</p>
    <p><strong>Position:</strong> ${employee.position}</p>
    <p><strong>Phone:</strong> ${employee.phone}</p>
  `;

  viewModal.style.display = "block";
  overlay.style.display = "block";
}
