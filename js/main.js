// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ナビゲーションハイライト
const currentLocation = location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
        link.classList.add('active');
    }
});

// スクロール時のヘッダー影
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 10) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// カードのホバーアニメーション
const cards = document.querySelectorAll('.level-card, .feature-card, .session-card, .cert-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// セッションカードの展開・折りたたみ機能
document.addEventListener('DOMContentLoaded', () => {
    const sessionCards = document.querySelectorAll('.session-card');
    
    sessionCards.forEach(card => {
        const title = card.querySelector('.session-title');
        const topics = card.querySelector('.session-topics');
        
        if (title && topics) {
            // 初期状態：すべて展開
            topics.style.maxHeight = topics.scrollHeight + 'px';
            topics.style.overflow = 'visible';
            topics.style.transition = 'max-height 0.3s ease';
            
            // タイトルにカーソルを合わせるとポインターに
            title.style.cursor = 'pointer';
            
            // クリックで展開・折りたたみ
            title.addEventListener('click', () => {
                if (topics.style.maxHeight === '0px') {
                    topics.style.maxHeight = topics.scrollHeight + 'px';
                    topics.style.overflow = 'visible';
                } else {
                    topics.style.maxHeight = '0px';
                    topics.style.overflow = 'hidden';
                }
            });
        }
    });
});

// ページ読み込み時のフェードイン効果
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 外部リンクを新しいタブで開く
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// セッション番号にバッジスタイルを適用
const sessionNumbers = document.querySelectorAll('.session-number');
sessionNumbers.forEach(badge => {
    badge.style.transition = 'all 0.3s ease';
});

// ボタンのクリックエフェクト
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // リップル効果
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// リップルアニメーションのスタイル
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// スクロール位置の記憶
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});

// プリントボタンの追加（オプション）
function addPrintButton() {
    const container = document.querySelector('.container');
    if (container && window.location.pathname.includes('beginner.html') || 
        window.location.pathname.includes('intermediate.html') || 
        window.location.pathname.includes('advanced.html')) {
        
        const printButton = document.createElement('button');
        printButton.textContent = '📄 このページを印刷';
        printButton.className = 'btn btn-secondary';
        printButton.style.position = 'fixed';
        printButton.style.bottom = '2rem';
        printButton.style.right = '2rem';
        printButton.style.zIndex = '999';
        printButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        
        printButton.addEventListener('click', () => {
            window.print();
        });
        
        document.body.appendChild(printButton);
    }
}

// ページ読み込み後に実行
document.addEventListener('DOMContentLoaded', addPrintButton);
