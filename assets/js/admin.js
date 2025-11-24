// admin.js — آخرین نسخه برای VIGIGAMES Dark Theme
const PASSWORD = "13822";
let projects = [];
let editingId = null;

// بارگذاری پروژه‌ها از localStorage
const saved = localStorage.getItem("vigigames_projects");
if (saved) {
    try { projects = JSON.parse(saved); }
    catch(e) { projects = []; }
}

// توابع کمکی
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
    if (document.getElementById("adminPass").value === PASSWORD) {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        renderList();
    } else {
        document.getElementById("errorMsg").style.display = "block";
    }
}

function logout() {
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("adminPass").value = "";
    document.getElementById("errorMsg").style.display = "none";
}

// دانلود فایل JSON (مهم‌ترین قسمت!)
function downloadJSON() {
    if (projects.length === 0) {
        alert("ابتدا حداقل یک پروژه اضافه کن!");
        return;
    }
    const data = JSON.stringify(projects, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.json";
    a.click();
    URL.revokeObjectURL(url);

    document.getElementById("successMsg").textContent = "فایل projects.json دانلود شد! حالا در GitHub آپلود کن.";
    setTimeout(() => document.getElementById("successMsg").textContent = "", 5000);
}

// نمایش لیست پروژه‌ها در پنل
function renderList() {
    const list = document.getElementById("adminProjectsList");
    if (projects.length === 0) {
        list.innerHTML = "<p style='text-align:center;color:#6688aa;padding:60px;'>هنوز پروژه‌ای اضافه نشده</p>";
        return;
    }
    list.innerHTML = "";
    projects.forEach((p, i) => {
        const statusText = p.status === "completed" ? "تکمیل شده" :
                          p.status === "in-progress" ? "در حال ساخت" : "لغو شده";
        const color = p.status === "completed" ? "#00ff88" :
                     p.status === "in-progress" ? "#ff0088" : "#666";

        list.innerHTML += `
            <div class="admin-project-item">
                <img src="${p.image}" onerror="this.src='https://placehold.co/100x100/111/00ffff?text=IMG'" alt="">
                <div style="flex:1;">
                    <strong style="color:#00ffff;font-size:1.3rem;">${p.name}</strong>
                    <p style="margin:8px 0;color:#99ccff;">${p.desc.substring(0,100)}...</p>
                    <span style="padding:4px 12px;background:rgba(0,255,255,0.2);color:${color};border-radius:20px;font-size:0.8rem;">${statusText}</span>
                </div>
                <div class="actions">
                    <button onclick="editProject(${i})" style="background:#00ff88;color:#000;">ویرایش</button>
                    <button onclick="deleteProject(${i})" style="background:#ff3366;">حذف</button>
                </div>
            </div>`;
    });
}

// ویرایش پروژه
function editProject(i) {
    const p = projects[i];
    editingId = i;
    document.getElementById("pName").value = p.name;
    document.getElementById("pDesc").value = p.desc;
    document.getElementById("pImage").value = p.image;
    document.getElementById("pStatus").value = p.status;
    document.getElementById("submitBtn").textContent = "بروزرسانی پروژه";
}

// حذف پروژه
function deleteProject(i) {
    if (confirm("واقعاً می‌خوای این پروژه حذف بشه؟")) {
        projects.splice(i, 1);
        localStorage.setItem("vigigames_projects", JSON.stringify(projects));
        renderList();
    }
}

// ثبت/ویرایش پروژه
document.getElementById("projectForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const newProj = {
        name: document.getElementById("pName").value.trim(),
        desc: document.getElementById("pDesc").value.trim(),
        image: document.getElementById("pImage").value.trim() || "https://placehold.co/800x600/111/00ffff?text=VIGIGAMES",
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

    localStorage.setItem("vigigames_projects", JSON.stringify(projects));
    renderList();
    document.getElementById("successMsg").textContent = "پروژه با موفقیت ثبت شد! حالا دانلود کن و آپلود کن.";
    setTimeout(() => document.getElementById("successMsg").textContent = "", 4000);
    e.target.reset();
});
