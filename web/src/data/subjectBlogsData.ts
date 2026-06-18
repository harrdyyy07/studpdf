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
