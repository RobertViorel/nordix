"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeIn, staggerContainer } from "@/src/utils/animation"; // Adjust the import path as needed
import Tilt from "react-parallax-tilt";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  index: number;
}

const ServiceCard = ({ title, description, icon, index }: ServiceCardProps) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      transitionSpeed={500}
      glareEnable={true}
      glareMaxOpacity={0.3}
      scale={1.02}
      gyroscope
      className="w-full max-w-[400px] flex flex-col justify-between"
    >
      <motion.div
        ref={ref}
        className="bg-transparent p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 flex flex-col h-full"
        variants={fadeIn("up", "tween", index * 0.2, 1)} // Apply stagger delay based on index
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg text-primary font-semibold font-mono text-center">{title}</h3>
        <p className="mt-2 text-gray-400 text-center flex-grow">{description}</p>
      </motion.div>
    </Tilt>
  );
};

export function Services() {
  const [isMounted, setIsMounted] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.section
      ref={ref}
      className="container mx-auto pb-10 mb-10"
      variants={staggerContainer(0.2, 0.1)}
      initial="hidden"
      animate={controls}
    >
      <motion.h2
        className="px-8 font-mono text-[#D0B870] mb-4"
        variants={fadeIn("up", "tween", 0, 1)}
      >
        Services
      </motion.h2>
      <motion.p
        className="px-8 text-gray-400 max-w-xl mb-8"
        variants={fadeIn("up", "tween", 0.2, 1)}
      >
        Hi there! I'm Robert, a passionate junior web developer on a journey to turn my coding dreams into reality.
      </motion.p>
      <div className="flex flex-wrap justify-center gap-8">
        {isMounted && (
          <>
            <ServiceCard
              title="UI/UX Design"
              description="Designing user-friendly interfaces."
              icon={<img src="/assets/graphic.png" alt="UI/UX Design" className="w-14 h-14" />}
              index={0} // index to control the delay
            />
            <ServiceCard
              title="Web Development"
              description="Building responsive and modern websites."
              icon={<img src="/assets/develop.png" alt="Web Development" className="w-14 h-14" />}
              index={1}
            />
            <ServiceCard
              title="Digital Marketing"
              description="Creating and launching Social media/google marketing campaigns."
              icon={<img src="/assets/digital.png" alt="Digital Marketing" className="w-14 h-14" />}
              index={2}
            />
          </>
        )}
      </div>
    </motion.section>
  );
}
