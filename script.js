// Navbar and dashboard logic
function renderNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.innerHTML = `
        <div class="logo"><a href="home.html" style="color:#fff;text-decoration:none;">HOSTELHUB</a></div>
        <div class="nav-links">
            <a href="about.html">About Us</a>
            <a href="terms.html">Terms</a>
            <a href="help.html">Help & FAQs</a>
            <a href="hostels.html">Available Hostels</a>
            <a href="bookings.html">Bookings</a>
            <a href="login.html" id="loginNav">Login/Register</a>
            <span id="dashboardIcon" style="cursor:pointer; margin-left:18px;">
                <img src="MTN LOGO.png" alt="Dashboard" style="width:32px;height:32px;border-radius:50%;vertical-align:middle;">
            </span>
        </div>
        <div id="dashboardMenu" style="display:none;position:absolute;right:40px;top:70px;background:#fff;color:#222;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.15);padding:18px 24px;z-index:2000;">
            <ul style="list-style:none;padding:0;margin:0;">
                <li><a href="about.html">About Us</a></li>
                <li><a href="terms.html">Terms & Conditions</a></li>
                <li><a href="help.html">Help & FAQs</a></li>
                <li><a href="hostels.html">Available Hostels</a></li>
                <li><a href="bookings.html">Bookings</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><button id="userLogoutBtn" style="background:#ff4d4d;color:#fff;border:none;border-radius:8px;padding:6px 16px;cursor:pointer;">Logout</button></li>
            </ul>
        </div>
    `;
    document.getElementById('dashboardIcon').onclick = function(e) {
        e.stopPropagation();
        const menu = document.getElementById('dashboardMenu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    };
    document.body.onclick = function(e) {
        const menu = document.getElementById('dashboardMenu');
        if (menu) menu.style.display = 'none';
    };
    const logoutBtn = document.getElementById('userLogoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        };
    }
}

// Footer logic
function renderFooter() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    footer.innerHTML = `
        <div class="footer-links">
            <a href="https://wa.me/256700000000" target="_blank" title="WhatsApp"><span>📱</span> WhatsApp</a>
            <a href="contact.html" title="Message"><span>💬</span> Message</a>
            <a href="mailto:ampfreytukwasibwe@gmail.com" title="Email"><span>✉️</span> <span class="email-span">ampfreytukwasibwe@gmail.com</span></a>
            <a href="https://twitter.com/yourprofile" target="_blank" title="Twitter"><span>🐦</span> Twitter</a>
            <a href="https://x.com/yourprofile" target="_blank" title="X"><span>❌</span> X</a>
        </div>
        <div>&copy; 2024 Hostelhub. All rights reserved.</div>
    `;
}

// Hostel data
const HOSTELS = [
    {id:1, name:'Sunrise Hostel', type:'single', location:'Kashanyaraze', distance:'500m', price:300000, img:'download(2).jpeg'},
    {id:2, name:'Green Villa', type:'double', location:'Kashanyaraze', distance:'700m', price:250000, img:'download (2).jpeg'},
    {id:3, name:'Elite Suites', type:'self-contained', location:'Kashanyaraze', distance:'400m', price:400000, img:'download (2).jpeg'},
    {id:4, name:'Campus View', type:'single', location:'Kashanyaraze', distance:'600m', price:320000, img:'download(2).jpeg'},
    {id:5, name:'City Lodge', type:'double', location:'Kashanyaraze', distance:'800m', price:270000, img:'download (2).jpeg'},
    {id:6, name:'Royal Residence', type:'self-contained', location:'Kashanyaraze', distance:'300m', price:420000, img:'download (2).jpeg'}
];

function getHostels() {
    try {
        const h = JSON.parse(localStorage.getItem('hostels'));
        if (Array.isArray(h) && h.length > 0) return h;
    } catch {}
    return HOSTELS;
}

// Render hostel grid
function renderHostelGrid(filterType = 'all') {
    const grid = document.getElementById('hostelGrid');
    if (!grid) return;
    let hostels = getHostels();
    // Only show available hostels to users
    hostels = hostels.filter(h => (h.status || 'Available') === 'Available');
    if (filterType !== 'all') hostels = hostels.filter(h => h.type === filterType);
    
    grid.innerHTML = hostels.map((h, idx) => `
        <div class="hostel-card" tabindex="0" style="box-shadow:0 2px 12px rgba(69,43,31,0.08);transition:box-shadow 0.2s,transform 0.2s;">
            <a href="${(h.imgs && h.imgs.length) ? h.imgs[0] : (h.imgData || h.img)}" target="_blank" title="Open image in new tab">
                <img src="${(h.imgs && h.imgs.length) ? h.imgs[0] : (h.imgData || h.img)}" alt="${h.name}" title="${h.name}" style="box-shadow:0 2px 8px rgba(0,0,0,0.08);transition:box-shadow 0.2s;">
            </a>
            <div class="info">
                <div class="name">${h.name}</div>
                <div class="details">LOCATION: ${h.location}<br>Distance: ${h.distance}</div>
                <div class="price">UGX ${h.price.toLocaleString()}</div>
                <div style="display:flex;gap:8px;margin-top:8px;">
                    <button onclick="bookHostel(${idx})" title="Book this hostel" class="book-btn" tabindex="0" style="flex:1;transition:background 0.2s,box-shadow 0.2s;box-shadow:0 2px 8px rgba(255,77,77,0.08);">Book</button>
                    <button onclick="viewLocation(${idx})" title="View hostel location" class="view-location-btn" tabindex="0" style="flex:1;background:#2b6cb0;border-radius:8px;padding:8px 12px;border:none;color:#fff;">View Location</button>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.hostel-card').forEach(card => {
        card.onfocus = card.onmouseover = function(){ this.style.boxShadow='0 4px 24px rgba(255,77,77,0.18)'; this.style.transform='scale(1.02)'; };
        card.onblur = card.onmouseout = function(){ this.style.boxShadow='0 2px 12px rgba(69,43,31,0.08)'; this.style.transform='scale(1)'; };
    });
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.onfocus = btn.onmouseover = function(){ this.style.background='#ff4d4d'; this.style.boxShadow='0 2px 12px rgba(255,77,77,0.18)'; };
        btn.onblur = btn.onmouseout = function(){ this.style.background='#452B1F'; this.style.boxShadow='0 2px 8px rgba(255,77,77,0.08)'; };
    });
}

function filterHostels(type) {
    renderHostelGrid(type);
}

// Booking logic
function bookHostel(idx) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('You must be logged in to book a hostel.');
        window.location.href = 'login.html';
        return;
    }
    const hostels = getHostels();
    const hostel = hostels[idx];
    if (!hostel) return;

    let spinner = document.getElementById('bookingSpinner');
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.id = 'bookingSpinner';
        spinner.style = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);border:6px solid #eee;border-top:6px solid #452B1F;border-radius:50%;width:48px;height:48px;animation:spin 1s linear infinite;z-index:3000;';
        spinner.innerHTML = '';
        document.body.appendChild(spinner);
    }
    spinner.style.display = 'block';
    setTimeout(function() {
        const imgSrc = (hostel.imgs && hostel.imgs[0]) || hostel.imgData || hostel.img || '';
        function toDataUrl(src) {
            return new Promise(resolve => {
                if (!src || src.startsWith('data:')) return resolve(src||'');
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = function(){
                    try {
                        const c = document.createElement('canvas');
                        c.width = img.naturalWidth; c.height = img.naturalHeight;
                        const ctx = c.getContext('2d');
                        ctx.drawImage(img,0,0);
                        const data = c.toDataURL('image/png');
                        resolve(data);
                    } catch { resolve(src); }
                };
                img.onerror = function(){ resolve(src); };
                img.src = src;
            });
        }
        toDataUrl(imgSrc).then(function(realImg){
            let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            bookings.push({
                name: hostel.name,
                id: hostel.id || null,
                type: hostel.type,
                location: hostel.location,
                distance: hostel.distance,
                price: hostel.price,
                img: realImg,
                user: loggedInUser,
                status: 'Pending Payment'
            });
            localStorage.setItem('bookings', JSON.stringify(bookings));

            // Mark hostel unavailable globally
            let allHostels = getHostels();
            const hIdx = allHostels.findIndex(h => h.name === hostel.name && h.location === hostel.location);
            if (hIdx >= 0) {
                allHostels[hIdx].status = 'Unavailable';
                localStorage.setItem('hostels', JSON.stringify(allHostels));
            }
            spinner.style.display = 'none';
            window.location.href = 'bookings.html';
        });
    }, 700);
}

function renderBookings() {
    const bookingsList = document.getElementById('bookingsList');
    if (!bookingsList) return;
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p>No bookings yet.</p>';
        return;
    }
    bookingsList.innerHTML = bookings.map((b, i) => `
        <div class="hostel-card">
            <img src="${b.img}" alt="${b.name}">
            <div class="info">
                <div class="name">${b.name}</div>
                <div class="details">LOCATION: ${b.location}<br>Distance: ${b.distance}</div>
                <div class="price">UGX ${b.price.toLocaleString()}</div>
                <div style="display:flex;gap:8px;">
                    <button onclick="payForBooking(${i})">Pay</button>
                    <button onclick="deleteBooking(${i})" style="background:#999;">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Payment logic
function payForBooking(index) {
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    if (!bookings[index]) return;

    localStorage.setItem('payIndex', index);
    localStorage.setItem('payHostelName', bookings[index].name);
    if (bookings[index].id) localStorage.setItem('payHostelId', String(bookings[index].id));
    if (bookings[index].img) {
        localStorage.setItem('payHostelImg', bookings[index].img);
    }
    if (bookings[index].price) {
        localStorage.setItem('payPrice', String(bookings[index].price));
    }
    window.location.href = 'payment.html';
}

// Delete booking and restore hostel availability
function deleteBooking(index) {
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const b = bookings[index];
    if (!b) return;
    if (!confirm(`Delete booking for ${b.name}?`)) return;
    bookings.splice(index, 1);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    // restore availability by name + location match
    try {
        let hostels = JSON.parse(localStorage.getItem('hostels')||'[]');
        const idx = hostels.findIndex(h=>h.name===b.name && h.location===b.location);
        if (idx>=0) { hostels[idx].status = 'Available'; localStorage.setItem('hostels', JSON.stringify(hostels)); }
    } catch {}
    renderBookings();
}

function handlePaymentForm() {
    const form = document.getElementById('paymentForm');
    if (!form) return;

    const hostelName = localStorage.getItem('payHostelName') || 'Unknown Hostel';
    const hostelDisplay = document.getElementById('hostelDisplay');
    if (hostelDisplay) hostelDisplay.innerText = hostelName;

    form.onsubmit = function(e) {
        e.preventDefault();
        const successMsg = document.getElementById('paymentSuccess');
        if (successMsg) successMsg.innerText = `Payment successful for ${hostelName}!`;
        if (successMsg) successMsg.style.display = 'block';

        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        let payIndex = parseInt(localStorage.getItem('payIndex'));
        let loggedInUser = localStorage.getItem('loggedInUser') || 'N/A';
        const priceStr = localStorage.getItem('payPrice') || '0';
        const price = parseInt(priceStr) || 0;
        const amountVal = parseInt(document.getElementById('amount').value) || 0;

        // Read existing payments and compute aggregated balance for this hostel/user
        let payments = JSON.parse(localStorage.getItem('payments') || '[]');
        const payHostelId = localStorage.getItem('payHostelId') ? parseInt(localStorage.getItem('payHostelId')) : null;

        // Compute previous total for this user & hostel (prefer hostelId when available)
        let previousTotal = 0;
        try {
            if (payHostelId != null) {
                previousTotal = payments.filter(p => p.user === loggedInUser && p.hostelId != null && parseInt(p.hostelId) === payHostelId)
                    .reduce((s, p) => s + (parseInt(p.amount, 10) || 0), 0);
            } else {
                previousTotal = payments.filter(p => p.user === loggedInUser && ((p.hostel || '') === hostelName))
                    .reduce((s, p) => s + (parseInt(p.amount, 10) || 0), 0);
            }
        } catch (err) { previousTotal = 0; }

        const newBalance = Math.max(0, price - (previousTotal + amountVal));

        payments.push({
            amount: amountVal,
            network: document.getElementById('network').value,
            number: document.getElementById('phoneNumber').value,
            user: loggedInUser,
            hostel: hostelName,
            hostelId: payHostelId,
            price: price,
            // store remaining balance after this payment (aggregated)
            balance: newBalance,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('payments', JSON.stringify(payments));

        if (!isNaN(payIndex) && bookings[payIndex]) {
            bookings.splice(payIndex, 1);
            localStorage.setItem('bookings', JSON.stringify(bookings));
        }

        localStorage.removeItem('payIndex');
        localStorage.removeItem('payHostelName');
        localStorage.removeItem('payPrice');

        setTimeout(() => {
            window.location.href = 'bookings.html';
        }, 2000);
    };
}

// Simple search handler (optional elements)
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    function doSearch(){
        const query = (searchInput && searchInput.value || '').trim();
        if(query){
            window.location.href = 'hostels.html?search=' + encodeURIComponent(query);
        }
    }
    if (searchBtn) {
        searchBtn.onclick = function(e){ e.preventDefault(); doSearch(); };
    }
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e){ if(e.key==='Enter'){ e.preventDefault(); doSearch(); } });
    }
}

// Register form handler (localStorage)
function handleRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    form.onsubmit = function(e) {
        e.preventDefault();
        const username = (document.getElementById('registerUsername')||{}).value || '';
        const password = (document.getElementById('registerPassword')||{}).value || '';
        const confirm  = (document.getElementById('registerConfirmPassword')||{}).value || '';
        if (!username || !password) { alert('Username and password are required.'); return; }
        if (password !== confirm) { alert('Passwords do not match.'); return; }
        let users = [];
        try { users = JSON.parse(localStorage.getItem('users')) || []; } catch { users = []; }
        if (users.some(u => u.username === username)) { alert('Username already exists.'); return; }
        users.push({ username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    };
}

// Login form handler (localStorage)
function handleLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    form.onsubmit = function(e) {
        e.preventDefault();
        const username = (document.getElementById('loginUsername')||{}).value || '';
        const password = (document.getElementById('loginPassword')||{}).value || '';
        let users = [];
        try { users = JSON.parse(localStorage.getItem('users')) || []; } catch { users = []; }
        const found = users.find(u => u.username === username && u.password === password);
        if (!found) { alert('Invalid credentials.'); return; }
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'hostels.html';
    };
}

// Search, login, register, admin, real-time updates, etc.
// (All your existing logic remains unchanged — same as original code, with payment integrated)

// On page load
window.onload = function() {
    renderNavbar();
    renderFooter();
    renderHostelGrid && renderHostelGrid();
    renderBookings && renderBookings();
    handlePaymentForm && handlePaymentForm();
    handleSearch && handleSearch();
    handleLoginForm && handleLoginForm();
    handleRegisterForm && handleRegisterForm();
    // search gradient and main image animation code
};

// --- Index page inline search results (no HTML change) ---
// If the current page is index.html or root and a search is submitted from the index search box,
// render a minimal results area on the index page showing only matching hostels.
(function indexInlineSearch(){
    try {
        const path = (location.pathname || '').toLowerCase();
        const isIndex = path.endsWith('/index.html') || path === '/' || path.endsWith('index.html');
        if (!isIndex) return;

        // Create a container for inline results under the hero
        function ensureIndexResultsContainer(){
            let c = document.getElementById('indexSearchResults');
            if (c) return c;
            c = document.createElement('div');
            c.id = 'indexSearchResults';
            c.style = 'max-width:1100px;margin:18px auto;padding:14px;';
            // Insert after hero if hero exists, otherwise append to body
            const hero = document.querySelector('.hero');
            if (hero && hero.parentNode) hero.parentNode.insertBefore(c, hero.nextSibling);
            else document.body.appendChild(c);
            return c;
        }

        function renderIndexResults(query){
            const container = ensureIndexResultsContainer();
            const hostels = getHostels();
            const q = (query||'').toLowerCase().trim();
            if (!q) { container.innerHTML = ''; showHeroCarousel(true); return; }
            const matches = hostels.filter(h => {
                return String(h.name||'').toLowerCase().includes(q)
                    || String(h.location||'').toLowerCase().includes(q)
                    || String(h.type||'').toLowerCase().includes(q)
                    || String(h.address||'').toLowerCase().includes(q);
            });
            if (matches.length === 0) {
                container.innerHTML = `<div style="background:#fff;padding:16px;border-radius:12px;color:#222;">No results found for <strong>${escapeHtml(query)}</strong>.</div>`;
                showHeroCarousel(false);
                return;
            }
            // Build a simple grid of matching hostels
            const html = [`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;">`];
            matches.forEach(m => {
                const img = (m.imgs && m.imgs[0]) || m.imgData || m.img || '';
                html.push(`
                    <div style="background:#fff;color:#222;border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.12);">
                        <a href="hostels.html" style="display:block;"><img src="${img}" alt="${escapeHtml(m.name)}" style="width:100%;height:150px;object-fit:cover;"></a>
                        <div style="padding:12px;">
                            <div style="font-weight:700;margin-bottom:6px;">${escapeHtml(m.name)}</div>
                            <div style="font-size:0.95rem;margin-bottom:6px;">${escapeHtml(m.location)} • ${escapeHtml(m.distance||'')}</div>
                            <div style="color:#ff4d4d;font-weight:700;">UGX ${Number(m.price||0).toLocaleString()}</div>
                        </div>
                    </div>
                `);
            });
            html.push(`</div>`);
            container.innerHTML = html.join('\n');
            showHeroCarousel(false);
        }

        function showHeroCarousel(show){
            const hero = document.querySelector('.hero');
            const carousel = document.querySelector('.image-banner-carousel');
            if (hero) hero.style.display = show ? '' : 'none';
            if (carousel) carousel.style.display = show ? '' : 'none';
        }

        function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[ch]); }

        // If the index page was loaded with a search query in the URL, use it
        const params = new URLSearchParams(location.search || '');
        const initialSearch = params.get('search') || '';
        if (initialSearch) renderIndexResults(initialSearch);

        // Listen for searchInput on index (some index pages have their own inline search)
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        if (searchInput && searchBtn) {
            // Override default behavior so user sees results on index instead of navigating away
            const original = searchBtn.onclick;
            searchBtn.onclick = function(e){ e.preventDefault(); const q = searchInput.value.trim(); if(q) renderIndexResults(q); else { alert('Please enter a search term.'); } };
            searchInput.addEventListener('keydown', function(e){ if (e.key === 'Enter') { e.preventDefault(); const q = searchInput.value.trim(); if(q) renderIndexResults(q); else alert('Please enter a search term.'); } });
        }

    } catch (e) { console.warn('Index inline search failed', e); }
})();

// --- Responsive enhancements injected via JS (no HTML file changes) ---
// Adds viewport meta (if missing), responsive CSS rules, and a small nav toggle
(function injectResponsiveHelpers(){
    try {
        // Add viewport meta for mobile scaling
        if (!document.querySelector('meta[name="viewport"]')) {
            const m = document.createElement('meta');
            m.name = 'viewport';
            m.content = 'width=device-width, initial-scale=1, maximum-scale=1';
            document.head.appendChild(m);
        }

        // Add responsive CSS rules to improve layout on small and large screens
        const css = `
            /* Responsive container tweaks */
            @media (max-width: 600px) {
                .container { margin: 16px; padding: 18px; border-radius: 12px; }
                .hostel-card img { height: 140px; }
                .hostel-categories { flex-wrap:wrap; gap:10px; }
                .hostel-categories button { padding:8px 12px; font-size:0.9rem; }
                .hostel-card .info { padding:12px; }
                .top-row .site, .top-row img { width:28px; height:28px; }
                .footer { padding:14px 8px; font-size:0.9rem; }
                .hostel-grid { gap:18px; }
            }
            @media (min-width: 1200px) {
                .container { max-width: 1400px; padding:48px; }
                .hostel-card img { height:220px; }
            }
            /* Make buttons more tappable on small screens */
            .hostel-card button, .book-btn, .view-location-btn, .footer a { touch-action:manipulation; }
            .hostel-card button { min-height:44px; }
            /* Responsive grid columns for better use on wide screens */
            @media (min-width: 900px) {
                .hostel-grid { grid-template-columns: repeat(3, 1fr); }
            }
            @media (min-width: 1200px) {
                .hostel-grid { grid-template-columns: repeat(4, 1fr); }
            }
        `;
        const s = document.createElement('style');
        s.id = 'responsive-injector';
        s.appendChild(document.createTextNode(css));
        document.head.appendChild(s);

        // Add a small hamburger toggle for pages that include a nav (renderNavbar places .nav-links)
        // If .nav-links exists, create a toggle button to collapse/expand on small screens.
        function ensureNavToggle(){
            const navLinks = document.querySelector('.nav-links');
            if (!navLinks) return;
            if (document.getElementById('navToggleBtn')) return;
            const btn = document.createElement('button');
            btn.id = 'navToggleBtn';
            btn.setAttribute('aria-label','Toggle navigation');
            btn.style = 'position:fixed;top:14px;left:14px;z-index:5000;background:#452B1F;color:#fff;border:none;border-radius:6px;padding:8px;display:none;';
            btn.innerText = '\u2630'; // hamburger
            btn.onclick = function(){
                if (navLinks.style.display === 'block' || getComputedStyle(navLinks).display === 'block') {
                    navLinks.style.display = 'none';
                } else {
                    navLinks.style.display = 'block';
                }
            };
            document.body.appendChild(btn);

            function adjustForWidth(){
                const w = window.innerWidth;
                if (w <= 780) {
                    btn.style.display = 'block';
                    navLinks.style.display = 'none';
                    navLinks.style.position = 'fixed';
                    navLinks.style.top = '56px';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.background = '#fff';
                    navLinks.style.padding = '12px';
                    navLinks.style.zIndex = '4000';
                    navLinks.style.borderTop = '1px solid rgba(0,0,0,0.06)';
                } else {
                    btn.style.display = 'none';
                    navLinks.style.display = '';
                    navLinks.style.position = '';
                    navLinks.style.top = '';
                    navLinks.style.left = '';
                    navLinks.style.right = '';
                    navLinks.style.background = '';
                    navLinks.style.padding = '';
                    navLinks.style.zIndex = '';
                    navLinks.style.borderTop = '';
                }
            }
            window.addEventListener('resize', adjustForWidth);
            setTimeout(adjustForWidth, 60);
        }

        // Try to add toggle after navbar renders
        window.addEventListener('DOMContentLoaded', ensureNavToggle);
        // Also call it after our renderNavbar possibly runs on window.onload
        setTimeout(ensureNavToggle, 200);
    } catch (e) { console.warn('Responsive injector failed', e); }
})();

// Theme manager: toggles between dark (index-like) and cloud-blue light theme across pages
(function themeManager(){
    try {
        const path = (location.pathname || '').toLowerCase();
        const isIndex = path === '/' || path.endsWith('/index.html') || path.endsWith('index.html');
        const THEME_KEY = 'siteTheme'; // 'light' or 'dark'

        // Determine initial theme: persisted value wins; otherwise index defaults to dark, others to light.
        let theme = (localStorage.getItem(THEME_KEY) || '').toLowerCase();
        if (theme !== 'light' && theme !== 'dark') theme = isIndex ? 'dark' : 'light';

        // Load external theme CSS (cloud-blue.css) once
        const cssId = 'site-theme-styles-link';
        if (!document.getElementById(cssId)) {
            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.href = 'cloud-blue.css';
            document.head.appendChild(link);
        }

        // Apply the current theme as a class on the documentElement
        function applyTheme(t) {
            document.documentElement.classList.remove('theme-light', 'theme-dark');
            document.documentElement.classList.add('theme-' + t);
            localStorage.setItem(THEME_KEY, t);
            // Update theme button tooltip if present
            const btn = document.getElementById('themeToggleBtn');
            if (btn) btn.title = `Switch theme (current: ${t})`;
        }

        applyTheme(theme);

        // Create Theme toggle button in the top-right of every page
        if (!document.getElementById('themeToggleBtn')) {
            const btn = document.createElement('button');
            btn.id = 'themeToggleBtn';
            btn.innerText = 'Theme';
            btn.title = 'Toggle theme';
            btn.style = 'position:fixed;top:12px;right:12px;z-index:6500;background:rgba(0,0,0,0.6);color:#fff;border:none;border-radius:8px;padding:8px 12px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,0.3);';
            // Ensure visibility on light background
            if (theme === 'light') btn.style.background = 'rgba(69,43,31,0.9)';

            btn.onclick = function(){
                theme = (theme === 'light') ? 'dark' : 'light';
                applyTheme(theme);
                // adjust button background for contrast
                btn.style.background = (theme === 'light') ? 'rgba(69,43,31,0.9)' : 'rgba(0,0,0,0.6)';
            };
            document.body.appendChild(btn);
        }

    } catch (e) { console.warn('Theme manager failed', e); }
})();

// Real-time updates across tabs: re-render when storage changes
window.addEventListener('storage', function() {
    renderHostelGrid && renderHostelGrid();
    renderBookings && renderBookings();
});

// Simple client-side location API: maps hostel name/location to coordinates.
// This is non-invasive and cached in localStorage so it doesn't require server changes.
const LOCATION_CACHE_KEY = 'hostel_locations_v1';
function getCachedLocations() {
    try { return JSON.parse(localStorage.getItem(LOCATION_CACHE_KEY) || '{}'); } catch { return {}; }
}

// A tiny lookup table of known places to coordinates (lat,lon). Add entries as needed.
const KNOWN_LOCATIONS = {
    'Kashanyaraze': {lat:0.3476, lon:32.5825},
    // Add more known mappings here if you have them
};

function resolveLocationCoordinates(hostel) {
    return new Promise((resolve) => {
        const cache = getCachedLocations();
        const key = `${hostel.name}||${hostel.location}`;
        if (cache[key]) return resolve(cache[key]);

        // Try known locations first
        if (KNOWN_LOCATIONS[hostel.location]) {
            cache[key] = KNOWN_LOCATIONS[hostel.location];
            localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(cache));
            return resolve(cache[key]);
        }

        // As a fallback, attempt a simple fetch to Nominatim (OpenStreetMap) to geocode the place name.
        // This is done client-side and respects CORS; if it fails we return null and UI will provide a map link.
        // Prefer the exact location string the landlord entered when posting the hostel.
        // Common fields: 'address', 'rawLocation', fall back to 'location' or hostel name.
        const userEntered = (hostel.address || hostel.rawLocation || hostel.location || hostel.name || '').trim();
            const q = encodeURIComponent(userEntered || `${hostel.name} ${hostel.location}`);
            const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`;
        fetch(url, {headers: {'Accept':'application/json'}}).then(r=>r.json()).then(data=>{
            if (Array.isArray(data) && data.length>0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                cache[key] = {lat, lon};
                try { localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(cache)); } catch {}
                resolve(cache[key]);
            } else { resolve(null); }
        }).catch(()=>resolve(null));
    });
}

// Modal helper: creates or returns a modal container
function ensureLocationModal() {
    let modal = document.getElementById('locationModal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'locationModal';
    modal.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:4000;padding:20px;';
    modal.innerHTML = `
        <div id="locationModalInner" style="background:#fff;border-radius:12px;max-width:800px;width:100%;box-shadow:0 8px 30px rgba(0,0,0,0.3);overflow:hidden;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #eee;">
                <strong id="locationModalTitle">Hostel location</strong>
                <button id="locationModalClose" style="background:#ff4d4d;color:#fff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;">Close</button>
            </div>
            <div id="locationModalBody" style="padding:12px;display:flex;flex-direction:column;gap:12px;">Loading...</div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('locationModal').onclick = function(e){ if (e.target === modal) modal.remove(); };
    document.getElementById('locationModalClose').onclick = function(){ modal.remove(); };
    return modal;
}

// Handler called by the View Location button in each card
function viewLocation(idx) {
    const hostels = getHostels();
    const hostel = hostels[idx];
    if (!hostel) return alert('Hostel not found');
    const modal = ensureLocationModal();
    const body = modal.querySelector('#locationModalBody');
    const title = modal.querySelector('#locationModalTitle');
    title.innerText = `Location for ${hostel.name}`;
    body.innerHTML = 'Resolving coordinates...';

    // Resolve using the user-entered location string preference
    resolveLocationCoordinates(hostel).then(coord => {
        const userEntered = (hostel.address || hostel.rawLocation || hostel.location || hostel.name || '').trim();
        const safeQuery = encodeURIComponent(userEntered || `${hostel.name} ${hostel.location}`);
        if (coord && typeof coord.lat === 'number' && typeof coord.lon === 'number') {
            const lat = coord.lat; const lon = coord.lon;
            const mapImg = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=16&size=780x380&markers=${lat},${lon},red-pushpin`;
            body.innerHTML = `
                <div style="display:flex;flex-direction:column;gap:8px;">
                    <img src="${mapImg}" alt="Map for ${hostel.name}" style="width:100%;height:auto;border-radius:8px;box-shadow:0 4px 18px rgba(0,0,0,0.12);">
                    <div>Coordinates: ${lat.toFixed(6)}, ${lon.toFixed(6)}</div>
                    <div style="display:flex;gap:8px;margin-top:6px;">
                        <a href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}" target="_blank" rel="noopener" style="background:#2b6cb0;color:#fff;padding:8px 12px;border-radius:8px;text-decoration:none;">Open in OSM</a>
                        <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank" rel="noopener" style="background:#34A853;color:#fff;padding:8px 12px;border-radius:8px;text-decoration:none;">Open in Google Maps</a>
                        <a href="https://www.google.com/maps/search/?api=1&query=${safeQuery}" target="_blank" rel="noopener" style="background:#555;color:#fff;padding:8px 12px;border-radius:8px;text-decoration:none;">Search Google Maps (entered address)</a>
                    </div>
                </div>
            `;
        } else {
            // Fallback: search Google Maps / OSM using the exact string the landlord entered
            body.innerHTML = `
                <div>Could not resolve exact coordinates automatically.</div>
                <div style="display:flex;gap:8px;margin-top:6px;">
                    <a href="https://www.openstreetmap.org/search?query=${safeQuery}" target="_blank" rel="noopener" style="background:#2b6cb0;color:#fff;padding:8px 12px;border-radius:8px;text-decoration:none;">Search on OSM</a>
                    <a href="https://www.google.com/maps/search/?api=1&query=${safeQuery}" target="_blank" rel="noopener" style="background:#34A853;color:#fff;padding:8px 12px;border-radius:8px;text-decoration:none;">Search on Google Maps</a>
                </div>
            `;
        }
    });
}
