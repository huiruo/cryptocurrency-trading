import React from 'react'

export default function Login() {
  /**
  // 常规登录
  function handleLoginButton() {
    // 发送 POST 请求以登录并获取访问令牌
    fetch('/api/login', {
      method: 'POST',
      // 发送用户名和密码等凭据
      body: JSON.stringify({ username: 'test', password: 123456 }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('access_token', data.access_token)

        // 重定向到前端应用程序的某个页面，例如首页
        window.location.href = 'http://your-frontend-app.com/home'
      })
  }
  */

  return <>hello</>
}
