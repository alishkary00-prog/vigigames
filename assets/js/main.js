document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('projectsGrid');

    // این لینک همیشه برای همه کار می‌کنه — مستقیم از GitHub می‌خونه
    fetch('https://alishkary00-prog.github.io/vigigames/data/projects.json')
        .then(res => {
            if (!res.ok) throw new Error("فایل پیدا نشد");
            return res.json();
        })
        .then(projects => {
            if (!projects || projects.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column:1/-1;text-align:center;padding:100px 20px;color:#ffd700;font-size:1.8rem;">
                        هنوز هیچ پروژه‌ای اضافه نشده!<br><br>
                        <small style="color:#aaa;font-size:1rem;">به زودی پروژه‌های خفن میان!</small>
                    </div>
                `;
                return;
            }

            projects.forEach(p => {
                const statusText = p.status === "completed" ? "تکمیل شده" :
                                  p.status === "in-progress" ? "در حال ساخت" : "لغو شده";

                const card = `
                    <div class="project-card" data-aos="fade-up">
                        <img src="${p.image}" alt="${p.name}"
                             onerror="this.src='https://placehold.co/800x600/222233/ffd700?text=No+Image&font=vazirmatn'">
                        <h3>${p.name}</h3>
                        <p>${p.desc || 'توضیحات در حال تکمیل...'}</p>
                        <span class="status ${p.status || 'in-progress'}">${statusText}</span>
                    </div>
                `;
                grid.innerHTML += card;
            });
        })
        .catch(() => {
            grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:100px;color:#ff6b6b;">خطا در بارگذاری پروژه‌ها</div>`;
        });
});
