// Stars/Twinkling effect
function createStars() {
    const container = document.getElementById('starsContainer');
    
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.textContent = ['✨', '⭐', '🌟'][Math.floor(Math.random() * 3)];
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = (Math.random() * 12 + 8) + 'px';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.className = 'twinkle';
        container.appendChild(star);
    }
}

// Cat animations & interactions
class CatController {
    constructor() {
        this.leftEye = document.getElementById('leftEye');
        this.rightEye = document.getElementById('rightEye');
        this.catMouth = document.getElementById('catMouth');
        this.tail = document.getElementById('tail');
        this.speechBubble = document.getElementById('speechBubble');
        
        this.init();
    }
    
    init() {
        this.blinkEyes();
        this.updateSpeechBubble();
        this.wagTail();
    }
    
    blinkEyes() {
        setInterval(() => {
            this.leftEye.style.height = '4px';
            this.rightEye.style.height = '4px';
            setTimeout(() => {
                this.leftEye.style.height = '28px';
                this.rightEye.style.height = '28px';
            }, 150);
        }, Math.random() * 3000 + 2000);
    }
    
    updateSpeechBubble() {
        const messages = [
            'Meow... maafin dong 🥺',
            'Aku janji ga nakal lagi 😿',
            'Mao peluk😗',
            'Mau traktir seblak!? 🍜',
            'Love youuuu 💕🐾'
        ];
        
        let index = 0;
        setInterval(() => {
            this.speechBubble.querySelector('span').textContent = messages[index];
            index = (index + 1) % messages.length;
        }, 4000);
    }
    
    wagTail() {
        setInterval(() => {
            this.tail.style.animation = 'none';
            setTimeout(() => {
                this.tail.style.animation = 'tailWag 2s infinite';
            }, 10);
        }, 5000);
    }
    
    makeHappy() {
        // Happy eyes (heart shaped)
        this.leftEye.innerHTML = '💖';
        this.rightEye.innerHTML = '💖';
        this.leftEye.style.width = '28px';
        this.rightEye.style.width = '28px';
        this.leftEye.style.height = '28px';
        this.rightEye.style.height = '28px';
        
        // Happy mouth (big smile)
        this.catMouth.style.borderRadius = '50%';
        this.catMouth.style.background = '#00b894';
        this.catMouth.style.height = '20px';
        this.catMouth.innerHTML = '😻';
        
        // Excited tail
        this.tail.style.animationDuration = '0.8s';
    }
    
    makeSad() {
        // Sad puppy eyes
        this.leftEye.style.height = '35px';
        this.rightEye.style.height = '35px';
        this.leftEye.style.width = '20px';
        this.rightEye.style.width = '20px';
        
        // Sad mouth
        this.catMouth.style.borderRadius = '0 0 40px 40px';
        this.catMouth.style.background = 'transparent';
        this.catMouth.innerHTML = '';
        this.catMouth.style.borderColor = '#e74c3c';
    }
}

// Main interactions
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    const cat = new CatController();
    
    const forgiveBtn = document.getElementById('forgiveBtn');
    const teaseBtn = document.getElementById('teaseBtn');
    const successScreen = document.getElementById('successScreen');
    const restartBtn = document.getElementById('restartBtn');
    
    // Forgive button - WIN!
    forgiveBtn.addEventListener('click', function() {
        cat.makeHappy();
        showSuccess();
        createFireworks();
        playSuccessSound();
        
        forgiveBtn.innerHTML = '<span>🎉 YEAYYY TERIMA KASIH! 🎉</span>';
        forgiveBtn.style.background = 'linear-gradient(45deg, #00b894, #55a3ff)';
        teaseBtn.style.display = 'none';
    });
    
    // Tease button - playful punishment
    teaseBtn.addEventListener('click', function() {
        cat.makeSad();
        createShakeEffect();
        showTeaseMessage();
        
        setTimeout(() => {
            cat.makeHappy();
            hideTeaseMessage();
        }, 2000);
    });
    
    // Restart
    restartBtn.addEventListener('click', function() {
        successScreen.classList.remove('active');
        location.reload();
    });
    
    // Mouse follow eyes
    document.addEventListener('mousemove', (e) => {
        const rect = document.querySelector('.cat').getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const eyeOffsetX = Math.cos(angle) * 4;
        const eyeOffsetY = Math.sin(angle) * 4;
        
        cat.leftEye.style.transform = `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`;
        cat.rightEye.style.transform = `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`;
    });
});

// Success effects
function showSuccess() {
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.container').style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        document.getElementById('successScreen').classList.add('active');
    }, 500);
}

function createFireworks() {
    const fireworks = document.createElement('div');
    fireworks.className = 'fireworks';
    fireworks.id = 'fireworks';
    document.body.appendChild(fireworks);
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 50);
    }
    
    setTimeout(() => {
        fireworks.remove();
    }, 5000);
}

function createFirework() {
    const fireworks = document.getElementById('fireworks');
    const firework = document.createElement('div');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
    
    firework.style.position = 'fixed';
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 100 + 'vh';
    firework.style.width = '6px';
    firework.style.height = '6px';
    firework.style.background = colors[Math.floor(Math.random() * colors.length)];
    firework.style.borderRadius = '50%';
    firework.style.pointerEvents = 'none';
    firework.style.zIndex = '9999';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 200 + Math.random() * 200;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    firework.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { 
            transform: `translate(${vx}px, ${vy}px) scale(0)`, 
            opacity: 0 
        }
    ], {
        duration: 1000 + Math.random() * 500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    fireworks.appendChild(firework);
    
    setTimeout(() => firework.remove(), 1500);
}

function createShakeEffect() {
    document.querySelector('.cat').style.animation = 'shake 0.5s';
    document.querySelector('.cat').addEventListener('animationend', function() {
        document.querySelector('.cat').style.animation = 'catFloat 3s ease-in-out infinite';
    }, { once: true });
}

function showTeaseMessage() {
    const teaseMsg = document.createElement('div');
    teaseMsg.id = 'teaseMsg';
    teaseMsg.textContent = '😭😭😭 Jangan gitu dong JESSS...';
    teaseMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Fredoka One', cursive;
        font-size: 2.5rem;
        color: #e74c3c;
        z-index: 100;
        pointer-events: none;
        animation: teasePulse 0.3s infinite;
    `;
    document.body.appendChild(teaseMsg);
    
    setTimeout(() => {
        if (teaseMsg.parentNode) teaseMsg.remove();
    }, 2000);
}

function playSuccessSound() {
    // Create success sound effect
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Add shake animation to CSS via JS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    @keyframes teasePulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
    
    .fireworks {
        pointer-events: none;
        z-index: 9999;
    }
`;
document.head.appendChild(style);

// Easter egg - click cat
document.querySelector('.cat').addEventListener('click', function() {
    this.style.transform = 'scale(1.2)';
    setTimeout(() => {
        this.style.transform = '';
    }, 200);
    
    // Random purr sound
    console.log('😻 PURRRR... maafin aku ya sayang! 💕');
});