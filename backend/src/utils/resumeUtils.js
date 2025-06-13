export function extractResumeData(text) {
    const data = {};

    const emailMatch = text.match(/[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
    data.email = emailMatch ? emailMatch[0] : '';

    const phoneMatch = text.match(/(?:\+91[-\s]?)?[0]?[789]\d{9}/);
    data.phone = phoneMatch ? phoneMatch[0] : '';

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    data.name = lines[0];

    const knownSkills = [
        "JavaScript", "Python", "Java", "React", "Node.js", "Express", "MongoDB",
        "HTML", "CSS", "C++", "Machine Learning", "Deep Learning", "SQL"
    ]
    const foundSkills = knownSkills.filter(skill =>
        text.toLowerCase().includes(skill.toLowerCase())
    );
    data.skills = foundSkills;

    const eduRegex = /(Bachelor|B\.Tech|Master|M\.Tech|BSc|MSc|BCA|MCA|Engineering|Computer Science)/gi;
    data.education = text.match(eduRegex) || [];

    const experienceRegex = /(experience|internship|worked|developed|engineer|company|role)/i;
    const expLines = lines.filter(line => experienceRegex.test(line));
    let experienceBlock = [];
    // Capture next 2–3 lines following each match (assuming resume is line-based)
    for (let i = 0; i < lines.length; i++) {
        if (experienceRegex.test(lines[i])) {
            experienceBlock.push(lines[i]);
            for (let j = 1; j <= 2; j++) {
                if (lines[i + j]) experienceBlock.push(lines[i + j]);
            }
        }
    }
    data.experience = [...new Set(experienceBlock)].slice(0, 6);


    return data;
}