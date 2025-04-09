document.addEventListener('DOMContentLoaded', function () {
    // 初始化 Lucide 图标
    lucide.createIcons();

    // 移动端菜单切换
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // 如果是移动端，点击后关闭菜单
            if (window.innerWidth < 768) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // 手风琴组件
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            
            // 关闭所有其他展开的内容
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').classList.add('hidden');
                }
            });
            
            // 切换当前项
            item.classList.toggle('active');
            content.classList.toggle('hidden');
        });
    });
    
    // 语录轮播
    document.querySelectorAll('.quotes-carousel').forEach(carousel => {
        const items = carousel.querySelectorAll('.quote-item');
        const prevBtn = carousel.parentElement.querySelector('.quotes-prev');
        const nextBtn = carousel.parentElement.querySelector('.quotes-next');
        let currentIndex = 0;
        
        // 显示指定索引的引用
        const showQuote = (index) => {
            items.forEach((item, i) => {
                if (i === index) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        };
        
        // 显示下一个引用
        const showNextQuote = () => {
            currentIndex = (currentIndex + 1) % items.length;
            showQuote(currentIndex);
        };
        
        // 显示上一个引用
        const showPrevQuote = () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showQuote(currentIndex);
        };
        
        // 绑定按钮事件
        nextBtn.addEventListener('click', showNextQuote);
        prevBtn.addEventListener('click', showPrevQuote);
        
        // 自动轮播
        setInterval(showNextQuote, 6000);
    });
    
    // 动画触发
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-animate');
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add(animation);
                    element.style.opacity = 1;
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-animate]').forEach(element => {
        element.style.opacity = 0;
        observer.observe(element);
    });
    
    // 回到顶部按钮
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 开始阅读和探索角色按钮
    document.getElementById('startReadingBtn').addEventListener('click', function() {
        window.open('https://fanqienovel.com/page/7373111164982773771', '_blank');
    });
    
    document.getElementById('exploreCharactersBtn').addEventListener('click', function() {
        document.querySelector('#characters').scrollIntoView({
            behavior: 'smooth'
        });
    });
});
