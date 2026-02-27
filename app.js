// 全局变量和配置
const CONFIG = {
    GITHUB_USERNAME: 'badhope',
    API_BASE: 'https://api.github.com/users/',
    PROJECTS_PER_PAGE: 6,
    BLOG_SOURCES: {
        csdn: 'https://blog.csdn.net/weixin_56622231',
        zhihu: 'https://www.zhihu.com/people/badhope',
        github: 'https://github.com/badhope'
    }
};

// 页面管理器
class PageManager {
    constructor() {
        this.currentPage = 'home';
        this.pages = document.querySelectorAll('.page');
        this.navItems = document.querySelectorAll('[data-page]');
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadHomePage();
        this.initTheme();
    }

    bindEvents() {
        // 导航点击事件
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.switchPage(page);
            });
        });

        // 主题切换
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => this.toggleTheme());
        });

        // 移动端菜单
        this.initMobileMenu();
    }

    switchPage(pageName) {
        // 更新导航状态
        this.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === pageName) {
                item.classList.add('active');
            }
        });

        // 切换页面显示
        this.pages.forEach(page => {
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(`page-${pageName}`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageName;
            
            // 加载页面特定内容
            this.loadPageContent(pageName);
        }
    }

    loadPageContent(pageName) {
        switch(pageName) {
            case 'home':
                this.loadHomePage();
                break;
            case 'projects':
                this.loadProjects();
                break;
            case 'blog':
                this.loadBlog();
                break;
            case 'about':
                this.loadAbout();
                break;
        }
    }

    loadHomePage() {
        this.animateStats();
        this.initParticles();
    }

    loadProjects() {
        this.fetchGitHubRepos();
    }

    loadBlog() {
        this.fetchBlogPosts();
    }

    loadAbout() {
        this.loadContactInfo();
    }

    // 统计数字动画
    animateStats() {
        const statElements = document.querySelectorAll('.stat-value');
        statElements.forEach(el => {
            if (el.textContent.includes('--')) return;
            
            const finalValue = parseInt(el.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    el.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(currentValue);
                }
            }, 30);
        });
    }

    // 粒子效果
    initParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;

        // 创建粒子
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(particle);
        }

        // 添加CSS动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) translateX(0px); }
                25% { transform: translateY(-20px) translateX(10px); }
                50% { transform: translateY(-40px) translateX(-10px); }
                75% { transform: translateY(-20px) translateX(5px); }
            }
            .particle {
                pointer-events: none;
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
    }

    // 主题切换
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // 触发主题切换动画
        document.body.style.transition = 'background-color 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    }

    // 移动端菜单
    initMobileMenu() {
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const drawer = document.getElementById('mobile-drawer');
        const backdrop = document.getElementById('mobile-drawer-backdrop');
        const closeBtn = document.getElementById('close-drawer');

        if (mobileBtn) {
            mobileBtn.addEventListener('click', () => {
                drawer.classList.remove('-translate-x-full');
                backdrop.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        if (backdrop) {
            backdrop.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }
    }

    closeMobileMenu() {
        const drawer = document.getElementById('mobile-drawer');
        const backdrop = document.getElementById('mobile-drawer-backdrop');
        
        drawer.classList.add('-translate-x-full');
        backdrop.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // 获取GitHub数据
    async fetchGitHubRepos() {
        try {
            showLoading('#projects-grid');
            const response = await fetch(`${CONFIG.API_BASE}${CONFIG.GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
            const repos = await response.json();
            
            this.renderProjects(repos);
        } catch (error) {
            console.error('获取GitHub仓库失败:', error);
            showToast('获取项目数据失败');
        }
    }

    renderProjects(repos) {
        const container = document.getElementById('projects-grid');
        if (!container) return;

        container.innerHTML = repos.map(repo => `
            <div class="project-card card p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div class="flex items-start justify-between mb-4">
                    <h3 class="font-display font-bold text-lg">${repo.name}</h3>
                    <span class="repo-language px-2 py-1 rounded-full text-xs font-medium" 
                          style="background-color: ${this.getLanguageColor(repo.language)}">
                        ${repo.language || 'Other'}
                    </span>
                </div>
                <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    ${repo.description || '暂无描述'}
                </p>
                <div class="flex items-center justify-between text-sm text-slate-500">
                    <div class="flex items-center gap-4">
                        <span class="flex items-center gap-1">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                            </svg>
                            ${repo.stargazers_count}
                        </span>
                        <span class="flex items-center gap-1">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path>
                            </svg>
                            ${repo.forks_count}
                        </span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" 
                       class="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium">
                        查看详情 →
                    </a>
                </div>
            </div>
        `).join('');

        hideLoading('#projects-grid');
    }

    getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'TypeScript': '#3178c6',
            'Java': '#b07219',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'PHP': '#4F5D95',
            'C++': '#f34b7d',
            'C#': '#178600',
            'Ruby': '#701516',
            'Swift': '#ffac45'
        };
        return colors[language] || '#808080';
    }

    // 获取博客文章
    async fetchBlogPosts() {
        // 这里可以根据需要接入不同的博客平台API
        const mockPosts = [
            {
                title: 'AI时代的学习方法论',
                excerpt: '探讨在人工智能快速发展的今天，如何调整学习策略...',
                date: '2024-01-15',
                source: '原创',
                url: '#'
            },
            {
                title: '前端工程化实践总结',
                excerpt: '分享在大型项目中实施前端工程化的经验和教训...',
                date: '2024-01-10',
                source: '技术',
                url: '#'
            }
        ];

        this.renderBlogPosts(mockPosts);
    }

    renderBlogPosts(posts) {
        const container = document.getElementById('blog-grid');
        if (!container) return;

        container.innerHTML = posts.map(post => `
            <article class="blog-post card p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div class="flex items-center gap-2 mb-3">
                    <span class="source-tag px-2 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                        ${post.source}
                    </span>
                    <time class="text-xs text-slate-500">${post.date}</time>
                </div>
                <h3 class="font-display font-bold text-xl mb-3 hover:text-sky-600 transition-colors">
                    <a href="${post.url}">${post.title}</a>
                </h3>
                <p class="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                    ${post.excerpt}
                </p>
                <a href="${post.url}" class="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium flex items-center gap-1">
                    阅读全文
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </a>
            </article>
        `).join('');
    }

    // 加载联系信息
    loadContactInfo() {
        const contactCards = document.getElementById('contact-cards');
        if (!contactCards) return;

        const contacts = [
            {
                icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
                title: '邮箱联系',
                content: 'x18825407105@outlook.com',
                action: 'mailto:x18825407105@outlook.com'
            },
            {
                icon: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path></svg>',
                title: 'GitHub',
                content: '@badhope',
                action: 'https://github.com/badhope'
            }
        ];

        contactCards.innerHTML = contacts.map(contact => `
            <div class="contact-card card p-6 rounded-2xl">
                <div class="flex items-center gap-4 mb-4">
                    <div class="contact-icon w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white">
                        ${contact.icon}
                    </div>
                    <div>
                        <h3 class="font-display font-bold">${contact.title}</h3>
                        <p class="text-slate-500 text-sm">${contact.content}</p>
                    </div>
                </div>
                <a href="${contact.action}" target="_blank" 
                   class="primary-btn w-full py-3 rounded-xl font-medium text-center block">
                    ${contact.title === '邮箱联系' ? '发送邮件' : '访问主页'}
                </a>
            </div>
        `).join('');
    }
}

// 工具函数
function showLoading(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = '<div class="loading-spinner mx-auto"></div>';
    }
}

function hideLoading(selector) {
    // 移除加载状态的逻辑在具体实现中处理
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const messageEl = document.getElementById('toast-message');
    
    if (messageEl) {
        messageEl.textContent = message;
    }
    
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PageManager();
    
    // 添加打字机效果
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const text = '熊泽城';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, 200);
            }
        };
        setTimeout(typeWriter, 1000);
    }
});

// 全局搜索功能
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        // 打开搜索模态框的逻辑
    }
    
    if (e.key === 'Escape') {
        // 关闭模态框的逻辑
    }
});
