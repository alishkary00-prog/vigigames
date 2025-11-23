document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('projectsGrid');

    fetch('https://alishkary00-prog.github.io/vigigames/data/projects.json')
        .then(res => res.json())
        .then(projects => {
            if (projects.length === 0) {
                grid.innerHTML = "<p style='text-align:center;color:#ffd700;font-size:1.5rem;'>به زودی پروژه‌های جدید!</p>";
                return;
            }

            projects.forEach(p => {
                const statusText = p.status === "completed" ? "تکمیل شده" :
                                  p.status === "in-progress" ? "در حال ساخت" : "لغو شده";
                const statusClass = p.status;

                const card = `
                    <div class="project-card" data-aos="fade-up">
                        <img src="${p.image}" alt="${p.name}" 
                             onerror="this.src='https://via.placeholder.com/800x600/222/ffd700?text=VIGIGAMES'">
                        <h3>${p.name}</h3>
                        <p>${p.desc}</p>
                        <span class="status ${statusClass}">${statusText}</span>
                    </div>
                `;
                grid.innerHTML += card;
            });
        })
        .catch(err => {
            grid.innerHTML = "<p style='text-align:center;color:#ff6b6b;'>در حال بارگذاری پروژه‌ها...</p>";
        });
});
