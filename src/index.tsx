import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
// TanStack-Query => 셋팅
const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            refetchOnWindowFocus: false, // 서버 연결없이 사용 => 속도문제
            refetchOnMount: false, // 키사용 => 동일한 키일 경우에는 Cache에 저장된 데이터 읽기
            refetchOnReconnect: false,
            retry: false, // 버튼 클릭시 ... 이벤트
            staleTime: 5*60*1000  // 5분 => 이전에 읽어서 메모리에 저장하는 시간
        }
    }
});
root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();