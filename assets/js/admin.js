const PASSWORD = "13822";
let projects = [];
let editingId = null;

// نمایش/مخفی کردن رمز
function togglePassword() {
    const input = document.getElementById("adminPass");
    const btn = document.getElementById("togglePass");
    if (input.type === "password") {
        input.type = "text";
        btn.innerHTML = "مخفی";
    } else {
        input.type = "password";
        btn.innerHTML = "نمایش";
    }
}

// ورود امن
function login() {
    const pass = document.getElementById("adminPass").value;
    if (pass === PASSWORD) {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        loadProjects();
        document.getElementById("errorMsg").style.display = "none";
    } else {
        document.getElementById("errorMsg").textContent = "رمز عبور اشتباه است!";
        document.getElementById("errorMsg").style.display = "block";
    }
}

function logout() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("adminPass").value = "";
    document.getElementById("adminPass").type = "password";
    document.getElementById("togglePass").innerHTML = "نمایش";
}

// بارگذاری پروژه‌ها
function loadProjects() {
    const saved = localStorage.getItem("vigigames_projects");
    projects = saved ? JSON.parse(saved) : [];
    renderAdminList();
}

// ذخیره پروژه‌ها
function saveProjects() {
    localStorage.setItem("vigigames_projects", JSON.stringify(projects));
    document.getElementById("successMsg").innerHTML = `
        پروژه با موفقیت ثبت شد!
        <a href="index.html" style="color:#ffd700; margin-right:10px;">→ مشاهده در سایت</a>
    `;
    setTimeout(() => document.getElementById("successMsg").innerHTML = "", 6000);
    renderAdminList();
}

// نمایش لیست پروژه‌ها در پنل
function renderAdminList() {
    const list = document.getElementById("adminProjectsList");
    list.innerHTML = projects.length === 0 
        ? "<p style='text-align:center; color:#777; padding:30px;'>هنوز هیچ پروژه‌ای ثبت نشده است.</p>"
        : "";

    projects.forEach((p, i) => {
        const statusPersian = p.status === "completed" ? "تکمیل شده" :
                             p.status === "in-progress" ? "در حال ساخت" : "لغو شده";
        const statusColor = p.status === "completed" ? "#28a745" :
                           p.status === "in-progress" ? "#ffc107" : "#dc3545";

        list.innerHTML += `
            <div class="admin-project-item">
                <img src="${p.image}" onerror="this.src='https://via.placeholder.com/100/222/ffd700?text=NO+IMG'" alt="پروژه">
                <div class="info">
                    <strong>${p.name}</strong>
                    <p>${p.desc.substring(0, 80)}...</p>
                    <span class="status-badge" style="background:${statusColor}">
                        ${statusPersian}
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteProject(i) {
    if (confirm("آیا از حذف این پروژه مطمئنی؟")) {
        projects.splice(i, 1);
        saveProjects();
    }
}

// ثبت فرم
document.getElementById("projectForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const newProject = {
        name: document.getElementById("pName").value.trim(),
        desc: document.getElementById("pDesc").value.trim(),
        image: document.getElementById("pImage").value.trim() || "https://via.placeholder.com/800x600/222/ffd700?text=VIGIGAMES",
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