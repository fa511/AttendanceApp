// إحداثيات الموقع المحدد (مثال: الرياض)
const officeLatitude = 24.8632285;
const officeLongitude = 46.5915591;
const radius = 0.5; // نصف قطر المنطقة بالكيلومترات

// زر تسجيل الحضور
const button = document.getElementById('check-in');
const status = document.getElementById('status');

// حساب المسافة باستخدام صيغة Haversine
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// التحقق من الموقع
function checkLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      const distance = getDistance(officeLatitude, officeLongitude, userLat, userLon);

      if (distance <= radius) {
        status.textContent = 'تم تسجيل الحضور بنجاح!';
      } else {
        status.textContent = 'أنت خارج المنطقة المسموح بها!';
      }
    }, () => {
      status.textContent = 'تعذر الحصول على الموقع.';
    });
  } else {
    status.textContent = 'المتصفح لا يدعم تحديد الموقع الجغرافي.';
  }
}

// ربط الزر بوظيفة التحقق
button.addEventListener('click', checkLocation);
