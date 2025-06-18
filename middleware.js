import { NextResponse } from 'next/server';

// ================================================================
// == THÊM CÁC ĐỊA CHỈ IP BẠN MUỐN CHẶN VÀO DANH SÁCH DƯỚISĐÂY ==
// Ví dụ: const blockedIps = ['1.2.3.4', '5.6.7.8'];
// ================================================================
const blockedIps = []; 

export function middleware(request) {
  // Lấy giá trị header một cách an toàn
  const ipHeader = request.headers.get('x-forwarded-for');
  let ip = null;

  // Chỉ xử lý nếu header tồn tại và không rỗng
  if (ipHeader) {
    // Header 'x-forwarded-for' có thể là một chuỗi gồm nhiều IP, 
    // IP của người dùng thường là IP đầu tiên.
    ip = ipHeader.split(',')[0].trim();
  }
  
  // Kiểm tra xem IP có trong danh sách chặn không
  if (ip && blockedIps.includes(ip)) {
    // Nếu có, trả về trang bị cấm truy cập (403 Forbidden)
    return new NextResponse('<h1>Forbidden</h1><p>Your access is denied.</p>', {
      status: 403,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  // Nếu IP không bị chặn, cho phép request tiếp tục
  return NextResponse.next();
}

// Cấu hình để middleware chạy trên tất cả các request
export const config = {
  matcher: '/:path*',
};
