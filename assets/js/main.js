document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('projectsGrid');

    // دقیقاً همون localStorage که توی admin.js ذخیره می‌شه رو می‌خونه
    const saved = localStorage.getItem("vigigames_projects");
    let projects = [];

    if (saved) {
        try {
            projects = JSON.parse(saved);
        } catch (e) {
            projects = [];
        }
    }

    // اگه هیچ پروژه‌ای نبود
    if (projects.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:100px 20px;color:#ffd700;font-size:1.8rem;">
                هنوز هیچ پروژه‌ای اضافه نشده!<br><br>
                <a href="admin.html" style="color:#ffd700;text-decoration:underline;font-size:1.2rem;">
                    ورود به پنل مدیریت
                </a>
            </div>
        `;
        return;
    }

    // نمایش همه پروژه‌ها
    projects.forEach(p => {
        const statusText = p.status === "completed" ? "تکمیل شده" :
                          p.status === "in-progress" ? "در حال ساخت" : "لغو شده";

        const statusClass = p.status || "in-progress";

        const card = `
            <div class="project-card" data-aos="fade-up">
                <img src="${p.image}" alt="${p.name}"
                     onerror="this.src='https://placehold.co/800x600/222233/ffd700?text=No+Image&font=vazirmatn'">
                <h3>${p.name}</h3>
                <p>${p.desc || 'توضیحات در حال تکمیل...'}</p>
                <span class="status ${statusClass}">${statusText}</span>
            </div>
        `;
        grid.innerHTML += card;
    });
});
