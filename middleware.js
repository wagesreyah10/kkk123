import { NextResponse } from 'next/server';

// ================================================================
// == THÊM CÁC ĐỊA CHỈ IP BẠN MUỐN CHẶN VÀO DANH SÁCH DƯỚI ĐÂY ==
// ================================================================
const blockedIps = ['125.212.158.49' ]; 

export function middleware(request) {
  // Lấy IP trực tiếp từ header của Vercel (cách này đáng tin cậy hơn)
  const ip = request.headers.get('x-vercel-forwarded-for');
  
  // Kiểm tra xem IP có trong danh sách chặn không
  if (ip && blockedIps.includes(ip)) {
    // Trả về trang bị cấm truy cập
    return new NextResponse('<h1>Forbidden</h1><p>Your access is denied.</p>', {
      status: 403,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  // Cho phép request tiếp tục
  return NextResponse.next();
}

// Cấu hình để middleware chạy trên tất cả các request
export const config = {
  matcher: '/:path*',
};
