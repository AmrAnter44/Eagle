import React from 'react';

export default function Footer() {
  return (
    <>
      <footer className="text-white flex flex-row justify-between bg-red-600 p-0 m-0 mt-auto">
        <div className="flex flex-row">
          <a
            href="https://www.instagram.com/eaglegym2024"
            className="text-white p-2 lg:p-4"
          >
            <i className="p-1 fa-brands fa-instagram text-2xl text-white mt-1"></i>
          </a>
          <a href="https://wa.me/201122010294" className="text-white p-2 lg:p-4">
            <i className="p-1 fa-brands fa-whatsapp text-2xl text-white mt-1"></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61554637528211" className="text-white p-2 lg:p-4">
            <i className="p-1 fa-brands fa-facebook text-2xl text-white mt-1"></i>
          </a>
          <a href="https://www.google.com/maps/place/eagle+gym+%D8%A7%D9%84%D9%81%D8%B3%D8%B7%D8%A7%D8%B7%E2%80%AD/data=!4m2!3m1!1s0x145847004519ae1f:0xd7eaec49d4769777?sa=X&ved=1t:242&ictx=111" className="text-white p-2 lg:p-4">
            <i className="fa-solid fa-location-dot text-2xl text-white mt-1 p-1"></i>
          </a>
        </div>
        <div>
          <img src="/pay.png" alt="" className="w-44 mr-8 mt-4" />
        </div>
      </footer>

      <p className="text-center bg-red-600">
        Direct by{" "}
        <a href="https://tamyaz.online/" className="text-white">
          Tamyaz
        </a>
      </p>




<iframe 
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.060212663338!2d31.252080799999998!3d30.006427400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847004519ae1f%3A0xd7eaec49d4769777!2sEAGLE%20GYM!5e0!3m2!1sen!2seg!4v1762820295028!5m2!1sen!2seg"
  width="100%" 
  height="450" 
  style={{ border: 0 }} 
  allowFullScreen="" 
  loading="lazy" 
  referrerPolicy="no-referrer-when-downgrade"
></iframe>

    </>
  );
}
