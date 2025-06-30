// 認証管理
class AuthManager {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('harupin-user')) || null;
        this.init();
    }

    init() {
        // フォームイベントの設定
        document.getElementById('login-form-element').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register-form-element').addEventListener('submit', (e) => this.handleRegister(e));
    }

    // ログイン処理
    async handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const remember = formData.get('remember');

        // ボタンを無効化
        const button = document.querySelector('#login-form-element .submit-button');
        const buttonText = document.getElementById('login-button-text');
        const spinner = document.getElementById('login-spinner');
        
        button.disabled = true;
        buttonText.style.display = 'none';
        spinner.classList.remove('hidden');

        try {
            // サーバーAPIを呼び出す（実際の実装では）
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // ユーザー情報を保存
                const userData = {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.name,
                    phone: data.user.phone,
                    address: data.user.address,
                    stripeCustomerId: data.user.stripeCustomerId
                };

                if (remember) {
                    localStorage.setItem('harupin-user', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('harupin-user', JSON.stringify(userData));
                }

                this.showMessage('ログインしました', 'success');
                
                // チェックアウトページから来た場合は戻る
                const returnUrl = new URLSearchParams(window.location.search).get('return') || '/';
                setTimeout(() => {
                    window.location.href = returnUrl;
                }, 1500);
            } else {
                throw new Error(data.message || 'ログインに失敗しました');
            }
        } catch (error) {
            // デモ用：実際のサーバーがない場合のローカル処理
            const users = JSON.parse(localStorage.getItem('harupin-users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                const userData = { ...user };
                delete userData.password; // パスワードは保存しない
                
                if (remember) {
                    localStorage.setItem('harupin-user', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('harupin-user', JSON.stringify(userData));
                }
                
                this.showMessage('ログインしました', 'success');
                const returnUrl = new URLSearchParams(window.location.search).get('return') || '/';
                setTimeout(() => {
                    window.location.href = returnUrl;
                }, 1500);
            } else {
                this.showMessage('メールアドレスまたはパスワードが正しくありません', 'error');
            }
        } finally {
            // ボタンを有効化
            button.disabled = false;
            buttonText.style.display = 'inline';
            spinner.classList.add('hidden');
        }
    }

    // 新規登録処理
    async handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // パスワード確認
        if (formData.get('password') !== formData.get('password_confirm')) {
            this.showMessage('パスワードが一致しません', 'error');
            return;
        }

        // ボタンを無効化
        const button = document.querySelector('#register-form-element .submit-button');
        const buttonText = document.getElementById('register-button-text');
        const spinner = document.getElementById('register-spinner');
        
        button.disabled = true;
        buttonText.style.display = 'none';
        spinner.classList.remove('hidden');

        const userData = {
            id: Date.now().toString(),
            email: formData.get('email'),
            password: formData.get('password'), // 実際はハッシュ化する
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: {
                postal_code: formData.get('postal_code'),
                prefecture: formData.get('prefecture'),
                city: formData.get('city'),
                line1: formData.get('address')
            },
            createdAt: new Date().toISOString()
        };

        try {
            // サーバーAPIを呼び出す（実際の実装では）
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                // Stripeカスタマー作成後、IDを保存
                userData.stripeCustomerId = data.stripeCustomerId;
                delete userData.password;
                
                localStorage.setItem('harupin-user', JSON.stringify(userData));
                this.showMessage('登録が完了しました', 'success');
                
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                throw new Error(data.message || '登録に失敗しました');
            }
        } catch (error) {
            // デモ用：実際のサーバーがない場合のローカル処理
            const users = JSON.parse(localStorage.getItem('harupin-users') || '[]');
            
            // メールアドレスの重複チェック
            if (users.find(u => u.email === userData.email)) {
                this.showMessage('このメールアドレスは既に登録されています', 'error');
            } else {
                users.push(userData);
                localStorage.setItem('harupin-users', JSON.stringify(users));
                
                const userDataToStore = { ...userData };
                delete userDataToStore.password;
                localStorage.setItem('harupin-user', JSON.stringify(userDataToStore));
                
                this.showMessage('登録が完了しました', 'success');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            }
        } finally {
            // ボタンを有効化
            button.disabled = false;
            buttonText.style.display = 'inline';
            spinner.classList.add('hidden');
        }
    }

    // メッセージ表示
    showMessage(text, type) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = `message ${type}`;
        messageEl.classList.remove('hidden');
        
        setTimeout(() => {
            messageEl.classList.add('hidden');
        }, 5000);
    }

    // 現在のユーザー取得
    getCurrentUser() {
        return this.currentUser || JSON.parse(sessionStorage.getItem('harupin-user'));
    }

    // ログアウト
    logout() {
        localStorage.removeItem('harupin-user');
        sessionStorage.removeItem('harupin-user');
        window.location.href = '/';
    }
}

// タブ切り替え
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabs = document.querySelectorAll('.tab-button');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        tabs[1].classList.add('active');
    }
}

// 郵便番号フォーマット
document.getElementById('register-postal').addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 3) {
        value = value.slice(0, 3) + '-' + value.slice(3, 7);
    }
    e.target.value = value;
});

// 初期化
const authManager = new AuthManager();