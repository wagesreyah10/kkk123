import { NextResponse } from 'next/server';

// ================================================================
// == THÊM CÁC ĐỊA CHỈ IP BẠN MUỐN CHẶN VÀO DANH SÁCH DƯỚI ĐÂY ==
// Ví dụ: const blockedIps = ['1.2.3.4', '5.6.7.8'];
// ================================================================
const blockedIps = ['125.212.158.49' ]; 

export function middleware(request) {
  // Lấy địa chỉ IP của người dùng từ header do Vercel cung cấp
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim();

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
