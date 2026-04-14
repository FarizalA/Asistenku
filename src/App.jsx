import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderOpen, 
  MessageSquare, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Clock, 
  FileText, 
  GraduationCap,
  ChevronRight
} from 'lucide-react';

// --- INISIALISASI FIREBASE (KUNCI MILIKMU) ---
const firebaseConfig = {
  apiKey: "AIzaSyBxtO_UofmPpH9-kNJqE0N4r2HMmhZQRgo",
  authDomain: "skripsipro-1ceef.firebaseapp.com",
  projectId: "skripsipro-1ceef",
  storageBucket: "skripsipro-1ceef.firebasestorage.app",
  messagingSenderId: "111244547925",
  appId: "1:111244547925:web:6c4a7e1cdb3543dd9541dc",
  measurementId: "G-GXBC2MJWW9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = 'skripsipro-1ceef';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- STATE UNTUK DATA ---
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  // --- EFEK: OTENTIKASI & PENGAMBILAN DATA ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.error("Gagal melakukan autentikasi:", error);
      }
    };
    initAuth();
    
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Listener Real-time untuk Tugas
    const tasksRef = collection(db, 'artifacts', appId, 'users', user.uid, 'tasks');
    const unsubTasks = onSnapshot(tasksRef, (snapshot) => {
      const tasksData = [];
      snapshot.forEach(doc => tasksData.push({ id: doc.id, ...doc.data() }));
      tasksData.sort((a, b) => a.timestamp - b.timestamp);
      setTasks(tasksData);
    }, (error) => console.error("Error fetching tasks:", error));

    // Listener Real-time untuk Catatan
    const notesRef = collection(db, 'artifacts', appId, 'users', user.uid, 'notes');
    const unsubNotes = onSnapshot(notesRef, (snapshot) => {
      const notesData = [];
      snapshot.forEach(doc => notesData.push({ id: doc.id, ...doc.data() }));
      notesData.sort((a, b) => b.timestamp - a.timestamp);
      setNotes(notesData);
    }, (error) => console.error("Error fetching notes:", error));

    return () => {
      unsubTasks();
      unsubNotes();
    };
  }, [user]);

  // --- LOGIC FUNGSI KE DATABASE ---
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !user) return;
    
    const newId = Date.now().toString();
    const taskRef = doc(db, 'artifacts', appId, 'users', user.uid, 'tasks', newId);
    
    await setDoc(taskRef, { 
      title: newTaskTitle, 
      status: 'todo', 
      timestamp: Date.now() 
    });
    setNewTaskTitle('');
  };

  const toggleTaskStatus = async (task) => {
    if (!user) return;
    const nextStatus = task.status === 'todo' ? 'in-progress' : task.status === 'in-progress' ? 'done' : 'todo';
    const taskRef = doc(db, 'artifacts', appId, 'users', user.uid, 'tasks', task.id);
    
    await setDoc(taskRef, { ...task, status: nextStatus });
  };

  const deleteTask = async (id) => {
    if (!user) return;
    const taskRef = doc(db, 'artifacts', appId, 'users', user.uid, 'tasks', id);
    await deleteDoc(taskRef);
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim() || !user) return;
    
    const newId = Date.now().toString();
    const noteRef = doc(db, 'artifacts', appId, 'users', user.uid, 'notes', newId);
    
    await setDoc(noteRef, { 
      ...newNote, 
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now()
    });
    setNewNote({ title: '', content: '' });
  };

  const deleteNote = async (id) => {
    if (!user) return;
    const noteRef = doc(db, 'artifacts', appId, 'users', user.uid, 'notes', id);
    await deleteDoc(noteRef);
  };

  // --- KOMPONEN HALAMAN ---

  const renderDashboard = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Ringkasan Progres</h2>
          <p className="text-slate-500">Pantau perjalanan skripsimu di sini.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-2">
            <span className="text-lg font-medium text-slate-700">Progres Keseluruhan</span>
            <span className="text-2xl font-bold text-indigo-600">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-4 mb-4">
            <div className="bg-indigo-600 h-4 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-slate-500">Kamu telah menyelesaikan {completedTasks} dari {totalTasks} tugas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><CheckSquare size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Tugas Aktif</p>
              <p className="text-2xl font-bold text-slate-800">{tasks.filter(t => t.status !== 'done').length}</p>
            </div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><FolderOpen size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Folder Disiapkan</p>
              <p className="text-2xl font-bold text-slate-800">5</p>
            </div>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl"><MessageSquare size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Catatan Bimbingan</p>
              <p className="text-2xl font-bold text-slate-800">{notes.length}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTasks = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Target & Tugas</h2>
        <p className="text-slate-500">Pecah skripsimu menjadi langkah-langkah kecil.</p>
      </div>

      <form onSubmit={addTask} className="flex gap-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Tambahkan tugas baru..."
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={!user}
        />
        <button type="submit" disabled={!user} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center disabled:opacity-50">
          <Plus size={20} className="mr-1" /> Tambah
        </button>
      </form>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {tasks.length === 0 ? (
          <div className="p-8 text-center text-slate-500">Belum ada tugas. Mulai tambahkan targetmu!</div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {tasks.map(task => (
              <li key={task.id} className="p-4 hover:bg-slate-50 flex items-center justify-between group transition-colors">
                <div className="flex items-center space-x-3 flex-1 cursor-pointer" onClick={() => toggleTaskStatus(task)}>
                  {task.status === 'done' ? (
                    <CheckCircle2 className="text-emerald-500" size={24} />
                  ) : task.status === 'in-progress' ? (
                    <Clock className="text-amber-500" size={24} />
                  ) : (
                    <Circle className="text-slate-300 group-hover:text-indigo-400" size={24} />
                  )}
                  <span className={`text-lg ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    task.status === 'done' ? 'bg-emerald-100 text-emerald-700' :
                    task.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {task.status === 'done' ? 'Selesai' : task.status === 'in-progress' ? 'Dikerjakan' : 'To-Do'}
                  </span>
                  <button onClick={() => deleteTask(task.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  const renderFiles = () => {
    const folders = [
      { name: 'Bab 1: Pendahuluan', files: 2, status: 'Draft' },
      { name: 'Bab 2: Tinjauan Pustaka', files: 5, status: 'Revisi' },
      { name: 'Bab 3: Metodologi', files: 1, status: 'Kosong' },
      { name: 'Referensi Jurnal', files: 12, status: 'Terkumpul' },
      { name: 'Lampiran & Dataset', files: 3, status: 'Proses' },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Manajemen File & Bab</h2>
            <p className="text-slate-500">Struktur rapi agar file tidak tercecer.</p>
          </div>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center hidden sm:flex">
            <Plus size={16} className="mr-1" /> Folder Baru
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow hover:border-indigo-200 cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <FolderOpen size={24} />
                </div>
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                  folder.status === 'Kosong' ? 'bg-slate-100 text-slate-500' :
                  folder.status === 'Revisi' ? 'bg-red-50 text-red-600' :
                  'bg-indigo-50 text-indigo-700'
                }`}>
                  {folder.status}
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{folder.name}</h3>
              <p className="text-sm text-slate-500 flex items-center">
                <FileText size={14} className="mr-1" /> {folder.files} File tersimpan
              </p>
            </div>
          ))}
        </div>
        
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl text-center mt-6">
          <p className="text-indigo-800 text-sm">
            💡 <strong>Sistem Virtual:</strong> Ini adalah simulasi tata letak folder. Untuk menggunakan fitur upload file asli ke komputer/cloud, fitur ini dapat diintegrasikan lebih lanjut nanti.
          </p>
        </div>
      </div>
    );
  };

  const renderNotes = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Catatan Bimbingan</h2>
        <p className="text-slate-500">Jangan sampai lupa apa kata dosen pembimbingmu.</p>
      </div>

      <form onSubmit={addNote} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Judul Pertemuan</label>
          <input
            type="text"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            placeholder="Misal: Bimbingan Bab 2"
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={!user}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Catatan / Revisi</label>
          <textarea
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            placeholder="Tuliskan feedback dari dosen di sini..."
            rows={3}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={!user}
          />
        </div>
        <button type="submit" disabled={!user} className="w-full bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50">
          Simpan Catatan
        </button>
      </form>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-center text-slate-500 py-4">Belum ada catatan bimbingan.</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative group">
              <button onClick={() => deleteNote(note.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={18} />
              </button>
              <div className="text-xs text-indigo-600 font-semibold mb-2">{note.date}</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{note.title}</h3>
              <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* SIDEBAR LEYOUT */}
      <aside className={`fixed inset-y-0 left-0 bg-white w-64 border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-6 flex items-center space-x-3 text-indigo-600">
          <GraduationCap size={32} />
          <span className="text-xl font-black tracking-tight text-slate-800">Skripsi<span className="text-indigo-600">Pro</span></span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <button onClick={() => {setActiveTab('dashboard'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </button>
          <button onClick={() => {setActiveTab('tasks'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'tasks' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <CheckSquare size={20} /> <span>Target & Tugas</span>
          </button>
          <button onClick={() => {setActiveTab('files'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'files' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <FolderOpen size={20} /> <span>File & Bab</span>
          </button>
          <button onClick={() => {setActiveTab('notes'); setIsMobileMenuOpen(false);}} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'notes' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <MessageSquare size={20} /> <span>Catatan Bimbingan</span>
          </button>
        </nav>

        <div className="p-4 m-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 text-center mb-2">Semangat! Sidang sudah dekat.</p>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-1/3 animate-pulse"></div>
          </div>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-indigo-600">
            <GraduationCap size={24} />
            <span className="text-lg font-bold text-slate-800">SkripsiPro</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-slate-100 rounded-lg text-slate-600">
            <ChevronRight size={20} />
          </button>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative">
          {!user && (
            <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-indigo-600">
                <Clock className="animate-spin" size={24} />
                <span className="font-medium">Menghubungkan ke database...</span>
              </div>
            </div>
          )}
          
          <div className="max-w-5xl mx-auto">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'tasks' && renderTasks()}
            {activeTab === 'files' && renderFiles()}
            {activeTab === 'notes' && renderNotes()}
          </div>
        </div>
      </main>

    </div>
  );
}