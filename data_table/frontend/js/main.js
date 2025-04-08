const API_URL = 'http://localhost:3000/api/items';

let modalIsOpen = false;

const categoriaSelect = document.getElementById('categoria');
const categoriasFixas = ['Alimentos', 'Limpeza', 'Higiene', 'Bebidas', 'Outros'];

function loadCategories() {
  categoriaSelect.innerHTML = '';
  categoriasFixas.forEach((nome, index) => {
    const opt = document.createElement('option');
    opt.value = index;
    opt.textContent = nome;
    categoriaSelect.appendChild(opt);
  });
}

const tableBody = document.querySelector('#itemsTable tbody');
const modal = document.getElementById('itemModal');
const nomeInput = document.getElementById('nome');
const quantidadeInput = document.getElementById('quantidade');
const compradoInput = document.getElementById('comprado');
const itemIdInput = document.getElementById('itemId');
const saveItemBtn = document.getElementById('saveItemBtn');

document.getElementById('itemForm').addEventListener('submit', function(e) {
  e.preventDefault();
  saveItemBtn.click();
});

document.getElementById('addItemBtn').onclick = () => openModal();

// Evento para fechar o modal com botão "X" ou "Cancelar"
const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

saveItemBtn.onclick = async function() {
  this.disabled = true;
  const originalText = this.textContent;
  this.textContent = 'Salvando...';

  try {
    const categoriaIndex = categoriaSelect.value;
    if (categoriaIndex === '') throw new Error('Selecione uma categoria');

    const categoria = categoriasFixas[categoriaIndex];
    const quantidade = parseInt(quantidadeInput.value);

    if (!nomeInput.value.trim() || isNaN(quantidade)) {
      throw new Error('Dados inválidos');
    }

    const item = {
      nome: nomeInput.value.trim(),
      quantidade,
      comprado: compradoInput.checked,
      categoria
    };

    const id = itemIdInput.value;
    const response = id
      ? await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      : await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });

    if (!response.ok) throw new Error('Falha ao salvar');

    closeModal();
    await loadItems();
  } catch (error) {
    console.error('Erro:', error);
    alert(error.message || 'Erro ao salvar item');
  } finally {
    this.disabled = false;
    this.textContent = originalText;
  }
};

function openModal(item = null) {
  if (modalIsOpen) return;

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  modalIsOpen = true;

  if (item) {
    itemIdInput.value = item._id;
    nomeInput.value = item.nome;
    quantidadeInput.value = item.quantidade;
    compradoInput.checked = item.comprado;

    const categoriaIndex = categoriasFixas.indexOf(item.categoria);
    categoriaSelect.value = categoriaIndex !== -1 ? categoriaIndex : '';
  } else {
    itemIdInput.value = '';
    nomeInput.value = '';
    quantidadeInput.value = '1';
    compradoInput.checked = false;
    categoriaSelect.value = '';
  }
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
  modalIsOpen = false;
}

async function deleteItem(id) {
  if (!confirm('Tem certeza que deseja excluir este item?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Falha ao deletar');
    await loadItems();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao deletar item');
  }
}

async function loadItems() {
  try {
    tableBody.innerHTML = '<tr><td colspan="5">Carregando...</td></tr>';
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error('Falha ao carregar');

    const items = await res.json();
    tableBody.innerHTML = '';

    if (items.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="5">Nenhum item cadastrado</td></tr>';
      return;
    }

    items.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.quantidade}</td>
        <td>${item.comprado ? 'Sim' : 'Não'}</td>
        <td>${item.categoria || 'Sem categoria'}</td>
        <td>
  <button class="btn-edit" onclick='openModal(${JSON.stringify(item).replace(/'/g, "\\'")})'>Editar</button>
  <button class="btn-delete" onclick='deleteItem("${item._id}")'>Deletar</button>
</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Erro:', error);
    tableBody.innerHTML = '<tr><td colspan="5">Erro ao carregar itens</td></tr>';
  }
}

loadCategories();
loadItems();
