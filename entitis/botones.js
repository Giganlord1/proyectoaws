document.getElementById('saveButton').addEventListener('click', async () => {
    const username = prompt("Ingresa el nombre del nuevo usuario:");
    const telefono = prompt("Ingresa el teléfono del nuevo usuario:");
    const puesto = prompt("Ingresa el puesto del nuevo usuario:");
    const fecha_contratacion = prompt("Ingresa la fecha de contratación:");
  
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, telefono, puesto, fecha_contratacion })
    });
  
    fetchUsers();
  });
  
  document.getElementById('deleteButton').addEventListener('click', async () => {
    const confirmation = confirm("¿Estás seguro de que quieres borrar todos los usuarios?");
    if (confirmation) {
      const response = await fetch('/api/users', {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchUsers();
      } else {
        alert("Error al borrar los usuarios.");
      }
    }
  });
  