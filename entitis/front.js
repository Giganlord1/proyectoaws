document.addEventListener('DOMContentLoaded', () => {
    fetch('/getUsers')
      .then(response => response.json())
      .then(users => {
        const userList = document.getElementById('userList');
        userList.innerHTML = users.map(user => `
          <tr>
            <td>${user.nombre}</td>s
            <td>${user.telefono}</td>
            <td>${user.puesto}</td>
            <td>${user.fecha_contratacion}</td>
            <td><input type="radio" name="userSelect" value="${user.id}"></td>
          </tr>
        `).join('');
      })
      .catch(error => console.error('Error al cargar usuarios:', error));
  });
  
  // Guardar un nuevo usuario
  document.getElementById('saveButton').addEventListener('click', () => {
    const nombre = prompt('Nombre:');
    const telefono = prompt('Teléfono:');
    const puesto = prompt('Puesto:');
    const fechaContratacion = prompt('Fecha de Contratación (YYYY-MM-DD):');
  
    fetch('/addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, telefono, puesto, fecha_contratacion: fechaContratacion })
    })
      .then(response => {
        if (response.ok) {
          alert('Usuario añadido con éxito');
          location.reload();
        } else {
          alert('Error al guardar usuario');
        }
      })
      .catch(error => console.error('Error:', error));
  });
  