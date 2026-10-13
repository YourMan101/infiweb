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

document.querySelectorAll('.service-flip-card .service-card-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const card = toggle.closest('.service-flip-card');
        const front = card.querySelector('.service-card-front');
        const back = card.querySelector('.service-card-back');
        const isFlipped = card.classList.toggle('is-flipped');

        toggle.setAttribute('aria-pressed', String(isFlipped));
        toggle.setAttribute('aria-label', toggle.dataset[isFlipped ? 'detailsLabel' : 'imageLabel']);
        front.setAttribute('aria-hidden', String(isFlipped));
        back.setAttribute('aria-hidden', String(!isFlipped));
        card.querySelectorAll('.service-gallery-control, .service-gallery-count').forEach(control => {
            control.setAttribute('aria-hidden', String(!isFlipped));
        });
        card.querySelectorAll('.service-gallery-control').forEach(control => {
            control.disabled = !isFlipped;
        });
    });
});

document.querySelectorAll('.service-gallery-card').forEach(card => {
    const slides = Array.from(card.querySelectorAll('.service-gallery-slide'));
    const count = card.querySelector('.service-gallery-count');
    let activeIndex = 0;

    const showSlide = index => {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });
        count.textContent = `${activeIndex + 1} / ${slides.length}`;
    };

    card.querySelector('.service-gallery-previous').addEventListener('click', () => {
        showSlide(activeIndex - 1);
    });
    card.querySelector('.service-gallery-next').addEventListener('click', () => {
        showSlide(activeIndex + 1);
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
        role: "CHIEF SURVEYOR & CO-FOUNDER",
        image: "/images/Andrei.png",
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
        projects: "Recent projects include E4 Förbifart FSE 215 and E4 Förbifart FSE 101."
    },
    cristian: {
        name: "Cristian Dan",
        role: "SENIOR SURVEYOR & CO-FOUNDER",
        image: "/images/Cristian.png",
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
    },
    georgios: {
        name: "Georgios Salamouras",
        role: "LAND SURVEYOR",
        image: "/images/Georgios.jpeg",
        bio: "Georgios holds an MEng in Land Surveying & Geoinformatics Engineering from NTU of Athens, specializing in Urban & Transport Planning. He has also studied in the KTH MSc Transport and Geoinformation Technology program.",
        expertise: [
            "Topographical and site-planning surveys",
            "Construction staking and as-built surveys",
            "UAV/drone mapping & photogrammetry",
            "Geoinformation Technology (GIS) techniques",
            "Community Development Planning"
        ],
        qualifications: "He is an accredited Land Surveyor and member of the Technical Chamber of Greece, and a certified UAV Pilot.",
        experience: "Before joining Infinity Mätkonsult, Georgios worked in Greece as a Land Surveyor in the Hellenic Air Force and on private projects, and as an Urban-Transport Planner developing and coordinating Community Development Masterplans for Greek municipalities. He has also worked as a research assistant for the Sustainable Mobility Unit (Lab) at NTU of Athens and the Division of Transport Planning at KTH.",
        languages: "Greek, English, Swedish, Italian.",
        projects: "Resarö Mitt Project."
    }
};

const swedishTeamMembers = {
    andrei: {
        role: "CHEFSMÄTARE & MEDGRUNDARE",
        bio: "Erfaren yrkesperson med gedigen kompetens inom mätning och mängdberäkning. Som medgrundare bidrar han med mer än tio års erfarenhet av infrastrukturprojekt.",
        expertise: [
            "Chefsmätare med över 10 års erfarenhet",
            "Avancerade Excel-beräkningar",
            "Expert på mängdmätning",
            "Certifierad enligt behörighetstyp I",
            "Teknisk expert och strategisk ledare",
            "Medgrundare av Infinity Mätkonsult AB"
        ],
        qualifications: "Certifierad enligt behörighetstyp I med god kännedom om mätstandarder. Andreis tekniska kompetens, Excel-kunskaper och strategiska ledarskap driver vårt mätarbete.",
        experience: "Över 10 år i Rumänien och 5 år i Trafikverkets projekt i Sverige.",
        languages: "Rumänska, engelska och svenska.",
        projects: "Nyligen genomförda projekt omfattar E4 Förbifart FSE 215 och E4 Förbifart FSE 101."
    },
    cristian: {
        role: "SENIOR MÄTARE & MEDGRUNDARE",
        bio: "Senior mätningstekniker med djup kompetens inom avancerade mätmetoder och projektledning. Som medgrundare säkerställer han högsta standard för noggrannhet och effektivitet.",
        expertise: [
            "Senior mätningstekniker med specialistutbildning",
            "Projektledning och samordning",
            "Avancerad mätutrustning",
            "Komplexa miljöer: broar, tunnlar och järnvägar",
            "Certifierad enligt behörighetstyp I",
            "Medgrundare av Infinity Mätkonsult AB"
        ],
        qualifications: "Specialiserad på komplexa miljöer, bland annat broar, tunnlar och järnvägar. Certifierad enligt behörighetstyp I med kompetens inom flera mätområden.",
        experience: "5 år i Rumänien och 5 år i Trafikverkets projekt i Sverige.",
        languages: "Rumänska och engelska.",
        projects: "Specialiserad på storskaliga infrastrukturprojekt och teamledning."
    },
    chakad: {
        role: "BIM- & CAD-EXPERT",
        bio: "BIM- och CAD-specialist som tillför modern teknik till mätprojekt. Kompetens inom byggnadsinformationsmodellering bidrar till noggranna och effektiva projektleveranser.",
        expertise: [
            "Expert på BIM (byggnadsinformationsmodellering)",
            "Specialist på CAD-programvara",
            "3D-modellering och visualisering",
            "Digitala byggprocesser",
            "Strategier för BIM-implementering",
            "Erfarenhet från internationella projekt"
        ],
        qualifications: "Strateg inom BIM-implementering och expert på CAD-programvara. Dokumenterad erfarenhet från varierande internationella miljöer och ett starkt engagemang för noggrannhet och professionalism.",
        experience: "Över 10 år i Afrika och Europa. Brinner för kontinuerligt lärande.",
        languages: "Persiska, engelska och spanska.",
        projects: "Inför avancerade BIM-lösningar för komplexa infrastrukturprojekt."
    },
    gabriel: {
        role: "MÄTNINGSTEKNIKER",
        bio: "Engagerad mätningstekniker med kompetens inom noggranna mätningar och markbedömning. Ett öga för detaljer bidrar till korrekt datainsamling i alla projekt.",
        expertise: [
            "Lantmäteri och kartläggning",
            "Noggranna mätmetoder",
            "Platsbedömning och analys",
            "Bearbetning av mätdata",
            "BIM-implementering",
            "Drönarmätningar",
            "Maskinstyrning"
        ],
        qualifications: "En viktig teammedlem med engagemang för kvalitet. Specialiserad på BIM-implementering, drönarmätningar och maskinstyrning.",
        experience: "Arbetar med stort engagemang och noggrannhet.",
        languages: "Svenska, engelska och spanska.",
        projects: "Utför mätning för olika infrastruktur- och exploateringsprojekt."
    },
    georgios: {
        role: "MÄTNINGSTEKNIKER",
        bio: "Georgios har en civilingenjörsexamen (MEng) i lantmäteri och geoinformatik från NTU i Aten, med inriktning på stads- och transportplanering. Han har även studerat på masterprogrammet Transport and Geoinformation Technology vid KTH.",
        expertise: [
            "Topografiska mätningar och mätningar för markplanering",
            "Utsättning i byggprojekt och relationsmätningar",
            "UAV-/drönarkartering och fotogrammetri",
            "Geoinformationsteknik (GIS)",
            "Planering för lokalsamhällens utveckling"
        ],
        qualifications: "Han är auktoriserad lantmätare, medlem i Greklands tekniska kammare och certifierad UAV-pilot.",
        experience: "Innan Georgios började på Infinity Mätkonsult arbetade han i Grekland som lantmätare inom det grekiska flygvapnet och med privata projekt, samt som stads- och transportplanerare. Där utvecklade och samordnade han utvecklingsplaner för grekiska kommuner. Han har även arbetat som forskningsassistent vid Sustainable Mobility Unit (Lab) på NTU i Aten och vid avdelningen för transportplanering på KTH.",
        languages: "Grekiska, engelska, svenska och italienska.",
        projects: "Resarö Mitt-projektet."
    }
};

// Team modal functionality
function openTeamModal(memberId) {
    const modal = document.getElementById('team-modal');
    const modalBody = document.getElementById('team-modal-body');
    const isSwedish = document.documentElement.lang === 'sv';
    const member = teamMembers[memberId];
    const localizedMember = isSwedish ? { ...member, ...swedishTeamMembers[memberId] } : member;
    const labels = isSwedish
        ? { qualifications: "Kvalifikationer", experience: "Erfarenhet", languages: "Språk", expertise: "Kompetensområden", projects: "Nyligen genomförda projekt" }
        : { qualifications: "Qualifications", experience: "Experience", languages: "Languages Spoken", expertise: "Expertise", projects: "Recent Projects" };
    
    if (member && localizedMember) {
        modalBody.innerHTML = `
            <div class="team-modal-header">
                <img src="${localizedMember.image}" alt="${localizedMember.name}">
                <h2>${localizedMember.name}</h2>
                <div class="role">${localizedMember.role}</div>
            </div>
            <div class="team-modal-body">
                <p>${localizedMember.bio}</p>
                
                ${localizedMember.qualifications ? `
                <h3>${labels.qualifications}</h3>
                <p>${localizedMember.qualifications}</p>
                ` : ''}
                
                ${localizedMember.experience ? `
                <h3>${labels.experience}</h3>
                <p>${localizedMember.experience}</p>
                ` : ''}
                
                ${localizedMember.languages ? `
                <h3>${labels.languages}</h3>
                <p>${localizedMember.languages}</p>
                ` : ''}
                
                <h3>${labels.expertise}</h3>
                <ul>
                    ${localizedMember.expertise.map(item => `<li>${item}</li>`).join('')}
                </ul>
                
                ${localizedMember.projects ? `<h3>${labels.projects}</h3><p>${localizedMember.projects}</p>` : ''}
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

document.addEventListener('DOMContentLoaded', function() {
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