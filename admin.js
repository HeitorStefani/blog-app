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