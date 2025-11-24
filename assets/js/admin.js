const PASSWORD = "13822";
let projects = [];
let editingId = null;

const saved = localStorage.getItem("vigigames_projects");
if (saved) projects = JSON.parse(saved);

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
        renderList();
    } else {
        alert("رمز اشتباه!");
    }
}

// دانلود فایل JSON برای آپلود دستی به GitHub
function downloadJSON() {
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
    const a = document.createElement("a");
    a.href = data;
    a.download = "projects.json";
    a.click();
}

function renderList() {
    const list = document.getElementById("adminProjectsList");
    if (projects.length === 0) {
        list.innerHTML = "<p style='text-align:center;color:#888;padding:50px;'>هنوز پروژه‌ای اضافه نشده</p>";
        return;
    }
    list.innerHTML = "";
    projects.forEach((p, i) => {
        const statusText = p.status === "completed" ? "تکمیل شده" : p.status === "in-progress" ? "در حال ساخت" : "لغو شده";
        const color = p.status === "completed" ? "#28a745" : p.status === "in-progress" ? "#ffc107" : "#dc3545";

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
    if (confirm("حذف بشه؟")) {
        projects.splice(i, 1);
        localStorage.setItem("vigigames_projects", JSON.stringify(projects));
        renderList();
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

    if (editingId === null) {
        projects.push(newProj);
    } else {
        projects[editingId] = newProj;
        editingId = null;
        document.getElementById("submitBtn").textContent = "ثبت پروژه";
    }

    localStorage.setItem("vigigames_projects", JSON.stringify(projects));
    renderList();
    alert("پروژه ثبت شد! برای نمایش عمومی، روی دکمه دانلود JSON کلیک کن و فایل رو در data/projects.json آپلود کن.");
    e.target.reset();
});
