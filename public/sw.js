self.addEventListener('install', () => {
  console.log('Service Worker Installed');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.showNotification('HealthCare Pro: Welcome back!', {
      body: 'New patient records available. Check recent activity.',
      icon: '/favicon.svg',
      badge: '/icons.svg',
      actions: [
        { action: 'view', title: 'View Dashboard' }
      ]
    })
  );
  console.log('Service Worker Activated');
});

self.addEventListener('fetch', () => {});

self.addEventListener('push', function () {
  self.registration.showNotification('New Notification');
});
