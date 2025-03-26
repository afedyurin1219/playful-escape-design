
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-gray-100">
      <header className="container py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Escape Room Generator</Link>
        <UserMenu />
      </header>
      
      <main className="container py-16">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Unleash Your Creativity with Our Escape Room Generator
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Create thrilling and engaging escape room experiences with ease.
          </p>
          <Link to="/create">
            <Button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
              Start Creating Now
            </Button>
          </Link>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                AI-Powered Task Generation
              </h3>
              <p className="text-gray-600">
                Leverage the power of AI to generate unique and challenging tasks for your escape room.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Customizable Themes
              </h3>
              <p className="text-gray-600">
                Choose from a variety of themes or create your own to match your vision.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Printable Content
              </h3>
              <p className="text-gray-600">
                Easily generate printable clues, puzzles, and props for a fully immersive experience.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
