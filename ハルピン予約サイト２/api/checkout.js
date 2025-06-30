// Stripe決済用APIエンドポイント
// このファイルはNode.js/Express環境で実行されることを想定しています

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 商品価格情報（Stripeダッシュボードで作成した価格IDに置き換えてください）
const PRICE_IDS = {
    'shrimp-gyoza': 'price_1OxxxxxxxxxxxxxxxxQ', // エビ餃子の価格ID
    'xiaolongbao': 'price_1OxxxxxxxxxxxxxxxxR',  // 小籠包の価格ID
    'special-set': 'price_1OxxxxxxxxxxxxxxxxS'   // セットの価格ID
};

// Checkoutセッション作成エンドポイント
exports.createCheckoutSession = async (req, res) => {
    try {
        const { items } = req.body;

        // リクエストの検証
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'カートが空です' });
        }

        // Stripe用のラインアイテムを構築
        const lineItems = items.map(item => {
            const priceId = PRICE_IDS[item.id];
            if (!priceId) {
                throw new Error(`商品ID ${item.id} の価格情報が見つかりません`);
            }

            return {
                price: priceId,
                quantity: item.quantity,
            };
        });

        // Checkoutセッションを作成
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.DOMAIN}/cancel`,
            shipping_address_collection: {
                allowed_countries: ['JP'], // 日本のみ配送
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 800,
                            currency: 'jpy',
                        },
                        display_name: '通常配送',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 3,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 5,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1200,
                            currency: 'jpy',
                        },
                        display_name: 'クール便',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 2,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 3,
                            },
                        },
                    },
                },
            ],
            locale: 'ja', // 日本語表示
            metadata: {
                order_type: 'frozen_food',
                restaurant: 'ganso_harupin'
            }
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Checkout session creation error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Webhook エンドポイント（注文完了通知など）
exports.handleWebhook = async (req, res) => {
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

    // イベントタイプに応じた処理
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            
            // 注文処理（メール送信、在庫管理など）
            await handleOrderComplete(session);
            break;
            
        case 'payment_intent.payment_failed':
            // 決済失敗の処理
            console.error('Payment failed:', event.data.object);
            break;
            
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};

// 注文完了処理
async function handleOrderComplete(session) {
    // ここに注文完了時の処理を実装
    // 例：
    // - 確認メールの送信
    // - 在庫の更新
    // - 注文データベースへの保存
    // - キッチンへの通知
    
    console.log('Order completed:', {
        sessionId: session.id,
        customerEmail: session.customer_email,
        amount: session.amount_total,
        shipping: session.shipping
    });
    
    // メール送信の例（実際の実装では適切なメールサービスを使用）
    // await sendOrderConfirmationEmail(session.customer_email, session);
}

// エクスポート（Express.jsでの使用例）
// app.post('/api/checkout', createCheckoutSession);
// app.post('/api/webhook', express.raw({ type: 'application/json' }), handleWebhook);