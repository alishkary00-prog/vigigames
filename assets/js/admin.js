const PASSWORD = "13822";
const REPO = "alishkary00-prog/vigigames";
const FILE_PATH = "data/projects.json";
const TOKEN = "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";
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
        document.getElementById("errorMsg").textContent = "رمز اشتباه است!";
        document.getElementById("errorMsg").style.display = "block";
    }
}

function logout() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("adminPass").value = "";
    document.getElementById("adminPass").type = "password";
    document.getElementById("togglePass").textContent = "نمایش";
    document.getElementById("errorMsg").style.display = "none";
}

function loadProjects() {
    console.log("در حال بارگذاری پروژه‌ها از GitHub...");
    fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            return res.json();
        })
        .then(data => {
            console.log("داده از GitHub:", data);
            currentSha = data.sha;
            projects = data.content ? JSON.parse(atob(data.content)) : [];
            renderList();
        })
        .catch(err => {
            console.error("خطا در بارگذاری از GitHub:", err);
            // اگه فایل وجود نداره، از localStorage استفاده کن
            const saved = localStorage.getItem("vigigames_projects");
            projects = saved ? JSON.parse(saved) : [];
            renderList();
        });
}

function saveToGitHub() {
    console.log("در حال ذخیره به GitHub...");
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(projects, null, 2))));
    
    const payload = {
        message: "به‌روزرسانی پروژه‌ها توسط ادمین",
        content: content,
        branch: "main"
    };
    if (currentSha) payload.sha = currentSha;

    fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
        method: "PUT",
        headers: {
            "Authorization": `token ${TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
    })
    .then(data => {
        console.log("موفقیت در آپلود به GitHub:", data);
        currentSha = data.content.sha;
        document.getElementById("successMsg").innerHTML = "پروژه با موفقیت ثبت شد و برای همه دنیا قابل دیدنه! 🚀";
        setTimeout(() => document.getElementById("successMsg").innerHTML = "", 5000);
        // ۵ ثانیه بعد لیست رو رفرش کن
        setTimeout(loadProjects, 5000);
    })
    .catch(err => {
        console.error("خطا در آپلود به GitHub:", err);
        // حداقل توی localStorage ذخیره کن
        localStorage.setItem("vigigames_projects", JSON.stringify(projects));
        document.getElementById("successMsg").innerHTML = "پروژه محلی ذخیره شد، اما آپلود به GitHub شکست. کنسول رو چک کن.";
        setTimeout(() => document.getElementById("successMsg").innerHTML = "", 5000);
    });
}

function renderList() {
    const list = document.getElementById("adminProjectsList");
    if (projects.length === 0) {
        list.innerHTML = "<p style='text-align:center;color:#888;padding:50px;'>هنوز پروژه‌ای اضافه نشده</p>";
        return;
    }

    list.innerHTML = "";
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
    if (confirm("واقعاً می‌خوای حذفش کنی؟")) {
        projects.splice(i, 1);
        saveToGitHub();
    }
}

// فرم ثبت/ویرایش
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

    // فوراً به آرایه اضافه کن (تا لیست بلافاصله آپدیت بشه)
    if (editingId === null) {
        projects.push(newProj);
    } else {
        projects[editingId] = newProj;
        editingId = null;
        document.getElementById("submitBtn").textContent = "ثبت پروژه";
    }

    renderList(); // فوراً لیست رو رندر کن
    saveToGitHub(); // بعدش سعی کن به GitHub آپلود کن
    e.target.reset();
});

// خروج
document.getElementById("logoutBtn").addEventListener("click", logout);
