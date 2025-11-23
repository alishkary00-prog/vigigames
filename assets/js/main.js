document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('projectsGrid');

    // این لینک همیشه کار می‌کنه — مستقیم از GitHub می‌خونه
    fetch('https://alishkary00-prog.github.io/vigigames/data/projects.json')
        .then(response => {
            if (!response.ok) throw new Error('فایل پیدا نشد');
            return response.json();
        })
        .then(projects => {
            if (!projects || projects.length === 0) {
                grid.innerHTML = "<p style='text-align:center;color:#ffd700;font-size:1.5rem;margin:50px;'>به زودی پروژه‌های جدید!</p>";
                return;
            }

            projects.forEach(p => {
                const statusText = p.status === "completed" ? "تکمیل شده" :
                                  p.status === "in-progress" ? "در حال ساخت" : "لغو شده";

                const card = `
                    <div class="project-card" data-aos="fade-up">
                        <img src="${p.image}" alt="${p.name}" 
                             onerror="this.src='https://via.placeholder.com/800x600/222/ffd700?text=No+Image'">
                        <h3>${p.name}</h3>
                        <p>${p.desc}</p>
                        <span class="status ${p.status}">${statusText}</span>
                    </div>
                `;
                grid.innerHTML += card;
            });
        })
        .catch(err => {
            console.error(err);
            grid.innerHTML = "<p style='text-align:center;color:#ff6b6b;'>در حال بارگذاری پروژه‌ها...</p>";
        });
});
