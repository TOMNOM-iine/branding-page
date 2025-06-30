// Stripe設定と決済処理
const STRIPE_PUBLIC_KEY = 'pk_test_51OxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ'; // 実際のテスト用公開キーに置き換えてください

// Stripe初期化
let stripe = null;

// DOM読み込み完了後にStripeを初期化
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Stripe !== 'undefined') {
        stripe = Stripe(STRIPE_PUBLIC_KEY);
    } else {
        console.error('Stripe.js が読み込まれていません');
    }
});

// 決済成功後の処理
function handleCheckoutSuccess() {
    // カートをクリア
    localStorage.removeItem('harupin-cart');
    
    // サンクスページへリダイレクト（URLパラメータで成功を示す）
    const successUrl = new URL(window.location.href);
    successUrl.searchParams.set('checkout', 'success');
    window.location.href = successUrl.toString();
}

// 決済キャンセル後の処理
function handleCheckoutCancel() {
    // カートページに戻る
    const cancelUrl = new URL(window.location.href);
    cancelUrl.searchParams.set('checkout', 'cancelled');
    window.location.href = cancelUrl.toString();
}

// URLパラメータをチェックして適切なメッセージを表示
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkoutStatus = urlParams.get('checkout');
    
    if (checkoutStatus === 'success') {
        // 成功メッセージを表示
        showNotification('ご注文ありがとうございました！確認メールをお送りしました。', 'success');
        // URLパラメータをクリア
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (checkoutStatus === 'cancelled') {
        // キャンセルメッセージを表示
        showNotification('決済がキャンセルされました。', 'info');
        // URLパラメータをクリア
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

// 通知表示関数
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // アニメーション
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // 5秒後に自動的に削除
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// 配送情報フォームの検証
function validateShippingForm(formData) {
    const required = ['name', 'email', 'postal_code', 'address', 'phone'];
    const errors = [];
    
    required.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            errors.push(`${getFieldLabel(field)}は必須です`);
        }
    });
    
    // メールアドレスの検証
    if (formData.email && !isValidEmail(formData.email)) {
        errors.push('正しいメールアドレスを入力してください');
    }
    
    // 郵便番号の検証（日本の郵便番号形式）
    if (formData.postal_code && !isValidPostalCode(formData.postal_code)) {
        errors.push('正しい郵便番号を入力してください（例：123-4567）');
    }
    
    // 電話番号の検証
    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
        errors.push('正しい電話番号を入力してください');
    }
    
    return errors;
}

// フィールドラベルの取得
function getFieldLabel(field) {
    const labels = {
        'name': 'お名前',
        'email': 'メールアドレス',
        'postal_code': '郵便番号',
        'address': '住所',
        'phone': '電話番号'
    };
    return labels[field] || field;
}

// メールアドレスの検証
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// 郵便番号の検証
function isValidPostalCode(postalCode) {
    const regex = /^\d{3}-?\d{4}$/;
    return regex.test(postalCode);
}

// 電話番号の検証
function isValidPhoneNumber(phone) {
    const regex = /^[\d-+().\s]+$/;
    return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// 決済エラーハンドリング
function handleStripeError(error) {
    let message = '決済処理中にエラーが発生しました。';
    
    switch (error.type) {
        case 'card_error':
            message = 'カード情報に問題があります。入力内容をご確認ください。';
            break;
        case 'validation_error':
            message = '入力内容に誤りがあります。';
            break;
        case 'api_connection_error':
            message = 'ネットワークエラーが発生しました。しばらくしてからお試しください。';
            break;
        case 'api_error':
            message = 'サーバーエラーが発生しました。しばらくしてからお試しください。';
            break;
    }
    
    showNotification(message, 'error');
}

// 価格のフォーマット
function formatPrice(price) {
    return new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY'
    }).format(price);
}