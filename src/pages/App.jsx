import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet, Navigate, useLocation } from 'react-router-dom';
import { Home, Zap, Settings, BookOpen, Users, Palette } from 'lucide-react';

// =================================================================
// 0. THEME DEFINITIONS (Central Source of Truth for UI Consistency)
// This structure eliminates hardcoded styles and prevents UI misalignment.
// =================================================================
const themes = {
    'Dynamic Glass (Dark)': {
        '--bg-color': '#1A0033',
        '--card-bg': '#2C0059',
        '--primary-color': '#BBDEFB',
        '--text-color': '#E0F7FA',
        '--accent-color': '#6A1B9A',
        '--input-bg': '#3C1A5B',
        '--button-text': 'white',
        '--shadow-color': 'rgba(106, 27, 154, 0.4)',
    },
    'Fusion Violet (Dark)': {
        '--bg-color': '#0E0C18',
        '--card-bg': '#261E38',
        '--primary-color': '#D8BFD8',
        '--text-color': '#F0E6F7',
        '--accent-color': '#FF69B4',
        '--input-bg': '#3A3052',
        '--button-text': 'black',
        '--shadow-color': 'rgba(255, 105, 180, 0.4)',
    },
    'Light & Modern': {
        '--bg-color': '#F7F9FC',
        '--card-bg': '#FFFFFF',
        '--primary-color': '#007BFF',
        '--text-color': '#333333',
        '--accent-color': '#007BFF',
        '--input-bg': '#EBEFF3',
        '--button-text': 'white',
        '--shadow-color': 'rgba(0, 123, 255, 0.2)',
    },
    'Playful Energy': {
        '--bg-color': '#F5EFE6',
        '--card-bg': '#FFFFFF',
        '--primary-color': '#FF6B6B',
        '--text-color': '#1A1A1A',
        '--accent-color': '#FFD166',
        '--input-bg': '#FFF8E1',
        '--button-text': '#1A1A1A',
        '--shadow-color': 'rgba(255, 209, 102, 0.5)',
    },
    'Subtle Pro': {
        '--bg-color': '#EFEFEF',
        '--card-bg': '#FFFFFF',
        '--primary-color': '#5B50A7',
        '--text-color': '#444444',
        '--accent-color': '#7570B3',
        '--input-bg': '#F9F9F9',
        '--button-text': 'white',
        '--shadow-color': 'rgba(117, 112, 179, 0.3)',
    }
};

// --- MOCK FLASHCARD DATA STRUCTURE ---
const initialFlashcardSet = {
    id: 1,
    title: 'History: Mughal Empire Series',
    subject: 'General Studies',
    topic: 'History',
    cards: [],
};

// =================================================================
// 1. FLASHCARD SET BUILDER COMPONENT (With Bilingual Support)
// =================================================================
const FlashcardSetBuilder = ({ currentSet, setCurrentSet, activeTheme }) => {
    const [title, setTitle] = useState(currentSet.title);
    const [qTextEnglish, setQTextEnglish] = useState('');
    const [qTextRegional, setQTextRegional] = useState('');
    const [regionalLanguage, setRegionalLanguage] = useState('Hindi');
    const [contentType, setContentType] = useState('English'); // 'English' or 'Regional'

    const handleAddCard = () => {
        if (!qTextEnglish.trim() && !qTextRegional.trim()) return;

        const newCard = {
            id: currentSet.cards.length + 1,
            text_en: qTextEnglish.trim() || '[No English Content]',
            text_reg: qTextRegional.trim() || '[No Regional Content]',
            lang_code: regionalLanguage,
            type: 'MCQ', // Mocked type
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        };

        setCurrentSet(prev => ({
            ...prev,
            cards: [...prev.cards, newCard]
        }));
        setQTextEnglish('');
        setQTextRegional('');
        setContentType('English');
    };

    const inputStyle = {
        backgroundColor: activeTheme['--input-bg'],
        color: activeTheme['--text-color'],
        border: 'none',
        transition: 'all 0.2s',
    };

    const buttonActiveStyle = {
        backgroundColor: activeTheme['--accent-color'],
        color: activeTheme['--button-text'],
        boxShadow: `0 4px 10px ${activeTheme['--shadow-color']}`,
    };

    return (
        <div className="p-6 bg-transparent h-full overflow-y-auto" style={{color: activeTheme['--text-color']}}>
            <h2 className="text-3xl font-extrabold mb-6" style={{color: activeTheme['--primary-color']}}>
                Saphala Revise+ Set Builder
            </h2>
            
            {/* Set Details Card */}
            <div className="p-6 rounded-xl mb-6 shadow-xl" 
                 style={{backgroundColor: activeTheme['--card-bg'], border: `1px solid ${activeTheme['--accent-color']}`}}>
                
                <h3 className="text-2xl font-bold mb-4" style={{color: activeTheme['--primary-color']}}>Set Details: {title}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="block">
                        <span className="text-sm">Set Title</span>
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); setCurrentSet(p => ({...p, title: e.target.value})); }}
                            className="w-full p-3 mt-1 rounded-xl transition duration-200" 
                            style={inputStyle} />
                    </label>
                    <label className="block">
                        <span className="text-sm">Subject</span>
                        <select value={currentSet.subject} onChange={(e) => setCurrentSet(p => ({...p, subject: e.target.value}))}
                            className="w-full p-3 mt-1 rounded-xl transition duration-200" 
                            style={inputStyle}>
                            <option>General Studies</option>
                            <option>Quantitative Aptitude</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-sm">Regional Language Selection</span>
                        <select value={regionalLanguage} onChange={(e) => setRegionalLanguage(e.target.value)}
                            className="w-full p-3 mt-1 rounded-xl transition duration-200" 
                            style={inputStyle}>
                            <option>Hindi</option>
                            <option>Telugu</option>
                            <option>Marathi</option>
                            <option>Tamil</option>
                        </select>
                    </label>
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-4" style={{color: activeTheme['--primary-color']}}>
                Flashcards in Set ({currentSet.cards.length})
            </h3>

            {/* List of Cards */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 mb-6 border-b pb-4" style={{borderColor: activeTheme['--input-bg']}}>
                {currentSet.cards.map(q => (
                    <div key={q.id} className="p-4 rounded-xl flex justify-between items-start shadow-md text-sm" style={{backgroundColor: activeTheme['--input-bg']}}>
                        <div>
                            <p className="font-semibold">{q.id}. {q.text_en.substring(0, 70)}...</p>
                            <p className="text-xs opacity-80 mt-1" style={{color: activeTheme['--primary-color']}}>
                                ({q.lang_code}): {q.text_reg.substring(0, 50)}... 
                            </p>
                        </div>
                        <button className="text-red-400 hover:text-red-300 text-xs ml-4 flex-shrink-0">
                            Delete
                        </button>
                    </div>
                ))}
                {currentSet.cards.length === 0 && (
                     <div className="p-4 rounded-xl text-center opacity-70" style={{backgroundColor: activeTheme['--input-bg']}}>
                        No flashcards added yet. Start creating!
                     </div>
                )}
            </div>

            {/* Add New Card Input (Bilingual) */}
            <div className="p-6 rounded-xl shadow-2xl" style={{backgroundColor: activeTheme['--card-bg']}}>
                <h4 className="font-bold mb-4 text-xl flex items-center" style={{color: activeTheme['--primary-color']}}>
                    Add New Flashcard Content
                </h4>

                {/* Language Toggle */}
                <div className="flex mb-4 p-1 rounded-xl" style={{backgroundColor: activeTheme['--input-bg']}}>
                    <button 
                        onClick={() => setContentType('English')}
                        className={`flex-1 p-2 rounded-lg font-semibold text-sm transition-all ${contentType === 'English' ? 'shadow-md' : 'opacity-60'}`}
                        style={contentType === 'English' ? buttonActiveStyle : {color: activeTheme['--text-color']}}
                    >
                        English (Primary)
                    </button>
                    <button 
                        onClick={() => setContentType('Regional')}
                        className={`flex-1 p-2 rounded-lg font-semibold text-sm transition-all ${contentType === 'Regional' ? 'shadow-md' : 'opacity-60'}`}
                        style={contentType === 'Regional' ? buttonActiveStyle : {color: activeTheme['--text-color']}}
                    >
                        {regionalLanguage} (Regional)
                    </button>
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium block mb-1">
                        Question Text ({contentType === 'English' ? 'English' : regionalLanguage})
                    </label>
                    <textarea 
                        value={contentType === 'English' ? qTextEnglish : qTextRegional} 
                        onChange={(e) => contentType === 'English' ? setQTextEnglish(e.target.value) : setQTextRegional(e.target.value)} 
                        placeholder={`Enter flashcard question text in ${contentType === 'English' ? 'English' : regionalLanguage} here...`}
                        rows="4" 
                        className="w-full p-3 rounded-xl transition duration-200 resize-none" 
                        style={inputStyle}
                    />
                </div>

                <button onClick={handleAddCard} 
                    className="w-full p-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition duration-200" 
                    style={buttonActiveStyle}>
                    Create & Add Flashcard
                </button>
            </div>
        </div>
    );
};

// =================================================================
// 2. ADMIN DASHBOARD LAYOUT
// =================================================================
const AdminLayout = ({ activeTheme, setTheme, currentThemeName }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const activePath = location.pathname;
    const themeNames = Object.keys(themes);

    const menuItems = [
        { name: 'Flashcard Builder', icon: BookOpen, path: '/admin-dashboard/builder' },
        { name: 'User Management', icon: Users, path: '/admin-dashboard/users' },
        { name: 'Reports & Analytics', icon: Zap, path: '/admin-dashboard/reports' },
        { name: 'Platform Settings', icon: Settings, path: '/admin-dashboard/settings' },
    ];
    
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: activeTheme['--bg-color']}}>
            {/* Sidebar - Fixed Width and Reliable Styling */}
            <div className="w-72 p-6 shadow-2xl flex flex-col flex-shrink-0" style={{backgroundColor: activeTheme['--card-bg']}}>
                <h2 className="text-3xl font-extrabold mb-8" style={{color: activeTheme['--primary-color']}}>Saphala Admin</h2>
                
                <div className="space-y-3 flex-grow">
                    {menuItems.map(item => (
                        <div key={item.path} 
                            onClick={() => navigate(item.path)}
                            className={`flex items-center p-3 rounded-xl cursor-pointer transition duration-150 ${activePath.includes(item.path) ? 'shadow-inner' : 'hover:bg-opacity-30'}`}
                            style={{
                                backgroundColor: activePath.includes(item.path) ? activeTheme['--accent-color'] : 'transparent', 
                                color: activeTheme['--text-color'],
                                opacity: activePath.includes(item.path) ? 1 : 0.9,
                            }}>
                            <item.icon size={20} className="mr-3" />
                            <span className="font-semibold">{item.name}</span>
                        </div>
                    ))}
                </div>
                
                {/* Theme Selector - Eliminating UI Disturbance */}
                <div className="pt-8 border-t mt-4" style={{borderColor: activeTheme['--input-bg']}}>
                    <div className="flex items-center mb-3">
                        <Palette size={20} className="mr-2" style={{color: activeTheme['--primary-color']}} />
                        <span className="font-semibold text-sm" style={{color: activeTheme['--text-color']}}>Active Theme</span>
                    </div>
                    <select value={currentThemeName} onChange={(e) => setTheme(e.target.value)}
                        className="w-full p-3 rounded-xl text-sm transition duration-200 cursor-pointer" 
                        style={{backgroundColor: activeTheme['--input-bg'], color: activeTheme['--text-color'], border: 'none'}}>
                        {themeNames.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>

                <div className="mt-6 pt-6">
                    <button onClick={() => { localStorage.removeItem('isAuthenticated'); window.location.href = '/'; }}
                            className="w-full p-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition duration-200"
                            style={{backgroundColor: activeTheme['--accent-color'], color: activeTheme['--button-text']}}>
                        Logout
                    </button>
                </div>
            </div>
            
            {/* Main Content Area */}
            <main className="flex-grow overflow-y-auto">
                {/* Outlet renders child routes. Props are passed via Route component below. */}
                <Outlet />
            </main>
        </div>
    );
};

// =================================================================
// 3. ADMIN LOGIN COMPONENT
// =================================================================
const AdminLogin = ({ setIsAuthenticated, activeTheme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // MOCK AUTHENTICATION CHECK
        if (email === 'admin@saphala.com' && password === 'saphala123') {
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = '/admin-dashboard/builder'; 
        } else {
            setMessage('Invalid credentials. Use admin@saphala.com / saphala123');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{backgroundColor: activeTheme['--bg-color']}}>
            <div className="text-center mb-8">
                <h1 className="text-5xl font-extrabold tracking-tight" style={{color: activeTheme['--primary-color']}}>Saphala PrepEdge</h1>
                <h2 className="text-xl font-semibold mt-2" style={{color: activeTheme['--text-color']}}>Administrator Access Portal</h2>
            </div>
            
            <div className="w-full max-w-md p-10 rounded-3xl shadow-[0_20px_50px_var(--shadow-color)] space-y-7" 
                 style={{backgroundColor: activeTheme['--card-bg'], border: `3px solid ${activeTheme['--accent-color']}`}}>
                
                <h3 className="text-3xl font-bold text-center" style={{color: activeTheme['--primary-color']}}>Secure Login</h3>

                <form onSubmit={handleLogin} className="space-y-6">
                    {message && <p className="text-sm p-3 rounded-lg font-medium" style={{backgroundColor: '#991B1B', color: '#FEE2E2'}}>{message}</p>}

                    <label className="block">
                        <span className="text-sm font-medium" style={{color: activeTheme['--text-color']}}>Admin Email</span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mt-1 rounded-xl transition duration-200 focus:ring-2 focus:ring-opacity-50" 
                            style={{backgroundColor: activeTheme['--input-bg'], color: activeTheme['--text-color'], borderColor: activeTheme['--accent-color']}}
                            placeholder="admin@saphala.com" required />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium" style={{color: activeTheme['--text-color']}}>Password</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-1 rounded-xl transition duration-200 focus:ring-2 focus:ring-opacity-50" 
                            style={{backgroundColor: activeTheme['--input-bg'], color: activeTheme['--text-color'], borderColor: activeTheme['--accent-color']}}
                            placeholder="Enter password" required />
                    </label>

                    <button type="submit" 
                        className="w-full p-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition duration-200"
                        style={{backgroundColor: activeTheme['--accent-color'], color: activeTheme['--button-text']}}>
                        Secure Log In
                    </button>
                </form>

                <div className="text-center text-sm pt-2">
                    <a href="/" style={{color: activeTheme['--primary-color']}} className="opacity-80 hover:opacity-100 transition duration-150">
                        ← Go to Student Login (Mock)
                    </a>
                </div>
            </div>
        </div>
    );
};

// =================================================================
// 4. MAIN APP COMPONENT (Router Configuration & State)
// =================================================================
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
    const [currentFlashcardSet, setCurrentFlashcardSet] = useState(initialFlashcardSet);
    
    // Theme State Management 
    const [currentThemeName, setCurrentThemeName] = useState(
        localStorage.getItem('saphalaTheme') || 'Dynamic Glass (Dark)' 
    );

    const activeTheme = themes[currentThemeName];

    // Function to set and persist the theme
    const setTheme = (name) => {
        setCurrentThemeName(name);
        localStorage.setItem('saphalaTheme', name);
    };

    // Placeholder components for routing completeness
    const UserManagement = ({ activeTheme }) => <div className="text-xl p-6" style={{color: activeTheme['--text-color']}}>User Management View (Coming Soon)</div>;
    const Reports = ({ activeTheme }) => <div className="text-xl p-6" style={{color: activeTheme['--text-color']}}>Reports Dashboard View (Coming Soon)</div>;
    const SettingsPage = ({ activeTheme }) => <div className="text-xl p-6" style={{color: activeTheme['--text-color']}}>Settings Configuration (Coming Soon)</div>;
    

    // --- PROTECTED ROUTE LOGIC ---
    if (!isAuthenticated) {
        return (
            <Routes>
                {/* Public Entry Point: Admin Login */}
                <Route path="*" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} activeTheme={activeTheme} />} />
            </Routes>
        );
    }
    
    // --- AUTHENTICATED ADMIN ROUTES ---
    // Corrected React Router setup for stability
    return (
        <Routes>
            <Route path="/admin-dashboard" element={<AdminLayout activeTheme={activeTheme} setTheme={setTheme} currentThemeName={currentThemeName} />}>
                
                {/* Index and Builder Routes: State passed explicitly */}
                <Route index element={<FlashcardSetBuilder 
                    currentSet={currentFlashcardSet} 
                    setCurrentSet={setCurrentFlashcardSet} 
                    activeTheme={activeTheme} 
                />} />
                <Route path="builder" element={<FlashcardSetBuilder 
                    currentSet={currentFlashcardSet} 
                    setCurrentSet={setCurrentFlashcardSet} 
                    activeTheme={activeTheme} 
                />} />
                
                {/* Other Admin Features */}
                <Route path="users" element={<UserManagement activeTheme={activeTheme} />} />
                <Route path="reports" element={<Reports activeTheme={activeTheme} />} />
                <Route path="settings" element={<SettingsPage activeTheme={activeTheme} />} />
            </Route>
            
            {/* Fallback for authenticated users: Redirects to the core feature */}
            <Route path="*" element={<Navigate to="/admin-dashboard/builder" replace />} />
        </Routes>
    );
}

// 5. Root Component
export default () => (
    <Router>
        <App />
    </Router>
);