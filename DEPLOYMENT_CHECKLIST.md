# Deployment Checklist for Vercel

## Pre-Deployment Verification

### 1. Build Check
```bash
pnpm run build
```
- [x] Build completes successfully
- [x] No TypeScript errors
- [x] No warnings (except known acceptable ones)
- [x] Static pages generated correctly

### 2. File Size Verification
```bash
ls -lh public/gallery/ | tail -5
du -sh public/gallery/
```
- [x] Gallery directory exists
- [x] 33 images present
- [x] Total size ~2.8MB
- [x] All files are .jpg format

### 3. Image Quality Check
- [x] Images display correctly
- [x] No visible compression artifacts
- [x] Aspect ratios maintained
- [x] Colors preserved

### 4. Performance Tests

#### Desktop (Chrome DevTools)
- [ ] Open http://localhost:3000
- [ ] Open DevTools (F12)
- [ ] Network tab → Throttle to "Fast 3G"
- [ ] Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
- [ ] Verify:
  - Initial page load < 3s
  - Images lazy load as user scrolls
  - Total transferred < 5MB
  - Smooth scrolling performance

#### Mobile (Chrome DevTools Device Mode)
- [ ] Toggle device mode (Cmd+Shift+M)
- [ ] Select "iPhone 12 Pro"
- [ ] Network → "Fast 3G"
- [ ] Verify:
  - Cards fit within viewport
  - Touch scrolling works smoothly
  - Images load progressively
  - No layout shifts

### 5. Responsive Design Check

#### Mobile (375px)
- [ ] Cards are readable
- [ ] Scanner effect visible
- [ ] Drag/swipe works
- [ ] Gap spacing appropriate

#### Tablet (768px)
- [ ] Layout adapts properly
- [ ] Card sizes look good
- [ ] Scanner effect scales

#### Desktop (1920px)
- [ ] Full resolution utilized
- [ ] Cards well-spaced
- [ ] Particle effects smooth

### 6. Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### 7. Accessibility

- [ ] Keyboard navigation works (Arrow keys)
- [ ] Images have alt text
- [ ] Respects reduced motion preferences
- [ ] Color contrast acceptable

## Vercel Deployment Steps

### 1. Initial Setup
```bash
# If not already connected to Vercel
vercel login
vercel link
```

### 2. Deploy Preview
```bash
vercel
```
This creates a preview deployment for testing.

### 3. Test Preview Deployment
- [ ] Visit preview URL
- [ ] Test all functionality
- [ ] Check performance metrics
- [ ] Verify images load from CDN
- [ ] Test on real mobile device

### 4. Production Deployment
```bash
vercel --prod
```

### 5. Post-Deployment Verification

#### Performance (Lighthouse)
- [ ] Run Lighthouse audit
- [ ] Performance score > 90
- [ ] Best Practices > 90
- [ ] SEO > 90
- [ ] Accessibility > 90

#### CDN Verification
```bash
curl -I https://your-domain.vercel.app/gallery/image00001.jpg
```
Check for:
- [ ] `x-vercel-cache: HIT` (after first load)
- [ ] `cache-control: public, max-age=31536000, immutable`
- [ ] `content-type: image/jpeg`
- [ ] File size < 200KB

#### Image Loading Test
- [ ] Open network tab
- [ ] Scroll through carousel
- [ ] Verify images load on-demand
- [ ] Check total data transferred

### 6. Monitor

After deployment, monitor:
- [ ] Vercel Analytics dashboard
- [ ] Error logs
- [ ] Performance metrics
- [ ] Bandwidth usage

## Troubleshooting

### Images Not Loading
1. Check `public/gallery/` directory exists
2. Verify Next.js is serving from `/public`
3. Check browser console for 404 errors
4. Verify image paths in component

### Slow Loading
1. Verify compression was applied
2. Check Vercel Edge Network is enabled
3. Test with different network speeds
4. Check if lazy loading is working

### Layout Issues on Mobile
1. Check responsive CSS media queries
2. Test on real devices, not just simulators
3. Verify viewport meta tag in layout
4. Check for horizontal scrolling

### Build Errors
1. Run `pnpm install` to ensure dependencies
2. Delete `.next` folder and rebuild
3. Check for TypeScript errors
4. Verify all imports are correct

## Success Criteria

✅ All images compressed and optimized
✅ Total gallery size < 5MB
✅ Page load time < 3s on 3G
✅ Lighthouse performance > 90
✅ No console errors
✅ Smooth animations on mobile
✅ Images cached properly
✅ Responsive on all screen sizes

## Deployment URLs

- Preview: `https://[project-name]-git-[branch].vercel.app`
- Production: `https://[project-name].vercel.app`

## Environment Variables (if needed)

None required for current setup.

## DNS Configuration (if custom domain)

If using custom domain:
1. Add domain in Vercel dashboard
2. Configure DNS records
3. Wait for SSL certificate
4. Verify HTTPS works

## Rollback Plan

If issues arise:
```bash
# Revert to previous deployment
vercel rollback
```

Or in Vercel dashboard:
1. Go to Deployments
2. Find last working deployment
3. Click "Promote to Production"
