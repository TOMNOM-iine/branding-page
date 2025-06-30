// アニメーション管理
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupTimelineAnimations();
        this.setupInteractiveElements();
    }

    // スクロールアニメーション
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotate(-1deg)';
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // コミックパネルのアニメーション
        document.querySelectorAll('.comic-panel').forEach(panel => {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(50px) rotate(-1deg)';
            panel.style.transition = 'all 0.8s ease';
            observer.observe(panel);
        });

        // プロダクトカードのアニメーション
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // メディアバッジのアニメーション
        document.querySelectorAll('.media-badge').forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0.8) rotate(-5deg)';
            badge.style.transition = `all 0.5s ease ${index * 0.05}s`;
            observer.observe(badge);
        });
    }

    // パララックス効果
    setupParallax() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            // ヒーロー背景
            const heroBg = document.querySelector('.hero-bg');
            if (heroBg) {
                heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
            }

            // キャラクターは削除済み

            // タイトル文字のパララックス
            const titleChars = document.querySelectorAll('.title-char');
            titleChars.forEach((char, index) => {
                const speed = 0.1 + (index * 0.05);
                const rotateAmount = scrolled * 0.05;
                char.style.transform = `translateY(${scrolled * speed}px) rotate(${rotateAmount}deg)`;
            });

            // タイトル下線
            const underline = document.querySelector('.title-underline');
            if (underline) {
                const scaleX = Math.max(0.5, 1 - (scrolled * 0.001));
                underline.style.transform = `scaleX(${scaleX})`;
            }

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // タイムラインアニメーション
    setupTimelineAnimations() {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.classList.add('timeline-animated');
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
            item.style.transition = 'all 0.8s ease';
            timelineObserver.observe(item);
        });
    }

    // インタラクティブ要素
    setupInteractiveElements() {
        // タイトル文字のインタラクション
        document.querySelectorAll('.title-char').forEach((char, index) => {
            char.addEventListener('mouseenter', (e) => {
                // 波紋効果
                const chars = document.querySelectorAll('.title-char');
                chars.forEach((otherChar, otherIndex) => {
                    const distance = Math.abs(index - otherIndex);
                    const delay = distance * 50;
                    setTimeout(() => {
                        otherChar.style.transform = 'translateY(-20px) scale(1.1) rotate(5deg)';
                        otherChar.style.color = 'var(--pink)';
                        setTimeout(() => {
                            otherChar.style.transform = '';
                            otherChar.style.color = '';
                        }, 300);
                    }, delay);
                });
            });
        });

        // プロセスステップのホバー効果
        document.querySelectorAll('.process-step').forEach(step => {
            step.addEventListener('mouseenter', (e) => {
                const number = e.currentTarget.querySelector('.process-number');
                number.style.transform = 'rotate(360deg) scale(1.2)';
            });

            step.addEventListener('mouseleave', (e) => {
                const number = e.currentTarget.querySelector('.process-number');
                number.style.transform = 'rotate(-10deg) scale(1)';
            });
        });

        // カードのマウス追従効果
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // スクロールインジケーターのクリック
        document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}

// ページロード時の演出
class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            this.animateHeroElements();
        });
    }

    animateHeroElements() {
        // キャラクターは削除済み

        // タイトル文字のアニメーション
        const titleChars = document.querySelectorAll('.title-char');
        titleChars.forEach((char, index) => {
            char.style.opacity = '0';
            char.style.transform = 'translateY(50px) rotateX(90deg)';
            char.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            setTimeout(() => {
                char.style.opacity = '1';
                char.style.transform = 'translateY(0) rotateX(0)';
            }, 300 + (index * 100));
        });

        // タイトル下線のアニメーション
        const underline = document.querySelector('.title-underline');
        if (underline) {
            underline.style.width = '0';
            underline.style.transition = 'width 0.8s ease-out';
            
            setTimeout(() => {
                underline.style.width = '100%';
            }, 1000);
        }

        // サブタイトルのアニメーション
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'rotate(-2deg) translateY(20px)';
            subtitle.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'rotate(-2deg) translateY(0)';
            }, 600);
        }

        // サブサブタイトルのアニメーション
        const subtitleSub = document.querySelector('.subtitle-sub');
        if (subtitleSub) {
            subtitleSub.style.opacity = '0';
            subtitleSub.style.transform = 'rotate(2deg) translateY(20px)';
            subtitleSub.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                subtitleSub.style.opacity = '1';
                subtitleSub.style.transform = 'rotate(2deg) translateY(0)';
            }, 900);
        }

        // バッジのアニメーション
        const badge = document.querySelector('.award-badge');
        if (badge) {
            badge.style.opacity = '0';
            badge.style.transform = 'rotate(15deg) scale(0)';
            badge.style.transition = 'all 1s ease-out';
            
            setTimeout(() => {
                badge.style.opacity = '1';
                badge.style.transform = 'rotate(15deg) scale(1)';
            }, 1200);
        }
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
    new PageLoader();
});