import React from "react";
import testimonials from "../assets/testimoni.json";
import { AiFillStar } from "react-icons/ai";

export default function Testimoni() {
  return (
    <section className="relative bg-pink-50 overflow-hidden py-16 px-6">
      {/* Animated decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 opacity-40 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 opacity-30 rounded-full filter blur-2xl"></div>

      <div className="relative max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-green-600 mb-2">Testimoni</h2>
        <p className="text-gray-600">
          Apa kata mereka tentang <span className="text-pink-500 font-semibold">Beutiva</span>
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map(({ id, name, avatar, review, rating }) => (
          <div
            key={id}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow relative flex flex-col items-center text-center"
          >
            {/* Decorative cosmetic icon */}
            <img
              src={avatar}
              alt={name}
              className="w-20 h-20 rounded-full mb-4 ring-4 ring-pink-100 z-10"
            />

            <div className="flex items-center space-x-1 mb-2">
              {Array(rating || 5).fill().map((_, i) => (
                <AiFillStar key={i} className="text-yellow-400" />
              ))}
            </div>

            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed relative px-4">
              <span className="absolute -top-2 -left-2 text-pink-300 text-2xl">“</span>
              {review}
              <span className="absolute -bottom-2 -right-2 text-pink-300 text-2xl">”</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
