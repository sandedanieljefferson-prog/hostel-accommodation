// Simple client-side i18n helper for HostelHub
(function(){
    const translations = {
        'en': {
            siteTitle: 'HOSTELHUB',
            searchPlaceholder: 'Search hostels, locations, types...',
            userProfile: 'User Profile', yourPayments: 'Your Payments', viewPrintAll: 'View/Print All Slips', send: 'Send', logout: 'Logout', users: 'Users', hostels: 'Hostels', bookings: 'Bookings', payments: 'Payments', statistics: 'Statistics', messages: 'Messages', admins: 'Admins', welcomeAdmin: 'Welcome, Admin!',
            about: 'About Us', terms: 'Terms', bookings: 'Bookings', myProfile: 'My Profile', help: 'Help', hostels: 'Hostels', login: 'Login', adminLogin: 'Admin Login', register: 'Register', footerText: '© 2025 HostelHub. Glowing with light ✨',
            rateExperience: 'Rate your experience', clearConversation: 'Clear Conversation', complaintsTitle: 'Complaints / Conversations with Admin', startConversation: 'Start a conversation with the admin. Messages persist until cleared by you or an admin.'
        },
        'sw-ke': { // Swahili flavor (Kenya)
            siteTitle: 'HOSTELHUB',
            searchPlaceholder: 'Tafuta hosteli, maeneo, aina...',
            userProfile: 'Wasifu wa Mtumiaji', yourPayments: 'Malipo Yako', viewPrintAll: 'Angalia/Chapisha Staki Zote', send: 'Tuma', logout: 'Toka', users: 'Watumiaji', hostels: 'Hosteli', bookings: 'Mabuking', payments: 'Malipo', statistics: 'Takwimu', messages: 'Ujumbe', admins: 'Msimamizi', welcomeAdmin: 'Karibu, Msimamizi!',
            about: 'Kuhusu Sisi', terms: 'Sheria', bookings: 'Mabuking', myProfile: 'Wasifu Wangu', help: 'Msaada', hostels: 'Hosteli', login: 'Ingia', adminLogin: 'Ingia Admin', register: 'Jisajili', footerText: '© 2025 HostelHub. Kuangaza kwa mwanga ✨',
            rateExperience: 'Pima uzoefu wako', clearConversation: 'Futa mazungumzo', complaintsTitle: 'Malalamiko / Mazungumzo na Admin', startConversation: 'Anzisha mazungumzo na admin. Ujumbe yatahifadhiwa hadi yafuta.'
        },
        'sw-tz': { // Swahili flavor (Tanzania)
            siteTitle: 'HOSTELHUB',
            searchPlaceholder: 'Tafuta hosteli, maeneo, aina...',
            userProfile: 'Wasifu wa Mtumiaji', yourPayments: 'Malipo Yako', viewPrintAll: 'Angalia/Chapisha Staki Zote', send: 'Tuma', logout: 'Toka', users: 'Watumiaji', hostels: 'Hosteli', bookings: 'Mabuking', payments: 'Malipo', statistics: 'Takwimu', messages: 'Ujumbe', admins: 'Msimamizi', welcomeAdmin: 'Karibu, Msimamizi!',
            about: 'Kuhusu Sisi', terms: 'Sheria', bookings: 'Mabuking', myProfile: 'Wasifu Wangu', help: 'Msaada', hostels: 'Hosteli', login: 'Ingia', adminLogin: 'Ingia Admin', register: 'Jisajili', footerText: '© 2025 HostelHub. Kuangaza kwa mwanga ✨',
            rateExperience: 'Tathmini uzoefu wako', clearConversation: 'Futa mazungumzo', complaintsTitle: 'Malalamiko / Mazungumzo na Admin', startConversation: 'Anzisha mazungumzo na admin. Ujumbe yatahifadhiwa hadi yafutwe.'
        },
        'rw': { // Kinyarwanda
            siteTitle: 'HOSTELHUB',
            searchPlaceholder: 'Shaka amahosteli, aho ari, ubwoko...',
            userProfile: 'Umwirondoro', yourPayments: 'Amadeni Yawe', viewPrintAll: 'Reba/Capira Amadosiye', send: 'Ohereza', logout: 'Sohoka', users: 'Abakoresha', hostels: 'Amahosteli', bookings: 'Amapaji', payments: 'Amadeni', statistics: 'Ibyegeranyo', messages: 'Ubutumwa', admins: 'Abayobozi', welcomeAdmin: 'Murakaza neza, Umuyobozi!',
            about: 'Ibyerekeye Twebwe', terms: 'Amategeko', bookings: 'Amapaji', myProfile: 'Umwirondoro Wanjye', help: 'Ubufasha', hostels: 'Amahosteli', login: 'Injira', adminLogin: 'Injira Admin', register: 'Iyandikishe', footerText: '© 2025 HostelHub. Guhishura n’urumuri ✨',
            rateExperience: 'Hindura uko wumva', clearConversation: 'Siba ibiganiro', complaintsTitle: 'Ibirego / Ibiganiro na Admin', startConversation: 'Tangira ikiganiro na admin. Ubutumwa buzabikwa kugeza byasibwe.'
        },
        'bi': { // Kirundi (Burundi)
            siteTitle: 'HOSTELHUB',
            searchPlaceholder: 'Shakira amahosteli, aho ari, ubwoko...',
            userProfile: 'Profaili y’Umukoresha', yourPayments: 'Amafaranga Yawe', viewPrintAll: 'Reba/Capira Inyandiko Zose', send: 'Ohereza', logout: 'Sohoka', users: 'Abakoresha', hostels: 'Amahosteli', bookings: 'Amabooking', payments: 'Amafaranga', statistics: 'Ibipimo', messages: 'Ubutumwa', admins: 'Abayobozi', welcomeAdmin: 'Twarakaze, Umuyobozi!',
            about: 'Ivyo twamenya', terms: 'Amategeko', bookings: 'Amabooking', myProfile: 'Profaili Yanje', help: 'Ubufasha', hostels: 'Amahosteli', login: 'Injira', adminLogin: 'Injira Admin', register: 'Iyandikishe', footerText: '© 2025 HostelHub. Kunyaruka nʼurumuri ✨',
            rateExperience: 'Tora ivyiyumviro vyawe', clearConversation: 'Siba ibiganiro', complaintsTitle: 'Amaganya / Ibiganiro na Admin', startConversation: 'Tangira ikiganiro na admin. Ubutumwa buzogumaho gushika bwosibwe.'
        }
    };

    function currentLang(){ return localStorage.getItem('siteLang') || 'en'; }
    function setLang(lang){ localStorage.setItem('siteLang', lang); loadAndApply(lang); try{ window.dispatchEvent(new StorageEvent('storage',{key:'siteLang',newValue:lang})); }catch(e){} }

    // Try to load translations/<lang>.json; fallback to embedded translations
    function loadAndApply(lang){
        const url = 'translations/' + lang + '.json';
        fetch(url).then(r=>{ if(!r.ok) throw new Error('no file'); return r.json(); }).then(dict=>{
            applyTranslationsDict(dict);
        }).catch(()=>{
            const dict = translations[lang] || translations['en'];
            applyTranslationsDict(dict);
        });
    }

    function applyTranslationsDict(dict){
        document.querySelectorAll('[data-i18n]').forEach(el=>{
            const key = el.getAttribute('data-i18n');
            if(dict[key]) el.textContent = dict[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
            const key = el.getAttribute('data-i18n-placeholder');
            if(dict[key]) el.setAttribute('placeholder', dict[key]);
        });
    }

    // Expose for pages
    window.i18n = { translations, currentLang, setLang, applyTranslations };

    // Apply on load
    document.addEventListener('DOMContentLoaded', function(){ loadAndApply(currentLang()); });

    // Listen for siteLang changes from other tabs
    window.addEventListener('storage', function(e){ if(e.key==='siteLang') applyTranslations(); });
    
    // Export translations as JSON string (returns current embedded object or fetched file)
    function exportTranslations(lang){
        const dict = translations[lang] || translations['en'];
        return JSON.stringify(dict, null, 2);
    }

    // Download helper
    function downloadFile(filename, content) {
        const blob = new Blob([content], {type: 'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    window.i18n = { translations, currentLang, setLang, applyTranslations: ()=>loadAndApply(currentLang()), loadAndApply, exportTranslations, downloadFile };
})();
