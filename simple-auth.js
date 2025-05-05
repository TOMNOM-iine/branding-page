// ブランド管理アプリ - 簡易認証スクリプト
// ログイン機能とブランド表示機能を実装

// brandsData は script.js で定義されたものを使用します
// ここでのサンプルデータ定義は不要になりました

// Supabase認証関連関数
// 現在のユーザー情報を取得
async function getCurrentUser() {
    try {
        if (!supabase) {
            console.error('Supabaseクライアントが初期化されていません');
            return null;
        }
        
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error('ユーザー情報の取得に失敗しました:', error);
            return null;
        }
        
        console.log('現在のユーザー:', data?.user);
        return data?.user;
    } catch (error) {
        console.error('getCurrentUser関数でエラーが発生しました:', error);
        return null;
    }
}

// サインイン処理
async function signIn(email, password) {
    try {
        if (!supabase) {
            console.error('Supabaseクライアントが初期化されていません');
            return { data: null, error: new Error('Supabaseクライアントが初期化されていません') };
        }
        
        console.log('ログイン開始:', email);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            console.error('ログインエラー:', error);
        } else {
            console.log('ログイン成功:', data?.user?.email);
        }
        
        return { data, error };
    } catch (error) {
        console.error('signIn関数でエラーが発生しました:', error);
        return { data: null, error };
    }
}

// サインアップ処理
async function signUp(email, password) {
    try {
        if (!supabase) {
            console.error('Supabaseクライアントが初期化されていません');
            return { data: null, error: new Error('Supabaseクライアントが初期化されていません') };
        }
        
        console.log('サインアップ開始:', email);
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: window.location.origin
            }
        });
        
        if (error) {
            console.error('サインアップエラー:', error);
        } else {
            console.log('サインアップ成功:', data);
        }
        
        return { data, error };
    } catch (error) {
        console.error('signUp関数でエラーが発生しました:', error);
        return { data: null, error };
    }
}

// サインアウト処理
async function signOut() {
    try {
        if (!supabase) {
            console.error('Supabaseクライアントが初期化されていません');
            return { error: new Error('Supabaseクライアントが初期化されていません') };
        }
        
        console.log('ログアウト開始');
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error('ログアウトエラー:', error);
        } else {
            console.log('ログアウト成功');
        }
        
        return { error };
    } catch (error) {
        console.error('signOut関数でエラーが発生しました:', error);
        return { error };
    }
}

// ログイン処理
async function handleLogin() {
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const loginError = document.getElementById('login-error');
    
    loginError.textContent = '';
    
    try {
        const { data, error } = await signIn(emailInput.value, passwordInput.value);
        
        if (error) {
            loginError.textContent = 'メールアドレスまたはパスワードが正しくありません';
            passwordInput.value = '';
            return;
        }
        
        // ログイン成功
        document.getElementById('login-overlay').style.display = 'none';
        console.log('ログイン成功しました。メインアプリに移行します。');
        
        // ブランドデータを表示
        renderBrands();
        renderBrandTasksUI();
    } catch (err) {
        console.error('ログイン中にエラーが発生しました:', err);
        loginError.textContent = 'ログインに失敗しました。もう一度お試しください。';
        passwordInput.value = '';
    }
}

// サインアップ処理
async function handleSignup() {
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const loginError = document.getElementById('login-error');
    
    loginError.textContent = '';
    
    try {
        const { data, error } = await signUp(emailInput.value, passwordInput.value);
        
        if (error) {
            loginError.textContent = 'サインアップに失敗しました: ' + error.message;
            return;
        }
        
        loginError.textContent = 'メールを確認して登録を完了してください';
        loginError.style.color = 'green';
    } catch (err) {
        console.error('サインアップ中にエラーが発生しました:', err);
        loginError.textContent = 'サインアップに失敗しました。もう一度お試しください。';
    }
}

// ログアウト処理
async function handleLogout() {
    try {
        const { error } = await signOut();
        
        if (error) {
            console.error('ログアウト中にエラーが発生しました:', error);
            return;
        }
        
        // ログアウト後に再読み込み
        window.location.reload();
    } catch (err) {
        console.error('ログアウト処理中にエラーが発生しました:', err);
    }
}

// ローカルストレージモードか確認する関数
function isLocalStorageMode() {
    return localStorage.getItem('useLocalStorage') === 'true';
}

// ログインボタンのイベントリスナー設定
function setupLoginListeners() {
    console.log('ログインリスナーを設定しています');
    
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const skipLoginButton = document.getElementById('skip-login-button');
    
    // ログインボタンクリック
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
        console.log('ログインボタンのリスナーを設定しました');
    } else {
        console.error('ログインボタンが見つかりません');
    }
    
    // サインアップボタンクリック
    if (signupButton) {
        signupButton.addEventListener('click', handleSignup);
        console.log('サインアップボタンのリスナーを設定しました');
    }
    
    // スキップボタンクリック
    if (skipLoginButton) {
        // スキップボタンを非表示にする
        skipLoginButton.style.display = 'none';
        console.log('スキップボタンを非表示にしました');
    }
    
    // ヘッダーにログアウトボタンを追加
    const header = document.querySelector('header');
    if (header) {
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'ログアウト';
        logoutBtn.classList.add('logout-button');
        logoutBtn.addEventListener('click', handleLogout);
        header.appendChild(logoutBtn);
        console.log('ログアウトボタンを追加しました');
    }
}

// ログインオーバーレイを初期化
document.addEventListener('DOMContentLoaded', function() {
    const loginOverlay = document.getElementById('login-overlay');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const skipLoginButton = document.getElementById('skip-login-button');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    
    // ローカルストレージからログイン状態を確認
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // ログイン済みか、ローカルストレージモードの場合はオーバーレイを表示しない
        loginOverlay.style.display = 'none';
        
        // 必要に応じてログイン状態をチェック
        if (isLoggedIn) {
            // Supabaseでのログイン状態を確認
            checkLoginStatus().then(user => {
                if (!user) {
                    // ログインセッションが切れている場合
                    localStorage.removeItem('isLoggedIn');
                    showLoginOverlay();
                }
            });
        }
    } else {
        // ログインしていない場合はオーバーレイを表示
        showLoginOverlay();
    }
    
    // ログインボタンのクリックイベント
    loginButton.addEventListener('click', function() {
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // 入力チェック
        if (!email || !password) {
            loginError.textContent = 'メールアドレスとパスワードを入力してください';
            return;
        }
        
        // ログイン処理
        loginError.textContent = 'ログイン中...';
        
        signIn(email, password).then(({ data, error }) => {
            if (error) {
                loginError.textContent = 'ログインに失敗しました: ' + error.message;
            } else {
                // ログイン成功
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('useLocalStorage', 'false');
                loginOverlay.style.display = 'none';
                showNotification('ログインしました', 2000);
                
                // ページをリロード
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        });
    });
    
    // サインアップボタンのクリックイベント
    signupButton.addEventListener('click', function() {
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // 入力チェック
        if (!email || !password) {
            loginError.textContent = 'メールアドレスとパスワードを入力してください';
            return;
        }
        
        if (password.length < 6) {
            loginError.textContent = 'パスワードは6文字以上で設定してください';
            return;
        }
        
        // サインアップ処理
        loginError.textContent = 'アカウント作成中...';
        
        signUp(email, password).then(({ data, error }) => {
            if (error) {
                loginError.textContent = 'アカウント作成に失敗しました: ' + error.message;
            } else {
                loginError.textContent = 'アカウントを作成しました。メールを確認してください。';
                
                // 通知を表示
                showNotification('アカウントを作成しました。メールを確認してください。', 5000);
            }
        });
    });
    
    // ログインスキップボタンのクリックイベント
    // スキップボタンを非表示にする
    if (skipLoginButton) {
        skipLoginButton.style.display = 'none';
    }
    
    // ログインフォームのEnterキー対応
    loginForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            loginButton.click();
        }
    });
});

// ログインオーバーレイを表示
function showLoginOverlay() {
    const loginOverlay = document.getElementById('login-overlay');
    loginOverlay.style.display = 'flex';
}

// ログイン状態をチェック
async function checkLoginStatus() {
    try {
        const user = await getCurrentUser();
        return user;
    } catch (error) {
        console.error('ログイン状態のチェックに失敗しました:', error);
        return null;
    }
}
