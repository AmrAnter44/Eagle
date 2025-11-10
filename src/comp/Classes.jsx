import React, { useState, useEffect } from 'react';
import { dataService } from '../data/dataService';

export default function Classes() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // مباشر وبسيط - fetch لما الصفحة تفتح
    dataService.getClasses().then(({ data }) => {
      if (data) setClasses(data);
    });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 flex-wrap justify-center px-4 my-8 mt-40">
      {classes.length === 0 ? (
        <div className="text-center py-8 mt-40">
          <i className="text-3xl text-red-700 fa-solid fa-spinner fa-spin" />
        </div>
      ) : (
        classes.map((classItem) => (
          <div
            key={classItem.id}
            className={`
              min-w-[280px] border-2 p-6 rounded-xl flex flex-col justify-center text-center shadow-lg  t
              ${classItem.mem 
                ? " border-red-500/30 text-white backdrop-blur-md bg-black" 
                : classItem.mix === "Ladies" 
                ? "bg-gray-500/10 border-gray-500/30 backdrop-blur-md bg-red-600" 
                : " backdrop-blur-md bg-white text-red-600"
              } 
            `}
          >
            <h3 className="p-2 font-bold text-xl gymfont">
              {classItem.classname}
            </h3>

            <h4 className="p-2 font-semibold text-lg">
              Day: {classItem.day}
            </h4>

            <h5 className='p-2 font-semibold text-lg'>
              <span className="text-xl px-1">
                <span>Coach: </span>{classItem.coachname}
              </span>
            </h5>

            <p className="p-2 font-semibold text-lg">
              <i className="fa-regular fa-clock" />
              {" "}At:{" "}
              <span className="text-xl px-1">{classItem.time1}</span> 
              <span>pm</span>
            </p>

            <p className={`p-2 font-semibold text-lg 
                          ${classItem.mix == "Ladies" ? "text-white" : ""}
            `}>
              {classItem.mix}
            </p>

            {classItem.mem && (
              <span className="text-sm px-1 text-red-600">
                Out of Membership
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
