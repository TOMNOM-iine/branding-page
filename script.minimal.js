// 最小機能スクリプト - ログイン機能だけを含む
let brandsData = [];

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
        console.log('ログイン成功');
    } catch (err) {
        console.error('ログイン中にエラーが発生しました:', err);
        loginError.textContent = 'ログインに失敗しました。もう一度お試しください。';
        passwordInput.value = '';
    }
}

// ログインボタンのイベントリスナー設定
function setupLoginListeners() {
    const loginButton = document.getElementById('login-button');
    
    // ログインボタンクリック
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', function() {
    // ログインリスナーを設定
    setupLoginListeners();
    console.log('アプリケーション初期化を開始します');
});
