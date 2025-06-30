// Stripeの公開キー（実際のキーに置き換えてください）
const STRIPE_PUBLIC_KEY = 'pk_test_51OxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxQ';

// Stripe初期化
const stripe = Stripe(STRIPE_PUBLIC_KEY);

// カート内容の表示
function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('harupin-cart')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    
    let subtotal = 0;
    orderItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>カートが空です</p>';
        window.location.href = '/';
        return;
    }
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div>
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">数量: ${item.quantity}</div>
            </div>
            <div class="item-price">¥${(item.price * item.quantity).toLocaleString()}</div>
        `;
        orderItemsContainer.appendChild(itemElement);
        subtotal += item.price * item.quantity;
    });
    
    subtotalElement.textContent = `¥${subtotal.toLocaleString()}`;
    updateTotal();
}

// 配送料は固定（クール便のみ）
function updateTotal() {
    const subtotal = parseInt(document.getElementById('subtotal').textContent.replace(/[¥,]/g, ''));
    const shippingFee = 1200; // クール便固定
    
    document.getElementById('shipping-fee').textContent = `¥${shippingFee.toLocaleString()}`;
    document.getElementById('total').textContent = `¥${(subtotal + shippingFee).toLocaleString()}`;
}

// PaymentIntentを作成してStripe Elementsを初期化
async function initializePayment() {
    const cart = JSON.parse(localStorage.getItem('harupin-cart')) || [];
    if (cart.length === 0) return;

    try {
        // フォームの初期データを取得（後で実際の入力値で上書き）
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: cart,
                shipping: 'cool',
                shippingAddress: {
                    name: '',
                    email: '',
                    phone: '',
                    address: {
                        postal_code: '',
                        state: '',
                        city: '',
                        line1: '',
                        country: 'JP'
                    }
                },
                deliveryDate: '',
                deliveryTime: ''
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        // Stripe Elementsを初期化
        const elements = stripe.elements({
            clientSecret: data.clientSecret,
            appearance: {
                theme: 'stripe',
                variables: {
                    colorPrimary: '#FFD93D',
                    colorBackground: '#ffffff',
                    colorText: '#2C3E50',
                    colorDanger: '#FF6B6B',
                    fontFamily: '"Noto Sans JP", sans-serif',
                    spacingUnit: '4px',
                    borderRadius: '8px',
                }
            }
        });

        // Payment Elementを作成してマウント
        const paymentElement = elements.create('payment', {
            layout: {
                type: 'tabs',
                defaultCollapsed: false,
                radios: false,
                spacedAccordionItems: false
            },
            paymentMethodOrder: ['card', 'konbini'],
            fields: {
                billingDetails: {
                    address: {
                        country: 'never',
                        postalCode: 'never'
                    }
                }
            },
            wallets: {
                applePay: 'auto',
                googlePay: 'auto'
            }
        });
        
        paymentElement.mount('#card-element');

        // Payment Elementのエラーハンドリング
        paymentElement.addEventListener('change', (event) => {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
                displayError.classList.add('show');
            } else {
                displayError.textContent = '';
                displayError.classList.remove('show');
            }
        });

        // フォーム送信処理
        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const submitButton = document.getElementById('submit-button');
            const buttonText = document.getElementById('button-text');
            const spinner = document.getElementById('spinner');
            
            // ボタンを無効化
            submitButton.disabled = true;
            buttonText.style.display = 'none';
            spinner.classList.remove('hidden');
            
            // フォームデータの取得
            const formData = new FormData(form);
            const shippingData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: {
                    postal_code: formData.get('postal_code'),
                    state: formData.get('prefecture'),
                    city: formData.get('city'),
                    line1: formData.get('address'),
                    country: 'JP'
                }
            };
            
            try {
                // 決済方法の確認
                const checkoutMethod = document.querySelector('input[name="checkout-method"]:checked').value;
                const isAccountCheckout = checkoutMethod === 'account';
                
                // アカウント登録の場合、パスワード確認
                if (isAccountCheckout && !getCurrentUser()) {
                    const password = formData.get('password');
                    const passwordConfirm = formData.get('password_confirm');
                    
                    if (password !== passwordConfirm) {
                        throw new Error('パスワードが一致しません');
                    }
                    
                    // 新規アカウント作成
                    const registerResponse = await fetch('/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: shippingData.email,
                            password: password,
                            name: shippingData.name,
                            phone: shippingData.phone,
                            address: shippingData.address
                        })
                    });
                    
                    const registerData = await registerResponse.json();
                    if (!registerData.success) {
                        throw new Error(registerData.message || '登録に失敗しました');
                    }
                    
                    // ユーザー情報を保存
                    localStorage.setItem('harupin-user', JSON.stringify(registerData.user));
                }
                
                // 決済を実行
                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: window.location.origin + '/success.html',
                        payment_method_data: {
                            billing_details: {
                                name: shippingData.name,
                                email: shippingData.email,
                                phone: shippingData.phone,
                                address: {
                                    postal_code: shippingData.address.postal_code,
                                    state: shippingData.address.state,
                                    city: shippingData.address.city,
                                    line1: shippingData.address.line1,
                                    country: 'JP'
                                }
                            }
                        }
                    },
                    redirect: 'if_required'
                });
                
                if (error) {
                    throw error;
                }
                
                // カード保存オプションがチェックされている場合
                if (isAccountCheckout && formData.get('save_card')) {
                    // サーバー側でカードを保存（Webhookで処理）
                }
                
                // 決済成功時（リダイレクトが不要な場合）
                localStorage.removeItem('harupin-cart');
                window.location.href = `/success.html?payment_intent=${data.paymentIntent}`;
                
            } catch (error) {
                console.error('Payment error:', error);
                showError(error.message || '決済処理中にエラーが発生しました。');
                
                // ボタンを再度有効化
                submitButton.disabled = false;
                buttonText.style.display = 'inline';
                spinner.classList.add('hidden');
            }
        });

    } catch (error) {
        console.error('Payment initialization error:', error);
        showError('決済の初期化中にエラーが発生しました。');
    }
}

// エラー表示
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div class="error-content">
            <strong>エラー</strong>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        errorDiv.classList.remove('show');
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

// 郵便番号の自動フォーマット
document.getElementById('postal-code').addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 3) {
        value = value.slice(0, 3) + '-' + value.slice(3, 7);
    }
    e.target.value = value;
});

// 決済方法選択の処理
function setupCheckoutMethodSelection() {
    const methodRadios = document.querySelectorAll('input[name="checkout-method"]');
    const accountSection = document.getElementById('account-section');
    const loginPrompt = document.getElementById('login-prompt');
    const saveCardOption = document.getElementById('save-card-option');
    
    methodRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'account') {
                // アカウント登録を選択
                accountSection.style.display = 'block';
                loginPrompt.style.display = 'block';
                if (saveCardOption) saveCardOption.style.display = 'block';
                
                // パスワードフィールドを必須に
                document.getElementById('password').required = true;
                document.getElementById('password-confirm').required = true;
                
                // 既存ユーザーチェック
                const user = getCurrentUser();
                if (user) {
                    // 既にログイン済みの場合
                    accountSection.style.display = 'none';
                    autoFillUserInfo();
                }
            } else {
                // ゲスト決済を選択
                accountSection.style.display = 'none';
                loginPrompt.style.display = 'none';
                if (saveCardOption) saveCardOption.style.display = 'none';
                
                // パスワードフィールドを非必須に
                document.getElementById('password').required = false;
                document.getElementById('password-confirm').required = false;
                
                // フォームをクリア
                clearUserInfo();
            }
        });
    });
}

// 現在のユーザー取得
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('harupin-user')) || 
           JSON.parse(sessionStorage.getItem('harupin-user'));
}

// ユーザー情報のクリア
function clearUserInfo() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('postal-code').value = '';
    document.getElementById('prefecture').value = '';
    document.getElementById('city').value = '';
    document.getElementById('address').value = '';
}

// ユーザー情報の自動入力
function autoFillUserInfo() {
    const user = getCurrentUser();
    
    if (user) {
        // ユーザー情報を自動入力
        document.getElementById('name').value = user.name || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone').value = user.phone || '';
        
        if (user.address) {
            document.getElementById('postal-code').value = user.address.postal_code || '';
            document.getElementById('prefecture').value = user.address.prefecture || '';
            document.getElementById('city').value = user.address.city || '';
            document.getElementById('address').value = user.address.line1 || '';
        }
        
        // 保存されたカードがある場合は表示
        if (user.savedCards && user.savedCards.length > 0) {
            displaySavedCards(user.savedCards);
        }
    }
}

// 保存されたカードの表示
function displaySavedCards(cards) {
    const savedCardsSection = document.getElementById('saved-cards');
    const select = document.getElementById('saved-card-select');
    
    cards.forEach(card => {
        const option = document.createElement('option');
        option.value = card.id;
        option.textContent = `•••• •••• •••• ${card.last4} (${card.brand})`;
        select.appendChild(option);
    });
    
    savedCardsSection.style.display = 'block';
    
    // カード選択時の処理
    select.addEventListener('change', (e) => {
        if (e.target.value) {
            // 既存のカードを選択した場合、新規カード入力を非表示
            document.getElementById('new-card-section').style.display = 'none';
        } else {
            // 新しいカードを選択した場合、入力欄を表示
            document.getElementById('new-card-section').style.display = 'block';
        }
    });
}

// ページ読み込み時の処理
window.addEventListener('load', () => {
    displayOrderSummary();
    initializePayment();
    setupCheckoutMethodSelection();
    
    // 既にログイン済みの場合は自動的にアカウント決済を選択
    const user = getCurrentUser();
    if (user) {
        document.getElementById('method-account').checked = true;
        document.getElementById('method-account').dispatchEvent(new Event('change'));
    }
    
    // 配送日の最小・最大値を設定
    const deliveryDateInput = document.getElementById('delivery-date');
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 3); // 最短3日後
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30); // 最長30日後
    
    deliveryDateInput.min = minDate.toISOString().split('T')[0];
    deliveryDateInput.max = maxDate.toISOString().split('T')[0];
});

// エラー通知のスタイル
const style = document.createElement('style');
style.textContent = `
    .error-notification {
        position: fixed;
        top: 20px;
        right: -400px;
        max-width: 400px;
        background: var(--white);
        border: 3px solid var(--red);
        border-radius: 8px;
        box-shadow: 6px 6px 0 var(--shadow);
        padding: 20px;
        transition: right 0.3s ease;
        z-index: 2000;
    }
    
    .error-notification.show {
        right: 20px;
    }
    
    .error-content strong {
        color: var(--red);
        font-size: 1.2rem;
    }
    
    .error-content p {
        margin-top: 10px;
        color: var(--black);
    }
`;
document.head.appendChild(style);