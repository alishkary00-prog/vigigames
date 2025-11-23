document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('projectsGrid');
    
    // همیشه از localStorage می‌خونه (حتی اگه projects.json نباشه)
    const saved = localStorage.getItem("vigigames_projects");
    let projects = saved ? JSON.parse(saved) : [];

    if (projects.length === 0) {
        grid.innerHTML = "<p style='text-align:center;color:#ffd700;font-size:1.5rem;'>هنوز پروژه‌ای ثبت نشده است!</p>";
        return;
    }

    projects.forEach(p => {
        const statusText = p.status === 'completed' ? 'تکمیل شده' : 
                          p.status === 'in-progress' ? 'در حال ساخت' : 'لغو شده';

        const card = `
            <div class="project-card" data-aos="fade-up">
                <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/800x600/222/ffd700?text=No+Image'">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <span class="status ${p.status}">${statusText}</span>
            </div>
        `;
        grid.innerHTML += card;
    });
});