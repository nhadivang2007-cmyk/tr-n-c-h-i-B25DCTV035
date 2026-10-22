import { useState } from 'react'

function App() {
  const [text, setText] = useState('')

  const handleRun = () => {
    // In kết quả ra Console của trình duyệt
    console.log("Nội dung bạn đã nhập là:", text)
    alert(`Code đã chạy! Nội dung: ${text}`)
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Thử nghiệm chạy code React</h2>
      
      <input 
        type="text" 
        placeholder="Nhập nội dung bất kỳ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '8px 12px', fontSize: '16px', marginRight: '10px' }}
      />

      <button 
        onClick={handleRun}
        style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
      >
        Chạy Code
      </button>

      <p style={{ marginTop: '20px', color: '#666' }}>
        * Bấm phím <b>F12</b> trên trình duyệt và chọn tab <b>Console</b> để xem dữ liệu xuất ra.
      </p>
    </div>
  )
}

export default App