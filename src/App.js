import React, { useState, useEffect } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    // Firebase 로그인 상태 감지
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // 로딩 완료
    });
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google 로그인 실패:", error);
    }
  };

  if (loading) {
    return <h2>로딩 중...</h2>; // 로딩 중일 때 메시지 표시
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <h2>환영합니다, {user.displayName}님! 🎉</h2>
      ) : (
        <div>
          <h2>Google 로그인 테스트</h2>
          <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
            Google로 로그인
          </button>
        </div>
      )}
    </div>
  );
}

export default App;