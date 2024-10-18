function showAvatarMessage(event) {
    event.stopPropagation(); // 阻止事件冒泡
    const message = document.getElementById("avatarMessage");
    if (message.style.display === "none" || message.style.display === "") {
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }
}

// 点击页面其他地方时关闭头像消息
document.addEventListener('click', function(event) {
    const message = document.getElementById("avatarMessage");
    if (message.style.display === "block") {
        message.style.display = "none";
    }
});

let contentStructure = {};

// 加载内容结构
fetch('content.json')
    .then(response => response.json())
    .then(data => {
        contentStructure = data;
    })
    .catch(error => console.error('Error loading content:', error));

function openModal(contentId) {
    const modal = document.getElementById("myModal");
    const modalCategories = document.getElementById("modalCategories");
    const modalSubcontent = document.getElementById("modalSubcontent");
    
    const content = siteContent[contentId];
    if (content) {
        modalCategories.innerHTML = `<h2>${content.title}</h2>`;
        content.categories.forEach((category, index) => {
            modalCategories.innerHTML += `<button onclick="showSubcontent('${contentId}', ${index})">${category.name}</button>`;
        });
        modalSubcontent.innerHTML = ""; // 清空子内容区域
    }
    
    modal.style.display = "block";
}

function showSubcontent(contentId, categoryIndex) {
    const modalSubcontent = document.getElementById("modalSubcontent");
    const content = siteContent[contentId];
    if (content && content.categories[categoryIndex]) {
        const category = content.categories[categoryIndex];
        modalSubcontent.innerHTML = `<h3>${category.name}</h3><p>${category.content}</p>`;
    }
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// 当用户点击模态框外部时关闭模态框
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 背景音乐控制
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.textContent = '音乐关';
    } else {
        bgMusic.pause();
        musicToggle.textContent = '音乐开';
    }
});
