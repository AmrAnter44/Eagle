import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBranch } from '../context/BranchContext';
import Home from './Home';
import { motion } from 'framer-motion';

export default function BranchPage() {
  const { branchSlug } = useParams();
  const navigate = useNavigate();
  const { changeBranch, selectedBranch } = useBranch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('Branch slug from URL:', branchSlug); // للتأكد من الـ slug

    // التأكد من أن الفرع موجود
    const validBranches = ['boolaq', 'qoopa', 'fostat'];

    if (!validBranches.includes(branchSlug)) {
      console.log('Invalid branch slug, redirecting to home'); // تتبع المشكلة
      // إذا كان الفرع غير موجود، نرجع للصفحة الرئيسية
      navigate('/');
      return;
    }

    // تحديث الفرع في الـ context
    changeBranch('eagle-gym', branchSlug);
  }, [branchSlug, changeBranch, navigate]);

  // انتظر حتى يتم تحديث الفرع في الـ context
  useEffect(() => {
    if (selectedBranch === branchSlug) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [selectedBranch, branchSlug]);

  // عرض loading حتى يتم تحديث الفرع
  if (!isReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.i
            className="text-6xl text-red-600 fa-solid fa-spinner fa-spin mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white text-xl gymfont">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // عرض صفحة Home مع البيانات الخاصة بالفرع
  return <Home />;
}
