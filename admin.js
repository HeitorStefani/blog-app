// Chave para armazenar dados no Local Storage
        const STORAGE_KEY = 'technova_users';

        // Elementos do DOM
        const userForm = document.getElementById('userForm');
        const userNameInput = document.getElementById('userName');
        const userEmailInput = document.getElementById('userEmail');
        const clearFormBtn = document.getElementById('clearFormBtn');
        const searchInput = document.getElementById('searchInput');
        const deleteAllBtn = document.getElementById('deleteAllBtn');
        const userList = document.getElementById('userList');

        // Função para obter usuários do Local Storage
        function getUsers() {
            const usersJSON = localStorage.getItem(STORAGE_KEY);
            return usersJSON ? JSON.parse(usersJSON) : [];
        }

        // Função para salvar usuários no Local Storage
        function saveUsers(users) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        }

        // Função para formatar data
        function formatDate(date) {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} às ${hours}:${minutes}`;
        }

        // Função para gerar ID único
        function generateId() {
            return Date.now().toString() + Math.random().toString(36).substr(2, 9);
        }

        // Função para adicionar usuário
        function addUser(name, email) {
            const users = getUsers();
            const newUser = {
                id: generateId(),
                name: name,
                email: email,
                date: new Date().toISOString()
            };
            users.push(newUser);
            saveUsers(users);
            renderUsers();
        }
        // Função para excluir um usuário
        function deleteUser(id) {
            let users = getUsers();
            users = users.filter(user => user.id !== id);
            saveUsers(users);
            renderUsers();
        }

        // Função para excluir todos os usuários
        function deleteAllUsers() {
            if (confirm('Tem certeza que deseja excluir todos os usuários? Esta ação não pode ser desfeita.')) {
                localStorage.removeItem(STORAGE_KEY);
                renderUsers();
            }
        }

        // Função para limpar os campos do formulário
        function clearForm() {
            userNameInput.value = '';
            userEmailInput.value = '';
            userNameInput.focus();
        }

        // Função para renderizar a lista de usuários
        function renderUsers(filter = '') {
            const users = getUsers();
            userList.innerHTML = '';

            // Filtrar usuários se houver termo de busca
            const filteredUsers = users.filter(user => {
                const searchTerm = filter.toLowerCase();
                return user.name.toLowerCase().includes(searchTerm) || 
                       user.email.toLowerCase().includes(searchTerm);
            });

            // Se não houver usuários
            if (filteredUsers.length === 0) {
                const emptyMessage = document.createElement('li');
                emptyMessage.className = 'empty-message';
                emptyMessage.textContent = filter ? 'Nenhum usuário encontrado com os critérios de pesquisa.' : 'Nenhum usuário cadastrado ainda.';
                userList.appendChild(emptyMessage);
                return;
            }

            // Renderizar cada usuário
            filteredUsers.forEach(user => {
                const li = document.createElement('li');
                li.className = 'user-item';
                
                li.innerHTML = `
                    <div class="user-info">
                        <p class="user-date">Cadastrado em: ${formatDate(user.date)}</p>
                        <p class="user-name"><i class="fas fa-user"></i> ${user.name}</p>
                        <p class="user-email"><i class="fas fa-envelope"></i> ${user.email}</p>
                    </div>
                    <button class="btn-delete" onclick="deleteUser('${user.id}')">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                `;
                
                userList.appendChild(li);
            });
        }

        // Event Listeners
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = userNameInput.value.trim();
            const email = userEmailInput.value.trim();
            
            if (name && email) {
                addUser(name, email);
                clearForm();
                alert('Usuário cadastrado com sucesso!');
            }
        });

        clearFormBtn.addEventListener('click', clearForm);

        deleteAllBtn.addEventListener('click', deleteAllUsers);

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            renderUsers(searchTerm);
        });

        // Carregar usuários ao iniciar a página
        renderUsers();