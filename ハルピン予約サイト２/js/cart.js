// カート管理システム
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('harupin-cart')) || [];
        this.products = {
            'gyoza': {
                name: '元祖ハルピン餃子',
                price: 650,
                description: '八角香る本場の味 (1人前 6個入り)',
                types: {
                    'shrimp': 'エビ',
                    'nira': 'ニラ'
                }
            },
            'xiaolongbao': {
                name: '巨大小籠包',
                price: 900,
                description: 'スープたっぷり (1人前)'
            }
        };
        this.init();
    }

    init() {
        this.updateCart();
        this.bindEvents();
    }

    bindEvents() {
        // カートに追加ボタン
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => this.handleAddToCart(e));
        });

        // カート開閉
        // フローティングカートボタンはHTMLで直接checkout()を呼ぶように変更
        document.querySelector('.cart-close').addEventListener('click', this.toggleCart);

        // チェックアウト
        document.querySelector('.checkout-btn').addEventListener('click', () => this.checkout());
    }

    handleAddToCart(e) {
        e.stopPropagation();
        const button = e.currentTarget;
        const card = button.closest('.product-card');
        const productId = card.dataset.product;
        const price = parseInt(card.dataset.price);

        // 餃子の場合は種類を取得
        let selectedType = null;
        let itemName = this.products[productId].name;
        
        if (productId === 'gyoza') {
            selectedType = card.dataset.selectedType || 'shrimp'; // デフォルトはエビ
            const typeName = this.products[productId].types[selectedType];
            itemName = `${itemName}（${typeName}）`;
        }

        // 爆発エフェクト
        this.createExplosion(e.pageX, e.pageY);

        // カートに追加（餃子の場合は種類も含めて一意のIDを作成）
        const cartItemId = productId === 'gyoza' ? `${productId}-${selectedType}` : productId;
        const existingItem = this.cart.find(item => item.id === cartItemId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({
                id: cartItemId,
                baseId: productId,
                name: itemName,
                price: price,
                quantity: 1,
                type: selectedType
            });
        }

        // ローカルストレージに保存
        localStorage.setItem('harupin-cart', JSON.stringify(this.cart));

        // UI更新
        this.updateCart();

        // ボタンアニメーション
        button.textContent = '追加しました！';
        button.classList.add('added');
        setTimeout(() => {
            button.textContent = 'カートに追加';
            button.classList.remove('added');
        }, 1000);
    }

    createExplosion(x, y) {
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.textContent = 'POW!';
        explosion.style.left = x + 'px';
        explosion.style.top = y + 'px';
        document.body.appendChild(explosion);
        
        setTimeout(() => explosion.remove(), 500);
    }

    updateCart() {
        const cartItems = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        cartItems.innerHTML = '';
        let total = 0;
        let count = 0;
        
        this.cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.name}</strong><br>
                    ¥${item.price.toLocaleString()} × ${item.quantity}
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="cartManager.updateQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="cartManager.updateQuantity(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="cartManager.removeItem(${index})">×</button>
                </div>
                <div class="cart-item-total">
                    ¥${(item.price * item.quantity).toLocaleString()}
                </div>
            `;
            cartItems.appendChild(itemDiv);
            
            total += item.price * item.quantity;
            count += item.quantity;
        });
        
        cartCount.textContent = count;
        cartTotal.textContent = `合計: ¥${total.toLocaleString()}`;
    }

    updateQuantity(index, change) {
        this.cart[index].quantity += change;
        if (this.cart[index].quantity <= 0) {
            this.removeItem(index);
        } else {
            localStorage.setItem('harupin-cart', JSON.stringify(this.cart));
            this.updateCart();
        }
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        localStorage.setItem('harupin-cart', JSON.stringify(this.cart));
        this.updateCart();
    }

    toggleCart() {
        document.getElementById('cart').classList.toggle('open');
    }

    async checkout() {
        if (this.cart.length === 0) {
            alert('カートが空です');
            return;
        }

        // チェックアウトページへ遷移
        window.location.href = 'checkout.html';
    }
}

// カートマネージャーの初期化
let cartManager;
document.addEventListener('DOMContentLoaded', () => {
    cartManager = new CartManager();
});