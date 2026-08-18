import React, { useState } from 'react'
import './index.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentMode, setCurrentMode] = useState('A'); // A, B, or C

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return <Dashboard mode={currentMode} setMode={setCurrentMode} onLogout={() => setIsLoggedIn(false)} />
}

function Login({ onLogin }) {
  return (
    <div className="login-split">
      <div className="login-left">
        <div className="login-overlay"></div>
        <div style={{zIndex: 2, position: 'relative'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem'}}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="#ef4444"/>
              <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="#ffffff"/>
            </svg>
            <h1 style={{fontSize: '2rem'}}>VLearn</h1>
          </div>
          <h1 style={{fontSize: '3.5rem', lineHeight: 1.2, marginBottom: '1.5rem', maxWidth: '600px'}}>
            Học để hiểu, không chỉ để trả lời.
          </h1>
          <p style={{fontSize: '1.1rem', opacity: 0.9, maxWidth: '500px', lineHeight: 1.6}}>
            VLearn giúp bạn học theo từng ngày, hỏi tutor ngay trên tài liệu và luyện đúng knowledge component còn yếu.
          </p>
          <p style={{marginTop: '3rem', fontStyle: 'italic', opacity: 0.8}}>
            “Chỗ nào em yếu, hệ thống biết và báo đúng chỗ đó.”
          </p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <h2 className="login-title">CHÀO MỪNG <span>TRỞ LẠI</span></h2>
          <p className="login-subtitle">Đăng nhập bằng tài khoản được cấp để tiếp tục</p>
          
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="input-group">
              <label className="input-label">Email đăng nhập</label>
              <input type="text" className="input-field" defaultValue="26ai.dangth@vinuni.edu.vn" />
            </div>
            <div className="input-group">
              <div className="flex justify-between items-center" style={{marginBottom: '0.5rem'}}>
                <label className="input-label" style={{marginBottom: 0}}>Mật khẩu</label>
                <a href="#" style={{fontSize: '0.8rem', color: 'var(--primary-color)'}}>Quên mật khẩu?</a>
              </div>
              <input type="password" className="input-field" defaultValue="password123" />
            </div>
            
            <div style={{marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" style={{fontSize: '0.9rem', color: 'var(--text-light)'}}>Ghi nhớ email của tôi</label>
            </div>
            
            <button type="submit" className="btn-primary">
              Đăng nhập hệ thống <span>→</span>
            </button>
          </form>
          
          <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}>
            <a href="#" style={{fontWeight: 600, color: 'var(--primary-color)'}}>ĐĂNG NHẬP LẦN ĐẦU?</a>
            <a href="#" style={{color: 'var(--text-light)'}}>✉ HỖ TRỢ</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Dashboard({ mode, setMode, onLogout }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Chào bạn, rất vui được hỗ trợ bạn trong buổi học hôm nay về kỹ thuật xây dựng Data Pipeline (trang 1).\n\nBạn đang vướng mắc ở nội dung cụ thể nào?' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: inputText }];
    setMessages(newMsgs);
    setInputText('');

    // Simulate API call based on mode
    setTimeout(() => {
      let aiResponse = {};
      if (mode === 'A') {
        aiResponse = {
          role: 'ai',
          text: 'Lỗi AuthenticationError xuất hiện khi API Key không hợp lệ hoặc thiếu trong biến môi trường. Bạn hãy kiểm tra lại file `.env`.',
          claims: [{id: 1, text: "Tr. 5"}]
        };
      } else if (mode === 'B') {
         aiResponse = {
          role: 'ai',
          text: 'Lỗi AuthenticationError có thể do sai API Key. Tuy nhiên tôi không tìm thấy phần này trong tài liệu. Tôi đề nghị bạn gửi câu hỏi này cho Coach để đảm bảo chính xác.',
          escalate: true
        };
      } else if (mode === 'C') {
         aiResponse = {
          role: 'ai',
          text: 'Lỗi AuthenticationError xảy ra do API Key không hợp lệ. Đã được Coach xác nhận. Vui lòng kiểm tra lại file `.env`.',
          verified: true
        };
      }
      setMessages([...newMsgs, aiResponse]);
    }, 1000);
  }

  return (
    <div className="dashboard-layout">
      <div className="topbar">
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <button style={{fontSize: '1.2rem'}}>←</button>
          <span style={{fontWeight: 600}}>Bài 2 · Day17-Track2-Data-pipeline-engineering</span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
          <span style={{fontSize: '0.9rem', color: 'var(--text-light)'}}>0/8 bài</span>
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={{padding: '0.2rem', borderRadius: '4px'}}>
             <option value="A">Mode A: Neo Nguồn</option>
             <option value="B">Mode B: Mức chắc chắn</option>
             <option value="C">Mode C: Coach duyệt</option>
          </select>
          <button onClick={onLogout} style={{color: 'var(--text-light)'}}>Đăng xuất</button>
        </div>
      </div>
      
      <div className="main-area">
        <div className="sidebar-left">
          <div style={{padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-light)'}}>
            NỘI DUNG BÀI HỌC
          </div>
          <div style={{padding: '1rem'}}>
            <div style={{fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem'}}>Module 1</div>
            <div style={{fontSize: '0.9rem', marginBottom: '1rem'}}>Slides</div>
            
            <div style={{background: '#f1f5f9', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <div style={{width: 24, height: 24, background: 'var(--primary-color)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem'}}>▶</div>
              <div>
                <div style={{fontWeight: 600, fontSize: '0.85rem'}}>day17-data-pipeline-engineering</div>
                <div style={{fontSize: '0.75rem', color: 'var(--text-light)'}}>Slide</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="main-content">
          <div className="slide-viewer">
            <img src="https://i.imgur.com/u1mP8P1.png" alt="Slide" className="slide-image" />
            <div className="toolbar">
               <button className="tool-btn active">Đọc</button>
               <button className="tool-btn">Bút</button>
               <button className="tool-btn">Highlight</button>
               <button className="tool-btn">Khoanh</button>
               <button className="tool-btn">Tẩy</button>
            </div>
          </div>
        </div>
        
        <div className="sidebar-right">
          <div className="chat-header">
            <div>AI Tutor <span style={{fontSize: '0.75rem', background: '#e0f2fe', color: '#0369a1', padding: '0.1rem 0.4rem', borderRadius: '12px', marginLeft: '0.5rem'}}>BETA</span></div>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div style={{whiteSpace: 'pre-wrap'}}>{msg.text}</div>
                
                {msg.claims && (
                   <div style={{marginTop: '0.5rem'}}>
                     Nguồn: {msg.claims.map(c => <span key={c.id} className="citation-badge">{c.text}</span>)}
                   </div>
                )}
                
                {msg.escalate && (
                  <div style={{marginTop: '0.5rem'}}>
                    <button style={{background: '#ef4444', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600}}>Gửi Coach</button>
                  </div>
                )}
                
                {msg.verified && (
                  <div style={{marginTop: '0.5rem', color: '#16a34a', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem'}}>
                    ✓ Đã được Coach xác nhận
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="chat-input-container">
            <form className="chat-input-wrapper" onSubmit={handleSend}>
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Hỏi bất cứ điều gì..." 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
              />
              <button type="submit" style={{color: 'var(--primary-color)'}}>↑</button>
            </form>
            <div style={{fontSize: '0.7rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '0.5rem'}}>
              Trợ giảng AI có thể sai — hãy đối chiếu với bài giảng.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
