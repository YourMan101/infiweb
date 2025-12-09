// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade-in animation for elements as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Team member data
const teamMembers = {
    andrei: {
        name: "Andrei Bob",
        role: "CHIEF SURVEYOR, EXCEL WIZARD, QUANTITY SURVEYOR, CO-FOUNDER INFINITY",
        image: "/images/team1.png",
        bio: "Seasoned professional with extensive experience in surveying and quantity calculations. Co-founder bringing over a decade of expertise in infrastructure projects.",
        expertise: [
            "Chief Surveyor with 10+ years experience",
            "Excel wizard specializing in complex calculations",
            "Quantity surveying expert",
            "Behorighetstyp I certified professional",
            "Technical expert and strategic leader",
            "Co-founder of Infinity Mätkonsult AB"
        ],
        qualifications: "Behorighetstyp I certified professional with authority in surveying standards. Andrei's technical expertise, Excel mastery, and strategic leadership drive our surveying operations.",
        experience: "10+ years in Romania, 5 years in Trafikverket projects in Sweden.",
        languages: "Romanian, English, Swedish.",
        projects: "Led major projects including E4 Förbifart FSE 215 and current E4 Förbifart FSE 101."
    },
    cristian: {
        name: "Cristian Dan",
        role: "SENIOR SURVEYOR, CO-FOUNDER INFINITY",
        image: "/images/team2.png",
        bio: "Senior surveyor with deep expertise in advanced surveying techniques and project management. Co-founder ensuring highest standards of accuracy and efficiency.",
        expertise: [
            "Senior Surveyor with specialized training",
            "Project management and coordination",
            "Advanced surveying equipment operation",
            "High-stakes environments: bridges, tunnels, railroads",
            "Behorighetstyp I certified professional",
            "Co-founder of Infinity Mätkonsult AB"
        ],
        qualifications: "Specializes in high-stakes environments including bridges, tunnels, and railroads. Behorighetstyp I certified with expertise across multiple surveying disciplines.",
        experience: "5 years in Romania, 5 years in Trafikverket projects in Sweden.",
        languages: "Romanian, English.",
        projects: "Specializes in large-scale infrastructure projects and team leadership."
    },
    chakad: {
        name: "Chakad Bozorgmher",
        role: "BIM & CAD EXPERT",
        image: "/images/team3.png",
        bio: "BIM and CAD specialist bringing cutting-edge technology to surveying projects. Expertise in Building Information Modeling ensures precise and efficient project delivery.",
        expertise: [
            "BIM (Building Information Modeling) expert",
            "CAD software specialist",
            "3D modeling and visualization",
            "Digital construction workflows",
            "BIM implementation strategies",
            "International project experience"
        ],
        qualifications: "BIM implementation strategist and CAD software expert. Proven success in diverse international environments with commitment to accuracy and professionalism.",
        experience: "10+ years in Africa and Europe. Passionate about daily learning.",
        languages: "Persian, English, Spanish.",
        projects: "Implements advanced BIM solutions for complex infrastructure projects."
    },
    gabriel: {
        name: "Gabriel Cabrera",
        role: "LAND SURVEYOR",
        image: "/images/team4.png",
        bio: "Dedicated land surveyor with expertise in precise measurements and land assessment. Attention to detail ensures accurate data collection for all projects.",
        expertise: [
            "Land surveying and mapping",
            "Precise measurement techniques",
            "Site assessment and analysis",
            "Survey data processing",
            "BIM implementation",
            "Drone measurements",
            "Machine control operations"
        ],
        qualifications: "Pivotal team member with passion and commitment to excellence. Specializes in BIM implementation, drone measurements, and machine control operations.",
        experience: "Unwavering dedication to work and precision.",
        languages: "Swedish, English, Spanish.",
        projects: "Handles land surveying for various infrastructure and development projects."
    }
};

// Team modal functionality
function openTeamModal(memberId) {
    const modal = document.getElementById('team-modal');
    const modalBody = document.getElementById('team-modal-body');
    const member = teamMembers[memberId];
    
    if (member) {
        modalBody.innerHTML = `
            <div class="team-modal-header">
                <img src="${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <div class="role">${member.role}</div>
            </div>
            <div class="team-modal-body">
                <p>${member.bio}</p>
                
                ${member.qualifications ? `
                <h3>Qualifications</h3>
                <p>${member.qualifications}</p>
                ` : ''}
                
                ${member.experience ? `
                <h3>Experience</h3>
                <p>${member.experience}</p>
                ` : ''}
                
                ${member.languages ? `
                <h3>Languages Spoken</h3>
                <p>${member.languages}</p>
                ` : ''}
                
                <h3>Expertise</h3>
                <ul>
                    ${member.expertise.map(item => `<li>${item}</li>`).join('')}
                </ul>
                
                <h3>Recent Projects</h3>
                <p>${member.projects}</p>
            </div>
        `;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Reset scroll position to top
        const modalContent = document.querySelector('.team-modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }
}

// Close team modal
function closeTeamModal() {
    const modal = document.getElementById('team-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Modal functionality for "More"
document.addEventListener('DOMContentLoaded', function() {
    const moreBtn = document.getElementById('more-btn');
    const modal = document.getElementById('more-modal');
    const closeModal = document.getElementById('close-modal');
    const modalText = document.getElementById('modal-text');

    if (moreBtn && modal && closeModal) {
        moreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            // You can set modalText.innerHTML here if you want dynamic content
        });

        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Optional: close modal when clicking outside the modal content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Team modal close functionality
    const closeTeamModalBtn = document.querySelector('.close-team-modal');
    const teamModal = document.getElementById('team-modal');
    
    if (closeTeamModalBtn && teamModal) {
        closeTeamModalBtn.addEventListener('click', closeTeamModal);
        
        // Close modal when clicking outside
        teamModal.addEventListener('click', function(e) {
            if (e.target === teamModal) {
                closeTeamModal();
            }
        });
    }
});

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, header');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
}); 