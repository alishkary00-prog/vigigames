document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('projectsGrid');

    // اول سعی می‌کنه از localStorage بخونه (پروژه‌هایی که خودت اضافه کردی)
    let projects = [];
    const savedData = localStorage.getItem("vigigames_projects");

    if (savedData) {
        try {
            projects = JSON.parse(savedData);
        } catch (e) {
            console.log("خطا در خواندن localStorage، از پروژه‌های پیش‌فرض استفاده میشه");
        }
    }

    // اگه هیچ پروژه‌ای نبود، چند پروژه نمونه خفن نشون بده (تا سایت خالی نباشه!)
    if (!projects || projects.length === 0) {
        projects = [
            {
                name: "شکارچیان شب",
                desc: "بازی اکشن-ماجراجویی در دنیای تاریک با گرافیک خیره‌کننده و داستان عمیق",
                image: "https://i.imgur.com/9Zz9Z0Z.png",
                status: "in-progress"
            },
            {
                name: "پازل زمان",
                desc: "بازی پازلی با قابلیت سفر در زمان و ۱۵۰ مرحله چالش‌برانگیز",
                image: "https://i.imgur.com/6b9X8K8.png",
                status: "completed"
            },
            {
                name: "جنگجویان آسمان",
                desc: "بازی شوتر هوایی با ۵۰ مرحله و حالت چندنفره آنلاین",
                image: "https://i.imgur.com/L3f5s9P.jpeg",
                status: "in-progress"
            }
        ];
    }

    // نمایش همه پروژه‌ها (چه خودت اضافه کرده باشی، چه نمونه‌ها)
    projects.forEach(project => {
        const statusText = project.status === "completed" ? "تکمیل شده" :
                          project.status === "in-progress" ? "در حال ساخت" : "لغو شده";

        const statusClass = project.status === "completed" ? "completed" :
                           project.status === "in-progress" ? "in-progress" : "cancelled";

        const card = `
            <div class="project-card" data-aos="fade-up">
                <img src="${project.image}" alt="${project.name}" 
                     onerror="this.src='https://via.placeholder.com/800x600/222/ffd700?text=VIGIGAMES'">
                <h3>${project.name}</h3>
                <p>${project.desc}</p>
                <span class="status ${statusClass}">${statusText}</span>
            </div>
        `;
        grid.innerHTML += card;
    });
});