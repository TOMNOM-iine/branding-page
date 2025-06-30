// オープニングアニメーション管理
class OpeningAnimation {
    constructor() {
        this.container = document.getElementById('opening-animation');
        this.lid = document.getElementById('seiro-lid');
        this.smokeContainer = document.getElementById('smoke-container');
        this.mediaContainer = document.getElementById('media-images-container');
        this.hasPlayed = sessionStorage.getItem('openingPlayed');
        
        // 既に再生済みの場合はスキップ
        if (this.hasPlayed) {
            this.skipOpening();
        } else {
            this.init();
        }
    }

    init() {
        // 煙を生成
        this.createSmoke();
        
        // 1.5秒後にセイロを開ける
        setTimeout(() => {
            this.openSeiro();
        }, 1500);
        
        // セイロクリックでも開ける
        this.lid.addEventListener('click', () => {
            this.openSeiro();
        });
    }

    createSmoke() {
        // 通常の煙を少なめに生成（中央から）
        for (let i = 0; i < 3; i++) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke normal';
            smoke.style.left = `${45 + Math.random() * 10}%`;
            smoke.style.top = `${45 + Math.random() * 10}%`;
            smoke.style.animationDelay = `${i * 0.8}s`;
            smoke.style.setProperty('--x-drift', `${(Math.random() - 0.5) * 100}px`);
            this.smokeContainer.appendChild(smoke);
        }
    }

    openSeiro() {
        // 蓋を開ける
        this.lid.classList.add('open');
        
        // 煙を増やす
        this.intensifySmoke();
        
        // 全体のアニメーション終了後、メインコンテンツへ
        setTimeout(() => {
            this.transitionToMain();
        }, 2500);
    }

    intensifySmoke() {
        // 爆発的な煙を生成（中央から全方向へ）
        for (let i = 0; i < 25; i++) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke burst';
            
            // 中央付近から発生
            smoke.style.left = `${48 + Math.random() * 4}%`;
            smoke.style.top = `${48 + Math.random() * 4}%`;
            
            // 全方向に均等に飛散
            const angle = (Math.PI * 2 * i) / 25;
            const distance = 400 + Math.random() * 600;
            const xBurst = Math.cos(angle) * distance;
            const yBurst = Math.sin(angle) * distance;
            smoke.style.setProperty('--x-burst', `${xBurst}px`);
            smoke.style.setProperty('--y-burst', `${yBurst}px`);
            
            // わずかな遅延でウェーブ効果
            smoke.style.animationDelay = `${i * 0.02}s`;
            
            // サイズ調整
            const scale = 1.2 + Math.random() * 0.8;
            smoke.style.setProperty('--scale', scale);
            
            this.smokeContainer.appendChild(smoke);
        }
        
        // 大きな煙の雲（画面を覆う）
        for (let i = 0; i < 8; i++) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke burst';
            smoke.style.width = '500px';
            smoke.style.height = '500px';
            smoke.style.left = '50%';
            smoke.style.top = '50%';
            smoke.style.animationDelay = `${0.1 + i * 0.05}s`;
            
            // 8方向に大きく広がる
            const angle = (Math.PI * 2 * i) / 8;
            const xBurst = Math.cos(angle) * 800;
            const yBurst = Math.sin(angle) * 800;
            smoke.style.setProperty('--x-burst', `${xBurst}px`);
            smoke.style.setProperty('--y-burst', `${yBurst}px`);
            
            this.smokeContainer.appendChild(smoke);
        }
    }


    transitionToMain() {
        // フェードアウト
        this.container.style.transition = 'opacity 0.8s ease-out';
        this.container.style.opacity = '0';
        
        // 完了後に非表示
        setTimeout(() => {
            this.container.classList.add('hidden');
            // 再生済みフラグを設定
            sessionStorage.setItem('openingPlayed', 'true');
            
            // ヒーローセクションのメディア画像を表示
            const heroMediaImages = document.getElementById('hero-media-images');
            if (heroMediaImages) {
                heroMediaImages.classList.add('show');
            }
            
            // メインコンテンツのアニメーションを開始
            if (window.animationManager) {
                window.animationManager.init();
            }
        }, 800);
    }

    skipOpening() {
        this.container.classList.add('hidden');
        sessionStorage.setItem('openingPlayed', 'true');
        
        // ヒーローセクションのメディア画像を表示
        const heroMediaImages = document.getElementById('hero-media-images');
        if (heroMediaImages) {
            heroMediaImages.classList.add('show');
        }
        
        // メインコンテンツのアニメーションを開始
        if (window.animationManager) {
            window.animationManager.init();
        }
    }
}

// グローバル関数（HTMLから呼び出し用）
function skipOpening() {
    const opening = new OpeningAnimation();
    opening.skipOpening();
}

// ページ読み込み時に開始
document.addEventListener('DOMContentLoaded', () => {
    window.openingAnimation = new OpeningAnimation();
});