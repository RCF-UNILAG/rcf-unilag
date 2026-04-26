import { QUICK_LINK_TAG } from '@/lib/quick-links';
import { SERMONS_TAG } from '@/lib/sermons';
import { SITE_SETTINGS_TAG } from '@/lib/settings';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const tagsParam = request.nextUrl.searchParams.get('tags');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  if (tagsParam) {
    const tagsArray = tagsParam.split(',').map((t) => t.trim());

    tagsArray.forEach((tag) => {
      if (tag) revalidateTag(tag, 'max');
    });

    return NextResponse.json({
      revalidated: true,
      tags_cleared: tagsArray,
      now: Date.now()
    });

  } else {
    revalidateTag(SITE_SETTINGS_TAG, 'max');
    revalidateTag(QUICK_LINK_TAG, 'max');
    revalidateTag(SERMONS_TAG, 'max');

    return NextResponse.json({
      revalidated: true,
      tags_cleared: ['all'],
      now: Date.now()
    });
  }
}