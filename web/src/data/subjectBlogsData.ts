export interface SubjectBlog {
    subjectCode: string;
    title: string;
    description: string;
    content: string;
    faqs?: { question: string; answer: string; }[];
}

export const subjectBlogs: Record<string, SubjectBlog> = {
    // 1. Calculus and Linear Algebra (1BMATS101)
    "1BMATS101": {
        subjectCode: "1BMATS101",
        title: "How to Score High in VTU 1BMATS101 Calculus & Linear Algebra",
        description: "Ace your VTU 1BMATS101 exams. Read our module-by-module study strategy, passing marks analysis, and important linear algebra tips.",
        content: `
            <p>Mathematics is often considered the most challenging subject in the VTU First Year engineering cycle. For CSE stream students, <strong>Calculus and Linear Algebra (1BMATS101)</strong> forms the mathematical foundation for computer science topics like graphics, machine learning, and cryptography. With a structured approach, you can pass this subject with ease and even score a perfect 90+ score.</p>
            
            <h2>VTU 1BMATS101 Passing Marks Criteria</h2>
            <p>Before diving into your preparation, be clear about the scoring targets:</p>
            <ul>
                <li><strong>Internals (CIE):</strong> Evaluated for 50 marks. You must secure a minimum of 20 marks (40%) to qualify for the final exams.</li>
                <li><strong>Externals (SEE):</strong> The final paper is for 100 marks (scaled to 50). You need a minimum of 35 marks on the paper to clear the threshold.</li>
                <li><strong>Aggregate:</strong> Your combined CIE + SEE score must be at least 40% to pass the course.</li>
            </ul>

            <h2>Module-Wise Important Topics & Strategy</h2>
            
            <h3>Module 1: Calculus</h3>
            <p>This module focuses on polar curves, angle between polar curves, radius of curvature, and pedal equations. These are highly formula-driven questions.</p>
            <p><strong>Key Focus:</strong> Memorize the formulas for radius of curvature in Cartesian and polar forms. Solving 2-3 standard derivations for pedal equations is essential as they are frequently repeated in exams.</p>

            <h3>Module 2: Power Series and Multivariable Calculus</h3>
            <p>Here, you'll encounter Taylor's and Maclaurin's series expansions, along with partial derivatives and Jacobians.</p>
            <p><strong>Key Focus:</strong> Standard expansions for e^x, sin(x), cos(x), and log(1+x) are crucial. Practice Jacobian problems as they are highly scoring and relatively simple once you understand the partial differentiation rules.</p>

            <h3>Module 3: First-Order Ordinary Differential Equations (ODEs)</h3>
            <p>This module covers linear differential equations, Bernoulli's equations, and exact differential equations.</p>
            <p><strong>Key Focus:</strong> Learn to identify the type of ODE quickly. Converting Bernoulli's equations into linear form is a classic 7-mark question that you should practice thoroughly.</p>

            <h3>Module 4: Higher-Order Linear Differential Equations</h3>
            <p>Solving homogeneous and non-homogeneous linear differential equations using inverse differential operators.</p>
            <p><strong>Key Focus:</strong> Master the methods of finding the Complementary Function (CF) and Particular Integral (PI) for different cases (exponential, trigonometric, and polynomial functions).</p>

            <h3>Module 5: Linear Algebra</h3>
            <p>Covers systems of linear equations, rank of a matrix, Gauss elimination, Gauss-Seidel iteration, and eigenvalues/eigenvectors.</p>
            <p><strong>Key Focus:</strong> Linear Algebra is the most scoring part of the syllabus. Gauss-Seidel numerical iteration is almost guaranteed to appear. Practice this method to ensure you don't make calculation mistakes under exam pressure.</p>

            <h2>3 Steps to Score a 9+ SGPA in Maths</h2>
            <ol>
                <li><strong>Create a Formula Cheat Sheet:</strong> Write down all formulas for polar curves, differential equations, and expansions on a single sheet of paper for quick review.</li>
                <li><strong>Solve the Model Papers:</strong> VTU-issued Model Question Papers (MQPs) closely mirror the final exam structure. Try solving at least two MQPs within a 3-hour limit.</li>
                <li><strong>Show All Steps:</strong> Math evaluators assign partial marks for correct steps. Even if you aren't sure of the final numerical answer, write down the initial formula and steps clearly.</li>
            </ol>
        `,
        faqs: [
            {
                question: "Is 1BMATS101 hard to pass in VTU?",
                answer: "It can be challenging if you study without a plan, but Module 5 (Linear Algebra) and Module 1 (Polar Curves) are highly scoring and can easily help you cross the passing threshold."
            },
            {
                question: "How many iterations should I perform in Gauss-Seidel method?",
                answer: "Usually, performing 3 to 4 iterations is sufficient to achieve accuracy up to three decimal places, unless a specific number of iterations is requested in the question."
            },
            {
                question: "Where can I find previous year solved papers for 1BMATS101?",
                answer: "You can access solved question papers, handwritten class notes, and syllabus PDFs for free under the modules section on this page."
            }
        ]
    },

    // 2. Python Programming (1BPLC105B/205B)
    "1BPLC105B/205B": {
        subjectCode: "1BPLC105B/205B",
        title: "VTU Python Programming (1BPLC105B/205B) Exam Preparation Guide",
        description: "Get the ultimate study guide for VTU Python Programming 1BPLC105B/205B. Learn important codes, string manipulations, lists, dictionaries, and theory questions.",
        content: `
            <p>Python Programming has become a core subject for first-year engineering students across VTU schemes. Designed as an introduction to software logic, <strong>Python Programming (1BPLC105B/205B)</strong> is both highly practical and scoring. If you understand basic syntax, conditional blocks, and data structures, you can easily secure an 'O' or 'S' grade.</p>

            <h2>Python passing marks breakdown</h2>
            <p>Evaluation metrics are standard: 50 marks for Continuous Internal Evaluation (CIE) and 100 marks for Semester End Examination (SEE). You must score at least 20 in CIE and 35 in SEE to pass, while achieving an overall 40% aggregate.</p>

            <h2>Module-Wise Critical Concepts</h2>

            <h3>Module 1: Python Basics & Control Flow</h3>
            <p>Introduces variables, basic operators, loops (for, while), and conditional statements (if, elif, else).</p>
            <p><strong>Important Questions:</strong> Explain the difference between 'break' and 'continue' statements with code examples. Write a Python program to find prime numbers in a range or print Fibonacci series.</p>

            <h3>Module 2: Functions, Lists & Tuples</h3>
            <p>Understanding function definitions, local/global scope, lists, and tuple data structures.</p>
            <p><strong>Important Questions:</strong> Explain list methods (append, insert, pop, remove) with examples. How are tuples different from lists? Write a program to sort or search items in a list.</p>

            <h3>Module 3: Dictionaries & Structuring Data</h3>
            <p>Working with dictionaries, nested structures, and basic string operations.</p>
            <p><strong>Important Questions:</strong> Explain dictionary methods (keys, values, items, get). Write a program to count character occurrences in a string using dictionaries.</p>

            <h3>Module 4: Pattern Matching, Regular Expressions & File I/O</h3>
            <p>Using the 're' module for search patterns, and reading/writing text files.</p>
            <p><strong>Important Questions:</strong> Write a Python program to extract email addresses or phone numbers from a text file using regular expressions. Explain open(), read(), write(), and close() file operations.</p>

            <h3>Module 5: Debugging, Web Scraping & Working with CSV/JSON Files</h3>
            <p>Covers debugging tools, handling JSON/CSV data, and basic web requests using the 'requests' and 'BeautifulSoup' libraries.</p>
            <p><strong>Important Questions:</strong> Write a program to parse a JSON response. What is web scraping, and how do you implement it in Python? Explain try-except blocks for error handling.</p>

            <h2>Top Exam Presentation Tips for Python</h2>
            <ul>
                <li><strong>Write Code in Every Answer:</strong> For coding papers, code blocks are mandatory. Even if the question asks for a theory explanation, write a short 3-line Python code snippet to demonstrate the concept.</li>
                <li><strong>Add Comments:</strong> Adding hash comments (#) to explain your code steps shows the evaluator that your logical foundation is solid.</li>
                <li><strong>Indentation Matters:</strong> Python relies heavily on indentation. Draw small boxes or spaces to clearly represent loops and function blocks in your written answer sheet.</li>
            </ul>
        `,
        faqs: [
            {
                question: "Does VTU evaluate Python indentation strictly in theory exams?",
                answer: "Yes, improper indentation in written answers can lead to loss of marks as it alters Python logic. Make sure to visually indent loops, conditionals, and functions."
            },
            {
                question: "Do we need to write programs for lab experiments in theory exams?",
                answer: "Yes, many questions in the final theory paper are directly adapted from the Python lab syllabus, so practice your lab programs thoroughly."
            },
            {
                question: "What is the best way to study Python logic if I am from a non-CS branch?",
                answer: "Start by practicing basic concepts online. Code them yourself to see runtime errors, then check our module notes to see how to write them in theory papers."
            }
        ]
    },

    // 3. Quantum Physics and Applications (1BPHYS102/202)
    "1BPHYS102/202": {
        subjectCode: "1BPHYS102/202",
        title: "VTU Quantum Physics & Applications (1BPHYS102/202) Exam Study Guide",
        description: "Study smarter for VTU 1BPHYS102/202 Quantum Physics. Read our module breakdowns, important derivations, and superconductivity prep tips.",
        content: `
            <p>First-year physics in VTU has evolved. Under the current schemes, <strong>Quantum Physics and Applications (1BPHYS102/202)</strong> is structured to introduce engineering students to modern semiconductor physics, lasers, and quantum computing. Since this subject involves complex derivations and numerical calculations, structured study is crucial to passing.</p>

            <h2>How to Prepare for Physics Derivations</h2>
            <p>Derivations make up nearly 50% of the theory marks. Practice writing them multiple times before the exam, focusing on variables, integration limits, and assumptions.</p>

            <h2>Module-Wise Syllabus Highlights</h2>

            <h3>Module 1: Quantum Mechanics</h3>
            <p>Covers de Broglie hypothesis, Heisenberg uncertainty principle, Schrödinger's time-independent wave equation, and particle in a one-dimensional box.</p>
            <p><strong>Key Derivation:</strong> Derivation of Schrödinger's 1D wave equation and calculating energy eigenvalues for a particle in an infinite potential well.</p>

            <h3>Module 2: Electrical Properties of Metals & Semiconductors</h3>
            <p>Classical free electron theory, Fermi-Dirac distribution, and intrinsic/extrinsic semiconductor carrier concentration.</p>
            <p><strong>Key Derivation:</strong> Fermi energy expression, electrical conductivity in metals, and Hall effect coefficient derivation.</p>

            <h3>Module 3: Superconductivity & Lasers</h3>
            <p>Meissner effect, Type-I and Type-II superconductors, BCS theory, Einstein coefficients, and Semiconductor Lasers.</p>
            <p><strong>Key Derivation:</strong> Relationship between Einstein coefficients, and Meissner effect mathematical condition.</p>

            <h3>Module 4: Photonics & Optical Fibers</h3>
            <p>Optical fibers, numerical aperture, attenuation, and photo-detectors.</p>
            <p><strong>Key Derivation:</strong> Expression for Numerical Aperture (NA) and Acceptance Angle of an optical fiber.</p>

            <h3>Module 5: Quantum Computing</h3>
            <p>Qubits, superposition, quantum entanglement, quantum gates (single and multi-qubit gates), and quantum search algorithms.</p>
            <p><strong>Key Topics:</strong> Explanation of Bloch sphere, difference between classical bits and qubits, and operation of basic quantum gates (Hadamard, CNOT).</p>

            <h2>Numerical Preparation Advice</h2>
            <p>Every module will contain a 5-mark numerical problem. Keep a handy list of physical constants (Planck's constant, speed of light, mass of electron) and practice converting units (e.g., electron-volts to Joules) to avoid simple mathematical mistakes.</p>
        `,
        faqs: [
            {
                question: "Which derivations are most important in VTU Quantum Physics?",
                answer: "Schrödinger's 1D wave equation, particle in a box energy equations, Numerical Aperture of an optical fiber, and the Hall coefficient derivation are the most common."
            },
            {
                question: "How do I study Quantum Computing (Module 5) easily?",
                answer: "Since this is a theoretical and conceptual module, focus on standard definitions (qubits, entanglement, superposition) and draw representation diagrams like the Bloch Sphere."
            },
            {
                question: "Can I use a scientific calculator in the exam?",
                answer: "Yes, non-programmable scientific calculators are permitted and highly necessary for numerical calculations in physics exams."
            }
        ]
    }
};

/**
 * Normalizes a subject code by making it uppercase, trimming whitespace, and removing spaces/special symbols
 */
function normalizeCode(code: string): string {
    return code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/**
 * Returns a custom subject blog, or generates a dynamic fallback blog for SEO based on the subject info.
 */
export function getSubjectBlog(subjectCode: string, subjectName: string, modules: any[]): SubjectBlog {
    const cleanCode = normalizeCode(subjectCode);
    
    // Find custom blog matching code
    const customKey = Object.keys(subjectBlogs).find(key => normalizeCode(key) === cleanCode);
    
    if (customKey && subjectBlogs[customKey]) {
        return subjectBlogs[customKey];
    }
    
    // Generates high-quality fallback study guide if not found
    const title = `VTU ${subjectName} (${subjectCode.trim()}) Notes, Question Papers & Study Guide | VTUwise`;
    const description = `Download syllabus-aligned VTU notes and model question papers for ${subjectName} (${subjectCode.trim()}). Learn the passing marks, module breakdown, and exam study tips.`;
    
    let moduleBreakdownHtml = '';
    if (modules && modules.length > 0) {
        moduleBreakdownHtml = `
            <h2>Syllabus & Module-Wise Breakdown</h2>
            <p>Here is an overview of the key topics and modules covered in the VTU curriculum for ${subjectName} (${subjectCode}):</p>
            <div class="syllabus-modules-list">
        `;
        
        // Filter notes/syllabus modules for breakdown
        const notesModules = modules.filter(m => m.type?.toLowerCase() === 'notes' || m.type?.toLowerCase() === 'syllabus');
        const displayModules = notesModules.length > 0 ? notesModules : modules;
        
        displayModules.forEach((mod) => {
            moduleBreakdownHtml += `
                <div class="syllabus-module-item">
                    <h3>${mod.name}</h3>
                    <p>${mod.desc || `Access comprehensive study materials, notes, and definitions for ${mod.name} to strengthen your subject understanding.`}</p>
                </div>
            `;
        });
        
        moduleBreakdownHtml += `</div>`;
    }
    
    const content = `
        <p>Visvesvaraya Technological University (VTU) examinations for <strong>${subjectName}</strong> (Subject Code: <strong>${subjectCode}</strong>) require a systematic study approach. With a vast syllabus and strict evaluation standards, students must combine conceptual clarity with strategic exam preparation.</p>
        
        <h2>VTU Passing Criteria for ${subjectCode}</h2>
        <p>To successfully pass this subject under the university guidelines, you must understand the two parts of your evaluation:</p>
        <ul>
            <li><strong>Continuous Internal Evaluation (CIE):</strong> Internals are worth 50 marks. You must secure a minimum of 40% (20 marks) in CIE to remain eligible to write the final Semester End Examination.</li>
            <li><strong>Semester End Examination (SEE):</strong> The final theory exam is conducted for 100 marks and scaled down. You need a minimum score of 35% (35 out of 100 marks) in this paper to pass.</li>
            <li><strong>Total Aggregate:</strong> Your combined score (CIE scaled + SEE scaled) must be at least 40% to clear the course.</li>
        </ul>
        
        ${moduleBreakdownHtml}
        
        <h2>Recommended Study Strategy</h2>
        <p>To score well and clear ${subjectName} without academic backlogs, follow this simple high-yield preparation blueprint:</p>
        <ol>
            <li><strong>Identify High-Weightage Modules:</strong> Focus heavily on three modules that align with your strengths. Mastering 3 out of 5 modules ensures you can write answers worth at least 60 marks with high confidence.</li>
            <li><strong>Practice Previous Year Question Papers (PYQPs):</strong> VTU exam questions frequently follow repeating structural patterns. Practicing 3 to 5 years of past exam papers is the single most effective way to identify critical derivations and theory questions.</li>
            <li><strong>Fulfill Presentation Standards:</strong> Evaluators review hundreds of papers. To capture maximum marks, write structured bullet points, draw clean block diagrams, and highlight final answers and formulas.</li>
        </ol>
        
        <p>Start downloading the verified study notes and solved papers listed above to begin your semester preparation.</p>
    `;
    
    const faqs = [
        {
            question: `What are the passing marks for ${subjectName} in VTU?`,
            answer: `You need a minimum of 35% (35 marks out of 100) in the Semester End Exam (SEE) and an overall combined aggregate of 40% (CIE + SEE scaled) to pass the subject.`
        },
        {
            question: `Where can I find VTU notes and question papers for ${subjectCode}?`,
            answer: `You can download syllabus-aligned, module-wise notes, model question papers, and past question papers for ${subjectName} (${subjectCode}) directly on this page for free.`
        },
        {
            question: `How many credits does ${subjectName} carry?`,
            answer: `Under VTU schemes, engineering subjects typically carry 3 or 4 credits. Check the top of this page for the exact credit allocation for ${subjectName}.`
        }
    ];
    
    return {
        subjectCode,
        title,
        description,
        content,
        faqs
    };
}

export interface BranchBlog {
    title: string;
    description: string;
    content: string;
    faqs?: { question: string; answer: string; }[];
}

export interface SemesterBlog {
    title: string;
    description: string;
    content: string;
    faqs?: { question: string; answer: string; }[];
}

export function getBranchBlog(branchCode: string, branchTitle: string, semesters?: any[], schemes?: any[]): BranchBlog {
    const title = `${branchTitle} VTU Notes, Syllabus & Passing Guides | VTUwise`;
    const description = `Download complete VTU notes, past question papers, and syllabus for all semesters of ${branchTitle}. Find structural study guides and passing strategies.`;
    
    let structureHtml = '';
    if (semesters && semesters.length > 0) {
        structureHtml += `
            <h2>Course Structure & Semesters</h2>
            <p>The ${branchTitle} program is organized into ${semesters.length} semesters. Each semester covers fundamental and advanced engineering concepts:</p>
            <ul>
        `;
        semesters.forEach((sem: any) => {
            structureHtml += `
                <li><strong>Semester ${sem.sem}:</strong> Focuses on ${sem.subjects.length} core and elective subjects including notes, question papers, and lab manuals.</li>
            `;
        });
        structureHtml += `</ul>`;
    }

    const content = `
        <p>Studying <strong>${branchTitle} (${branchCode.toUpperCase()})</strong> under Visvesvaraya Technological University (VTU) requires consistent effort and a structured approach. The engineering curriculum is designed to build a solid foundation of theoretical principles paired with hands-on laboratory experience. To support your studies, VTUwise compiles all essential resources into a single dashboard.</p>
        
        <h2>VTU Passing Rules and Evaluation</h2>
        <p>VTU employs the Choice Based Credit System (CBCS) across its schemes (2018, 2021, and the latest 2022 scheme). To pass any theory course in ${branchTitle}:</p>
        <ul>
            <li><strong>Continuous Internal Evaluation (CIE):</strong> Secure at least 40% (20 out of 50 marks) in internal college assessments to remain eligible to write final exams.</li>
            <li><strong>Semester End Examination (SEE):</strong> Score at least 35% (35 out of 100 marks) in the final university theory exam.</li>
            <li><strong>Overall Passing Aggregate:</strong> Your total CIE and SEE combined score must be at least 40% of the total marks.</li>
        </ul>

        ${structureHtml}

        <h2>Study Tips for ${branchTitle} Students</h2>
        <ol>
            <li><strong>Start Early with Core Subjects:</strong> High-credit courses like core programming, hardware circuits, and structural design require early conceptual learning. Do not leave them for the last week.</li>
            <li><strong>Reference Official Syllabus:</strong> Always verify topics against the official VTU syllabus. This keeps you focused on high-yield exam sections.</li>
            <li><strong>Practice Past 5 Years Papers:</strong> Evaluators tend to repeat structural math and derivation patterns. Solving previous year papers helps you build speed and presentation style.</li>
        </ol>
    `;

    const faqs = [
        {
            question: `How many semesters are there in VTU ${branchTitle}?`,
            answer: `There are 8 semesters (4 years) in the Bachelor of Engineering (B.E.) program for ${branchTitle} under Visvesvaraya Technological University.`
        },
        {
            question: `Where can I download notes and question papers for VTU ${branchTitle}?`,
            answer: `VTUwise offers semester-wise and subject-wise notes, model papers, and solved question papers for all branches including ${branchTitle} completely for free.`
        },
        {
            question: `How does VTU calculate CGPA for ${branchCode.toUpperCase()}?`,
            answer: `VTU calculates CGPA based on the SGPA (Semester Grade Point Average) of each individual semester weighted against course credits. You can use our SGPA/CGPA Calculators in the main menu for precise calculations.`
        }
    ];

    return { title, description, content, faqs };
}

export function getSemesterBlog(branchCode: string, branchTitle: string, semNum: number, subjects: any[]): SemesterBlog {
    const title = `Semester ${semNum} - ${branchTitle} VTU Notes & Study Guide | VTUwise`;
    const description = `Download syllabus-aligned VTU notes and solved question papers for ${branchTitle} Semester ${semNum}. Read study strategies for core subjects.`;

    let subjectsListHtml = '';
    if (subjects && subjects.length > 0) {
        subjectsListHtml = `
            <h2>Syllabus Overview for Semester ${semNum}</h2>
            <p>Here are the primary subjects you will study this semester. Click on any subject card above to download module-wise resources:</p>
            <ul>
        `;
        subjects.forEach((sub: any) => {
            subjectsListHtml += `
                <li><strong>${sub.name} (${sub.code})</strong>: ${sub.credits || '3/4 Credits'} subject. Focuses on core concepts and structural applications.</li>
            `;
        });
        subjectsListHtml += `</ul>`;
    }

    const content = `
        <p>Welcome to <strong>Semester ${semNum}</strong> of <strong>${branchTitle}</strong> engineering under Visvesvaraya Technological University (VTU). This semester introduces crucial core subjects that serve as direct prerequisites for your engineering projects and placement drives.</p>
        
        ${subjectsListHtml}

        <h2>Study Guide & Passing Strategy for Sem ${semNum}</h2>
        <p>Success in Semester ${semNum} requires balancing theory derivations with practical lab tasks. Follow these key steps:</p>
        <ol>
            <li><strong>Analyze Credit Weightage:</strong> Allocate more time to subjects carrying 4 credits, as they affect your SGPA calculations the most.</li>
            <li><strong>Master CIE Internals early:</strong> Securing 30+ marks in internals significantly reduces the pressure to score high on the 100-mark Semester End Exam (SEE).</li>
            <li><strong>Utilize Module-wise Notes:</strong> Rather than reading heavy textbooks last minute, study with verified, structured notes divided precisely by syllabus modules.</li>
        </ol>
    `;

    const faqs = [
        {
            question: `How many subjects are in VTU ${branchTitle} Semester ${semNum}?`,
            answer: `Typically, a semester contains 5 to 7 theory subjects along with laboratory classes and seminar sessions. Check the subjects list above for the exact list.`
        },
        {
            question: `What is the passing criteria for 4-credit subjects in Semester ${semNum}?`,
            answer: `The passing criteria is identical for all credit courses: a minimum of 40% in Continuous Internal Evaluation (20/50 marks) and 35% in Semester End Examination (35/100 marks), with an overall 40% aggregate.`
        },
        {
            question: `Where can I get previous year papers for Semester ${semNum}?`,
            answer: `You can access past papers and model question papers by clicking on each subject card listed on this page.`
        }
    ];

    return { title, description, content, faqs };
}

export function getCycleBlog(branchCode: string, branchTitle: string, schemeSlug: string, cycleName: string, subjects: any[]): SemesterBlog {
    const title = `${cycleName} - ${schemeSlug.toUpperCase()} Scheme VTU Notes | VTUwise`;
    const description = `VTU Notes and resources for First Year ${cycleName} under the ${schemeSlug.toUpperCase()} scheme. Download syllabus-aligned study guides.`;

    let subjectsListHtml = '';
    if (subjects && subjects.length > 0) {
        subjectsListHtml = `
            <h2>Syllabus Overview for ${cycleName}</h2>
            <p>Here are the primary subjects covered in this first-year cycle. Click on any subject card above to download module-wise resources:</p>
            <ul>
        `;
        subjects.forEach((sub: any) => {
            subjectsListHtml += `
                <li><strong>${sub.name} (${sub.code})</strong>: A key credit subject in the engineering foundation curriculum.</li>
            `;
        });
        subjectsListHtml += `</ul>`;
    }

    const content = `
        <p>Welcome to the first year of engineering. The <strong>${cycleName}</strong> under the <strong>${schemeSlug.toUpperCase()} Scheme</strong> at Visvesvaraya Technological University (VTU) is designed to establish a solid foundation in basic mathematics, sciences, and fundamental engineering concepts.</p>
        
        ${subjectsListHtml}

        <h2>Tips for First-Year Engineering Students</h2>
        <p>First-year cycles can be a transition challenge for many students. Here is how to navigate it successfully:</p>
        <ol>
            <li><strong>Understand the Cycle Split:</strong> Students are split into Physics Cycle and Chemistry Cycle. Make sure you are downloading the correct notes for your current term.</li>
            <li><strong>Focus on Basics:</strong> Concepts learned in Calculus, Elements of Mechanical Engineering, and Basic Electronics will return in later years of your branch.</li>
            <li><strong>Use Solved Model Papers:</strong> VTU issues model question papers specifically for new schemes. They are the best way to understand the question paper patterns.</li>
        </ol>
    `;

    const faqs = [
        {
            question: `What is the difference between P-Cycle and C-Cycle in VTU?`,
            answer: `P-Cycle (Physics Cycle) and C-Cycle (Chemistry Cycle) divide first-year engineering students to distribute lab load. One half of the students studies the Physics subjects in the first semester while the other half studies the Chemistry subjects, and they swap in the second semester.`
        },
        {
            question: `Is first-year marks included in final CGPA?`,
            answer: `Yes, under all VTU choice-based credit schemes, the marks/grades you secure in the first year (both semesters) are fully included in the calculation of your final CGPA.`
        }
    ];

    return { title, description, content, faqs };
}
