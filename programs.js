document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVBAR (Mobile Burger Menu) ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    const navToggle = () => {
        if (navLinks && burger) {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            body.style.overflow = navLinks.classList.contains('nav-active') ? 'hidden' : 'auto';
        }
    };

    if (burger) {
        burger.addEventListener('click', navToggle);
    }

    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    navToggle();
                }
            });
        });
    }

    // --- 2. DYNAMIC PROGRAM LOADING ---
    const programContent = document.getElementById('program-content');
    const categoryLinks = document.querySelectorAll('.category-list .category-link');
    const loaderHTML = `<div class="loader-container" id="loader"><div class="spinner"></div></div>`;

    /**
     * Loads programs from a JSON file based on the category.
     * @param {string} category - The category name (e.g., "basic", "oop").
     */
    async function loadPrograms(category) {
        // Show loader
        programContent.innerHTML = loaderHTML;

        try {
            // Fetch the corresponding JSON file (e.g., "basic.json", "strings.json")
            const response = await fetch(`${category}.json`);
            
            // This check is crucial. If the file is not found (404), response.ok will be false.
            if (!response.ok) {
                throw new Error(`Could not find ${category}.json. File not found (404).`);
            }

            // This will fail if the file content is not valid JSON
            const programs = await response.json();
            
            // Clear loader
            programContent.innerHTML = ''; 

            if (programs.length === 0) {
                programContent.innerHTML = '<p class="no-match-msg">No programs found in this category yet. Check back soon!</p>';
                return;
            }

            // Build HTML for each program
            programs.forEach((program, index) => {
                const programElement = document.createElement('article');
                programElement.className = 'program-item';
                programElement.innerHTML = createProgramHTML(program, index + 1);
                programContent.appendChild(programElement);
            });

            // IMPORTANT: Tell Prism.js to highlight the new content
            Prism.highlightAll();

        } catch (error) {
            // This 'catch' block is what's running in your screenshot
            console.error('Error loading programs:', error);
            programContent.innerHTML = `<p class="no-match-msg">Error loading programs. Please try again later.</p>`;
        }
    }

    /**
     * Creates the inner HTML for a single program item.
     * @param {object} program - The program object from JSON.
     * @param {number} number - The 1-based index for numbering.
     */
    function createProgramHTML(program, number) {
        // Escape HTML special characters for code and output
        const escapedCode = escapeHTML(program.code);
        const escapedOutput = escapeHTML(program.output);

        // This JS code now correctly reads 'program.title'
        return `
            <h3 class="program-description-heading">${number}. ${program.title}</h3>

            <div class="code-output-container">
                <h4 class="program-heading">
                    <span>Code</span>
                    <button class="copy-btn"><ion-icon name="copy-outline"></ion-icon> Copy</button>
                </h4>
                <!-- Prism.js requires the class "language-java" -->
                <pre><code class="language-java">${escapedCode}</code></pre>
            </div>

            <div class="code-output-container">
                <h4 class="program-heading">Output</h4>
                <div class="output-box">${escapedOutput}</div>
            </div>
        `;
    }

    /**
     * Escapes HTML to prevent XSS and rendering issues.
     * @param {string} str - The string to escape.
     */
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }


    // --- 3. EVENT LISTENERS ---

    // Listen for clicks on sidebar links
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const category = link.dataset.category;
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Load the programs
            loadPrograms(category);
        });
    });

    // Listen for "Copy" button clicks (using event delegation)
    programContent.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('.copy-btn');
        
        if (copyBtn && !copyBtn.classList.contains('copied')) {
            // Find the code block
            const pre = copyBtn.closest('.code-output-container').querySelector('pre');
            if (!pre) return;
            
            const code = pre.innerText; // .innerText gets the text as rendered

            // Use the clipboard fallback from the main prompt
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = code;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            
            try {
                document.execCommand('copy');
                
                // Visual feedback
                const originalHtml = copyBtn.innerHTML;
                copyBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalHtml;
                    copyBtn.classList.remove('copied');
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text: ', err);
            }

            document.body.removeChild(tempTextArea);
        }
    });

    // --- 4. INITIAL LOAD ---
    // Load the 'basic' category by default when the page starts
    loadPrograms('basic');
});            </div>
        `;
    }

    /**
     * Escapes HTML to prevent XSS and rendering issues.
     * @param {string} str - The string to escape.
     */
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }


    // --- 3. EVENT LISTENERS ---

    // Listen for clicks on sidebar links
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const category = link.dataset.category;
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Load the programs
            loadPrograms(category);
        });
    });

    // Listen for "Copy" button clicks (using event delegation)
    programContent.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('.copy-btn');
        
        if (copyBtn && !copyBtn.classList.contains('copied')) {
            // Find the code block
            const pre = copyBtn.closest('.code-output-container').querySelector('pre');
            if (!pre) return;
            
            const code = pre.innerText; // .innerText gets the text as rendered

            // Use the clipboard fallback from the main prompt
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = code;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            
            try {
                document.execCommand('copy');
                
                // Visual feedback
                const originalHtml = copyBtn.innerHTML;
                copyBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalHtml;
                    copyBtn.classList.remove('copied');
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text: ', err);
                // You could show an error message to the user here
            }

            document.body.removeChild(tempTextArea);
        }
    });

    // --- 4. INITIAL LOAD ---
    // Load the 'basic' category by default when the page starts
    loadPrograms('basic');
});
