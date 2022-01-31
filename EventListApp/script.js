var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["eventName"] = document.getElementById("eventName").value;
    formData["startDate"] = document.getElementById("startDate").value;
    formData["endDate"] = document.getElementById("endDate").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("eventList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.eventName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.startDate;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.endDate;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("eventName").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("eventName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("startDate").value = selectedRow.cells[1].innerHTML;
    document.getElementById("endDate").value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.eventName;
    selectedRow.cells[1].innerHTML = formData.startDate;
    selectedRow.cells[2].innerHTML = formData.endDate;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("eventList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("eventName").value == "") {
        isValid = false;
        document.getElementById("eventNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("eventNameValidationError").classList.contains("hide"))
            document.getElementById("eventNameValidationError").classList.add("hide");
    }
    return isValid;
}