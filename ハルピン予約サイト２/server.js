// 元祖ハルピン ECサイト サーバー
const express = require('express');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(express.static('.'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS設定（開発用）
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

// ルートページ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Payment Intent作成エンドポイント
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { items, shipping, shippingAddress, deliveryDate, deliveryTime } = req.body;

        // 合計金額を計算
        let totalAmount = 0;
        items.forEach(item => {
            totalAmount += item.price * item.quantity;
        });

        // 配送料追加（クール便固定）
        const shippingFee = 1200;
        totalAmount += shippingFee;

        // 商品情報をメタデータとして保存
        const metadata = {
            items: JSON.stringify(items),
            shipping_method: 'cool',
            shipping_fee: shippingFee,
            delivery_date: deliveryDate || '指定なし',
            delivery_time: deliveryTime || '指定なし'
        };

        // PaymentIntentを作成
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'jpy',
            payment_method_types: ['card', 'konbini', 'customer_balance'],
            metadata: metadata,
            shipping: {
                name: shippingAddress.name,
                phone: shippingAddress.phone,
                address: {
                    line1: shippingAddress.address.line1,
                    city: shippingAddress.address.city,
                    state: shippingAddress.address.state,
                    postal_code: shippingAddress.address.postal_code,
                    country: 'JP'
                }
            },
            receipt_email: shippingAddress.email,
            description: '元祖ハルピン - 冷凍餃子・小籠包'
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntent: paymentIntent.id
        });
    } catch (error) {
        console.error('Payment intent creation error:', error);
        res.status(500).json({ error: error.message });
    }
});

// 注文確認エンドポイント
app.post('/api/confirm-order', async (req, res) => {
    try {
        const { paymentIntentId } = req.body;

        // PaymentIntentを取得
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            // 注文番号を生成
            const orderNumber = `HP${Date.now().toString().slice(-8)}`;

            // 実際の本番環境では、ここでデータベースに注文情報を保存
            console.log('Order confirmed:', {
                orderNumber,
                paymentIntentId,
                amount: paymentIntent.amount,
                customer: paymentIntent.shipping,
                items: JSON.parse(paymentIntent.metadata.items),
                deliveryDate: paymentIntent.metadata.delivery_date,
                deliveryTime: paymentIntent.metadata.delivery_time
            });

            // 確認メールを送信（実装は省略）
            // await sendOrderConfirmationEmail(paymentIntent.receipt_email, orderNumber);

            res.json({
                success: true,
                orderNumber,
                paymentIntent: paymentIntentId
            });
        } else {
            res.status(400).json({
                success: false,
                error: 'Payment not completed'
            });
        }
    } catch (error) {
        console.error('Order confirmation error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Stripe Webhook エンドポイント
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // イベント処理
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Payment succeeded:', paymentIntent.id);
            // ここに決済成功時の処理を追加
            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('Payment failed:', failedPayment.id);
            // ここに決済失敗時の処理を追加
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

// ユーザー登録エンドポイント
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, name, phone, address } = req.body;

        // Stripeカスタマーを作成
        const customer = await stripe.customers.create({
            email: email,
            name: name,
            phone: phone,
            address: {
                line1: address.line1,
                city: address.city,
                state: address.prefecture,
                postal_code: address.postal_code,
                country: 'JP'
            },
            metadata: {
                registered_at: new Date().toISOString()
            }
        });

        // 実際の本番環境では、ここでデータベースにユーザー情報を保存
        // パスワードはハッシュ化して保存

        res.json({
            success: true,
            stripeCustomerId: customer.id,
            user: {
                id: Date.now().toString(),
                email,
                name,
                phone,
                address,
                stripeCustomerId: customer.id
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// ログインエンドポイント
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 実際の本番環境では、ここでデータベースからユーザーを検索
        // パスワードをハッシュと比較

        // デモ用のレスポンス
        res.json({
            success: true,
            user: {
                id: '1',
                email,
                name: 'テストユーザー',
                phone: '090-1234-5678',
                address: {
                    postal_code: '123-4567',
                    prefecture: '東京都',
                    city: '渋谷区',
                    line1: '1-2-3'
                },
                stripeCustomerId: 'cus_demo123'
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ 
            success: false, 
            message: 'ログインに失敗しました' 
        });
    }
});

// カード保存エンドポイント
app.post('/api/save-card', async (req, res) => {
    try {
        const { customerId, paymentMethodId } = req.body;

        // PaymentMethodをカスタマーにアタッチ
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });

        // デフォルトの支払い方法として設定
        await stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Card save error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// ヘルスチェック
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('\n環境変数の設定を確認してください:');
    console.log('- STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '設定済み' : '未設定');
    console.log('- STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET ? '設定済み' : '未設定');
});