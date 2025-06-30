import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

const Faq = () => {
  const [faqList, setFaqList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaq();
  }, []);

  const fetchFaq = async () => {
    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .order('id', { ascending: true });

    if (!error) setFaqList(data);
    setLoading(false);
  };

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {faqList.map((item, i) => (
        <motion.div
          key={item.id}
          className="bg-white shadow-md border border-pink-100 rounded-xl p-4 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          {/* Pertanyaan (Pembeli) */}
          <div className="flex items-start space-x-3">
            <motion.img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=buyer${i}`}
              alt="avatar pembeli"
              className="w-10 h-10 rounded-full object-cover"
              whileHover={{ scale: 1.05 }}
            />
            <div>
              <div className="text-sm font-semibold text-gray-700 flex items-center">
                Pembeli
              </div>
              <motion.div
                className="mt-1 bg-gray-100 text-gray-800 rounded-lg px-4 py-2 max-w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {item.pertanyaan}
              </motion.div>
            </div>
          </div>

          {/* Jawaban (Admin) */}
          <div className="flex items-start justify-end space-x-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-700 flex justify-end items-center">
                Admin
              </div>
              <motion.div
                className="mt-1 bg-pink-600 text-white rounded-lg px-4 py-2 max-w-full ml-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {item.jawaban}
              </motion.div>
            </div>
            <motion.img
              src="https://api.dicebear.com/7.x/micah/svg?seed=admin"
              alt="avatar admin"
              className="w-10 h-10 rounded-full object-cover"
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Faq;
