const PASSWORD = "13822";
let projects = [];
let editingId = null;

function togglePassword() {
    const input = document.getElementById("adminPass");
    const btn = document.getElementById("togglePass");
    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "مخفی";
    } else {
        input.type = "password";
        btn.textContent = "نمایش";
    }
}

function login() {
    const pass = document.getElementById("adminPass").value;
    if (pass === PASSWORD) {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        loadProjectsFromStorage();
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
}

function loadProjectsFromStorage() {
    const saved = localStorage.getItem("vigigames_projects");
    projects = saved ? JSON.parse(saved) : [];
    renderAdminList();
}

function saveProjects() {
    localStorage.setItem("vigigames_projects", JSON.stringify(projects));
    document.getElementById("successMsg").textContent = "پروژه با موفقیت ذخیره شد!";
    setTimeout(() => document.getElementById("successMsg").textContent = "", 4000);
    renderAdminList();
}

function renderAdminList() {
    const list = document.getElementById("adminProjectsList");
    list.innerHTML = projects.length === 0 
        ? "<p style='text-align:center;color:#777;padding:30px;'>هنوز پروژه‌ای اضافه نشده</p>"
        : "";

    projects.forEach((p, i) => {
        list.innerHTML += `
            <div class="admin-project-item">
                <img src="${p.image}" onerror="this.src='https://placehold.co/100x100/333/fff?text=IMG'" alt="تصویر">
                <div class="info">
                    <strong>${p.name}</strong>
                    <p>${p.desc.substring(0, 70)}...</p>
                    <span class="status-badge" style="background:${p.status==='completed'?'#28a745':p.status==='in-progress'?'#ffc107':'#dc3545'}">
                        ${p.status === 'completed' ? 'تکمیل شده' : p.status === 'in-progress' ? 'در حال ساخت' : 'لغو شده'}
                    </span>
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
    window.scrollTo(0, 0);
}

function deleteProject(i) {
    if (confirm("حذف بشه؟")) {
        projects.splice(i, 1);
        saveProjects();
    }
}

document.getElementById("projectForm").addEventListener("submit", e => {
    e.preventDefault();
    const newProject = {
        name: document.getElementById("pName").value.trim(),
        desc: document.getElementById("pDesc").value.trim(),
        image: document.getElementById("pImage").value.trim() || "https://placehold.co/800x600/222233/ffd700?text=VIGIGAMES",
        status: document.getElementById("pStatus").value
    };

    if (editingId === null) {
        projects.push(newProject);
    } else {
        projects[editingId] = newProject;
        editingId = null;
        document.getElementById("submitBtn").textContent = "ثبت پروژه";
    }

    saveProjects();
    e.target.reset();
});
