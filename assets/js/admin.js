const PASSWORD = "13822";
const REPO = "alishkary00-prog/vigigames";
const FILE_PATH = "data/projects.json";
const TOKEN = "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"; // توکن جدید و امن شما
let projects = [];
let editingId = null;
let currentSha = null;

function togglePassword() {
    const input = document.getElementById("adminPass");
    const btn = document.getElementById("togglePass");
    input.type = input.type === "password" ? "text" : "password";
    btn.textContent = input.type === "password" ? "نمایش" : "مخفی";
}

function login() {
    if (document.getElementById("adminPass").value === PASSWORD) {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        loadProjects();
    } else {
        document.getElementById("errorMsg").style.display = "block";
    }
}

function loadProjects() {
    fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`)
        .then(res => res.json())
        .then(data => {
            currentSha = data.sha;
            projects = data.content ? JSON.parse(atob(data.content)) : [];
            renderList();
        })
        .catch(() => {
            projects = [];
            renderList();
        });
}

function saveToGitHub() {
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(projects, null, 2))));
    
    fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
        method: "PUT",
        headers: {
            "Authorization": `token ${TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "به‌روزرسانی پروژه‌ها توسط ادمین",
            content: content,
            sha: currentSha,
            branch: "main"
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("پروژه با موفقیت ثبت شد و حالا برای همه دنیا قابل دیدنه!");
        loadProjects();
    })
    .catch(err => {
        console.error(err);
        alert("خطا در ذخیره‌سازی. توکن یا اینترنت رو چک کن.");
    });
}

function renderList() {
    const list = document.getElementById("adminProjectsList");
    list.innerHTML = projects.length === 0 
        ? "<p style='text-align:center;color:#888;padding:50px;'>هنوز پروژه‌ای اضافه نشده</p>"
        : "";

    projects.forEach((p, i) => {
        const statusText = p.status === "completed" ? "تکمیل شده" :
                          p.status === "in-progress" ? "در حال ساخت" : "لغو شده";
        const color = p.status === "completed" ? "#28a745" :
                     p.status === "in-progress" ? "#ffc107" : "#dc3545";

        list.innerHTML += `
            <div class="admin-project-item">
                <img src="${p.image}" onerror="this.src='https://placehold.co/100x100/333/ffd700?text=IMG'" alt="">
                <div class="info">
                    <strong>${p.name}</strong>
                    <p>${p.desc.substring(0, 80)}...</p>
                    <span class="status-badge" style="background:${color}">${statusText}</span>
                </div>
                <div class="actions">
                    <button onclick="editProject(${i})">ویرایش</button>
                    <button onclick="deleteProject(${i})" style="background:#e74c3c;">حذف</button>
                </div>
            </div>
        `;
    });
}

function editProject(i) {
    const p = projects[i];
    editingId = i;
    document.getElementById("pName").value = p.name;
    document.getElementById("pDesc").value = p.desc;
    document.getElementById("pImage").value = p.image;
    document.getElementById("pStatus").value = p.status;
    document.getElementById("submitBtn").textContent = "بروزرسانی پروژه";
}

function deleteProject(i) {
    if (confirm("واقعاً حذف بشه؟")) {
        projects.splice(i, 1);
        saveToGitHub();
    }
}

document.getElementById("projectForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const newProj = {
        name: document.getElementById("pName").value.trim(),
        desc: document.getElementById("pDesc").value.trim(),
        image: document.getElementById("pImage").value.trim() || "https://placehold.co/800x600/222/ffd700?text=VIGIGAMES",
        status: document.getElementById("pStatus").value
    };

    if (!newProj.name || !newProj.desc || !newProj.image) {
        alert("همه فیلدها اجباریه!");
        return;
    }

    if (editingId === null) {
        projects.push(newProj);
    } else {
        projects[editingId] = newProj;
        editingId = null;
        document.getElementById("submitBtn").textContent = "ثبت پروژه";
    }

    saveToGitHub();
    e.target.reset();
});
