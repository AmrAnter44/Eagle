import React, { useState, useEffect } from 'react';
import Coaches from './Coaches';
import { Link } from 'react-router-dom';
import Nav2 from '../Nav2';
import { dataService } from '../data/dataService';

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [ptPackages, setPtPackages] = useState([]);

  useEffect(() => {
    // Fetch العروض
    dataService.getOffers().then(({ data }) => {
      if (data) setOffers(data);
    });

    // Fetch باقات PT
    dataService.getPtPackages().then(({ data }) => {
      if (data) setPtPackages(data);
    });
  }, []);

  function handlebook(offer) {
    const phone = "201122010294";
    const message = `Hello, I would like to book the ${offer.duration} offer.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=600,height=600,top=100,left=200");
  }

  function handlePTBook(ptPackage) {
    const phone = "201028188900";
    const message = `Hello, I would like to book ${ptPackage.sessions} PT Sessions.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=600,height=600,top=100,left=200");
  }

  const calculatePricePerSession = (price, sessions) => {
    return Math.round(price / sessions);
  };

  return (
    <>
      <Nav2 />

      <div>
        {/* ==================== Personal Training Section ==================== */}
        {/* <div className='w-full py-9 bg-gray-900'>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className='text-3xl md:text-4xl text-red-600 font-bold gymfont'>
                <i className="fa-solid fa-dumbbell"></i> Personal Training (PT)
              </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {ptPackages.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <i className="text-3xl text-red-600 fa-solid fa-spinner fa-spin" />
                  <p className="text-white mt-4">Loading PT Packages...</p>
                </div>
              ) : (
                ptPackages.map((pkg) => {
                  const hasDiscount = pkg.price_discount && parseFloat(pkg.price_discount) > 0;
                  const finalPrice = hasDiscount ? parseFloat(pkg.price_discount) : parseFloat(pkg.price);
                  const pricePerSession = calculatePricePerSession(finalPrice, pkg.sessions);

                  return (
                    <div key={pkg.id} className="bg-white rounded-lg shadow-lg border-2 border-red-500/30 hover:border-red-500 transition-all duration-300 overflow-hidden">
                      <div className="bg-red-600 text-white p-4">
                        <h3 className='font-bold text-2xl gymfont text-center'>
                          <i className="fa-solid fa-dumbbell pr-2"></i>
                          {pkg.sessions} Sessions
                        </h3>
                      </div>

                      <div className='p-6'>
                        <div className='mb-4'>
                          <p className='text-sm text-gray-500 mb-2'>Total Price:</p>
                          <div className='flex items-center justify-center gap-3'>
                            {hasDiscount ? (
                              <>
                                <span className="text-lg line-through text-gray-400">
                                  {pkg.price} EGP
                                </span>
                                <span className="text-3xl font-bold text-red-600">
                                  {pkg.price_discount} EGP
                                </span>
                              </>
                            ) : (
                              <span className="text-3xl font-bold text-gray-900">
                                {pkg.price} EGP
                              </span>
                            )}
                          </div>
                        </div>

                        <div className='bg-red-50 p-4 rounded-lg mb-4 border-2 border-red-500/20'>
                          <p className='text-sm text-gray-600 mb-1 text-center'>Price per session:</p>
                          <div className='flex items-center justify-center gap-2'>
                            <i className="fa-solid fa-tag text-red-600"></i>
                            <span className='text-2xl font-bold text-red-600'>
                              {pricePerSession} EGP
                            </span>
                          </div>
                        </div>

                        <ul className='text-start text-gray-700 space-y-2 mb-6'>
                          <li className='flex items-center gap-2'>
                            <i className='fa-solid fa-check text-red-600'></i>
                            <span>{pkg.sessions} Personal Training Sessions</span>
                          </li>
                          <li className='flex items-center gap-2'>
                            <i className='fa-solid fa-check text-red-600'></i>
                            <span>Professional Coach</span>
                          </li>
                          <li className='flex items-center gap-2'>
                            <i className='fa-solid fa-check text-red-600'></i>
                            <span>Customized Training Plan</span>
                          </li>
                        </ul>

                        <button
                          onClick={() => handlePTBook(pkg)}
                          className='w-full px-4 text-lg py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-bold shadow-md'
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div> */}

        {/* ==================== Membership Offers Section ==================== */}
        <div className='w-full py-12 bg-red-600'>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className='text-3xl md:text-4xl text-white font-bold gymfont'>

                Membership Offers
              </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {offers.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <i className="text-3xl text-white fa-solid fa-spinner fa-spin" />
                </div>
              ) : (
                offers.map((offer) => (
                  <div key={offer.id} className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-white">
                    <div className="bg-white p-4 border-b-4 border-red-600">
                      <h3 className='font-bold text-2xl gymfont text-red-600 text-center'>
                        <i className="fa-solid fa-dumbbell pr-2"></i>
                        {offer.duration}
                      </h3>
                    </div>

                    <div className='p-6'>
                      <div className='flex justify-center items-center gap-3 mb-6'>
                        {offer.price_new && offer.price_new !== "0" ? (
                          <>
                            <h3 className="font-bold text-xl line-through text-gray-400 gymfont">
                              {offer.price} EGP
                            </h3>
                            <h3 className="font-bold text-3xl text-red-600 gymfont">
                              {offer.price_new} EGP
                            </h3>
                          </>
                        ) : (
                          <h3 className="font-bold text-3xl text-gray-900 gymfont">
                            {offer.price} EGP
                          </h3>
                        )}
                      </div>

                      <ul className='text-start text-gray-700 space-y-3 mb-6'>
                        <li className='flex items-center gap-2 font-semibold'>
                          <i className='fa-solid fa-check text-red-600'></i>
                          <span>{offer.private} Sessions Personal Training</span>
                        </li>
                        <li className='flex items-center gap-2 font-semibold'>
                          <i className='fa-solid fa-check text-red-600'></i>
                          <span>{offer.inbody} Sessions In Inbody</span>
                        </li>
                        <li className='flex items-center gap-2 font-semibold'>
                          <i className='fa-solid fa-check text-red-600'></i>
                          <span>{offer.invite} Sessions Invitations</span>
                        </li>
                        <li className='flex items-center gap-2 font-semibold'>
                          <i className='fa-solid fa-check text-red-600'></i>
                          <span>ALL Classes</span>
                        </li>
                        <li className='flex items-center gap-2 font-semibold'>
                          <i className='fa-solid fa-check text-red-600'></i>
                          <span>SPA</span>
                        </li>
                      </ul>

                      <button
                        onClick={() => handlebook(offer)}
                        className='w-full px-4 text-lg py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-bold shadow-md'
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ==================== Marquee Section ==================== */}
        <div className="marquee bg-red-600">
          <p className="ml-11 text-white font-bold">
            <span># Believe in Yourself</span> &nbsp; &nbsp;
            <span ># Believe in Yourself</span> &nbsp; &nbsp;
            <span># Believe in Yourself</span> &nbsp; &nbsp;
            <span># Believe in Yourself</span> &nbsp; &nbsp;
          </p>
        </div>

        {/* ==================== Coaches Section ==================== */}
        <Coaches />

        {/* ==================== Features Section ==================== */}
        <div className='flex justify-evenly py-8 bg-white'>
          <div className="w-1/3 rounded-xl p-3 text-center">
            <i className="fas fa-clock text-3xl text-red-600 mb-2"></i>
            <p className="text-gray-900 font-bold text-lg">24/7</p>
            <p className="text-gray-600 text-sm">Open</p>
          </div>

          <div className="w-1/3 rounded-xl p-3 text-center">
            <i className="fas fa-wifi text-3xl text-red-600 mb-2"></i>
            <p className="text-gray-900 font-bold text-lg">FREE</p>
            <p className="text-gray-600 text-sm">Wi-Fi</p>
          </div>
        </div>
      </div>
    </>
  );
}