// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const BLOCKED_IPS = ['125.212.158.49 ', 'IP_CUA_BAN_MUON_CHAN_2']; // Thay thế bằng IP bạn muốn chặn

export function middleware(request: NextRequest) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
    console.log(`Request received from IP: ${ip} for path: ${request.nextUrl.pathname}`);

    if (ip && BLOCKED_IPS.includes(ip)) {
        console.log(`Blocking IP: ${ip}`);
        return new NextResponse('Access Denied', { status: 403 });
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/:path*', // Áp dụng middleware cho tất cả các đường dẫn
};
