async function loadLessons() {

    const { data, error } = await supabaseClient
        .from('lessons')
        .select('*')
        .order('lesson_number');

    if(error){
        console.error(error);
        return;
    }

    const container =
        document.getElementById('lesson-list');

    data.forEach(lesson => {

        const card =
        document.createElement('div');

        card.className = 'lesson-card';

        card.innerHTML = `
            <a href="lesson.html?id=${lesson.id}">
                Lesson ${lesson.lesson_number}
            </a>
        `;

        container.appendChild(card);
    });
}

loadLessons();
